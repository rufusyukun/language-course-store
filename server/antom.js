import { createSign, createVerify } from 'node:crypto';

const sandboxBaseUrl = 'https://open-na-global.alipay.com';
const payPath = '/ams/api/v1/payments/pay';

function normalizePem(value) {
  return String(value || '').replace(/\\n/g, '\n').trim();
}

function getConfig() {
  return {
    clientId: process.env.ANTOM_CLIENT_ID || '',
    merchantId: process.env.ANTOM_MERCHANT_ID || '',
    privateKey: normalizePem(process.env.ANTOM_PRIVATE_KEY),
    publicKey: normalizePem(process.env.ANTOM_PUBLIC_KEY),
    webhookSecret: process.env.ANTOM_WEBHOOK_SECRET || '',
  };
}

function assertConfig(config) {
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length) {
    const error = new Error(`Missing Antom sandbox config: ${missing.join(', ')}`);
    error.code = 'ANTOM_CONFIG_MISSING';
    throw error;
  }
}

function buildSignatureContent(method, uri, clientId, requestTime, rawBody) {
  return `${method.toUpperCase()} ${uri}\n${clientId}.${requestTime}.${rawBody}`;
}

function parseSignatureHeader(header = '') {
  return String(header)
    .split(',')
    .map((part) => part.trim())
    .reduce((result, part) => {
      const [key, ...rest] = part.split('=');
      if (key) result[key] = decodeURIComponent(rest.join('='));
      return result;
    }, {});
}

function signRequest({ method, uri, clientId, requestTime, rawBody, privateKey }) {
  const signer = createSign('RSA-SHA256');
  signer.update(buildSignatureContent(method, uri, clientId, requestTime, rawBody));
  signer.end();
  const signature = encodeURIComponent(signer.sign(privateKey, 'base64'));
  return `algorithm=RSA256,keyVersion=1,signature=${signature}`;
}

export function verifyAntomSignature({ method, uri, clientId, requestTime, signatureHeader, rawBody }) {
  const config = getConfig();
  if (!config.publicKey) return false;

  const parsed = parseSignatureHeader(signatureHeader);
  if (parsed.algorithm !== 'RSA256' || !parsed.signature || !clientId || !requestTime) return false;

  const verifier = createVerify('RSA-SHA256');
  verifier.update(buildSignatureContent(method, uri, clientId, requestTime, rawBody));
  verifier.end();
  return verifier.verify(config.publicKey, parsed.signature, 'base64');
}

export function isAntomWebhookSecretValid(value) {
  const config = getConfig();
  return Boolean(config.webhookSecret && value && value === config.webhookSecret);
}

export async function createAntomSandboxPayment({ order, course, redirectUrl, notifyUrl }) {
  const config = getConfig();
  assertConfig(config);

  const requestTime = new Date().toISOString();
  const amountValue = String(order.amount * 100);
  const payload = {
    productCode: 'CASHIER_PAYMENT',
    paymentRequestId: order.orderNo,
    paymentAmount: {
      currency: 'CNY',
      value: amountValue,
    },
    paymentMethod: {
      paymentMethodType: 'ALIPAY_CN',
    },
    paymentRedirectUrl: redirectUrl,
    paymentNotifyUrl: notifyUrl,
    order: {
      referenceOrderId: order.orderNo,
      orderDescription: course.title,
      orderAmount: {
        currency: 'CNY',
        value: amountValue,
      },
    },
    env: {
      terminalType: 'WAP',
    },
    merchant: {
      referenceMerchantId: config.merchantId,
    },
  };
  const rawBody = JSON.stringify(payload);
  const signature = signRequest({
    method: 'POST',
    uri: payPath,
    clientId: config.clientId,
    requestTime,
    rawBody,
    privateKey: config.privateKey,
  });

  const response = await fetch(`${sandboxBaseUrl}${payPath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': config.clientId,
      'Request-Time': requestTime,
      Signature: signature,
    },
    body: rawBody,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error('ANTOM_SANDBOX_REQUEST_FAILED');
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return {
    provider: 'antom_sandbox',
    paymentId: data.paymentId || data.paymentRequestId || order.orderNo,
    checkoutUrl: data.normalUrl || data.applinkUrl || data.schemeUrl || '',
    rawResponse: data,
  };
}

export function parseAntomNotification(body) {
  return {
    orderNo: String(body.paymentRequestId || ''),
    paymentId: String(body.paymentId || ''),
    resultStatus: String(body.result?.resultStatus || ''),
    amountValue: String(body.paymentAmount?.value || ''),
    currency: String(body.paymentAmount?.currency || ''),
    eventType: String(body.notifyType || 'PAYMENT_RESULT'),
  };
}

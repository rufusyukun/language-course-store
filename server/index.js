import './loadEnv.js';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { courses } from '../src/data/courses.js';
import {
  createAntomSandboxPayment,
  isAntomWebhookSecretValid,
  parseAntomNotification,
  verifyAntomSignature,
} from './antom.js';
import { all, get, initDb, run } from './db.js';

const port = Number(process.env.PORT || process.env.API_PORT || 3001);
const mockWebhookSecret = process.env.MOCK_PAYMENT_SECRET || process.env.MOCK_WEBHOOK_SECRET || 'mock_secret_dev';
const adminPassword = process.env.ADMIN_PASSWORD || '';
const rootDir = resolve(fileURLToPath(new URL('..', import.meta.url)));
const distDir = join(rootDir, 'dist');

const courseById = new Map(courses.map((course) => [course.id, course]));

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Mock-Secret, X-Admin-Password',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });
  res.end(JSON.stringify(payload));
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function sendStatic(req, res, url) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'METHOD_NOT_ALLOWED' }));
    return true;
  }

  if (!existsSync(distDir)) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'FRONTEND_NOT_BUILT' }));
    return true;
  }

  const pathname = decodeURIComponent(url.pathname);
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^[/\\]+/, '');
  const normalizedPath = normalize(relativePath).replace(/^(\.\.[/\\])+/, '');
  const candidate = join(distDir, normalizedPath);
  const safeCandidate = resolve(candidate);
  const isFile = safeCandidate.startsWith(distDir) && existsSync(safeCandidate) && statSync(safeCandidate).isFile();
  const assetPath = isFile
    ? safeCandidate
    : join(distDir, 'index.html');
  const type = contentTypes[extname(assetPath)] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': assetPath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
  });
  if (req.method === 'HEAD') {
    res.end();
    return true;
  }
  const stream = createReadStream(assetPath);
  stream.on('error', () => {
    if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'STATIC_FILE_READ_FAILED' }));
  });
  stream.pipe(res);
  return true;
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function createOrderNo() {
  const now = new Date();
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${Math.floor(1000 + Math.random() * 9000)}`;
}

function createPickupCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function createPaymentId(orderNo) {
  return `MOCKPAY-${orderNo}`;
}

async function createDelivery(order) {
  const existing = await get('SELECT * FROM deliveries WHERE orderNo = :orderNo', { orderNo: order.orderNo });
  if (existing) return existing;

  const deliveredAt = new Date().toISOString();
  const learningUsername = `LP${Math.floor(100000 + Math.random() * 900000)}`;
  const learningPassword = Math.random().toString(36).slice(2, 10);
  const downloadUrl = `https://course.example.com/download/${order.orderNo}`;
  const extractCode = order.pickupCode.slice(0, 4);

  await run(
    `INSERT INTO deliveries (
      orderNo, learningUsername, learningPassword, username, password, downloadUrl, extractCode, deliveredAt
    ) VALUES (
      :orderNo, :learningUsername, :learningPassword, :username, :password, :downloadUrl, :extractCode, :deliveredAt
    ) ON CONFLICT (orderNo) DO NOTHING`,
    {
      orderNo: order.orderNo,
      learningUsername,
      learningPassword,
      username: learningUsername,
      password: learningPassword,
      downloadUrl,
      extractCode,
      deliveredAt,
    },
  );

  return get('SELECT * FROM deliveries WHERE orderNo = :orderNo', { orderNo: order.orderNo });
}

async function recordPaymentEvent({ orderNo, paymentId, rawPayload, eventType, verifyStatus }) {
  await run(
    `INSERT INTO payment_events (orderNo, paymentId, rawPayload, eventType, verifyStatus, createdAt)
     VALUES (:orderNo, :paymentId, :rawPayload, :eventType, :verifyStatus, :createdAt)`,
    {
      orderNo: orderNo || null,
      paymentId: paymentId || null,
      rawPayload: typeof rawPayload === 'string' ? rawPayload : JSON.stringify(rawPayload || {}),
      eventType,
      verifyStatus,
      createdAt: new Date().toISOString(),
    },
  );
}

async function hydrateOrder(row) {
  if (!row) return null;
  const course = courseById.get(row.courseId);
  const delivery = await get('SELECT * FROM deliveries WHERE orderNo = :orderNo', { orderNo: row.orderNo });
  const refunds = await all('SELECT * FROM refunds WHERE orderNo = :orderNo ORDER BY id DESC', { orderNo: row.orderNo });
  const supportTickets = await all('SELECT * FROM support_tickets WHERE orderNo = :orderNo ORDER BY id DESC', { orderNo: row.orderNo });

  return {
    orderNo: row.orderNo,
    pickupCode: row.pickupCode,
    course,
    courseId: row.courseId,
    amount: row.amount,
    recoveryEmail: row.recoveryEmail || '',
    status: row.status,
    paymentStatus: row.paymentStatus,
    deliveryStatus: row.deliveryStatus,
    buyerIp: row.buyerIp,
    userAgent: row.userAgent,
    createdAt: row.createdAt,
    paidAt: row.paidAt,
    learningUsername: delivery?.learningUsername || delivery?.username || '',
    learningPassword: delivery?.learningPassword || delivery?.password || '',
    username: delivery?.learningUsername || delivery?.username || '',
    password: delivery?.learningPassword || delivery?.password || '',
    downloadUrl: delivery?.downloadUrl || '',
    extractCode: delivery?.extractCode || '',
    deliveredAt: delivery?.deliveredAt || '',
    refunds,
    supportRecords: supportTickets,
    supportTickets,
  };
}

function hydratePaymentEvent(row) {
  if (!row) return null;
  return {
    id: row.id,
    orderNo: row.orderNo || '',
    paymentId: row.paymentId || '',
    rawPayload: row.rawPayload,
    eventType: row.eventType,
    verifyStatus: row.verifyStatus,
    createdAt: row.createdAt,
  };
}

function getBuyerIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || '';
}

async function handleCreateOrder(req, res) {
  const body = await readJson(req);
  const courseId = String(body.courseId || '');
  const recoveryEmail = String(body.recoveryEmail || '').trim();
  const course = courseById.get(courseId);

  if (!course) return sendJson(res, 404, { error: 'COURSE_NOT_FOUND' });
  if (course.price >= 1500 && !recoveryEmail) return sendJson(res, 400, { error: 'RECOVERY_EMAIL_REQUIRED' });

  const now = new Date().toISOString();
  const orderNo = createOrderNo();
  const pickupCode = createPickupCode();

  await run(
    `INSERT INTO orders (
      orderNo, pickupCode, courseId, amount, recoveryEmail, status, paymentStatus,
      deliveryStatus, buyerIp, userAgent, createdAt
    ) VALUES (
      :orderNo, :pickupCode, :courseId, :amount, :recoveryEmail, 'pending', 'pending',
      'pending', :buyerIp, :userAgent, :createdAt
    )`,
    {
      orderNo,
      pickupCode,
      courseId,
      amount: course.price,
      recoveryEmail,
      buyerIp: getBuyerIp(req),
      userAgent: req.headers['user-agent'] || '',
      createdAt: now,
    },
  );

  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  return sendJson(res, 201, { order: await hydrateOrder(order) });
}

async function handleCreatePayment(req, res) {
  const body = await readJson(req);
  const orderNo = String(body.orderNo || '');
  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });

  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });
  if (order.status !== 'pending') return sendJson(res, 409, { error: 'ORDER_NOT_PENDING' });

  return sendJson(res, 200, {
    paymentId: createPaymentId(orderNo),
    checkoutUrl: `/mock-checkout/${orderNo}`,
    paymentStatus: order.paymentStatus,
  });
}

async function handleCreateAntomSandboxPayment(req, res) {
  const body = await readJson(req);
  const orderNo = String(body.orderNo || '');
  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });

  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });
  if (order.status !== 'pending') return sendJson(res, 409, { error: 'ORDER_NOT_PENDING' });

  const course = courseById.get(order.courseId);
  try {
    const payment = await createAntomSandboxPayment({
      order,
      course,
      redirectUrl: String(body.redirectUrl || 'https://example.com/payment-result'),
      notifyUrl: String(body.notifyUrl || 'https://example.com/api/payments/antom-sandbox/webhook'),
    });

    return sendJson(res, 200, payment);
  } catch (error) {
    if (error.code === 'ANTOM_CONFIG_MISSING') {
      return sendJson(res, 503, { error: 'ANTOM_SANDBOX_CONFIG_MISSING' });
    }
    return sendJson(res, error.status || 502, {
      error: error.message || 'ANTOM_SANDBOX_REQUEST_FAILED',
      detail: error.payload || null,
    });
  }
}

async function handleWebhook(req, res) {
  const body = await readJson(req);
  const orderNo = String(body.orderNo || '');
  const paymentId = String(body.paymentId || createPaymentId(orderNo));
  const eventType = String(body.eventType || body.event || 'payment.paid');
  const secret = req.headers['x-mock-secret'] || body.secret;

  if (secret !== mockWebhookSecret) {
    await recordPaymentEvent({ orderNo, paymentId, rawPayload: body, eventType, verifyStatus: 'failed' });
    return sendJson(res, 401, { error: 'INVALID_WEBHOOK_SECRET' });
  }

  await recordPaymentEvent({ orderNo, paymentId, rawPayload: body, eventType, verifyStatus: 'success' });

  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });

  if (eventType === 'payment.failed') {
    await run(
      `UPDATE orders SET status = 'failed', paymentStatus = 'failed' WHERE orderNo = :orderNo`,
      { orderNo },
    );
  } else {
    const paidAt = order.paidAt || new Date().toISOString();
    if (order.paymentStatus !== 'paid') {
      await run(
        `UPDATE orders
         SET status = 'paid', paymentStatus = 'paid', deliveryStatus = 'delivered', paidAt = :paidAt
         WHERE orderNo = :orderNo`,
        { orderNo, paidAt },
      );
    }
    await createDelivery({ ...order, paidAt });
  }

  const updated = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  return sendJson(res, 200, { order: await hydrateOrder(updated) });
}

async function completeMockPayment(orderNo, paymentId = createPaymentId(orderNo)) {
  const eventType = 'payment.paid';
  await recordPaymentEvent({
    orderNo,
    paymentId,
    rawPayload: { orderNo, paymentId, eventType, source: 'mock-complete' },
    eventType,
    verifyStatus: 'success',
  });

  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  if (!order) return null;

  const paidAt = order.paidAt || new Date().toISOString();
  if (order.paymentStatus !== 'paid') {
    await run(
      `UPDATE orders
       SET status = 'paid', paymentStatus = 'paid', deliveryStatus = 'delivered', paidAt = :paidAt
       WHERE orderNo = :orderNo`,
      { orderNo, paidAt },
    );
  }
  await createDelivery({ ...order, paidAt });

  const updated = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  return hydrateOrder(updated);
}

async function handleMockComplete(req, res) {
  const body = await readJson(req);
  const orderNo = String(body.orderNo || '');
  const paymentId = String(body.paymentId || createPaymentId(orderNo));
  const order = await completeMockPayment(orderNo, paymentId);
  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });
  return sendJson(res, 200, { order });
}

async function handleAntomWebhook(req, res, url) {
  const rawBody = await readRawBody(req);
  const body = rawBody ? JSON.parse(rawBody) : {};
  const antom = parseAntomNotification(body);
  const clientId = req.headers['client-id'] || req.headers['Client-Id'];
  const requestTime = req.headers['request-time'] || req.headers['Request-Time'];
  const signatureHeader = req.headers.signature || req.headers.Signature;
  const secret = req.headers['x-antom-webhook-secret'] || body.webhookSecret;
  const signatureValid = verifyAntomSignature({
    method: req.method,
    uri: url.pathname,
    clientId,
    requestTime,
    signatureHeader,
    rawBody,
  });
  const secretValid = isAntomWebhookSecretValid(secret);
  const secretRequired = Boolean(process.env.ANTOM_WEBHOOK_SECRET);
  const verifyStatus = signatureValid && (!secretRequired || secretValid) ? 'success' : 'failed';

  await recordPaymentEvent({
    orderNo: antom.orderNo,
    paymentId: antom.paymentId,
    rawPayload: rawBody,
    eventType: antom.eventType,
    verifyStatus,
  });

  if (verifyStatus !== 'success') return sendJson(res, 401, { error: 'INVALID_ANTOM_WEBHOOK_SIGNATURE' });

  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo: antom.orderNo });
  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });

  const expectedAmount = String(order.amount * 100);
  if (antom.currency && antom.currency !== 'CNY') {
    return sendJson(res, 400, { error: 'PAYMENT_CURRENCY_MISMATCH' });
  }
  if (antom.amountValue !== expectedAmount) {
    return sendJson(res, 400, { error: 'PAYMENT_AMOUNT_MISMATCH' });
  }

  if (antom.resultStatus === 'F' || antom.resultStatus === 'FAIL') {
    await run(
      `UPDATE orders SET status = 'failed', paymentStatus = 'failed' WHERE orderNo = :orderNo`,
      { orderNo: antom.orderNo },
    );
  } else if (antom.resultStatus === 'S' || antom.resultStatus === 'SUCCESS') {
    const paidAt = order.paidAt || new Date().toISOString();
    if (order.paymentStatus !== 'paid') {
      await run(
        `UPDATE orders
         SET status = 'paid', paymentStatus = 'paid', deliveryStatus = 'delivered', paidAt = :paidAt
         WHERE orderNo = :orderNo`,
        { orderNo: antom.orderNo, paidAt },
      );
    }
    await createDelivery({ ...order, paidAt });
  }

  const updated = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo: antom.orderNo });
  return sendJson(res, 200, { result: 'SUCCESS', order: await hydrateOrder(updated) });
}

async function handleQuery(req, res, url) {
  const orderNo = String(url.searchParams.get('orderNo') || '').trim();
  const pickupCode = String(url.searchParams.get('pickupCode') || '').trim();
  const email = String(url.searchParams.get('email') || '').trim();

  if (!orderNo) return sendJson(res, 400, { error: 'ORDER_NO_REQUIRED' });

  let order = null;
  if (pickupCode) {
    order = await get(
      'SELECT * FROM orders WHERE orderNo = :orderNo AND pickupCode = :pickupCode',
      { orderNo, pickupCode },
    );
  } else if (email) {
    order = await get(
      'SELECT * FROM orders WHERE orderNo = :orderNo AND recoveryEmail = :email',
      { orderNo, email },
    );
  } else {
    return sendJson(res, 400, { error: 'QUERY_CREDENTIAL_REQUIRED' });
  }

  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });
  return sendJson(res, 200, { order: await hydrateOrder(order) });
}

async function handleGetOrder(req, res, url) {
  const orderNo = url.pathname.split('/').pop();
  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });
  return sendJson(res, 200, { order: await hydrateOrder(order) });
}

function isAdmin(req) {
  if (!adminPassword) return false;
  return req.headers['x-admin-password'] === adminPassword;
}

function requireAdmin(req, res) {
  if (isAdmin(req)) return true;
  sendJson(res, 401, { error: 'ADMIN_UNAUTHORIZED' });
  return false;
}

async function handleAdminLogin(req, res) {
  if (!adminPassword) return sendJson(res, 503, { error: 'ADMIN_PASSWORD_NOT_CONFIGURED' });
  const body = await readJson(req);
  const password = String(body.password || '');
  if (password !== adminPassword) return sendJson(res, 401, { error: 'ADMIN_UNAUTHORIZED' });
  return sendJson(res, 200, { ok: true });
}

async function handleAdminOrders(req, res, url) {
  if (!requireAdmin(req, res)) return null;

  const keyword = String(url.searchParams.get('search') || '').trim().toLowerCase();
  const rows = await all('SELECT * FROM orders ORDER BY id DESC LIMIT 200');
  const orders = (await Promise.all(rows.map(hydrateOrder)))
    .filter((order) => {
      if (!keyword) return true;
      return [
        order.orderNo,
        order.recoveryEmail,
        order.course?.title,
        order.courseId,
      ].some((value) => String(value || '').toLowerCase().includes(keyword));
    });

  return sendJson(res, 200, { orders });
}

async function handleAdminOrder(req, res, orderNo) {
  if (!requireAdmin(req, res)) return null;
  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });
  return sendJson(res, 200, { order: await hydrateOrder(order) });
}

async function handleAdminEvents(req, res, orderNo) {
  if (!requireAdmin(req, res)) return null;
  const rows = await all(
    'SELECT * FROM payment_events WHERE orderNo = :orderNo ORDER BY id DESC LIMIT 100',
    { orderNo },
  );
  return sendJson(res, 200, { events: rows.map(hydratePaymentEvent) });
}

async function handleAdminRedeliver(req, res, orderNo) {
  if (!requireAdmin(req, res)) return null;
  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });

  if (order.paymentStatus !== 'paid') {
    return sendJson(res, 409, { error: 'ORDER_NOT_PAID' });
  }

  await createDelivery(order);
  await run(
    `UPDATE orders SET deliveryStatus = 'delivered' WHERE orderNo = :orderNo`,
    { orderNo },
  );
  await run(
    `INSERT INTO support_tickets (orderNo, type, note, status, createdAt)
     VALUES (:orderNo, 'redeliver', 'Manual course material redelivery from admin', 'closed', :createdAt)`,
    { orderNo, createdAt: new Date().toISOString() },
  );

  const updated = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  return sendJson(res, 200, { order: await hydrateOrder(updated) });
}

async function handleAdminStatus(req, res, orderNo) {
  if (!requireAdmin(req, res)) return null;
  const body = await readJson(req);
  const status = String(body.status || '');
  const allowed = new Set(['refunded', 'failed']);
  if (!allowed.has(status)) return sendJson(res, 400, { error: 'INVALID_STATUS' });

  const order = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  if (!order) return sendJson(res, 404, { error: 'ORDER_NOT_FOUND' });

  await run(
    `UPDATE orders
     SET status = :status, paymentStatus = :paymentStatus
     WHERE orderNo = :orderNo`,
    {
      orderNo,
      status,
      paymentStatus: status === 'refunded' ? 'refunded' : 'failed',
    },
  );
  if (status === 'refunded') {
    await run(
      `INSERT INTO refunds (orderNo, amount, reason, status, createdAt)
       VALUES (:orderNo, :amount, :reason, 'succeeded', :createdAt)`,
      {
        orderNo,
        amount: order.amount,
        reason: 'Manual refund mark from admin',
        createdAt: new Date().toISOString(),
      },
    );
  }

  const updated = await get('SELECT * FROM orders WHERE orderNo = :orderNo', { orderNo });
  return sendJson(res, 200, { order: await hydrateOrder(updated) });
}

async function handleAdminRoute(req, res, url) {
  const parts = url.pathname.split('/').filter(Boolean);
  const orderNo = parts[3] || '';
  const action = parts[4] || '';

  if (req.method === 'POST' && url.pathname === '/api/admin/login') return handleAdminLogin(req, res);
  if (req.method === 'GET' && url.pathname === '/api/admin/orders') return handleAdminOrders(req, res, url);
  if (req.method === 'GET' && parts.length === 4 && parts[2] === 'orders') return handleAdminOrder(req, res, orderNo);
  if (req.method === 'GET' && action === 'events') return handleAdminEvents(req, res, orderNo);
  if (req.method === 'POST' && action === 'redeliver') return handleAdminRedeliver(req, res, orderNo);
  if (req.method === 'POST' && action === 'status') return handleAdminStatus(req, res, orderNo);

  return sendJson(res, 404, { error: 'NOT_FOUND' });
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') return sendJson(res, 204, {});
    if (url.pathname.startsWith('/api/admin/')) return await handleAdminRoute(req, res, url);
    if (req.method === 'POST' && url.pathname === '/api/orders') return await handleCreateOrder(req, res);
    if (req.method === 'POST' && url.pathname === '/api/payments/create') return await handleCreatePayment(req, res);
    if (req.method === 'POST' && url.pathname === '/api/payments/mock-complete') return await handleMockComplete(req, res);
    if (req.method === 'POST' && url.pathname === '/api/payments/webhook') return await handleWebhook(req, res);
    if (req.method === 'POST' && url.pathname === '/api/payments/antom-sandbox/create') return await handleCreateAntomSandboxPayment(req, res);
    if (req.method === 'POST' && url.pathname === '/api/payments/antom-sandbox/webhook') return await handleAntomWebhook(req, res, url);
    if (req.method === 'GET' && url.pathname === '/api/orders/query') return await handleQuery(req, res, url);
    if (req.method === 'GET' && url.pathname.startsWith('/api/orders/')) return await handleGetOrder(req, res, url);
    if (req.method === 'GET' && url.pathname === '/api/health') return sendJson(res, 200, { ok: true });

    return sendStatic(req, res, url);
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: 'INTERNAL_ERROR' });
  }
});

await initDb();

server.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
});

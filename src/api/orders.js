const jsonHeaders = { 'Content-Type': 'application/json' };

async function request(path, options = {}) {
  const response = await fetch(path, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'API_REQUEST_FAILED');
  }
  return data;
}

export async function createOrder({ courseId, recoveryEmail }) {
  const data = await request('/api/orders', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ courseId, recoveryEmail }),
  });
  return data.order;
}

export async function createMockPayment(orderNo) {
  return request('/api/payments/create', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ orderNo }),
  });
}

export async function completeMockPayment(orderNo) {
  const data = await request('/api/payments/mock-complete', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ orderNo }),
  });
  return data.order;
}

export async function getOrder(orderNo) {
  const data = await request(`/api/orders/${orderNo}`);
  return data.order;
}

export async function queryOrderByPickupCode({ orderNo, pickupCode }) {
  const params = new URLSearchParams({ orderNo, pickupCode });
  const data = await request(`/api/orders/query?${params.toString()}`);
  return data.order;
}

export async function queryOrderByEmail({ orderNo, email }) {
  const params = new URLSearchParams({ orderNo, email });
  const data = await request(`/api/orders/query?${params.toString()}`);
  return data.order;
}

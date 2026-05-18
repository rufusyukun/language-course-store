const jsonHeaders = { 'Content-Type': 'application/json' };

async function request(path, options = {}) {
  const response = await fetch(path, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'API_REQUEST_FAILED');
  }
  return data;
}

function authHeaders(password) {
  return { ...jsonHeaders, 'X-Admin-Password': password };
}

export async function adminLogin(password) {
  return request('/api/admin/login', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ password }),
  });
}

export async function fetchAdminOrders({ password, search = '' }) {
  const params = new URLSearchParams();
  if (search.trim()) params.set('search', search.trim());
  const suffix = params.toString() ? `?${params.toString()}` : '';
  const data = await request(`/api/admin/orders${suffix}`, {
    headers: authHeaders(password),
  });
  return data.orders;
}

export async function fetchAdminOrder({ password, orderNo }) {
  const data = await request(`/api/admin/orders/${orderNo}`, {
    headers: authHeaders(password),
  });
  return data.order;
}

export async function fetchPaymentEvents({ password, orderNo }) {
  const data = await request(`/api/admin/orders/${orderNo}/events`, {
    headers: authHeaders(password),
  });
  return data.events;
}

export async function redeliverOrder({ password, orderNo }) {
  const data = await request(`/api/admin/orders/${orderNo}/redeliver`, {
    method: 'POST',
    headers: authHeaders(password),
  });
  return data.order;
}

export async function markOrderStatus({ password, orderNo, status }) {
  const data = await request(`/api/admin/orders/${orderNo}/status`, {
    method: 'POST',
    headers: authHeaders(password),
    body: JSON.stringify({ status }),
  });
  return data.order;
}

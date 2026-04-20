import { getApiBaseUrl } from '../config/api';

const TOKEN_KEY = 'shopsmart_token';

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const base = getApiBaseUrl();
  const { token: tokenOpt, ...fetchOpts } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...fetchOpts.headers,
  };
  const token = tokenOpt !== undefined ? tokenOpt : getStoredToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${base}${path}`, {
    ...fetchOpts,
    headers,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = json.message || json.error || `Request failed: ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.body = json;
    throw err;
  }

  return json;
}

export function fetchHealth() {
  return request('/api/health');
}

export function fetchProducts(params = {}) {
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  if (params.search) q.set('search', params.search);
  const suffix = q.toString() ? `?${q}` : '';
  return request(`/api/products${suffix}`);
}

export function authRegister({ email, password, name }) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
    token: null,
  });
}

export function authLogin({ email, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    token: null,
  });
}

export function authMe() {
  return request('/api/auth/me');
}

export function cartGet() {
  return request('/api/cart');
}

export function cartAddItem(productId, quantity = 1) {
  return request('/api/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export function cartUpdateItem(productId, quantity) {
  return request(`/api/cart/items/${productId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export function cartRemoveItem(productId) {
  return request(`/api/cart/items/${productId}`, {
    method: 'DELETE',
  });
}

export function ordersCheckout(payload) {
  return request('/api/orders/checkout', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function ordersList() {
  return request('/api/orders');
}

export function ordersGet(id) {
  return request(`/api/orders/${id}`);
}

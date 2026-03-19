import { getApiBaseUrl } from '../config/api';

async function request(path, options = {}) {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  return res.json();
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

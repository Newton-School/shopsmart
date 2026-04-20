/** Base URL for Shopsmart API. Empty in dev — Vite proxies `/api` to the backend. */
export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL || '';
}

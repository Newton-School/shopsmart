/** Base URL for API calls. Empty in dev uses Vite proxy to backend. */
export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL || '';
}

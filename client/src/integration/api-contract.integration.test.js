// @vitest-environment node
/**
 * Frontend ↔ backend integration: raw HTTP to the API (same paths the Vite app uses via /api proxy).
 *
 * Start the API first:  cd server && npm run dev
 * Run:  cd client && SHOPSMART_INTEGRATION=1 npm run test:integration
 *
 * Optional: SHOPSMART_API_URL=http://127.0.0.1:5001
 */
import { describe, it, expect } from 'vitest';

const BASE = process.env.SHOPSMART_API_URL || 'http://127.0.0.1:5001';
const enabled = process.env.SHOPSMART_INTEGRATION === '1';

async function readJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

(enabled ? describe : describe.skip)('Storefront API contract (HTTP)', () => {
  it('GET /api/health — same shape the header / useHealth expects', async () => {
    const res = await fetch(`${BASE}/api/health`);
    expect(res.status).toBe(200);
    const body = await readJson(res);
    expect(body.status).toBe('ok');
    expect(typeof body.message).toBe('string');
    expect(body.timestamp).toBeDefined();
  });

  it('GET /api/products — same envelope ProductList / useProducts consume', async () => {
    const res = await fetch(`${BASE}/api/products`);
    expect(res.status).toBe(200);
    const body = await readJson(res);
    expect(body.status).toBe('success');
    expect(Array.isArray(body.data)).toBe(true);
    expect(typeof body.count).toBe('number');
    if (body.data.length > 0) {
      const p = body.data[0];
      expect(p).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
        category: expect.any(String),
        inStock: expect.any(Boolean),
      });
    }
  });

  it('auth error JSON — same shape api.js throws from (message field)', async () => {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'not-a-real-user@shopsmart.test', password: 'wrongpass' }),
    });
    expect(res.status).toBe(401);
    const body = await readJson(res);
    expect(body.status).toBe('error');
    expect(typeof body.message).toBe('string');
  });

  it('POST /api/auth/register validation — same errors RegisterPage surfaces', async () => {
    const res = await fetch(`${BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'not-an-email', password: '123', name: '  ' }),
    });
    expect(res.status).toBe(400);
    const body = await readJson(res);
    expect(body.status).toBe('error');
    expect(typeof body.message).toBe('string');
  });
});

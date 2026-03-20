import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getStoredToken,
  setStoredToken,
  fetchHealth,
  fetchProducts,
  authRegister,
  authLogin,
  authMe,
  cartGet,
  cartAddItem,
  cartUpdateItem,
  cartRemoveItem,
  ordersCheckout,
  ordersList,
  ordersGet,
} from './api';

vi.mock('../config/api', () => ({
  getApiBaseUrl: () => '',
}));

function mockFetchOk(data) {
  globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(data) }));
}

function mockFetchFail(status, body = {}) {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: false,
      status,
      json: () => Promise.resolve(body),
    })
  );
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('token storage', () => {
  it('stores and retrieves a token', () => {
    expect(getStoredToken()).toBeNull();
    setStoredToken('abc');
    expect(getStoredToken()).toBe('abc');
  });

  it('removes token when null is passed', () => {
    setStoredToken('abc');
    setStoredToken(null);
    expect(getStoredToken()).toBeNull();
  });
});

describe('request helper (via fetchHealth)', () => {
  it('returns parsed JSON on success', async () => {
    mockFetchOk({ status: 'ok' });
    const result = await fetchHealth();
    expect(result.status).toBe('ok');
  });

  it('throws on non-ok response', async () => {
    mockFetchFail(500, { message: 'Server error' });
    await expect(fetchHealth()).rejects.toThrow('Server error');
  });

  it('attaches stored token as Authorization header', async () => {
    setStoredToken('my-jwt');
    mockFetchOk({});
    await fetchHealth();
    const [, opts] = globalThis.fetch.mock.calls[0];
    expect(opts.headers.Authorization).toBe('Bearer my-jwt');
  });
});

describe('fetchProducts', () => {
  it('calls /api/products with no params', async () => {
    mockFetchOk({ data: [] });
    await fetchProducts();
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/products', expect.anything());
  });

  it('appends category query param', async () => {
    mockFetchOk({ data: [] });
    await fetchProducts({ category: 'Electronics' });
    const url = globalThis.fetch.mock.calls[0][0];
    expect(url).toContain('category=Electronics');
  });
});

describe('auth endpoints', () => {
  it('authRegister POSTs to /api/auth/register without token', async () => {
    setStoredToken('existing');
    mockFetchOk({ data: { user: {}, token: 'new' } });
    await authRegister({ email: 'a@b.com', password: '123456', name: 'Jo' });
    const [url, opts] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('/api/auth/register');
    expect(opts.method).toBe('POST');
    expect(opts.headers.Authorization).toBeUndefined();
  });

  it('authLogin POSTs to /api/auth/login without token', async () => {
    mockFetchOk({ data: { user: {}, token: 't' } });
    await authLogin({ email: 'a@b.com', password: 'secret' });
    const [url, opts] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('/api/auth/login');
    expect(opts.headers.Authorization).toBeUndefined();
  });

  it('authMe GETs /api/auth/me with token', async () => {
    setStoredToken('jwt');
    mockFetchOk({ data: { id: 1 } });
    await authMe();
    const [url, opts] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('/api/auth/me');
    expect(opts.headers.Authorization).toBe('Bearer jwt');
  });
});

describe('cart endpoints', () => {
  beforeEach(() => setStoredToken('t'));

  it('cartGet GETs /api/cart', async () => {
    mockFetchOk({ data: { items: [], total: 0 } });
    await cartGet();
    expect(globalThis.fetch.mock.calls[0][0]).toBe('/api/cart');
  });

  it('cartAddItem POSTs to /api/cart/items', async () => {
    mockFetchOk({ data: {} });
    await cartAddItem(5, 2);
    const [url, opts] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('/api/cart/items');
    expect(opts.method).toBe('POST');
    expect(JSON.parse(opts.body)).toEqual({ productId: 5, quantity: 2 });
  });

  it('cartUpdateItem PATCHes /api/cart/items/:id', async () => {
    mockFetchOk({ data: {} });
    await cartUpdateItem(3, 10);
    const [url, opts] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('/api/cart/items/3');
    expect(opts.method).toBe('PATCH');
  });

  it('cartRemoveItem DELETEs /api/cart/items/:id', async () => {
    mockFetchOk({ data: {} });
    await cartRemoveItem(7);
    const [url, opts] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('/api/cart/items/7');
    expect(opts.method).toBe('DELETE');
  });
});

describe('order endpoints', () => {
  beforeEach(() => setStoredToken('t'));

  it('ordersCheckout POSTs to /api/orders/checkout', async () => {
    mockFetchOk({ data: { id: 1 } });
    await ordersCheckout({ shippingName: 'Jo' });
    const [url, opts] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('/api/orders/checkout');
    expect(opts.method).toBe('POST');
  });

  it('ordersList GETs /api/orders', async () => {
    mockFetchOk({ data: [] });
    await ordersList();
    expect(globalThis.fetch.mock.calls[0][0]).toBe('/api/orders');
  });

  it('ordersGet GETs /api/orders/:id', async () => {
    mockFetchOk({ data: { id: 42 } });
    await ordersGet(42);
    expect(globalThis.fetch.mock.calls[0][0]).toBe('/api/orders/42');
  });
});

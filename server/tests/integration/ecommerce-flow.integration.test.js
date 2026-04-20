/**
 * Integration tests: Express API + Prisma + MySQL (real DB).
 *
 * Run from server/:  SHOPSMART_INTEGRATION=1 npm run test:integration
 * Requires DATABASE_URL in .env and migrations applied (prisma migrate deploy).
 * Env is loaded by tests/integration/jest.setup.js
 */
const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/lib/prisma');

const enabled =
  process.env.SHOPSMART_INTEGRATION === '1' &&
  Boolean(process.env.DATABASE_URL && String(process.env.DATABASE_URL).trim());

(enabled ? describe : describe.skip)('API + database — e-commerce flow', () => {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const email = `integration-${suffix}@shopsmart.test`;
  let productId;
  let token;
  let userId;
  let orderId;

  afterAll(async () => {
    if (!enabled) return;
    try {
      if (userId) {
        await prisma.order.deleteMany({ where: { userId } });
        await prisma.cartItem.deleteMany({ where: { userId } });
        await prisma.user.deleteMany({ where: { id: userId } });
      }
      if (productId) {
        await prisma.product.deleteMany({ where: { id: productId } });
      }
    } catch (e) {
      console.error('Integration cleanup failed:', e.message);
    } finally {
      await prisma.$disconnect();
    }
  });

  it('persists product → user → cart lines → order (matches real checkout data flow)', async () => {
    const createProduct = await request(app)
      .post('/api/products')
      .send({
        name: `Integration SKU ${suffix}`,
        description: 'Created by integration test',
        price: 24.99,
        category: 'Test',
        inStock: true,
      });
    expect(createProduct.status).toBe(201);
    expect(createProduct.body.status).toBe('success');
    productId = createProduct.body.data.id;

    const register = await request(app)
      .post('/api/auth/register')
      .send({ email, password: 'password1', name: 'Integration Shopper' });
    expect(register.status).toBe(201);
    token = register.body.data.token;
    userId = register.body.data.user.id;
    expect(typeof token).toBe('string');

    const addCart = await request(app)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 2 });
    expect(addCart.status).toBe(201);
    expect(addCart.body.data.items).toHaveLength(1);
    expect(addCart.body.data.items[0].quantity).toBe(2);
    expect(addCart.body.data.total).toBeCloseTo(49.98, 2);

    const getCart = await request(app).get('/api/cart').set('Authorization', `Bearer ${token}`);
    expect(getCart.status).toBe(200);
    expect(getCart.body.data.total).toBeCloseTo(49.98, 2);

    const checkout = await request(app)
      .post('/api/orders/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        shippingName: 'Integration Ship',
        shippingLine1: '99 Test Lane',
        shippingCity: 'Test City',
        shippingPostal: '10001',
      });
    expect(checkout.status).toBe(201);
    orderId = checkout.body.data.id;
    expect(checkout.body.data.items.length).toBeGreaterThanOrEqual(1);
    expect(checkout.body.data.total).toBeCloseTo(49.98, 2);

    const cartCleared = await request(app).get('/api/cart').set('Authorization', `Bearer ${token}`);
    expect(cartCleared.body.data.items).toHaveLength(0);
    expect(cartCleared.body.data.total).toBe(0);

    const fromDb = await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { items: true },
    });
    expect(fromDb).not.toBeNull();
    expect(fromDb.items).toHaveLength(1);
    expect(fromDb.items[0].quantity).toBe(2);
    expect(fromDb.items[0].price).toBeCloseTo(24.99, 2);
    expect(fromDb.shippingCity).toBe('Test City');

    const listOrders = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(listOrders.status).toBe(200);
    expect(Array.isArray(listOrders.body.data)).toBe(true);
    expect(listOrders.body.data.some((o) => o.id === orderId)).toBe(true);

    const getOrder = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(getOrder.status).toBe(200);
    expect(getOrder.body.data.id).toBe(orderId);
  });

  it('rejects checkout with empty cart (realistic guard)', async () => {
    const suffix2 = `${Date.now()}-empty-${Math.random().toString(36).slice(2, 8)}`;
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ email: `empty-${suffix2}@shopsmart.test`, password: 'password1', name: 'No Cart' });
    expect(reg.status).toBe(201);
    const t = reg.body.data.token;
    const uid = reg.body.data.user.id;

    const checkout = await request(app)
      .post('/api/orders/checkout')
      .set('Authorization', `Bearer ${t}`)
      .send({
        shippingName: 'X',
        shippingLine1: 'Y',
        shippingCity: 'Z',
        shippingPostal: '00000',
      });
    expect(checkout.status).toBe(400);
    expect(checkout.body.message).toMatch(/empty/i);

    await prisma.cartItem.deleteMany({ where: { userId: uid } });
    await prisma.order.deleteMany({ where: { userId: uid } });
    await prisma.user.deleteMany({ where: { id: uid } });
  });
});

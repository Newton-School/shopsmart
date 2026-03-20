const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/lib/prisma');

jest.mock('../../src/lib/prisma', () => ({
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const SAMPLE = {
  id: 1,
  name: 'Widget',
  description: 'Nice widget',
  price: 19.99,
  category: 'Gadgets',
  inStock: true,
  imageUrl: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

afterEach(() => jest.clearAllMocks());

describe('GET /api/products', () => {
  it('returns the full product list', async () => {
    prisma.product.findMany.mockResolvedValue([SAMPLE]);
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe('Widget');
    expect(res.body.count).toBe(1);
  });

  it('returns empty array when no products', async () => {
    prisma.product.findMany.mockResolvedValue([]);
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.count).toBe(0);
  });

  it('forwards category filter to Prisma', async () => {
    prisma.product.findMany.mockResolvedValue([]);
    await request(app).get('/api/products?category=Electronics');
    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ category: 'Electronics' }),
      })
    );
  });
});

describe('GET /api/products/:id', () => {
  it('returns a product by id', async () => {
    prisma.product.findUnique.mockResolvedValue(SAMPLE);
    const res = await request(app).get('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Widget');
  });

  it('returns 404 when product not found', async () => {
    prisma.product.findUnique.mockResolvedValue(null);
    const res = await request(app).get('/api/products/999');
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });

  it('returns 400 for non-numeric id', async () => {
    const res = await request(app).get('/api/products/abc');
    expect(res.status).toBe(400);
  });
});

describe('POST /api/products', () => {
  it('creates a product with valid data', async () => {
    prisma.product.create.mockResolvedValue({ ...SAMPLE, id: 2 });
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Widget', price: 19.99, category: 'Gadgets' });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/products').send({ name: 'NoPrice' });
    expect(res.status).toBe(400);
  });
});

describe('PUT /api/products/:id', () => {
  it('updates an existing product', async () => {
    prisma.product.findUnique.mockResolvedValue(SAMPLE);
    prisma.product.update.mockResolvedValue({ ...SAMPLE, name: 'Updated' });
    const res = await request(app)
      .put('/api/products/1')
      .send({ name: 'Updated', price: 29.99, category: 'Gadgets' });
    expect(res.status).toBe(200);
  });

  it('returns 404 when product does not exist', async () => {
    prisma.product.findUnique.mockResolvedValue(null);
    const res = await request(app)
      .put('/api/products/999')
      .send({ name: 'X', price: 1, category: 'Y' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/products/:id', () => {
  it('deletes an existing product', async () => {
    prisma.product.findUnique.mockResolvedValue(SAMPLE);
    prisma.product.delete.mockResolvedValue(SAMPLE);
    const res = await request(app).delete('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  it('returns 404 when product does not exist', async () => {
    prisma.product.findUnique.mockResolvedValue(null);
    const res = await request(app).delete('/api/products/999');
    expect(res.status).toBe(404);
  });
});

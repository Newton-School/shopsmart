const request = require('supertest');
const app = require('../src/app');

describe('ShopSmart Backend API Tests', () => {
    
    describe('GET /api/health', () => {
        it('should return 200 and status ok', async () => {
            const res = await request(app).get('/api/health');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'ok');
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const res = await request(app).get('/api/products');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/products/:id', () => {
        it('should return a product by ID', async () => {
            const res = await request(app).get('/api/products/1');
            expect(res.statusCode).toEqual(200);
            expect(res.body.id).toEqual(1);
            expect(res.body).toHaveProperty('name');
        });

        it('should return 404 if product is not found', async () => {
            const res = await request(app).get('/api/products/999');
            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toEqual('Product not found');
        });
    });

    describe('GET /', () => {
        it('should return the root message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toEqual('ShopSmart Backend Service');
        });
    });
});


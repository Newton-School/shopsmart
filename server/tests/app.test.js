const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('GET /api/health', () => {
    it('should return 200 status code', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).to.equal(200);
    });

    it('should return status ok', async () => {
        const res = await request(app).get('/api/health');
        expect(res.body).to.have.property('status', 'ok');
    });

    it('should return a message', async () => {
        const res = await request(app).get('/api/health');
        expect(res.body).to.have.property('message').that.is.a('string');
    });

    it('should return a valid timestamp', async () => {
        const res = await request(app).get('/api/health');
        expect(res.body).to.have.property('timestamp');
        const date = new Date(res.body.timestamp);
        expect(date.toString()).to.not.equal('Invalid Date');
    });
});

describe('GET /', () => {
    it('should return 200 status code', async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);
    });

    it('should return the service name text', async () => {
        const res = await request(app).get('/');
        expect(res.text).to.equal('ShopSmart Backend Service');
    });
});

describe('GET /api/products', () => {
    it('should return 200 status code', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).to.equal(200);
    });

    it('should return an array of products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.body).to.be.an('array');
    });

    it('should return exactly 4 products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.body).to.have.lengthOf(4);
    });

    it('should have correct properties on each product', async () => {
        const res = await request(app).get('/api/products');
        res.body.forEach((product) => {
            expect(product).to.have.all.keys('id', 'name', 'price', 'category');
        });
    });

    it('should return correct first product', async () => {
        const res = await request(app).get('/api/products');
        expect(res.body[0]).to.deep.equal({
            id: 1,
            name: 'Wireless Headphones',
            price: 99.99,
            category: 'Electronics',
        });
    });

    it('should have numeric prices for all products', async () => {
        const res = await request(app).get('/api/products');
        res.body.forEach((product) => {
            expect(product.price).to.be.a('number');
        });
    });
});

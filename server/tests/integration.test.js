const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('Integration: Middleware Chain', () => {
    it('should include CORS headers on API responses', async () => {
        const res = await request(app).get('/api/health').set('Origin', 'http://localhost:3000');
        expect(res.headers).to.have.property('access-control-allow-origin');
    });

    it('should handle CORS preflight OPTIONS request', async () => {
        const res = await request(app)
            .options('/api/products')
            .set('Origin', 'http://localhost:3000')
            .set('Access-Control-Request-Method', 'GET');
        expect(res.status).to.equal(204);
        expect(res.headers).to.have.property('access-control-allow-origin');
    });

    it('should return application/json content-type for /api/health', async () => {
        const res = await request(app).get('/api/health');
        expect(res.headers['content-type']).to.match(/application\/json/);
    });

    it('should return application/json content-type for /api/products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.headers['content-type']).to.match(/application\/json/);
    });

    it('should return 404 for non-existent API routes', async () => {
        const res = await request(app).get('/api/unknown');
        expect(res.status).to.equal(404);
    });

    it('should return 404 for non-existent pages', async () => {
        const res = await request(app).get('/nonexistent');
        expect(res.status).to.equal(404);
    });
});

describe('Integration: Cross-Route Interactions', () => {
    it('should serve health and products consistently in sequence', async () => {
        const healthRes = await request(app).get('/api/health');
        const productsRes = await request(app).get('/api/products');

        expect(healthRes.status).to.equal(200);
        expect(healthRes.body.status).to.equal('ok');

        expect(productsRes.status).to.equal(200);
        expect(productsRes.body).to.be.an('array').with.lengthOf(4);
    });

    it('should not leak state between sequential requests', async () => {
        const firstProducts = await request(app).get('/api/products');
        const secondProducts = await request(app).get('/api/products');

        expect(firstProducts.body).to.deep.equal(secondProducts.body);
    });

    it('should serve root page and API routes independently', async () => {
        const rootRes = await request(app).get('/');
        const apiRes = await request(app).get('/api/health');

        expect(rootRes.headers['content-type']).to.match(/text\/html/);
        expect(apiRes.headers['content-type']).to.match(/application\/json/);
    });

    it('should return valid ISO timestamp that is recent', async () => {
        const before = new Date();
        const res = await request(app).get('/api/health');
        const after = new Date();

        const timestamp = new Date(res.body.timestamp);
        expect(timestamp.getTime()).to.be.at.least(before.getTime());
        expect(timestamp.getTime()).to.be.at.most(after.getTime());
    });

    it('should have consistent product data structure across requests', async () => {
        const res = await request(app).get('/api/products');
        const requiredKeys = ['id', 'name', 'price', 'category'];

        res.body.forEach((product) => {
            requiredKeys.forEach((key) => {
                expect(product).to.have.property(key);
            });
            expect(product.id).to.be.a('number');
            expect(product.name).to.be.a('string').that.is.not.empty;
            expect(product.price).to.be.a('number').that.is.greaterThan(0);
            expect(product.category).to.be.a('string').that.is.not.empty;
        });
    });
});

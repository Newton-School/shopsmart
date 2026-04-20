const { validateProduct } = require('../../src/middleware/validate');

describe('validateProduct', () => {
  it('passes with valid name, price, and category', () => {
    const req = { body: { name: 'Widget', price: 9.99, category: 'Gadgets' } };
    const next = jest.fn();
    validateProduct(req, {}, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('fails when name is missing', () => {
    const req = { body: { price: 5, category: 'Misc' } };
    const next = jest.fn();
    validateProduct(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toMatch(/name/i);
  });

  it('fails when price is negative', () => {
    const req = { body: { name: 'A', price: -1, category: 'B' } };
    const next = jest.fn();
    validateProduct(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toMatch(/price/i);
  });

  it('fails when price is not a number', () => {
    const req = { body: { name: 'A', price: 'free', category: 'B' } };
    const next = jest.fn();
    validateProduct(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
  });

  it('fails when category is missing', () => {
    const req = { body: { name: 'A', price: 5 } };
    const next = jest.fn();
    validateProduct(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toMatch(/category/i);
  });

  it('reports multiple errors at once', () => {
    const req = { body: {} };
    const next = jest.fn();
    validateProduct(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.message).toMatch(/name/i);
    expect(err.message).toMatch(/price/i);
    expect(err.message).toMatch(/category/i);
  });
});

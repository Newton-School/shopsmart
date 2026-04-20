const { requireAuth } = require('../../src/middleware/auth');
const { signToken } = require('../../src/lib/jwt');

describe('requireAuth middleware', () => {
  it('calls next with 401 error when no Authorization header', () => {
    const req = { headers: {} };
    const next = jest.fn();
    requireAuth(req, {}, next);
    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(401);
    expect(err.message).toMatch(/authentication required/i);
  });

  it('calls next with 401 when header is not Bearer', () => {
    const req = { headers: { authorization: 'Basic abc123' } };
    const next = jest.fn();
    requireAuth(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(401);
  });

  it('calls next with 401 for an invalid token', () => {
    const req = { headers: { authorization: 'Bearer bad.token.here' } };
    const next = jest.fn();
    requireAuth(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(401);
    expect(err.message).toMatch(/invalid or expired/i);
  });

  it('sets req.userId and calls next() for a valid token', () => {
    const token = signToken(55);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const next = jest.fn();
    requireAuth(req, {}, next);
    expect(req.userId).toBe(55);
    expect(next).toHaveBeenCalledWith();
  });
});

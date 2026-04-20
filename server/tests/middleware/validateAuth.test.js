const { validateRegister, validateLogin } = require('../../src/middleware/validateAuth');

describe('validateRegister', () => {
  it('passes when all fields are valid', () => {
    const req = { body: { email: 'a@b.com', password: '123456', name: 'Jo' } };
    const next = jest.fn();
    validateRegister(req, {}, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('fails without email', () => {
    const req = { body: { password: '123456', name: 'Jo' } };
    const next = jest.fn();
    validateRegister(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toMatch(/email/i);
  });

  it('fails when email has no @', () => {
    const req = { body: { email: 'invalid', password: '123456', name: 'Jo' } };
    const next = jest.fn();
    validateRegister(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
  });

  it('fails when password is too short', () => {
    const req = { body: { email: 'a@b.com', password: '123', name: 'Jo' } };
    const next = jest.fn();
    validateRegister(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toMatch(/password/i);
  });

  it('fails when name is empty', () => {
    const req = { body: { email: 'a@b.com', password: '123456', name: '  ' } };
    const next = jest.fn();
    validateRegister(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
    expect(err.message).toMatch(/name/i);
  });

  it('collects multiple errors', () => {
    const req = { body: {} };
    const next = jest.fn();
    validateRegister(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.message).toMatch(/email/i);
    expect(err.message).toMatch(/password/i);
    expect(err.message).toMatch(/name/i);
  });
});

describe('validateLogin', () => {
  it('passes with email and password', () => {
    const req = { body: { email: 'a@b.com', password: 'secret' } };
    const next = jest.fn();
    validateLogin(req, {}, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('fails without email', () => {
    const req = { body: { password: 'secret' } };
    const next = jest.fn();
    validateLogin(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
  });

  it('fails without password', () => {
    const req = { body: { email: 'a@b.com' } };
    const next = jest.fn();
    validateLogin(req, {}, next);
    const err = next.mock.calls[0][0];
    expect(err.statusCode).toBe(400);
  });
});

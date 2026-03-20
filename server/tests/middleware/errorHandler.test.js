const { AppError, errorHandler, notFoundHandler } = require('../../src/middleware/errorHandler');

function mockRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      res.statusCode = code;
      return res;
    },
    json(data) {
      res.body = data;
      return res;
    },
  };
  return res;
}

describe('AppError', () => {
  it('creates an error with message and statusCode', () => {
    const err = new AppError('Not found', 404);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Not found');
    expect(err.statusCode).toBe(404);
    expect(err.isOperational).toBe(true);
  });
});

describe('errorHandler', () => {
  it('responds with the operational error message and status', () => {
    const err = new AppError('Bad request', 400);
    const res = mockRes();
    errorHandler(err, {}, res, () => {});
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Bad request');
  });

  it('hides non-operational error details and defaults to 500', () => {
    const err = new Error('db crash');
    const res = mockRes();
    const origLog = console.error;
    console.error = jest.fn();
    errorHandler(err, {}, res, () => {});
    console.error = origLog;
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });

  it('includes stack in development mode', () => {
    const origEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const err = new AppError('dev error', 422);
    const res = mockRes();
    errorHandler(err, {}, res, () => {});
    expect(res.body.stack).toBeDefined();
    process.env.NODE_ENV = origEnv;
  });
});

describe('notFoundHandler', () => {
  it('calls next with a 404 AppError containing the URL', () => {
    const next = jest.fn();
    notFoundHandler({ originalUrl: '/api/missing' }, {}, next);
    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(404);
    expect(err.message).toContain('/api/missing');
  });
});

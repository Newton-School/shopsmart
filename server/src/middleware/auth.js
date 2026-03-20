const { verifyToken } = require('../lib/jwt');
const { AppError } = require('./errorHandler');

function requireAuth(req, _res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }
  const token = header.slice(7);
  try {
    const payload = verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
}

module.exports = { requireAuth };

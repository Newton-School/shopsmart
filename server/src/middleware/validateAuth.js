const { AppError } = require('./errorHandler');

const validateRegister = (req, _res, next) => {
  const { email, password, name } = req.body;
  const errors = [];
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push('Valid email is required');
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  if (!name || typeof name !== 'string' || name.trim().length < 1) {
    errors.push('Name is required');
  }
  if (errors.length) {
    return next(new AppError(errors.join('. '), 400));
  }
  next();
};

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }
  next();
};

module.exports = { validateRegister, validateLogin };

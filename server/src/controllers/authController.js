const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');
const { signToken } = require('../lib/jwt');
const { AppError } = require('../middleware/errorHandler');

const SALT_ROUNDS = 10;

function userResponse(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (existing) {
      return next(new AppError('Email already registered', 409));
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        passwordHash,
        name: name.trim(),
      },
    });
    const token = signToken(user.id);
    res.status(201).json({
      status: 'success',
      data: { user: userResponse(user), token },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return next(new AppError('Invalid email or password', 401));
    }
    const token = signToken(user.id);
    res.json({
      status: 'success',
      data: { user: userResponse(user), token },
    });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.json({ status: 'success', data: userResponse(user) });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, me };

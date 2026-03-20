const prisma = require('../lib/prisma');
const { AppError } = require('../middleware/errorHandler');

async function computeCartResponse(userId) {
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { id: 'asc' },
  });
  const lines = items.map((row) => ({
    id: row.id,
    quantity: row.quantity,
    product: row.product,
    lineTotal: row.quantity * row.product.price,
  }));
  const total = lines.reduce((s, l) => s + l.lineTotal, 0);
  return { items: lines, total };
}

const getCart = async (req, res, next) => {
  try {
    const data = await computeCartResponse(req.userId);
    res.json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

const addItem = async (req, res, next) => {
  try {
    const productId = parseInt(req.body.productId, 10);
    const quantity = Math.max(1, parseInt(req.body.quantity, 10) || 1);
    if (isNaN(productId)) {
      return next(new AppError('Invalid product', 400));
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    if (!product.inStock) {
      return next(new AppError('Product is out of stock', 400));
    }

    const userId = req.userId;
    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { userId, productId, quantity },
      });
    }

    const data = await computeCartResponse(userId);
    res.status(201).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    const quantity = parseInt(req.body.quantity, 10);
    if (isNaN(productId) || isNaN(quantity) || quantity < 1) {
      return next(new AppError('Invalid quantity', 400));
    }

    const userId = req.userId;
    const row = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (!row) {
      return next(new AppError('Cart item not found', 404));
    }

    await prisma.cartItem.update({
      where: { id: row.id },
      data: { quantity },
    });

    const data = await computeCartResponse(userId);
    res.json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    if (isNaN(productId)) {
      return next(new AppError('Invalid product', 400));
    }

    const userId = req.userId;
    await prisma.cartItem.deleteMany({
      where: { userId, productId },
    });

    const data = await computeCartResponse(userId);
    res.json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCart, addItem, updateItem, removeItem };

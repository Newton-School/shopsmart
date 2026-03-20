const prisma = require('../lib/prisma');
const { AppError } = require('../middleware/errorHandler');

const checkout = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { shippingName, shippingLine1, shippingCity, shippingPostal } = req.body;

    if (
      !shippingName?.trim() ||
      !shippingLine1?.trim() ||
      !shippingCity?.trim() ||
      !shippingPostal?.trim()
    ) {
      return next(new AppError('All shipping fields are required', 400));
    }

    const result = await prisma.$transaction(async (tx) => {
      const cartItems = await tx.cartItem.findMany({
        where: { userId },
        include: { product: true },
      });

      if (!cartItems.length) {
        throw new AppError('Cart is empty', 400);
      }

      let total = 0;
      const orderItemsCreate = [];

      for (const row of cartItems) {
        const p = row.product;
        if (!p.inStock) {
          continue;
        }
        const line = row.quantity * p.price;
        total += line;
        orderItemsCreate.push({
          productId: p.id,
          quantity: row.quantity,
          price: p.price,
          productName: p.name,
        });
      }

      if (!orderItemsCreate.length) {
        throw new AppError('No purchasable items in cart', 400);
      }

      const order = await tx.order.create({
        data: {
          userId,
          total,
          status: 'paid',
          shippingName: shippingName.trim(),
          shippingLine1: shippingLine1.trim(),
          shippingCity: shippingCity.trim(),
          shippingPostal: shippingPostal.trim(),
          items: {
            create: orderItemsCreate,
          },
        },
        include: { items: true },
      });

      await tx.cartItem.deleteMany({ where: { userId } });

      return order;
    });

    res.status(201).json({ status: 'success', data: result });
  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    }
    next(err);
  }
};

const listOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ status: 'success', data: orders });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return next(new AppError('Invalid order id', 400));
    }

    const order = await prisma.order.findFirst({
      where: { id, userId: req.userId },
      include: { items: true },
    });

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.json({ status: 'success', data: order });
  } catch (err) {
    next(err);
  }
};

module.exports = { checkout, listOrders, getOrder };

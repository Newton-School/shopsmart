const prisma = require('../lib/prisma');
const { AppError } = require('../middleware/errorHandler');

const getAllProducts = async (req, res, next) => {
  try {
    const { category, inStock, search } = req.query;

    const where = {};
    if (category) where.category = category;
    if (inStock !== undefined) where.inStock = inStock === 'true';
    if (search) {
      where.OR = [{ name: { contains: search } }, { description: { contains: search } }];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json({ status: 'success', data: products, count: products.length });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return next(new AppError('Invalid product ID', 400));

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return next(new AppError('Product not found', 404));

    res.json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, inStock, imageUrl } = req.body;

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        price,
        category: category.trim(),
        inStock: inStock !== undefined ? inStock : true,
        imageUrl: imageUrl?.trim() || null,
      },
    });

    res.status(201).json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return next(new AppError('Invalid product ID', 400));

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return next(new AppError('Product not found', 404));

    const { name, description, price, category, inStock, imageUrl } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(price !== undefined && { price }),
        ...(category !== undefined && { category: category.trim() }),
        ...(inStock !== undefined && { inStock }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl?.trim() || null }),
      },
    });

    res.json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return next(new AppError('Invalid product ID', 400));

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return next(new AppError('Product not found', 404));

    await prisma.product.delete({ where: { id } });

    res.json({ status: 'success', message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

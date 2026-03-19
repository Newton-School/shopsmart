const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 79.99,
    category: 'Electronics',
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/headphones/400/300',
  },
  {
    name: 'Organic Green Tea',
    description: 'Pack of 100 organic green tea bags sourced from Japan',
    price: 24.99,
    category: 'Groceries',
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/greentea/400/300',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight breathable running shoes with cushioned sole',
    price: 119.99,
    category: 'Sports',
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/shoes/400/300',
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated 750ml bottle keeps drinks cold for 24 hours',
    price: 34.99,
    category: 'Home',
    inStock: false,
    imageUrl: 'https://picsum.photos/seed/bottle/400/300',
  },
  {
    name: 'Programming in JavaScript',
    description: 'Comprehensive guide to modern JavaScript development',
    price: 49.99,
    category: 'Books',
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/jsbook/400/300',
  },
];

async function main() {
  console.log('Seeding database...');

  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (!existing) {
      await prisma.product.create({ data: product });
      console.log(`  Created: ${product.name}`);
    } else {
      console.log(`  Skipped (exists): ${product.name}`);
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

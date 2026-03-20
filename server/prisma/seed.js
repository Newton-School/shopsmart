const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Product images: local assets under client/public/images (served at /images/… in dev/build).
 * Others may use Unsplash URLs. Re-run: npm run db:seed
 */
const products = [
  {
    name: 'Ultra HD Webcam Pro',
    description: '1080p60 streaming, dual mics, privacy shutter—ideal for calls and content',
    price: 89.99,
    category: 'Electronics',
    inStock: true,
    imageUrl: '/images/digicam.png',
  },
  {
    name: 'Organic Cold Brew Coffee',
    description: '12-pack ready-to-drink, smooth Arabica blend',
    price: 28.5,
    category: 'Groceries',
    inStock: true,
    imageUrl: '/images/coffee.png',
  },
  {
    name: 'Trail Runner Pro Sneakers',
    description: 'Grippy outsole, cushioned midsole for road and light trail',
    price: 134.99,
    category: 'Sports',
    inStock: true,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'Smart Air Purifier',
    description: 'HEPA filter, quiet night mode, app scheduling for medium rooms',
    price: 249.0,
    category: 'Home',
    inStock: true,
    imageUrl: '/images/airpurifier.png',
  },
  {
    name: 'Ceramic Nonstick Pan Set',
    description: '3-piece induction-safe cookware with tempered glass lids',
    price: 159.99,
    category: 'Kitchen',
    inStock: true,
    imageUrl: '/images/ceramicpot.png',
  },
  {
    name: 'UV Water Bottle 32oz',
    description: 'Self-cleaning cap, vacuum insulated, keeps drinks cold 24h',
    price: 44.99,
    category: 'Home',
    inStock: false,
    imageUrl:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'Noise-Canceling Earbuds',
    description: 'Compact case, ANC, 8h playback + 24h with case',
    price: 129.99,
    category: 'Electronics',
    inStock: true,
    imageUrl:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'Performance Whey Protein',
    description: '2lb vanilla, 25g protein per serving, third-party tested',
    price: 42.99,
    category: 'Health',
    inStock: true,
    imageUrl: '/images/whey.png',
  },
];

async function main() {
  console.log('Seeding Shopsmart product catalog...');

  const legacyNames = [
    'Programming in JavaScript',
    'Wireless Bluetooth Headphones',
    'Organic Green Tea',
    'Running Shoes',
    'Stainless Steel Water Bottle',
    'Smart Fitness Watch',
    'Test Product',
  ];
  const removed = await prisma.product.deleteMany({
    where: { name: { in: legacyNames } },
  });
  if (removed.count) {
    console.log(`  Removed ${removed.count} legacy product row(s).`);
  }

  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    });
    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: product,
      });
      console.log(`  Updated: ${product.name}`);
    } else {
      await prisma.product.create({ data: product });
      console.log(`  Created: ${product.name}`);
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

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/novalux';

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  rating: Number,
  stock: Number,
  featured: Boolean
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const items = [
  {
    name: 'Aether Runner X',
    slug: 'aether-runner-x',
    description: 'Futuristic adaptive performance sneaker.',
    price: 289,
    category: 'Footwear',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200'],
    rating: 4.8,
    stock: 14,
    featured: true
  },
  {
    name: 'Neon Drift Jacket',
    slug: 'neon-drift-jacket',
    description: 'Thermoregulated jacket with reflective weave.',
    price: 420,
    category: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200'],
    rating: 4.7,
    stock: 8,
    featured: true
  },
  {
    name: 'Pulse Arc Headset',
    slug: 'pulse-arc-headset',
    description: 'Spatial audio headset with AI adaptation.',
    price: 560,
    category: 'Audio',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200'],
    rating: 4.9,
    stock: 22,
    featured: true
  }
];

(async () => {
  await mongoose.connect(MONGODB_URI, { dbName: 'novalux' });
  await Product.deleteMany({});
  await Product.insertMany(items);
  console.log('Database seeded with products.');
  await mongoose.disconnect();
})();
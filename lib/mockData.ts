export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  stock: number;
  featured?: boolean;
  modelUrl?: string;
};

export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Aether Runner X',
    slug: 'aether-runner-x',
    description: 'Futuristic adaptive performance sneaker engineered with a responsive carbon flex core.',
    price: 289,
    category: 'Footwear',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200'],
    rating: 4.8,
    stock: 14,
    featured: true
  },
  {
    _id: '2',
    name: 'Neon Drift Jacket',
    slug: 'neon-drift-jacket',
    description: 'Feather-light thermoregulated jacket with reflective kinetic weave texture.',
    price: 420,
    category: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200'],
    rating: 4.7,
    stock: 8,
    featured: true
  },
  {
    _id: '3',
    name: 'Pulse Arc Headset',
    slug: 'pulse-arc-headset',
    description: 'Spatial audio headset with AI stage adaptation and ultra-low latency rendering.',
    price: 560,
    category: 'Audio',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200'],
    rating: 4.9,
    stock: 22,
    featured: true
  }
];

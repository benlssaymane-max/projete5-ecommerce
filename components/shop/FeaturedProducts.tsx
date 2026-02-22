"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product, mockProducts } from '@/lib/mockData';

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="glass group overflow-hidden rounded-2xl"
    >
      <div className="relative h-56">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="space-y-2 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-cyanedge">{product.category}</p>
        <h3 className="display-font text-xl font-semibold">{product.name}</h3>
        <p className="text-sm text-steel">${product.price.toFixed(2)}</p>
        <Link href={`/product/${product._id}`} className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide hover:bg-white/10">
          View Product
        </Link>
      </div>
    </motion.article>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="section-pad pt-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyanedge">Curated Collection</p>
          <h2 className="display-font mt-2 text-3xl font-semibold md:text-5xl">Featured Drops</h2>
        </div>
        <Link href="/shop" className="text-sm text-steel hover:text-white">
          Browse all products
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProducts.filter((x) => x.featured).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

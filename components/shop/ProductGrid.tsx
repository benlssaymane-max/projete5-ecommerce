"use client";

import { useMemo, useState } from 'react';
import { mockProducts } from '@/lib/mockData';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductGrid() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(mockProducts.map((p) => p.category))], []);

  const filtered = mockProducts.filter((product) => {
    const matchQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === 'All' || product.category === category;
    return matchQuery && matchCategory;
  });

  return (
    <section className="space-y-6">
      <div className="glass grid gap-4 rounded-2xl p-4 md:grid-cols-[2fr_1fr]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-cyanedge"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-cyanedge"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <article key={product._id} className="glass overflow-hidden rounded-2xl">
            <div className="relative h-52">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="display-font text-lg font-semibold">{product.name}</h3>
              <p className="mt-1 text-sm text-steel">${product.price.toFixed(2)}</p>
              <Link href={`/product/${product._id}`} className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-medium hover:bg-white/20">
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

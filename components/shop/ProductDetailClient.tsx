"use client";

import { useEffect, useMemo, useState } from 'react';
import { Product, mockProducts } from '@/lib/mockData';
import Image from 'next/image';
import ProductViewer3D from '@/components/3d/ProductViewer3D';
import Link from 'next/link';

const colorVariants = [
  { name: 'Arctic', value: '#dcf8ff' },
  { name: 'Midnight', value: '#4b5577' },
  { name: 'Pulse Red', value: '#ff5f5f' }
];

const sizeVariants = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductDetailClient({ id }: { id: string }) {
  const product = useMemo(() => mockProducts.find((p) => p._id === id) ?? mockProducts[0], [id]);
  const compareProduct = useMemo(() => mockProducts.find((p) => p._id !== product._id) ?? mockProducts[0], [product._id]);
  const [qty, setQty] = useState(1);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState(colorVariants[0].name);
  const [selectedSize, setSelectedSize] = useState(sizeVariants[2]);
  const [compareMode, setCompareMode] = useState(false);

  useEffect(() => {
    fetch(`/api/recommendations?productId=${product._id}`)
      .then((r) => r.json())
      .then((d) => setRecommendations(d))
      .catch(() => setRecommendations([]));
  }, [product._id]);

  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-2xl md:h-[360px]">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
          <div className="glass h-72 rounded-2xl p-2 md:h-[360px]">
            <ProductViewer3D />
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-cyanedge">Compare Mode</p>
            <button onClick={() => setCompareMode((v) => !v)} className="rounded-full border border-white/20 px-4 py-2 text-xs">
              {compareMode ? 'Disable' : 'Enable'}
            </button>
          </div>

          {compareMode ? (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/15 p-4">
                <p className="display-font text-lg">{product.name}</p>
                <p className="text-sm text-steel">${product.price.toFixed(2)}</p>
                <p className="mt-2 text-xs text-steel">Rating: {product.rating}</p>
                <p className="text-xs text-steel">Stock: {product.stock}</p>
              </div>
              <div className="rounded-xl border border-white/15 p-4">
                <p className="display-font text-lg">{compareProduct.name}</p>
                <p className="text-sm text-steel">${compareProduct.price.toFixed(2)}</p>
                <p className="mt-2 text-xs text-steel">Rating: {compareProduct.rating}</p>
                <p className="text-xs text-steel">Stock: {compareProduct.stock}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-steel">Enable compare mode to benchmark this item against another premium product instantly.</p>
          )}
        </div>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
        <div className="glass rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cyanedge">{product.category}</p>
          <h1 className="display-font mt-2 text-3xl font-semibold md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-sm text-steel">{product.description}</p>
          <p className="mt-4 text-3xl font-semibold">${product.price.toFixed(2)}</p>

          <div className="mt-5 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-steel">Color</p>
            <div className="flex gap-2">
              {colorVariants.map((variant) => (
                <button
                  key={variant.name}
                  title={variant.name}
                  onClick={() => setSelectedColor(variant.name)}
                  className={`h-8 w-8 rounded-full border ${selectedColor === variant.name ? 'border-cyanedge' : 'border-white/20'}`}
                  style={{ background: variant.value }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-steel">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizeVariants.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full border px-3 py-1.5 text-xs ${selectedSize === size ? 'border-cyanedge bg-cyanedge/10' : 'border-white/20'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={5}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 rounded-xl border border-white/20 bg-black/40 px-3 py-2"
            />
            <button className="magnetic rounded-full bg-cyanedge px-6 py-3 text-sm font-semibold text-black">Add To Cart</button>
            <button className="rounded-full border border-white/20 px-5 py-3 text-sm">Wishlist</button>
          </div>

          <p className="mt-4 text-xs text-steel">Selected: {selectedColor} / {selectedSize}</p>
        </div>

        <div className="glass rounded-xl p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cyanedge">AI Recommendations</p>
          <div className="mt-3 space-y-2">
            {recommendations.map((item) => (
              <Link key={item._id} href={`/product/${item._id}`} className="block rounded-lg border border-white/10 px-3 py-2 text-sm text-steel hover:bg-white/5 hover:text-white">
                {item.name} - ${item.price.toFixed(2)}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
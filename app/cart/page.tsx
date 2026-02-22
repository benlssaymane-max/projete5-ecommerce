"use client";

import { useState } from 'react';
import { mockProducts } from '@/lib/mockData';

export default function CartPage() {
  const [items] = useState([{ product: mockProducts[0], quantity: 1 }]);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <main className="section-pad">
      <h1 className="display-font text-4xl font-semibold md:text-5xl">Your Cart</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4">
          {items.map((item) => (
            <article key={item.product._id} className="glass flex items-center justify-between rounded-2xl p-5">
              <div>
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-steel">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
            </article>
          ))}
        </section>

        <aside className="glass h-fit rounded-2xl p-5">
          <p className="text-sm text-steel">Subtotal</p>
          <p className="mt-2 text-3xl font-semibold">${subtotal.toFixed(2)}</p>
          <a href="/checkout" className="mt-6 block rounded-full bg-cyanedge px-4 py-3 text-center text-sm font-semibold text-black">
            Continue To Checkout
          </a>
        </aside>
      </div>
    </main>
  );
}

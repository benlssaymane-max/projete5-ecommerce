"use client";

import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    alert('Payment integration point ready. Connect Stripe keys in env.');
    setLoading(false);
  };

  return (
    <main className="section-pad max-w-3xl">
      <h1 className="display-font text-4xl font-semibold md:text-5xl">Checkout</h1>
      <form className="glass mt-8 space-y-4 rounded-2xl p-6">
        <input className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3" placeholder="Full name" />
        <input className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3" placeholder="Email" />
        <input className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3" placeholder="Shipping address" />
        <button type="button" onClick={handleCheckout} className="rounded-full bg-cyanedge px-6 py-3 text-sm font-semibold text-black">
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </main>
  );
}

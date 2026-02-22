"use client";

import { motion } from 'framer-motion';

const items = [
  { label: 'Global Delivery', value: '48h' },
  { label: 'Return Window', value: '30 Days' },
  { label: 'Average Rating', value: '4.9/5' },
  { label: 'Premium Members', value: '120k+' }
];

export default function KpiStrip() {
  return (
    <section className="section-pad py-8 md:py-10">
      <div className="glass grid gap-4 rounded-2xl p-4 md:grid-cols-4 md:p-6">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <p className="display-font text-2xl font-semibold text-cyanedge">{item.value}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-steel">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
"use client";

import { motion } from 'framer-motion';

const panels = [
  {
    title: 'Precision Storytelling',
    text: 'Each scroll movement reveals crafted product details with cinematic pacing and layered depth.',
    accent: 'from-cyan-400/20 to-sky-400/10'
  },
  {
    title: 'Adaptive Commerce UX',
    text: 'Ultra-responsive funnels, trust-driven checkout, and micro-interactions optimized for conversions.',
    accent: 'from-indigo-400/20 to-blue-400/10'
  },
  {
    title: 'Immersive Product DNA',
    text: '3D previews, motion lighting, and tactile interaction patterns that feel premium and native.',
    accent: 'from-fuchsia-300/20 to-purple-400/10'
  }
];

export default function StoryPanels() {
  return (
    <section className="section-pad pt-0">
      <div className="grid gap-5 md:grid-cols-3">
        {panels.map((panel, i) => (
          <motion.article
            key={panel.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className={`glass rounded-2xl bg-gradient-to-br ${panel.accent} p-6`}
          >
            <h3 className="display-font text-2xl font-semibold">{panel.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-steel">{panel.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from 'framer-motion';

export default function GlobalLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0.3 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.1 }}
        className="glass rounded-full px-8 py-4 text-sm uppercase tracking-[0.25em] text-cyanedge"
      >
        Loading Experience
      </motion.div>
    </div>
  );
}
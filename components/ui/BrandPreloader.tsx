"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BrandPreloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('novalux_preloader_shown');
    if (shown) return;
    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('novalux_preloader_shown', '1');
    }, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-[#04060b]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 text-center"
          >
            <p className="display-font text-4xl font-semibold tracking-tight">NOVA<span className="text-cyanedge">LUX</span></p>
            <div className="mx-auto h-[2px] w-40 overflow-hidden rounded bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="h-full w-full bg-cyanedge"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
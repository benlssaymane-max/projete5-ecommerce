"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/account', label: 'Account' },
  { href: '/admin', label: 'Admin' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="display-font text-xl font-semibold tracking-tight">
          NOVA<span className="text-cyanedge">LUX</span>
        </Link>
        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="relative rounded-full px-3 py-1.5 text-sm text-steel transition hover:text-white">
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

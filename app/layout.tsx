import type { Metadata } from 'next';
import './globals.css';
import { Sora, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import PageTransition from '@/components/ui/PageTransition';
import CustomCursor from '@/components/ui/CustomCursor';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'NovaLux | Futuristic Commerce',
  description: 'Premium cinematic ecommerce experience built with Next.js, Three.js, and motion-first UX.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${spaceGrotesk.variable} bg-obsidian text-[#FFFFFF] antialiased md:cursor-none`}>
        <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.22),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.18),transparent_38%),linear-gradient(180deg,#050816,#040612)]" />
        <div className="fixed inset-0 -z-20 bg-noise-grid bg-[length:24px_24px] opacity-20" />
        <CustomCursor />
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}


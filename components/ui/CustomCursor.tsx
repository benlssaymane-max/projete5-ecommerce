"use client";

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 900px)').matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const target = e.target as HTMLElement;
      const active = !!target.closest('a,button,input,select,[data-magnetic="true"]');
      cursor.dataset.active = active ? '1' : '0';
    };

    const tick = () => {
      tx += (x - tx) * 0.16;
      ty += (y - ty) * 0.16;
      cursor.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/80 bg-cyan-200/10 backdrop-blur-sm transition-all duration-200 md:block data-[active=1]:h-14 data-[active=1]:w-14" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[81] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyanedge shadow-[0_0_14px_rgba(63,244,255,0.7)] md:block" />
    </>
  );
}
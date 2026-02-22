"use client";

import { useEffect, useRef } from 'react';

export default function ShaderBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const mouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * window.devicePixelRatio);
      canvas.height = Math.floor(h * window.devicePixelRatio);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / w;
      mouse.y = e.clientY / h;
    };

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      const grad1 = ctx.createRadialGradient(w * mouse.x, h * mouse.y, 50, w * mouse.x, h * mouse.y, w * 0.55);
      grad1.addColorStop(0, 'rgba(0, 212, 255, 0.20)');
      grad1.addColorStop(1, 'rgba(0, 212, 255, 0)');

      const grad2 = ctx.createRadialGradient(w * (0.8 + Math.sin(t) * 0.05), h * 0.2, 20, w * 0.8, h * 0.2, w * 0.45);
      grad2.addColorStop(0, 'rgba(124, 58, 237, 0.16)');
      grad2.addColorStop(1, 'rgba(124, 58, 237, 0)');

      const grad3 = ctx.createLinearGradient(0, 0, 0, h);
      grad3.addColorStop(0, 'rgba(255,255,255,0.02)');
      grad3.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, w, h);

      requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10 opacity-90" aria-hidden="true" />;
}

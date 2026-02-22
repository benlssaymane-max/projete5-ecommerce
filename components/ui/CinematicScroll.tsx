"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const chapters = [
  {
    title: 'Chapter 01: Velocity',
    heading: 'Products introduced like movie scenes.',
    text: 'Each section is pinned and animated to pace information, emotion, and trust in a conversion-first narrative.'
  },
  {
    title: 'Chapter 02: Craft',
    heading: 'Material, engineering, and utility become visual.',
    text: 'Foreground and background elements move on separate planes for premium depth while preserving readability.'
  },
  {
    title: 'Chapter 03: Decision',
    heading: 'Checkout confidence before the final click.',
    text: 'Micro interactions, urgency cues, and product context reduce friction and increase completion rate.'
  }
];

export default function CinematicScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.story-panel');

      panels.forEach((panel) => {
        const inner = panel.querySelector('.story-inner');
        if (!inner) return;

        gsap.fromTo(
          inner,
          { y: 80, opacity: 0.25, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 78%',
              end: 'top 35%',
              scrub: 0.6
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad py-10 md:py-14 space-y-6">
      {chapters.map((chapter, index) => (
        <article key={chapter.title} className="story-panel">
          <div className="story-inner glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="absolute right-8 top-8 hidden text-7xl font-semibold text-white/10 md:block">0{index + 1}</div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyanedge">{chapter.title}</p>
            <h3 className="display-font mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">{chapter.heading}</h3>
            <p className="mt-5 max-w-2xl text-base text-steel md:text-lg">{chapter.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

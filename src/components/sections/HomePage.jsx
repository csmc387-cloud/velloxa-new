"use client";

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';

const ContactPage = lazy(() => import('./ContactPage'));
const Features = lazy(() => import('@/components/blocks/features-8').then(module => ({ default: module.Features })));

function AnimatedCounter({ from = 1, to = 100, suffix = '%', duration = 1.8 }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    let animationFrame;

    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(from + (to - from) * eased);
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function HomePage() {
  // Automatically synchronize URL hash with current section using IntersectionObserver (ZERO scroll lag)
  useEffect(() => {
    const sections = [
      { id: 'hero-section', hash: '' },
      { id: 'metrics', hash: '#metrics' },
      { id: 'solutions', hash: '#solutions' },
      { id: 'contact', hash: '#contact' },
    ];

    let currentHash = window.location.hash;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match && match.hash !== currentHash) {
              currentHash = match.hash;
              const newUrl = match.hash ? `${window.location.pathname}${match.hash}` : window.location.pathname;
              window.history.replaceState(null, '', newUrl);
            }
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-16 pb-12">

      {/* 1. STANDALONE HERO SECTION - SLOGAN ONLY */}
      <section
        id="hero-section"
        className="hero relative min-h-[100dvh] h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden py-0 px-3 sm:px-4 text-center safe-top"
      >
        {/* Expanded Background Mesh Gradient Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[950px] h-[95vw] max-h-[950px] bg-lime/15 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none animate-mesh" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[800px] h-[85vw] max-h-[800px] bg-cyan/15 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-2 mini:px-3 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center">
          {/* Main Slogan - Scaled larger across all iPhone sizes (mini 375px, standard 390px, Plus/Pro Max 428-430px) and desktop */}
          <h1 className="font-display text-[clamp(3.2rem,14.5vw,13.5rem)] sm:text-[9rem] md:text-[10.5rem] lg:text-[12.5rem] xl:text-[14rem] font-black tracking-tight text-white uppercase w-full mx-auto leading-[0.88] select-none text-center flex flex-col items-center justify-center space-y-1 sm:space-y-3">
            <span className="block text-center whitespace-nowrap">WE BUILD<span className="text-lime">.</span></span>
            <span className="block text-center whitespace-nowrap">YOU GROW<span className="text-cyan">.</span></span>
          </h1>
        </div>
      </section>

      {/* 2. KEY METRICS SECTION - FOLLOWS ON SCROLL */}
      <motion.section
        id="metrics"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 relative z-20 py-8"
      >
        <div className="flex flex-row items-center justify-center gap-4 mini:gap-6 sm:gap-16 text-center">
          {/* 100% Counter */}
          <div>
            <span className="block text-5xl mini:text-6xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              <AnimatedCounter from={1} to={100} suffix="%" duration={1.8} />
            </span>
            <span className="text-xs mini:text-sm sm:text-base font-mono font-bold text-gray-200 uppercase tracking-widest pt-1.5 block">ROI Impact</span>
          </div>

          <div className="h-12 sm:h-16 w-px bg-white/20" />

          {/* 2X - 3X Traffic */}
          <div>
            <span className="block text-5xl mini:text-6xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              2<span className="text-2xl mini:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold opacity-90 uppercase">X</span> - 3<span className="text-2xl mini:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold opacity-90 uppercase">X</span>
            </span>
            <span className="text-xs mini:text-sm sm:text-base font-mono font-bold text-gray-200 uppercase tracking-widest pt-1.5 block">Traffic Growth</span>
          </div>
        </div>
      </motion.section>

      {/* 3. SERVICES FEATURES SECTION */}
      <section id="solutions" className="max-w-7xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="font-display flex flex-col items-center justify-center -space-y-1 sm:-space-y-3 leading-none">
            <span className="text-[clamp(3.2rem,13vw,9.8rem)] font-black tracking-tight text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] leading-none select-none">
              SOLUTIONS<span className="text-cyan drop-shadow-[0_0_25px_rgba(0,255,204,0.7)]">.</span>
            </span>
            <span className="text-xl mini:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-widest text-white uppercase pt-2">
              Engineered for Growth
            </span>
          </h2>
        </div>

        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading solutions...</div>}>
          <Features />
        </Suspense>
      </section>

      {/* 4. MULTI-STEP CONTACT INTAKE FORM */}
      <div id="contact">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading contact form...</div>}>
          <ContactPage />
        </Suspense>
      </div>

    </div>
  );
}


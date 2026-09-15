"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

import { Features } from '@/components/blocks/features-8';

import { ComparisonSkeleton, FAQSkeleton, ContactSkeleton } from '@/components/boneyard/BoneyardSkeleton';

// Code-split below-the-fold sections with Boneyard skeleton loading fallbacks
const ComparisonSection = dynamic(() => import('./ComparisonSection'), { 
  ssr: true,
  loading: () => <ComparisonSkeleton />,
});
const FAQSection = dynamic(() => import('./FAQSection'), { 
  ssr: true,
  loading: () => <FAQSkeleton />,
});
const ContactPage = dynamic(() => import('./ContactPage'), { 
  ssr: true,
  loading: () => <ContactSkeleton />,
});

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
    <span ref={ref} className="tabular-nums inline-block" suppressHydrationWarning>
      {count}{suffix}
    </span>
  );
}

export default function HomePage() {
  // Automatically synchronize URL hash with current section using debounced IntersectionObserver (ZERO scroll lag)
  useEffect(() => {
    const sections = [
      { id: 'hero-section', hash: '' },
      { id: 'metrics', hash: '#metrics' },
      { id: 'solutions', hash: '#solutions' },
      { id: 'comparison', hash: '#comparison' },
      { id: 'faq', hash: '#faq' },
      { id: 'contact', hash: '#contact' },
    ];

    let currentHash = window.location.hash;
    let hashTimeout = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match && match.hash !== currentHash) {
              currentHash = match.hash;
              if (hashTimeout) clearTimeout(hashTimeout);
              hashTimeout = setTimeout(() => {
                const newUrl = match.hash ? `${window.location.pathname}${match.hash}` : window.location.pathname;
                if (window.location.hash !== match.hash) {
                  window.history.replaceState(null, '', newUrl);
                }
              }, 120);
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

    return () => {
      if (hashTimeout) clearTimeout(hashTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="space-y-16 pb-12">

      {/* 1. STANDALONE HERO SECTION - SLOGAN ONLY */}
      <section
        id="hero-section"
        className="hero relative min-h-[100dvh] h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden py-0 px-3 sm:px-4 text-center safe-top"
      >
        {/* Smooth Background Mesh Gradient Orbs - Using radial-gradient to prevent mobile GPU blur clipping box glitches */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[950px] h-[95vw] max-h-[950px] bg-[radial-gradient(circle,rgba(186,255,122,0.14)_0%,transparent_68%)] pointer-events-none animate-mesh" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[800px] h-[85vw] max-h-[800px] bg-[radial-gradient(circle,rgba(0,255,204,0.12)_0%,transparent_68%)] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-2 mini:px-3 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center">
          {/* Main Slogan - Scaled larger across all iPhone sizes (mini 375px, standard 390px, Plus/Pro Max 428-430px) and desktop */}
          <h1 className="font-display text-[clamp(3.2rem,14.5vw,13.5rem)] sm:text-[9rem] md:text-[10.5rem] lg:text-[12.5rem] xl:text-[14rem] font-black tracking-tight text-white uppercase w-full mx-auto leading-[0.88] select-none text-center flex flex-col items-center justify-center space-y-1 sm:space-y-3">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="block text-center whitespace-nowrap"
            >
              WE BUILD<span className="text-lime">.</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.25, 1, 0.5, 1] }}
              className="block text-center whitespace-nowrap"
            >
              YOU GROW<span className="text-cyan">.</span>
            </motion.span>
          </h1>
        </div>
      </section>

      {/* 2. KEY METRICS SECTION - ANIMATED COUNTER */}
      <section
        id="metrics"
        className="max-w-4xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 relative z-20 py-8"
      >
        <div className="flex flex-row items-center justify-center gap-4 mini:gap-6 sm:gap-16 text-center">
          {/* 100% Counter */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.04, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="block text-5xl mini:text-6xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tight hover-title-shadow">
              <AnimatedCounter from={1} to={100} suffix="%" duration={1.8} />
            </span>
            <span className="text-xs mini:text-sm sm:text-base font-mono font-bold text-gray-200 uppercase tracking-widest pt-1.5 block">ROI Impact</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="h-12 sm:h-16 w-px bg-white/20 origin-center"
          />

          {/* 2X - 3X Traffic */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="block text-5xl mini:text-6xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tight hover-title-shadow">
              2<span className="text-2xl mini:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold opacity-90 uppercase">X</span> - 3<span className="text-2xl mini:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold opacity-90 uppercase">X</span>
            </span>
            <span className="text-xs mini:text-sm sm:text-base font-mono font-bold text-gray-200 uppercase tracking-widest pt-1.5 block">Traffic Growth</span>
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICES FEATURES SECTION */}
      <section id="solutions" className="max-w-7xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          <h2 className="font-display flex flex-col items-center justify-center -space-y-1 sm:-space-y-3 leading-none">
            <span className="text-[clamp(3.2rem,13vw,9.8rem)] font-black tracking-tight text-white uppercase leading-none select-none">
              SOLUTIONS<span className="text-cyan">.</span>
            </span>
            <span className="text-xl mini:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-widest text-white uppercase pt-2">
              Engineered for Growth
            </span>
          </h2>
        </motion.div>

        <Features />
      </section>

      {/* 4. THE VELLOXA ADVANTAGE */}
      <ComparisonSection />

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* 6. MULTI-STEP CONTACT INTAKE FORM */}
      <div id="contact">
        <ContactPage />
      </div>

    </div>
  );
}


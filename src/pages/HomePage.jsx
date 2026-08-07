import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactPage from './ContactPage';
import { Features } from '../components/blocks/features-8';

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
  return (
    <div className="space-y-16 pb-12">

      {/* 1. STANDALONE HERO SECTION - SLOGAN ONLY */}
      <section
        id="hero-section"
        className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden py-0 px-4 text-center"
      >
        {/* Background Mesh Gradient Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[90vw] max-h-[700px] bg-lime/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none animate-mesh" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[500px] h-[70vw] max-h-[500px] bg-cyan/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center">
          {/* Main Slogan - Centered across all mobile screen widths (360px - 430px) and heights (667px - 932px) */}
          <h1 className="font-display text-[13.5vw] sm:text-[8rem] md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tight text-white uppercase w-full mx-auto leading-[0.92] select-none text-center flex flex-col items-center justify-center space-y-1 sm:space-y-2">
            <span className="block text-center whitespace-nowrap">WE BUILD<span className="text-lime">.</span></span>
            <span className="block text-center whitespace-nowrap">YOU GROW<span className="text-cyan">.</span></span>
          </h1>
        </div>
      </section>

      {/* 2. KEY METRICS SECTION - FOLLOWS ON SCROLL */}
      <motion.section
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-8"
      >
        <div className="flex flex-row items-center justify-center gap-6 sm:gap-16 text-center">
          {/* 100% Counter */}
          <div>
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              <AnimatedCounter from={1} to={100} suffix="%" duration={1.8} />
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-gray-200 uppercase tracking-widest pt-1.5 block">ROI Impact</span>
          </div>

          <div className="h-14 sm:h-16 w-px bg-white/20" />

          {/* 2X - 3X Traffic */}
          <div>
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              2<span className="text-3xl sm:text-4xl lg:text-5xl font-bold opacity-90 uppercase">X</span> - 3<span className="text-3xl sm:text-4xl lg:text-5xl font-bold opacity-90 uppercase">X</span>
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-gray-200 uppercase tracking-widest pt-1.5 block">Traffic Growth</span>
          </div>
        </div>
      </motion.section>

      {/* 3. SERVICES FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="font-display flex flex-col items-center justify-center -space-y-1 sm:-space-y-3 leading-none">
            <span className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] leading-none">
              SOLUTIONS<span className="text-cyan drop-shadow-[0_0_25px_rgba(0,255,204,0.7)]">.</span>
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-widest text-white uppercase">
              Engineered for Growth
            </span>
          </h2>
        </div>

        <Features />
      </section>

      {/* 4. MULTI-STEP CONTACT INTAKE FORM */}
      <div>
        <ContactPage />
      </div>

    </div>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import footerIconLogo from '../assets/footer-icon-logo.png';

export const PamphletExpandIntro = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    if (isFinished) return;

    const handleWheel = (e) => {
      if (isFinished) return;

      if (e.deltaY > 0) {
        e.preventDefault();
        const delta = e.deltaY * 0.0018;
        setScrollProgress((prev) => {
          const next = Math.min(prev + delta, 1);
          if (next >= 1) {
            setIsFinished(true);
          }
          return next;
        });
      } else if (e.deltaY < 0 && scrollProgress > 0) {
        e.preventDefault();
        const delta = Math.abs(e.deltaY) * 0.0018;
        setScrollProgress((prev) => Math.max(prev - delta, 0));
      }
    };

    const handleTouchStart = (e) => {
      if (isFinished) return;
      if (e.touches && e.touches[0]) {
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (isFinished || !touchStartY || !e.touches || !e.touches[0]) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (deltaY > 5) {
        e.preventDefault();
        const delta = deltaY * 0.006;
        setScrollProgress((prev) => {
          const next = Math.min(prev + delta, 1);
          if (next >= 1) {
            setIsFinished(true);
          }
          return next;
        });
        setTouchStartY(touchY);
      } else if (deltaY < -5 && scrollProgress > 0) {
        e.preventDefault();
        const delta = Math.abs(deltaY) * 0.006;
        setScrollProgress((prev) => Math.max(prev - delta, 0));
        setTouchStartY(touchY);
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isFinished, touchStartY, scrollProgress]);

  useEffect(() => {
    if (isFinished) {
      document.body.style.overflow = '';
    }
  }, [isFinished]);

  const leftAngle = scrollProgress * 120;
  const rightAngle = scrollProgress * 120;
  const textOpacity = Math.max(1 - scrollProgress * 1.8, 0);

  return (
    <div className="relative w-full">
      {/* 3D UNFOLD COVER - Renders ONLY while intro is active */}
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            key="pamphlet-3d-cover"
            className="fixed inset-0 z-50 pointer-events-auto flex overflow-hidden select-none [perspective:1400px]"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* LEFT PAMPHLET DOOR */}
            <div
              className="w-1/2 h-full bg-lime border-r border-charcoal/20 flex flex-col justify-between p-8 sm:p-12 shadow-2xl relative"
              style={{
                transformOrigin: 'left center',
                transform: `rotateY(-${leftAngle}deg)`,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="text-charcoal font-bold tracking-widest text-xs uppercase font-mono">
                VELLOXA
              </div>
              <div className="flex flex-col items-end justify-center h-full pr-2 sm:pr-8 text-right" style={{ opacity: textOpacity }}>
                <img
                  src={footerIconLogo}
                  alt="VELLOXA Logo Left"
                  className="h-28 sm:h-44 md:h-56 w-auto object-contain filter brightness-0"
                />
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-charcoal uppercase mt-4">
                  WE BUILD.
                </h2>
              </div>
              <div className="text-charcoal/60 text-xs font-semibold uppercase tracking-wider font-mono">
                AI & WEB ENGINEERING
              </div>
            </div>

            {/* RIGHT PAMPHLET DOOR */}
            <div
              className="w-1/2 h-full bg-lime border-l border-charcoal/20 flex flex-col justify-between p-8 sm:p-12 shadow-2xl relative"
              style={{
                transformOrigin: 'right center',
                transform: `rotateY(${rightAngle}deg)`,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="w-full flex justify-end">
                <span className="bg-charcoal text-lime px-3 py-1 rounded-full text-xs font-mono">
                  SCROLL TO UNFOLD
                </span>
              </div>
              <div className="flex flex-col items-start justify-center h-full pl-2 sm:pl-8 text-left" style={{ opacity: textOpacity }}>
                <img
                  src={footerIconLogo}
                  alt="VELLOXA Logo Right"
                  className="h-28 sm:h-44 md:h-56 w-auto object-contain filter brightness-0"
                />
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-charcoal uppercase mt-4">
                  YOU GROW.
                </h2>
              </div>
              <div className="w-full flex justify-end items-center gap-1 text-charcoal font-semibold text-xs uppercase tracking-wider">
                <span>SCROLL DOWN TO UNFOLD</span>
                <ChevronDown className="w-4 h-4 text-charcoal animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN WEBSITE CONTENT - 100% UNTOUCHED & NATURAL */}
      <div className="w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default PamphletExpandIntro;

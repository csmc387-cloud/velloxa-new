"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import footerIconLogo from '../assets/footer-icon-logo.png';

export const CardExpandIntro = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isOpen && e.deltaY > 0) {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => {
          document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (isOpen && window.scrollY <= 10 && e.deltaY < -40) {
        setIsOpen(false);
        e.preventDefault();
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStartY || !e.touches || !e.touches[0]) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (!isOpen && deltaY > 10) {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => {
          document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (isOpen && window.scrollY <= 10 && deltaY < -30) {
        setIsOpen(false);
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const preventScroll = (e) => {
      if (!isOpen) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', preventScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', preventScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, touchStartY]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* 3D PERSPECTIVE CARD COVER */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="lime-card-cover"
            className="fixed inset-0 z-50 bg-lime flex flex-col items-center justify-between p-8 sm:p-12 overflow-hidden shadow-2xl select-none cursor-pointer"
            initial={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            exit={{
              rotateX: -95,
              y: '-100%',
              scale: 0.9,
              opacity: 0,
              transition: {
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            style={{
              transformOrigin: 'top center',
              perspective: '1200px',
            }}
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => {
                document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
          >
            {/* Top Bar */}
            <div className="w-full flex justify-between items-center text-charcoal font-bold tracking-widest text-xs sm:text-sm uppercase">
              <span>VELLOXA — AI & WEB ENGINEERING</span>
              <span className="bg-charcoal text-lime px-3 py-1 rounded-full text-xs font-mono">
                ENTER
              </span>
            </div>

            {/* Centered Logo in Dark Charcoal */}
            <div className="flex flex-col items-center justify-center space-y-6 my-auto">
              <motion.img
                src={footerIconLogo}
                alt="VELLOXA Logo"
                className="h-36 sm:h-52 md:h-64 w-auto object-contain filter brightness-0 hover:scale-105 transition-transform duration-300"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.h1 
                className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-charcoal uppercase text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                WE BUILD. YOU GROW.
              </motion.h1>
            </div>

            {/* Bottom Prompt */}
            <motion.div
              className="flex flex-col items-center gap-2 text-charcoal font-semibold text-xs sm:text-sm tracking-wider uppercase"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <span>SCROLL OR CLICK TO OPEN</span>
              <ChevronDown className="w-5 h-5 text-charcoal" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVEALED WEBSITE CONTENT */}
      <div className={`w-full transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {children}
      </div>
    </div>
  );
};

export default CardExpandIntro;

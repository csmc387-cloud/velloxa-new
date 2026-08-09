"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import openingCardLogo from '../assets/opening-card-logo.svg';

export const ScrollExpandMedia = ({
  mediaSrc = openingCardLogo,
  children,
}) => {
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const sectionRef = useRef(null);

  // Smooth scroll progress physics - tuned for faster responsive opening
  const targetProgress = useMotionValue(0);
  const smoothProgress = useSpring(targetProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });

  // Clean 2D vertical slide transforms (NO 3D tilt/rotation)
  const topPanelY = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const bottomPanelY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  // Clean flat 2D motion for revealed website content (NO 3D rotateX/z depth)
  const contentScale = useTransform(smoothProgress, [0.1, 1], [0.95, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.05, 0.75], [0, 1]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest >= 0.98 && !mediaFullyExpanded) {
        setMediaFullyExpanded(true);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, mediaFullyExpanded]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 10) {
        setMediaFullyExpanded(false);
        targetProgress.set(0);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const current = targetProgress.get();
        const scrollDelta = e.deltaY * 0.005;
        const next = Math.min(Math.max(current + scrollDelta, 0), 1);
        targetProgress.set(next);
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

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 10) {
        setMediaFullyExpanded(false);
        targetProgress.set(0);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.006;
        const scrollDelta = deltaY * scrollFactor;
        const current = targetProgress.get();
        const next = Math.min(Math.max(current + scrollDelta, 0), 1);
        targetProgress.set(next);

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mediaFullyExpanded, touchStartY, targetProgress]);

  return (
    <div ref={sectionRef} className="relative w-full overflow-x-hidden">
      {/* FLAT 2D VERTICAL SLIDE INTRO COVER */}
      {!mediaFullyExpanded && (
        <div className="fixed inset-0 z-50 pointer-events-auto flex flex-col overflow-hidden select-none">

          {/* TOP PANEL (0 to 50dvh + 1px subpixel overlap) */}
          <motion.div
            className="w-full h-[calc(50dvh+1px)] bg-lime relative overflow-hidden z-10 shadow-2xl"
            style={{
              y: topPanelY,
            }}
          >
            {/* Top Half of Centered Logo */}
            <div className="w-full h-[100dvh] absolute left-0 top-0 flex items-center justify-center pointer-events-none p-4 sm:p-8">
              <img
                src={mediaSrc}
                alt="VELLOXA Logo"
                className="h-28 sm:h-48 md:h-64 max-w-[80vw] max-h-[35dvh] w-auto object-contain filter brightness-0 drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* BOTTOM PANEL (50dvh to 100dvh) */}
          <motion.div
            className="w-full h-[50dvh] bg-lime relative overflow-hidden z-10 shadow-2xl"
            style={{
              y: bottomPanelY,
            }}
          >
            {/* Bottom Half of Centered Logo */}
            <div className="w-full h-[100dvh] absolute left-0 bottom-0 flex items-center justify-center pointer-events-none p-4 sm:p-8">
              <img
                src={mediaSrc}
                alt="VELLOXA Logo"
                className="h-28 sm:h-48 md:h-64 max-w-[80vw] max-h-[35dvh] w-auto object-contain filter brightness-0 drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* SIMPLE FIXED CENTERED SCROLL PROMPT */}
          <motion.div
            className="fixed bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center justify-center text-center"
            style={{ opacity: promptOpacity }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-charcoal font-mono uppercase"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <span className="text-xs sm:text-sm font-black tracking-[0.2em]">
                SCROLL TO OPEN
              </span>
              <ChevronDown className="w-4 h-4 text-charcoal animate-bounce" />
            </motion.div>
          </motion.div>

        </div>
      )}

      {/* REVEALED WEBSITE CONTENT WITH FLAT 2D SCALE/OPACITY ANIMATION */}
      <div className="w-full">
        {!mediaFullyExpanded ? (
          <motion.div
            className="w-full origin-center"
            style={{
              scale: contentScale,
              opacity: contentOpacity,
            }}
          >
            {children}
          </motion.div>
        ) : (
          <div className="w-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollExpandMedia;

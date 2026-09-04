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
  mediaSrc = '/opening-card-logo.svg',
  children,
}) => {
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const touchStartYRef = useRef(0);
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

  // Guarantee initial scroll position is strictly Hero section (0, 0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest >= 0.98 && !mediaFullyExpanded) {
        window.scrollTo(0, 0);
        setMediaFullyExpanded(true);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, mediaFullyExpanded]);

  // Lock page scrolling cleanly without layout thrashing while intro cover is active
  useEffect(() => {
    if (!mediaFullyExpanded) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mediaFullyExpanded]);

  // Ensure BFCache (back/forward cache) can restore cleanly without frozen body overflow
  useEffect(() => {
    const handlePageHide = () => {
      document.body.style.overflow = '';
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

  useEffect(() => {
    // When fully expanded, completely detach all intro listeners to allow 100% native smooth scrolling
    if (mediaFullyExpanded) return;

    const handleWheel = (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
      const current = targetProgress.get();
      const scrollDelta = e.deltaY * 0.005;
      const next = Math.min(Math.max(current + scrollDelta, 0), 1);
      targetProgress.set(next);

      if (e.deltaY > 15 && next > 0.2) {
        targetProgress.set(1);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStartYRef.current || !e.touches || !e.touches[0]) return;

      // Prevent native window scroll so page never scrolls past hero during card opening
      if (e.cancelable) {
        e.preventDefault();
      }
      window.scrollTo(0, 0);

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      const scrollFactor = deltaY < 0 ? 0.008 : 0.006;
      const scrollDelta = deltaY * scrollFactor;
      const current = targetProgress.get();
      const next = Math.min(Math.max(current + scrollDelta, 0), 1);
      targetProgress.set(next);

      touchStartYRef.current = touchY;
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;
      window.scrollTo(0, 0);

      // Smooth inertia flick assist: if user flicked or dragged past 25%, fluidly finish opening to 100%
      const current = targetProgress.get();
      if (current > 0.25) {
        targetProgress.set(1);
      } else if (current > 0 && current <= 0.25) {
        targetProgress.set(0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mediaFullyExpanded, targetProgress]);

  return (
    <div ref={sectionRef} className="relative w-full overflow-x-hidden">
      {/* FLAT 2D VERTICAL SLIDE INTRO COVER */}
      {!mediaFullyExpanded && (
        <div 
          className="fixed inset-0 z-50 pointer-events-auto flex flex-col overflow-hidden select-none cursor-pointer"
          onClick={() => targetProgress.set(1)}
        >

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
                src={typeof mediaSrc === 'object' && mediaSrc?.src ? mediaSrc.src : mediaSrc}
                alt="VELLOXA Logo"
                width="150"
                height="150"
                loading="eager"
                fetchPriority="high"
                decoding="async"
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
                src={typeof mediaSrc === 'object' && mediaSrc?.src ? mediaSrc.src : mediaSrc}
                alt="VELLOXA Logo"
                width="150"
                height="150"
                loading="eager"
                fetchPriority="high"
                decoding="async"
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

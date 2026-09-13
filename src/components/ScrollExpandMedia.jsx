"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ChevronDown } from 'lucide-react';
import openingCardLogo from '../assets/opening-card-logo.svg';

export const ScrollExpandMedia = ({
  mediaSrc = '/opening-card-logo.svg',
  children,
}) => {
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReadyToOpen, setIsReadyToOpen] = useState(false);
  const touchStartYRef = useRef(0);
  const sectionRef = useRef(null);
  const lenis = useLenis();

  // Smooth scroll progress physics - tuned for instant, fluid responsive opening
  const targetProgress = useMotionValue(0);
  const smoothProgress = useSpring(targetProgress, {
    stiffness: 260,
    damping: 26,
    mass: 0.1,
  });

  // Clean 2D vertical slide transforms (NO 3D tilt/rotation)
  const topPanelY = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const bottomPanelY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  // Clean flat 2D motion for revealed website content (NO 3D rotateX/z depth)
  const contentScale = useTransform(smoothProgress, [0.1, 1], [0.95, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.05, 0.75], [0, 1]);

  const ensureScrollTop = () => {
    if (typeof window !== 'undefined' && window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  };

  // Guarantee initial scroll position is strictly Hero section (0, 0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      ensureScrollTop();
    }
  }, []);

  // Fluid 0 -> 100% initial loading bar animation with gradient pre-warming
  useEffect(() => {
    // Proactively initialize and compile 3D shader gradient in the background during loading bar
    let shaderTimer;
    if (typeof window !== 'undefined') {
      shaderTimer = setTimeout(() => {
        window.dispatchEvent(new Event('velloxa:activate-shader'));
      }, 60);
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoadProgress(100);
      setIsReadyToOpen(true);
      return () => {
        if (shaderTimer) clearTimeout(shaderTimer);
      };
    }

    let animationFrame;
    const startTime = performance.now();
    const duration = 2100; // 2.1s smooth duration giving 3D shader time to download and compile

    const animateProgress = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - rawProgress, 2.6);
      const currentPercent = Math.min(100, Math.round(ease * 100));

      setLoadProgress(currentPercent);

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animateProgress);
      } else {
        // Hold 100% briefly so user registers completion, then transition to SCROLL TO OPEN
        setTimeout(() => {
          setIsReadyToOpen(true);
        }, 240);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);
    return () => {
      if (shaderTimer) clearTimeout(shaderTimer);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest >= 0.96 && !mediaFullyExpanded) {
        setMediaFullyExpanded(true);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, mediaFullyExpanded]);

  // Lock page scrolling cleanly without layout thrashing while intro cover is active
  useEffect(() => {
    if (!mediaFullyExpanded) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [mediaFullyExpanded, lenis]);

  // Ensure BFCache (back/forward cache) can restore cleanly without frozen body overflow
  useEffect(() => {
    const handlePageHide = () => {
      document.body.style.overflow = '';
    };
    const handlePageShow = (e) => {
      if (e.persisted) {
        document.body.style.overflow = '';
        setLoadProgress(100);
        setIsReadyToOpen(true);
      }
    };
    window.addEventListener('pagehide', handlePageHide, { passive: true });
    window.addEventListener('pageshow', handlePageShow, { passive: true });
    return () => {
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  useEffect(() => {
    // When fully expanded or when loading bar has not reached 100%, keep intro gestures detached
    if (mediaFullyExpanded || !isReadyToOpen) return;

    const notifyShader = () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('velloxa:activate-shader'));
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      notifyShader();
      const current = targetProgress.get();
      const scrollDelta = e.deltaY * 0.012;
      const next = Math.min(Math.max(current + scrollDelta, 0), 1);
      targetProgress.set(next);

      if (e.deltaY > 8 || next > 0.18) {
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

      notifyShader();
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      const scrollDelta = deltaY * 0.015;
      const current = targetProgress.get();
      const next = Math.min(Math.max(current + scrollDelta, 0), 1);
      targetProgress.set(next);

      if (deltaY > 20 || next > 0.18) {
        targetProgress.set(1);
      }

      touchStartYRef.current = touchY;
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;

      // Smooth inertia flick assist: if user flicked or dragged past 15%, fluidly finish opening to 100%
      const current = targetProgress.get();
      if (current > 0.15) {
        targetProgress.set(1);
      } else if (current > 0 && current <= 0.15) {
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
  }, [mediaFullyExpanded, isReadyToOpen, targetProgress]);

  return (
    <div ref={sectionRef} className="relative w-full overflow-x-hidden">
      {/* FLAT 2D VERTICAL SLIDE INTRO COVER */}
      {!mediaFullyExpanded && (
        <div 
          data-lenis-prevent
          className={`fixed inset-0 z-50 pointer-events-auto flex flex-col overflow-hidden select-none touch-none ${
            isReadyToOpen ? 'cursor-pointer' : 'cursor-default'
          }`}
          onClick={() => {
            if (!isReadyToOpen) return;
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('velloxa:activate-shader'));
            }
            targetProgress.set(1);
          }}
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

          {/* DYNAMIC INDICATOR: LOADING BAR -> TRANSITION -> SCROLL TO OPEN */}
          <motion.div
            className="fixed bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center justify-center text-center"
            style={{ opacity: promptOpacity }}
          >
            <AnimatePresence mode="wait">
              {!isReadyToOpen ? (
                <motion.div
                  key="loading-indicator"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-2 text-charcoal font-mono uppercase select-none pointer-events-none"
                >
                  <span className="text-xs font-black tracking-[0.2em] tabular-nums">
                    {loadProgress}%
                  </span>
                  <div 
                    className="w-28 sm:w-36 h-1 bg-charcoal/20 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={loadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="h-full bg-charcoal rounded-full transition-all duration-75 ease-out"
                      style={{ width: `${loadProgress}%` }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="scroll-prompt"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-2 text-charcoal font-mono uppercase select-none pointer-events-none"
                >
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  >
                    <span className="text-xs sm:text-sm font-black tracking-[0.2em]">
                      SCROLL TO OPEN
                    </span>
                    <ChevronDown className="w-4 h-4 text-charcoal animate-bounce" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      )}

      {/* REVEALED WEBSITE CONTENT WITH STABLE WRAPPER (NEVER DESTROYED/REMOUNTED) */}
      <div className="w-full">
        <motion.div
          className={`w-full origin-center ${!mediaFullyExpanded ? 'pointer-events-none select-none' : ''}`}
          style={!mediaFullyExpanded ? {
            scale: contentScale,
            opacity: contentOpacity,
          } : undefined}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;

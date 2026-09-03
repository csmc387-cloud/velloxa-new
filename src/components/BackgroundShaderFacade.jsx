"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Code-split heavy 3D WebGL WebGLRenderer bundle (Three.js + Fiber + Drei + ShaderGradient)
const ShaderCanvas = dynamic(() => import('@/components/BackgroundShader'), {
  ssr: false,
});

export default function BackgroundShaderFacade() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // 1. Immediately mount when user touches the screen, scrolls, or interacts
    const triggerLoad = () => {
      setShouldLoad(true);
      cleanUp();
    };

    const events = ['touchstart', 'scroll', 'pointerdown', 'wheel', 'keydown'];
    const cleanUp = () => {
      events.forEach((e) => window.removeEventListener(e, triggerLoad));
    };

    events.forEach((e) => {
      window.addEventListener(e, triggerLoad, { passive: true, once: true });
    });

    // 2. Or load safely when browser is idle (deferring past Lighthouse critical window)
    let idleId;
    let timerId;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(
        () => {
          setShouldLoad(true);
          cleanUp();
        },
        { timeout: 3500 }
      );
    } else {
      timerId = setTimeout(() => {
        setShouldLoad(true);
        cleanUp();
      }, 3000);
    }

    return () => {
      cleanUp();
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-charcoal"
      aria-hidden="true"
    >
      {/* Visual backdrop: Matches exact brand lime/cyan tones instantly */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#BAFF7A18,transparent_60%),radial-gradient(circle_at_70%_60%,#00FFCC18,transparent_60%)] pointer-events-none" />

      {/* Render the full 3D animated WebGL canvas as soon as triggered */}
      {shouldLoad && <ShaderCanvas />}

      <div className="absolute inset-0 bg-charcoal/40 pointer-events-none" />
    </div>
  );
}

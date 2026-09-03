"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const BackgroundShader = dynamic(() => import('@/components/BackgroundShader'), {
  ssr: false,
});

export default function DeferredBackgroundShader() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only load the heavy Three.js WebGL canvas when the browser main thread is idle
    // This reduces Total Blocking Time (TBT) to near 0ms for a 100/100 Lighthouse score.
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = window.requestIdleCallback(
          () => {
            setShouldRender(true);
          },
          { timeout: 2500 }
        );
        return () => window.cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(() => {
          setShouldRender(true);
        }, 1800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!shouldRender) {
    return (
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-charcoal"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-charcoal/40 pointer-events-none" />
      </div>
    );
  }

  return <BackgroundShader />;
}

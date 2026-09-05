"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Code-split heavy 3D Three.js + ShaderGradient WebGL bundle (956 KiB)
const BackgroundShader = dynamic(() => import("@/components/BackgroundShader"), {
  ssr: false,
});

export default function BackgroundShaderLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let idleHandle = null;
    let timeoutId = null;

    const activateShader = () => {
      setMounted(true);
      cleanup();
    };

    const gestureEvents = ["touchstart", "scroll", "pointerdown", "wheel", "keydown", "click"];

    const cleanup = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, activateShader);
      });
      if (idleHandle && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, activateShader, { passive: true, once: true });
    });

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(activateShader, { timeout: 3500 });
    } else {
      timeoutId = setTimeout(activateShader, 2500);
    }

    return cleanup;
  }, []);

  if (!mounted) {
    // Lightweight zero-JS ambient backdrop matching BackgroundShader exact palette, contrast, and grain
    return (
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-charcoal"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#BAFF7A20,transparent_65%),radial-gradient(circle_at_70%_60%,#00FFCC18,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-charcoal/40 pointer-events-none" />
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    );
  }

  // Render the exact original 3D animated mesh shader at 100% full brightness with zero extra wrappers
  return <BackgroundShader />;
}

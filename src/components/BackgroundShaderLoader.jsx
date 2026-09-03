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
    // Mount the full 3D shader as soon as the user interacts with the page
    const activateShader = () => {
      setMounted(true);
      removeListeners();
    };

    const gestureEvents = ["touchstart", "scroll", "pointerdown", "wheel", "keydown", "click"];

    const removeListeners = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, activateShader);
      });
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, activateShader, { passive: true, once: true });
    });

    return removeListeners;
  }, []);

  if (!mounted) {
    // Lightweight zero-JS ambient backdrop matching BackgroundShader exact palette and contrast
    return (
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-charcoal"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#BAFF7A20,transparent_65%),radial-gradient(circle_at_70%_60%,#00FFCC18,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-charcoal/40 pointer-events-none" />
      </div>
    );
  }

  // Render the exact original 3D animated mesh shader at 100% full brightness with zero extra wrappers
  return <BackgroundShader />;
}

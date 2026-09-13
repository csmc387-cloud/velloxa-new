"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * SmoothScrollProvider delivers 60-120Hz lag-free, hardware-accelerated scrolling
 * powered by Lenis, eliminating scroll stutter while preserving native momentum.
 */
export default function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Optimal balance between silky smoothness and immediate responsiveness
        duration: 1.0,
        smoothWheel: true,
        syncTouch: false, // Preserves native 120Hz touch scrolling on iOS and Android
        anchors: true, // Smooth glide for internal anchors (#metrics, #solutions, #faq, #contact)
        wheelMultiplier: 1.05,
        touchMultiplier: 1.15,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

"use client";

import React, { Component } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';

class ShaderErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ShaderGradient caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback if WebGL/ShaderGradient crashes
      return (
        <div className="absolute inset-0 bg-charcoal pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#BAFF7A1a,transparent_60%),radial-gradient(circle_at_70%_60%,#00FFCC1a,transparent_60%)] animate-pulse" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default function BackgroundShader() {
  const [isMobile, setIsMobile] = React.useState(true); // Default to lightweight on initial render to prevent SSR/mobile hydration lag

  React.useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(186,255,122,0.14),transparent_70%),radial-gradient(ellipse_70%_50%_at_80%_60%,rgba(0,255,204,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-charcoal/30 pointer-events-none" />
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-charcoal"
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <ShaderErrorBoundary>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            transform: 'translateZ(0)'
          }}
        >
          <ShaderGradient
            animate="on"
            axesHelper="off"
            bgColor1="#000000"
            bgColor2="#000000"
            brightness={1}
            cAzimuthAngle={180}
            cDistance={2.8}
            cPolarAngle={80}
            cameraZoom={9.1}
            color1="#BAFF7A"
            color2="#00FFCC"
            color3="#212121"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="on"
            lightType="3d"
            loop="on"
            loopDuration={10}
            pixelDensity={1}
            positionX={0}
            positionY={0}
            positionZ={0}
            range="enabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
            shader="defaults"
            toggleAxis={false}
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.5}
            uFrequency={0}
            uSpeed={0.3}
            uStrength={1.5}
            uTime={8}
            wireframe={false}
            zoomOut={false}
          />
        </ShaderGradientCanvas>
      </ShaderErrorBoundary>
      {/* Semi-transparent dark overlay for text contrast */}
      <div className="absolute inset-0 bg-charcoal/40 pointer-events-none" />
    </div>
  );
}

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface SlideProps {
  title: string;
  subtitle: string;
  bgGradient: string;
  accentColor: string;
  badgeText: string;
}

export const ScreenSlide: React.FC<SlideProps> = ({
  title,
  subtitle,
  bgGradient,
  accentColor,
  badgeText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slideY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        flex: 1,
        background: bgGradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        padding: 60,
      }}
    >
      {/* Background Glowing Halo */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: accentColor,
          opacity: 0.15,
          filter: 'blur(120px)',
          transform: `scale(${scale})`,
        }}
      />

      {/* Slide Badge */}
      <div
        style={{
          opacity,
          transform: `translateY(${slideY}px)`,
          background: 'rgba(255, 255, 255, 0.08)',
          border: `1px solid ${accentColor}`,
          color: accentColor,
          padding: '8px 20px',
          borderRadius: 30,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 24,
        }}
      >
        {badgeText}
      </div>

      {/* Main Title */}
      <h1
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontSize: 72,
          fontWeight: 900,
          textAlign: 'center',
          margin: 0,
          letterSpacing: -1,
          textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          opacity,
          transform: `translateY(${slideY}px)`,
          fontSize: 28,
          color: '#A1A1AA',
          maxWidth: 800,
          textAlign: 'center',
          lineHeight: 1.5,
          marginTop: 20,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

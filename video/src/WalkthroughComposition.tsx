import React from 'react';
import { Sequence } from 'remotion';
import { ScreenSlide } from './ScreenSlide';

export const WalkthroughComposition: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: '#0B0C0E' }}>
      {/* Slide 1: Veloxa Intro */}
      <Sequence from={0} durationInFrames={90}>
        <ScreenSlide
          badgeText="SME Growth Engine"
          title="VELLOXA"
          subtitle="Building high-performance AI workflows, web platforms, and growth strategies for modern SMEs."
          bgGradient="radial-gradient(circle at center, #141619 0%, #0B0C0E 100%)"
          accentColor="#BAFF7A"
        />
      </Sequence>

      {/* Slide 2: AI Workflows */}
      <Sequence from={90} durationInFrames={90}>
        <ScreenSlide
          badgeText="Operational Automation"
          title="AI Workflows"
          subtitle="Automate internal business processes, intelligent intake forms, and automated agent pipelines."
          bgGradient="radial-gradient(circle at center, #0F172A 0%, #0B0C0E 100%)"
          accentColor="#00FFCC"
        />
      </Sequence>

      {/* Slide 3: Web Engineering */}
      <Sequence from={180} durationInFrames={90}>
        <ScreenSlide
          badgeText="High Performance"
          title="Web Engineering"
          subtitle="Liquid glass aesthetics, 60fps GPU WebGL shaders, and high-converting web applications."
          bgGradient="radial-gradient(circle at center, #1E1B4B 0%, #0B0C0E 100%)"
          accentColor="#BAFF7A"
        />
      </Sequence>

      {/* Slide 4: Passion Marketing */}
      <Sequence from={270} durationInFrames={90}>
        <ScreenSlide
          badgeText="SME Visibility"
          title="Passion Marketing"
          subtitle="Putting your SME in front of the right eyes — highest-tier SEO, social media marketing, and organic growth."
          bgGradient="radial-gradient(circle at center, #1A0F2E 0%, #0B0C0E 100%)"
          accentColor="#FF4D4D"
        />
      </Sequence>
    </div>
  );
};

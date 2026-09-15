"use client";

import React, { useEffect } from 'react';
import { Skeleton, configureBoneyard } from 'boneyard-js/react';

// Configure Boneyard defaults for Velloxa's dark glass design system
configureBoneyard({
  darkColor: 'rgba(255, 255, 255, 0.06)',
  color: 'rgba(255, 255, 255, 0.06)',
  darkShimmerColor: 'rgba(186, 255, 122, 0.1)',
  animate: 'shimmer',
  speed: '1.8s',
});

/**
 * Atomic bone element with shimmer pulse
 */
export function Bone({ className = '', style = {} }) {
  return (
    <div
      className={`rounded-lg bg-white/[0.06] relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.07] before:to-transparent ${className}`}
      style={style}
    />
  );
}

/**
 * Universal Boneyard Skeleton Wrapper
 */
export function BoneyardSkeleton({ name, loading, children, fallback, className = '' }) {
  return (
    <Skeleton
      name={name}
      loading={loading}
      className={className}
      darkColor="rgba(255, 255, 255, 0.06)"
      animate="shimmer"
      fallback={fallback}
    >
      {children}
    </Skeleton>
  );
}

/**
 * Skeleton for Comparison Section (Desktop Table & Mobile Stack)
 */
export function ComparisonSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-6 animate-pulse" aria-busy="true">
      <div className="flex flex-col items-center justify-center space-y-3 mx-auto max-w-sm">
        <Bone className="h-12 w-64 rounded-xl" />
      </div>
      {/* Desktop Table Bone */}
      <div className="hidden md:block rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 space-y-4">
        <div className="grid grid-cols-3 gap-6 pb-4 border-b border-white/10">
          <Bone className="h-5 w-28" />
          <Bone className="h-5 w-36" />
          <Bone className="h-5 w-32 bg-lime/10" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-3 gap-6 py-4 border-b border-white/5">
            <div className="space-y-2">
              <Bone className="h-3 w-20" />
              <Bone className="h-4 w-40" />
            </div>
            <Bone className="h-10 w-full" />
            <Bone className="h-10 w-full bg-lime/[0.06]" />
          </div>
        ))}
      </div>
      {/* Mobile Stack Bone */}
      <div className="md:hidden space-y-4 pt-2">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Bone key={i} className="h-1.5 w-6 rounded-full" />
          ))}
        </div>
        <div className="h-[390px] w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-2 pb-3 border-b border-white/10">
            <Bone className="h-3 w-24" />
            <Bone className="h-5 w-48" />
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <Bone className="h-28 w-full rounded-xl" />
            <Bone className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for FAQ Accordion Section
 */
export function FAQSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 pt-12 space-y-8 animate-pulse" aria-busy="true">
      <div className="flex justify-center">
        <Bone className="h-12 w-36 rounded-xl" />
      </div>
      <div className="space-y-3.5 pt-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl px-5 py-4.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1">
              <Bone className="h-4 w-6 rounded" />
              <Bone className="h-5 w-3/4 max-w-md rounded" />
            </div>
            <Bone className="size-8 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Contact Intake Section
 */
export function ContactSkeleton() {
  return (
    <div className="space-y-12 pb-16 pt-8 max-w-7xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 animate-pulse" aria-busy="true">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Bone className="h-6 w-48 rounded" />
        <Bone className="h-14 w-72 sm:w-96 rounded-xl" />
      </div>
      <div className="w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-black/40 border border-white/10 backdrop-blur-2xl space-y-6">
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Bone key={i} className="size-8 rounded-full" />
          ))}
        </div>
        <div className="space-y-4 pt-2">
          <Bone className="h-6 w-52 rounded" />
          <Bone className="h-4 w-72 rounded" />
          <div className="space-y-3 pt-2">
            <Bone className="h-12 w-full rounded-xl" />
            <Bone className="h-12 w-full rounded-xl" />
            <Bone className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Complete Page Skeleton Loading Screen (Used in loading.jsx)
 */
export function PageSkeleton() {
  return (
    <div className="bg-charcoal text-white min-h-screen flex flex-col font-body selection:bg-lime selection:text-charcoal relative overflow-hidden" aria-busy="true">
      {/* Background ambient glow skeleton */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#BAFF7A15,transparent_65%),radial-gradient(circle_at_70%_60%,#00FFCC10,transparent_65%)]" />
      </div>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 w-full">
        {/* Hero Section Bones */}
        <div className="min-h-[75vh] flex flex-col items-center justify-center text-center space-y-6">
          <Bone className="h-16 sm:h-28 w-4/5 max-w-3xl rounded-2xl" />
          <Bone className="h-16 sm:h-28 w-3/5 max-w-2xl rounded-2xl bg-cyan/10" />
        </div>

        {/* Metrics Section Bones */}
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex flex-row items-center justify-center gap-8 sm:gap-16">
            <div className="space-y-2 flex flex-col items-center">
              <Bone className="h-16 w-32 rounded-xl" />
              <Bone className="h-4 w-24 rounded" />
            </div>
            <div className="h-16 w-px bg-white/20" />
            <div className="space-y-2 flex flex-col items-center">
              <Bone className="h-16 w-32 rounded-xl" />
              <Bone className="h-4 w-24 rounded" />
            </div>
          </div>
        </div>

        {/* Solutions Grid Bones */}
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-3">
            <Bone className="h-12 w-64 rounded-xl" />
            <Bone className="h-5 w-48 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Bone className="h-44 rounded-2xl" />
            <Bone className="h-44 rounded-2xl" />
            <Bone className="h-44 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

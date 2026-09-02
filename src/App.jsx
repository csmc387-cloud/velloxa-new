import React, { Suspense, lazy } from 'react';
import ScrollExpandMedia from './components/ScrollExpandMedia';

const BackgroundShader = lazy(() => import('./components/BackgroundShader'));
const HomePage = lazy(() => import('./components/sections/HomePage'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  return (
    <div className="bg-charcoal text-white min-h-screen flex flex-col font-body selection:bg-lime selection:text-charcoal relative">
      <Suspense fallback={<div className="fixed inset-0 bg-charcoal pointer-events-none z-0" />}>
        <BackgroundShader />
      </Suspense>
      <ScrollExpandMedia>
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <HomePage />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}

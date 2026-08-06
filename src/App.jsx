import React from 'react';
import Footer from './components/Footer';
import ScrollExpandMedia from './components/ScrollExpandMedia';
import BackgroundShader from './components/BackgroundShader';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div className="bg-charcoal text-white min-h-screen flex flex-col font-body selection:bg-lime selection:text-charcoal relative">
      <BackgroundShader />
      <ScrollExpandMedia>
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow">
            <HomePage />
          </main>
          <Footer />
        </div>
      </ScrollExpandMedia>
    </div>
  );
}

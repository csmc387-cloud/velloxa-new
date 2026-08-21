import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="relative rounded-3xl liquid-glass-card border border-lime/40 p-8 sm:p-12 md:p-16 overflow-hidden">
        
        {/* Decorative Glow Orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime/10 rounded-full blur-3xl pointer-events-none animate-mesh" />
        
        <div className="relative z-10 max-w-3xl space-y-6">

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide leading-tight">
            READY TO TRANSFORM YOUR SME WITH <span className="text-lime">AI & MODERN WEB TECH?</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Book your 30-minute strategic consultation today. We will analyze your current workflows, audit your site performance, and deliver a custom AI roadmap.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#contact-section"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-md bg-lime text-charcoal font-display font-bold text-base uppercase tracking-wider hover:bg-[#a6ff5e] transition-all transform hover:-translate-y-1 shadow-limeGlow text-center flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Schedule Free Strategy Call</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Stepper, { Step } from '@/components/Stepper';
import { submitLeadToApi } from '@/utils/leadApi';

function AnimatedCheckIcon({ className = "size-8 text-lime" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        d="M 20 6 L 9 17 L 4 12"
      />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Integration',
    budget: '₹5k - ₹10k',
    message: ''
  });
  const [apiSynced, setApiSynced] = useState(false);

  const handleStepChange = (step) => {
    if (step === 4 && !apiSynced) {
      submitLeadToApi(formData);
      setApiSynced(true);
    }
  };

  const handleFinalCompleted = () => {
    if (!apiSynced) {
      submitLeadToApi(formData);
      setApiSynced(true);
    }
  };

  const isStepValid = (step) => {
    if (step === 1) {
      return (
        formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.email.includes('@') &&
        formData.company.trim() !== ''
      );
    }
    if (step === 2) {
      return formData.service.trim() !== '';
    }
    if (step === 3) {
      return formData.message.trim() !== '';
    }
    return true;
  };

  return (
    <div id="contact-section" className="space-y-12 pb-16 pt-8 max-w-7xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* 1. HEADER */}
      <section className="text-center max-w-5xl lg:max-w-6xl mx-auto">
        <h2 className="font-display flex flex-col items-center justify-center -space-y-1 sm:-space-y-3 leading-none">
          <span className="text-xl mini:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-widest text-white uppercase pb-1">
            Let's Build Something
          </span>
          <span className="text-[clamp(2.25rem,10.2vw,9.8rem)] sm:text-[clamp(3.2rem,13vw,9.8rem)] font-black tracking-tight text-white uppercase [text-shadow:0_0_35px_rgba(255,255,255,0.4)] leading-none select-none">
            EXTRAORDINARY<span className="text-lime [text-shadow:0_0_25px_rgba(186,255,122,0.7)]">.</span>
          </span>
        </h2>
      </section>

      {/* 2. MINIMALIST STEPPER CONTACT FORM */}
      <Stepper
        initialStep={1}
        disableStepIndicators={true}
        isStepValid={isStepValid}
        onStepChange={handleStepChange}
        onFinalStepCompleted={handleFinalCompleted}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        {/* STEP 1: IDENTITY */}
        <Step>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">Client Identification</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Provide your name, Gmail / Insta handle, and business name.</p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label htmlFor="client-name" className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-medium tracking-wider">
                  Full Name
                </label>
                <input
                  id="client-name"
                  name="name"
                  type="text"
                  aria-label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime/60 focus:ring-1 focus:ring-lime/30 text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="client-email" className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-medium tracking-wider">
                  Gmail / Insta Handle
                </label>
                <input
                  id="client-email"
                  name="email"
                  type="text"
                  aria-label="Gmail or Instagram Handle"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. user@gmail.com or @instahandle"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none text-sm transition-all ${
                    formData.email.length > 0 && !formData.email.includes('@')
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                      : formData.email.includes('@')
                        ? 'border-lime/50 focus:border-lime focus:ring-1 focus:ring-lime/30'
                        : 'border-white/10 focus:border-lime/60 focus:ring-1 focus:ring-lime/30'
                  }`}
                />
                {formData.email.length > 0 && !formData.email.includes('@') && (
                  <p className="text-red-400 text-xs font-mono mt-1.5 pl-1 flex items-center space-x-1.5">
                    <AlertCircle className="size-3.5 text-red-400 shrink-0" />
                    <span>Must include '@' symbol (e.g. user@gmail.com or @instahandle)</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="client-company" className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-medium tracking-wider">
                  Business / Company Name
                </label>
                <input
                  id="client-company"
                  name="company"
                  type="text"
                  aria-label="Business or Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Acme Corp / NextGen AI"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime/60 focus:ring-1 focus:ring-lime/30 text-sm transition-all"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* STEP 2: SERVICE SELECTION */}
        <Step>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">Target Service Domain</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Select the area that fits your growth objectives.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { name: 'AI Integration', desc: 'Automate internal operations, customer intake & custom AI workflows' },
                { name: 'Web Engineering', desc: 'High-converting performance Web apps' },
                { name: 'Passion Marketing', desc: 'Top-tier SEO, social media marketing & putting your SME out there' },
                { name: 'Full Scale Suite', desc: 'Complete digital transformation' },
              ].map((item) => {
                const isSelected = formData.service === item.name;
                return (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setFormData({ ...formData, service: item.name })}
                    className={`p-4 rounded-xl text-left border transition-all relative ${
                      isSelected
                        ? 'border-lime bg-lime/10 text-white shadow-[0_0_20px_rgba(186,255,122,0.15)]'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="block font-medium text-sm text-white">{item.name}</span>
                      {isSelected && (
                        <span className="inline-flex items-center justify-center size-4 rounded-full bg-cyan/20 text-cyan text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="block text-xs text-gray-400 leading-relaxed">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Step>

        {/* STEP 3: SCOPE & BUDGET */}
        <Step>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight">Scope & Budget</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Indicate estimated budget and project requirements.</p>
            </div>

            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 mb-2 font-medium tracking-wider">
                  Estimated Budget Tier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['₹5k - ₹10k', '₹10k - ₹15k', '₹15k - ₹20k', 'Negotiable Price'].map((range) => {
                    const isSelected = formData.budget === range;
                    return (
                      <button
                        type="button"
                        key={range}
                        onClick={() => setFormData({ ...formData, budget: range })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-lime text-charcoal font-bold shadow-[0_0_15px_rgba(186,255,122,0.35)]'
                            : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {range}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="client-message" className="block text-xs font-mono uppercase text-gray-400 mb-1.5 font-medium tracking-wider">
                  Project Objectives / Message
                </label>
                <textarea
                  id="client-message"
                  name="message"
                  aria-label="Project Objectives"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline key project objectives, deliverables, or timeline..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime/60 focus:ring-1 focus:ring-lime/30 text-sm transition-all"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* STEP 4: CONFIRMATION */}
        <Step>
          <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12 space-y-6 w-full mx-auto">
            {/* Animated Spring Pop Self-Drawing Checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.1 }}
              className="size-16 sm:size-20 rounded-full bg-lime/10 border-2 border-lime text-lime flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(186,255,122,0.6)]"
            >
              <AnimatedCheckIcon className="size-8 sm:size-10 text-lime" />
            </motion.div>

            <div className="space-y-2.5 max-w-md mx-auto text-center">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">INTAKE TRANSMITTED</h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                Thank you partner, your intake has been logged. We will reach you through your email / handle within 24 hours.
              </p>
            </div>
          </div>
        </Step>
      </Stepper>

    </div>
  );
}

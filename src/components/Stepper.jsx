"use client";

import React, { useState, useEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Phone, AlertCircle } from 'lucide-react';

export function WinkSmileyIcon({ className = "size-5 text-lime" }) {
  const [isWinking, setIsWinking] = useState(true);

  useEffect(() => {
    setIsWinking(true);
    const timer = setTimeout(() => {
      setIsWinking(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer Face Circle */}
      <circle cx="12" cy="12" r="9.5" />

      {/* Left Eye */}
      <circle cx="9" cy="9.5" r="1.2" fill="currentColor" />

      {/* Right Eye (Winks first then turns into happy open eye) */}
      <AnimatePresence mode="wait">
        {isWinking ? (
          <motion.path
            key="wink-eye"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            d="M 13.5 10 Q 15 11.5 16.5 10"
            strokeWidth="2.5"
          />
        ) : (
          <motion.circle
            key="open-eye"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 450, damping: 18 }}
            cx="15"
            cy="9.5"
            r="1.2"
            fill="currentColor"
          />
        )}
      </AnimatePresence>

      {/* Smile Mouth */}
      <motion.path
        initial={{ pathLength: 0.4 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        d="M 8 14 Q 12 18 16 14"
      />
    </svg>
  );
}

export function Step({ children }) {
  return <div className="w-full space-y-6">{children}</div>;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange,
  onFinalStepCompleted,
  backButtonText = "Previous",
  nextButtonText = "Next",
  disableStepIndicators = false,
  isStepValid,
}) {
  const steps = Children.toArray(children);
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [validationError, setValidationError] = useState('');

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handleNext = () => {
    if (isStepValid && !isStepValid(currentStep)) {
      setValidationError('Please fill in all required fields before proceeding.');
      return;
    }
    setValidationError('');
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
      if (nextStep === totalSteps) {
        onFinalStepCompleted?.();
      }
    }
  };

  const handleBack = () => {
    setValidationError('');
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (!disableStepIndicators) {
      if (stepIndex > currentStep && isStepValid && !isStepValid(currentStep)) {
        setValidationError('Please fill in all required fields before proceeding.');
        return;
      }
      setValidationError('');
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto rounded-3xl p-4 mini:p-6 sm:p-8 relative overflow-hidden bg-black/40 border border-white/10 backdrop-blur-2xl"
    >

      {/* Clean & Simple Step Indicators */}
      {!disableStepIndicators && (
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 min-h-[44px] sm:min-h-[52px]">
          {steps.map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;
            const isLastStepIndicator = stepNumber === totalSteps;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleStepClick(stepNumber)}
                disabled={disableStepIndicators || stepNumber > currentStep}
                aria-label={`Step ${stepNumber}`}
                className="group relative flex items-center justify-center focus:outline-none disabled:cursor-not-allowed h-9 w-9 sm:h-11 sm:w-11"
              >
                {/* Active Rotating Hairline Ring */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full p-[0.5px] overflow-hidden flex items-center justify-center pointer-events-none shadow-[0_0_10px_rgba(186,255,122,0.4)]">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      className="absolute w-[220%] h-[220%] rounded-full bg-[conic-gradient(from_0deg,#BAFF7A,#00F0FF,#10B981,#BAFF7A)]"
                    />
                  </div>
                )}

                {/* Step Badge / Dot */}
                <motion.div
                  layout
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`relative z-10 flex items-center justify-center rounded-full transition-colors duration-250 ${isActive
                    ? 'size-8 sm:size-10 bg-black text-lime font-mono text-base sm:text-lg font-bold'
                    : isCompleted
                      ? 'size-2.5 sm:size-3.5 bg-lime shadow-[0_0_6px_rgba(186,255,122,0.4)] group-hover:scale-110'
                      : 'size-2 sm:size-3 bg-white/20 group-hover:bg-white/50 group-hover:scale-110'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center leading-none"
                    >
                      {isLastStepIndicator ? (
                        <WinkSmileyIcon className="size-5 sm:size-6 text-lime" />
                      ) : (
                        stepNumber
                      )}
                    </motion.span>
                  )}
                </motion.div>
              </button>
            );
          })}
        </div>
      )}

      {/* Step Content */}
      <div className="min-h-[220px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="py-1"
          >
            {steps[currentStep - 1]}
          </motion.div>
        </AnimatePresence>

        {/* Validation Error Notice */}
        <AnimatePresence>
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="mt-3 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center flex items-center justify-center space-x-1.5"
            >
              <AlertCircle className="size-3.5 text-red-400 shrink-0" />
              <span>{validationError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stepper Footer Controls */}
        <div className="mt-4 pt-2 space-y-3">
          {/* Navigation Controls (ABOVE Divider Line) */}
          <div className="flex items-center justify-between pb-1">
            {!isFirstStep ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center space-x-1.5 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="size-3.5" />
                <span>{backButtonText}</span>
              </button>
            ) : (
              <div />
            )}

            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-lime text-charcoal font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#a6ff5e] transition-all flex items-center space-x-2 shadow-sm shadow-lime/20"
              >
                <span>{nextButtonText}</span>
                <ArrowRight className="size-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleStepClick(1)}
                className="px-5 py-2 rounded-xl text-cyan text-xs font-mono font-semibold uppercase tracking-wider hover:text-white transition-all"
              >
                <span>Restart</span>
              </button>
            )}
          </div>

          {/* Divider Line */}
          <div className="border-t border-white/10 pt-3.5">
            {/* Phone Numbers Below Divider Line */}
            <div className="flex items-center justify-center space-x-2 text-xs font-mono text-gray-400 text-center">
              <Phone className="size-3.5 text-gray-300 hover:text-lime transition-all" />
              <a
                href="tel:+919266544745"
                className="text-gray-300 hover:text-lime transition-colors font-medium"
                title="Call 9266544745"
              >
                9266544745
              </a>
              <span className="text-lime/70 font-bold">•</span>
              <a
                href="tel:+919711886700"
                className="text-gray-300 hover:text-lime transition-colors font-medium"
                title="Call 9711886700"
              >
                9711886700
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

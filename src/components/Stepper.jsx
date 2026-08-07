import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

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
      className="w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-black/40 border border-white/10 backdrop-blur-2xl"
    >
      
      {/* Animated Curved Wave Stepper Timeline */}
      {!disableStepIndicators && (
        <div className="relative mb-4 h-24 w-full">
          
          {/* SVG Glowing Curved Wave Track Line */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="zigzagLimeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#BAFF7A" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#00FFCC" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#BAFF7A" stopOpacity="1" />
                </linearGradient>
                <filter id="zigzagGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Inactive Base Curved Path */}
              <path
                d="M 8 20 C 22 20, 22 40, 36 40 C 50 40, 50 20, 64 20 C 78 20, 78 40, 92 40"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Active Animated Progress Curved Path */}
              <motion.path
                d="M 8 20 C 22 20, 22 40, 36 40 C 50 40, 50 20, 64 20 C 78 20, 78 40, 92 40"
                fill="none"
                stroke="url(#zigzagLimeGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#zigzagGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: (currentStep - 1) / (totalSteps - 1) }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              />
            </svg>
          </div>

          {/* Step Circle Nodes Centralized Exactly ON the Curve */}
          <div className="absolute inset-0 z-10">
            {steps.map((_, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isActive = stepNumber === currentStep;
              const isTop = index % 2 === 0;

              const xPercent = totalSteps > 1 ? (index / (totalSteps - 1)) * 84 + 8 : 50;
              const yPercent = isTop ? 33.33 : 66.67;

              return (
                <div
                  key={index}
                  style={{
                    left: `${xPercent}%`,
                    top: `${yPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                >
                  <button
                    type="button"
                    onClick={() => handleStepClick(stepNumber)}
                    disabled={disableStepIndicators || stepNumber > currentStep}
                    className="relative flex flex-col items-center focus:outline-none group"
                  >
                    <motion.span
                      animate={{ scale: isActive ? 1.25 : 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                      className={`size-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-[#141619] border-2 border-lime text-lime shadow-[0_0_25px_rgba(186,255,122,0.8)] ring-4 ring-lime/20 z-20'
                          : isCompleted
                          ? 'bg-lime border-2 border-lime text-charcoal shadow-[0_0_12px_rgba(186,255,122,0.4)] z-10'
                          : 'bg-[#141619] border border-white/20 text-gray-500 z-10 group-hover:border-white/40'
                      }`}
                    >
                      {isCompleted ? <Check className="size-4 stroke-[3]" /> : stepNumber}
                    </motion.span>
                    
                    <span 
                      className={`absolute left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap transition-colors ${
                        isTop ? '-top-6' : 'top-10'
                      } ${
                        isActive 
                          ? 'text-lime font-bold drop-shadow-[0_0_8px_rgba(186,255,122,0.5)]' 
                          : isCompleted 
                          ? 'text-white font-medium' 
                          : 'text-gray-500'
                      }`}
                    >
                      STEP {stepNumber}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

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
              className="mt-3 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center flex items-center justify-center space-x-2"
            >
              <span>⚠️ {validationError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stepper Footer Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-4">
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
      </div>
    </motion.div>
  );
}

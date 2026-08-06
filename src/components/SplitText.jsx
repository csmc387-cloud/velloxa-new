import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SplitText({
  text = '',
  className = '',
  delay = 50,
  duration = 1,
  ease = 'power3.out',
  splitType = 'words',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  onLetterAnimationComplete,
  showCallback = false,
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
    margin: rootMargin,
  });

  const words = text ? text.split(' ') : [];
  const delayInSeconds = delay / 1000;

  const getEasing = (easeInput) => {
    if (typeof easeInput === 'string') {
      if (easeInput.includes('power3.out') || easeInput.includes('easeOut')) {
        return [0.215, 0.61, 0.355, 1];
      }
      if (easeInput.includes('back')) {
        return [0.34, 1.56, 0.64, 1];
      }
      return [0.25, 0.1, 0.25, 1];
    }
    return easeInput;
  };

  const selectedEase = getEasing(ease);

  return (
    <span
      ref={containerRef}
      className={`inline-block w-full ${className}`}
      style={{ textAlign }}
    >
      {splitType === 'words' ? (
        words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-normal overflow-hidden py-0.5 px-0.5">
            <motion.span
              className="inline-block"
              initial={from}
              animate={isInView ? to : from}
              transition={{
                duration,
                delay: wordIndex * delayInSeconds,
                ease: selectedEase,
              }}
              onAnimationComplete={() => {
                if (showCallback && wordIndex === words.length - 1) {
                  onLetterAnimationComplete?.();
                }
              }}
            >
              {word}
            </motion.span>
            {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))
      ) : (
        text.split('').map((char, charIndex) => (
          <motion.span
            key={charIndex}
            className="inline-block overflow-hidden"
            initial={from}
            animate={isInView ? to : from}
            transition={{
              duration,
              delay: charIndex * delayInSeconds,
              ease: selectedEase,
            }}
            onAnimationComplete={() => {
              if (showCallback && charIndex === text.length - 1) {
                onLetterAnimationComplete?.();
              }
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))
      )}
    </span>
  );
}

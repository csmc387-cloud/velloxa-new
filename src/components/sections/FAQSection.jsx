"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "How does Velloxa help scale my business?",
    answer: "We don't just build websites—we engineer complete digital growth systems for your business. By combining high-converting design, custom AI automation, and targeted growth strategies, we help you eliminate operational bottlenecks, increase conversion rates, and unlock sustainable revenue growth.",
    details: "Whether modernizing your online platform, automating lead follow-ups, or streamlining client onboarding, our sprint-driven delivery turns technology into an active revenue driver so your team can focus on closing deals and expanding.",
  },
  {
    question: "How do your AI workflows reduce recurring tasks?",
    answer: "Our AI workflows are custom-built to connect directly into your existing tools—like email, CRM, WhatsApp, and Slack. They take over repetitive, time-consuming tasks like qualifying inbound leads, scheduling follow-ups, and syncing client data automatically.",
    details: "Running 24/7 in the background with zero manual effort, these workflows eliminate hours of repetitive busywork each week, cut client response times to minutes, and make day-to-day business operations faster and simpler.",
  },
  {
    question: "What is Passion Marketing, and how does it attract clients?",
    answer: "Passion Marketing is our strategy to build genuine brand authority and audience connection instead of relying solely on cold ads. We identify what makes your brand uniquely compelling, craft authentic stories, and build high-intent content funnels that resonate emotionally with your ideal clients.",
    details: "By positioning your brand with clarity and emotional resonance, Passion Marketing establishes immediate trust, fuels organic word-of-mouth referrals, and turns casual visitors into loyal, long-term clients.",
  },
  {
    question: "How does Velloxa build my online presence to bring in business?",
    answer: "We begin by analyzing your business, target audience, and market landscape to build a website tailored specifically to convert visitors into clients. We then optimize your entire presence across SEO, AEO, and GEO to give your brand maximum visibility across Google and modern AI search engines.",
    details: "This multi-layered approach ensures prospective clients find your business first—whether searching traditional Google results or asking AI platforms like ChatGPT and Perplexity—turning online visibility into consistent business growth.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-5xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 pt-12 space-y-8"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tight text-white uppercase leading-none select-none">
          FAQ<span className="text-lime">.</span>
        </h2>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3.5 pt-2">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-lime/50 bg-black/40 backdrop-blur-2xl shadow-[0_0_20px_rgba(186,255,122,0.12)]'
                  : 'border-white/10 bg-black/40 backdrop-blur-2xl hover:border-white/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="w-full px-4 py-4 mini:px-5 mini:py-4.5 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                <div className="flex items-center gap-2.5 mini:gap-3 sm:gap-4 flex-1 min-w-0">
                  <span className="font-mono text-xs sm:text-sm font-bold text-lime/80 shrink-0 select-none">
                    0{index + 1}
                  </span>
                  <span role="heading" aria-level={3} className="text-sm mini:text-base sm:text-lg lg:text-xl font-sans font-semibold text-white tracking-tight leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`size-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-lime text-charcoal border-lime' : 'text-gray-400'
                  }`}
                >
                  <ChevronDown className="size-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4.5 mini:px-5 mini:pb-5 sm:px-6 sm:pb-6 pt-0 space-y-3 text-sm leading-relaxed border-t border-white/10 mt-1 pt-4">
                      <p className="text-gray-300 font-normal">
                        {faq.answer}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {faq.details}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

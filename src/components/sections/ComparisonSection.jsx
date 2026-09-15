"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Zap } from 'lucide-react';

const MAIN_STANDARDS = [
  {
    standard: "Website Speed & Experience",
    niche: "Web Engineering",
    traditional: "Slow, clunky templates (4+ sec load) with confusing menus that make mobile visitors leave before contacting you.",
    velloxa: "Custom, instant-loading website (<0.8s load) designed cleanly so everyday visitors easily convert into paying clients.",
  },
  {
    standard: "Smart Business Automation",
    niche: "AI Integration",
    traditional: "Manual data entry or generic copy-paste chatbots that frustrate customers and still leave your staff doing repetitive busywork.",
    velloxa: "Custom AI workflows and assistants that qualify leads 24/7, answer inquiries instantly, and save your team 40+ hours every week.",
  },
  {
    standard: "Organic Reach & OmniSearch",
    niche: "Passion Marketing",
    traditional: "Posting random reels and generic graphics chasing vanity likes, with zero strategy to push your business to real crowds or convert views into paying clients.",
    velloxa: "High-impact organic marketing that pushes your business directly into active crowds, powered by OmniSearch (unifying Google SEO, direct AI answers, and ChatGPT citations) to drive real paying customers.",
  },
];

const ROI_STANDARD = {
  standard: "Delivery Timeline & Honest Pricing",
  niche: "Turnaround & ROI",
  traditional: "8 to 16 weeks of endless meetings, scope delays, and expensive monthly retainers with fuzzy results.",
  velloxa: "1 to 3 week rapid launch with transparent milestone pricing, full code ownership, and measurable ROI.",
};

export default function ComparisonSection() {
  return (
    <motion.section
      id="comparison"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto px-3 mini:px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-6"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tight text-white uppercase leading-none select-none">
          WHY VELLOXA<span className="text-cyan">.</span>
        </h2>
      </div>

      {/* Desktop & Tablet Table View */}
      <div
        className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300"
      >
        <table className="w-full text-left border-collapse" aria-label="Competitive differentiation between Traditional Agencies and Velloxa Agency">
          <caption className="sr-only">
            Comparison table explaining how Velloxa delivers across website speed, smart AI automation, passion marketing with local reach, SEO, AEO, and GEO, and project delivery timelines compared to traditional agencies.
          </caption>
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th scope="col" className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold w-1/3 border-r border-white/10">
                Categories
              </th>
              <th scope="col" className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-gray-400 font-semibold w-1/3 border-r border-white/10">
                Traditional Agencies
              </th>
              <th scope="col" className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-lime font-bold w-1/3 bg-lime/10 border-l border-r border-lime/30">
                <div className="flex items-center gap-1.5">
                  <Zap className="size-3.5 text-cyan fill-cyan" />
                  <span>Velloxa Agency</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {MAIN_STANDARDS.map((row, idx) => (
              <tr key={idx} className="transition-colors hover:bg-white/[0.03]">
                {/* Feature Name */}
                <th scope="row" className="py-4 px-6 text-white font-sans align-top border-r border-white/10">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-cyan/90 uppercase tracking-wider block font-semibold">
                      {row.niche}
                    </span>
                    <span className="text-sm font-bold text-white block">
                      {row.standard}
                    </span>
                  </div>
                </th>
                {/* Traditional */}
                <td className="py-4 px-6 text-xs sm:text-sm text-gray-400 align-top leading-relaxed border-r border-white/10">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="size-4 text-red-400/80 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                </td>
                {/* Velloxa */}
                <td className="py-4 px-6 text-xs sm:text-sm text-white font-medium bg-lime/[0.06] border-l border-r border-lime/20 align-top leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-lime shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{row.velloxa}</span>
                  </div>
                </td>
              </tr>
            ))}

            {/* Turnaround & ROI Row - Compact & Visible with Same Translucency */}
            <tr className="bg-white/[0.02] transition-colors hover:bg-white/[0.04]">
              <th scope="row" className="py-3 px-6 text-white font-sans align-top border-r border-white/10">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-cyan font-bold uppercase tracking-wider block">
                    {ROI_STANDARD.niche}
                  </span>
                  <span className="text-xs font-bold text-white block">
                    {ROI_STANDARD.standard}
                  </span>
                </div>
              </th>
              <td className="py-3 px-6 text-xs text-gray-300 align-top leading-relaxed border-r border-white/10">
                <div className="flex items-start gap-2">
                  <XCircle className="size-3.5 text-red-400/90 shrink-0 mt-0.5" />
                  <span>{ROI_STANDARD.traditional}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-xs text-white font-medium bg-lime/[0.06] border-l border-r border-lime/20 align-top leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-lime shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">{ROI_STANDARD.velloxa}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile-Optimized Cards View */}
      <div className="space-y-3 md:hidden">
        {/* 3 Main Flagship Service Cards */}
        {MAIN_STANDARDS.map((row, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-4 space-y-3"
          >
            <div className="border-b border-white/10 pb-2.5">
              <span className="text-[11px] font-mono text-cyan font-semibold uppercase tracking-wider block mb-1">
                {row.niche}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white font-sans flex items-center gap-2">
                <span className="text-xs font-mono text-lime font-bold">{idx + 1}.</span>
                {row.standard}
              </h3>
            </div>

            <div className="space-y-2 text-xs leading-relaxed">
              {/* Velloxa Highlight */}
              <div className="p-3 rounded-xl border border-lime/40 bg-lime/10 text-white shadow-[0_0_15px_rgba(186,255,122,0.08)]">
                <div className="flex items-center gap-1.5 text-lime font-mono font-bold text-[10px] uppercase tracking-wider mb-1">
                  <CheckCircle2 className="size-3.5" /> Velloxa Agency
                </div>
                <p className="font-semibold text-white">{row.velloxa}</p>
              </div>

              {/* Traditional */}
              <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400">
                <span className="font-mono text-[10px] text-red-400/80 uppercase block mb-1 font-semibold flex items-center gap-1.5">
                  <XCircle className="size-3" /> Traditional Agencies
                </span>
                <p>{row.traditional}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Compact, Little ROI Box with Same Translucency & High Visibility */}
        <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-2xl p-3 space-y-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] font-mono text-cyan font-bold uppercase tracking-wider">
              {ROI_STANDARD.niche}
            </span>
            <span className="text-[11px] font-bold text-white font-sans">
              {ROI_STANDARD.standard}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {/* Velloxa - Highly Visible */}
            <div className="p-2.5 rounded-lg border border-lime/40 bg-lime/10 text-white shadow-[0_0_12px_rgba(186,255,122,0.08)]">
              <div className="flex items-center gap-1.5 text-lime font-mono font-bold text-[10px] uppercase tracking-wider mb-0.5">
                <CheckCircle2 className="size-3" /> Velloxa
              </div>
              <p className="font-semibold text-white text-[11px] leading-snug">{ROI_STANDARD.velloxa}</p>
            </div>

            {/* Traditional - Visible & Clean */}
            <div className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-300">
              <div className="flex items-center gap-1.5 text-red-400 font-mono font-bold text-[10px] uppercase tracking-wider mb-0.5">
                <XCircle className="size-3" /> Traditional
              </div>
              <p className="text-gray-300 text-[11px] leading-snug">{ROI_STANDARD.traditional}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

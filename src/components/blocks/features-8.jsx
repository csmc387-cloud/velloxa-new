import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import ChartBarIcon from '@/components/ui/chart-bar-icon'
import TerminalIcon from '@/components/ui/terminal-icon'
import BrainCircuitIcon from '@/components/ui/brain-circuit-icon'
import UsersIcon from '@/components/ui/users-icon'
import WorldIcon from '@/components/ui/world-icon'
import { motion } from 'framer-motion'

function GrowthTrendVisualizer() {
    const baselineY = 122

    return (
        <div className="w-full relative select-none mt-auto">
            <motion.svg
                className="w-full h-32 sm:h-36 lg:h-40 overflow-visible translate-y-1 sm:translate-y-2.5"
                viewBox="12 -4 328 132"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
            >
                <defs>
                    {/* Atmospheric Area Gradient Fill */}
                    <linearGradient id="growthAtmosphereGradient" x1="0" y1="0" x2="0" y2="122" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#BAFF7A" stopOpacity="0.35" />
                        <stop offset="40%" stopColor="#00FFCC" stopOpacity="0.15" />
                        <stop offset="85%" stopColor="#00FFCC" stopOpacity="0.03" />
                        <stop offset="100%" stopColor="#00FFCC" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Spiking Trendline Gradient with Seamless Alpha Fade at Start AND End */}
                    <linearGradient id="growthTrendGradient" x1="20" y1="122" x2="340" y2="10" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#00FFCC" stopOpacity="0" />
                        <stop offset="4%" stopColor="#00FFCC" stopOpacity="0.5" />
                        <stop offset="12%" stopColor="#00FFCC" stopOpacity="1" />
                        <stop offset="45%" stopColor="#2CE8B8" stopOpacity="1" />
                        <stop offset="75%" stopColor="#BAFF7A" stopOpacity="1" />
                        <stop offset="86%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="93%" stopColor="#BAFF7A" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#BAFF7A" stopOpacity="0" />
                    </linearGradient>

                    {/* Graph Sheet Micro-Grid Pattern */}
                    <pattern id="graphSheetSubGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0, 255, 204, 0.03)" strokeWidth="0.5" />
                    </pattern>

                    {/* Graph Sheet Horizontal Grid Gradient (Blending from Origin to Apex) */}
                    <linearGradient id="graphGridGradH" x1="20" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#00FFCC" stopOpacity="0.18" />
                        <stop offset="25%" stopColor="#00FFCC" stopOpacity="0.09" />
                        <stop offset="65%" stopColor="#2CE8B8" stopOpacity="0.06" />
                        <stop offset="85%" stopColor="#BAFF7A" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="#BAFF7A" stopOpacity="0" />
                    </linearGradient>

                    {/* Graph Sheet Vertical Grid Gradient (Blending from Baseline Upward) */}
                    <linearGradient id="graphGridGradV" x1="0" y1="122" x2="0" y2="15" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#00FFCC" stopOpacity="0.18" />
                        <stop offset="40%" stopColor="#00FFCC" stopOpacity="0.08" />
                        <stop offset="75%" stopColor="#2CE8B8" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="#BAFF7A" stopOpacity="0.02" />
                    </linearGradient>

                    {/* Vertical Projection Drop Lines Gradient */}
                    <linearGradient id="graphDropGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00FFCC" stopOpacity="0.32" />
                        <stop offset="60%" stopColor="#00FFCC" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#00FFCC" stopOpacity="0.02" />
                    </linearGradient>

                    {/* Soft Blend Mask for the Graph Sheet Micro Grid */}
                    <linearGradient id="gridFadeMaskGrad" x1="20" y1="122" x2="340" y2="20" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#ffffff" stopOpacity="0.6" />
                        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
                    </linearGradient>
                    <mask id="gridFadeMask">
                        <rect x="20" y="15" width="320" height="107" fill="url(#gridFadeMaskGrad)" />
                    </mask>

                    {/* Right-Edge Smooth Fade Mask for Graph and Box Blend */}
                    <linearGradient id="graphRightFadeGrad" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="76%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="88%" stopColor="#ffffff" stopOpacity="0.75" />
                        <stop offset="96%" stopColor="#ffffff" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <mask id="graphRightFadeMask">
                        <rect x="0" y="-10" width="340" height="150" fill="url(#graphRightFadeGrad)" />
                    </mask>

                    {/* Crisp Laser Glow Filter */}
                    <filter id="crispLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2.0" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="apexGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Graph Elements with Right-Edge Seamless Fade Mask */}
                <g mask="url(#graphRightFadeMask)">
                    {/* Micro Graph Sheet Grid Mesh with Origin Blending */}
                    <rect
                        x="20"
                        y="15"
                        width="320"
                        height="107"
                        fill="url(#graphSheetSubGrid)"
                        mask="url(#gridFadeMask)"
                    />

                    {/* Graph Sheet Horizontal Coordinate Lines */}
                    {[20, 37, 54, 71, 88, 105].map((yVal, idx) => (
                        <line
                            key={`gh-${idx}`}
                            x1="20"
                            y1={yVal}
                            x2="340"
                            y2={yVal}
                            stroke="url(#graphGridGradH)"
                            strokeWidth="0.8"
                            strokeDasharray="2 3"
                        />
                    ))}

                    {/* Graph Sheet Vertical Coordinate Lines */}
                    {[40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320].map((xVal, idx) => (
                        <line
                            key={`gv-${idx}`}
                            x1={xVal}
                            y1="15"
                            x2={xVal}
                            y2={baselineY}
                            stroke="url(#graphGridGradV)"
                            strokeWidth="0.8"
                            strokeDasharray="2 3"
                        />
                    ))}

                    {/* Subtle Left Axis Guide & Baseline Track */}
                    <line
                        x1="20"
                        y1="15"
                        x2="20"
                        y2={baselineY}
                        stroke="rgba(0, 255, 204, 0.22)"
                        strokeWidth="1"
                    />
                    <line
                        x1="20"
                        y1={baselineY}
                        x2="340"
                        y2={baselineY}
                        stroke="rgba(0, 255, 204, 0.22)"
                        strokeWidth="1"
                    />

                    {/* Origin Anchor Blend Point at (20, 122) */}
                    <circle cx="20" cy={baselineY} r="2" fill="#00FFCC" fillOpacity="0.8" />

                    {/* Axis Tick Marks along Left Axis & Baseline */}
                    {[20, 37, 54, 71, 88, 105, 122].map((yVal, idx) => (
                        <line
                            key={`ty-${idx}`}
                            x1="17"
                            y1={yVal}
                            x2="20"
                            y2={yVal}
                            stroke="#00FFCC"
                            strokeOpacity="0.35"
                            strokeWidth="1"
                        />
                    ))}
                    {[20, 60, 100, 140, 180, 220, 260, 300].map((xVal, idx) => (
                        <line
                            key={`tx-${idx}`}
                            x1={xVal}
                            y1={baselineY}
                            x2={xVal}
                            y2={baselineY + 3}
                            stroke="#00FFCC"
                            strokeOpacity="0.3"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Linear Origin-to-Apex Projection Guideline */}
                    <motion.path
                        d="M 20 122 L 80 105 L 165 82 L 246 54 L 340 40"
                        stroke="rgba(0, 255, 204, 0.2)"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        strokeLinejoin="miter"
                        fill="none"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: { pathLength: 1, opacity: 1, transition: { duration: 1.0, delay: 0.1, ease: "easeOut" } }
                        }}
                    />

                    {/* Vertical Projection Drop-Lines from Intermediate Peaks to Graph Sheet Baseline */}
                    {[
                        { x: 54, yTop: 70, delay: 0.35 },
                        { x: 80, yTop: 105, delay: 0.45 },
                        { x: 128, yTop: 48, delay: 0.6 },
                        { x: 165, yTop: 82, delay: 0.7 },
                        { x: 210, yTop: 24, delay: 0.85 },
                        { x: 246, yTop: 54, delay: 0.95 },
                    ].map((drop, idx) => (
                        <motion.line
                            key={`drop-${idx}`}
                            x1={drop.x}
                            y1={drop.yTop}
                            x2={drop.x}
                            y2={baselineY}
                            stroke="url(#graphDropGrad)"
                            strokeDasharray="2 2"
                            strokeWidth="0.9"
                            variants={{
                                hidden: { pathLength: 0, opacity: 0 },
                                visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: drop.delay } }
                            }}
                        />
                    ))}

                    {/* Sharp Spiking Area Fill (4 Peaks) */}
                    <motion.path
                        d="M 20 122 L 54 70 L 80 105 L 128 48 L 165 82 L 210 24 L 246 54 L 295 10 L 340 28 L 340 122 L 20 122 Z"
                        fill="url(#growthAtmosphereGradient)"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 0.9, delay: 0.25 } }
                        }}
                    />

                    {/* Main 4-Peak Spiking Frequency Curve */}
                    <motion.path
                        d="M 20 122 L 54 70 L 80 105 L 128 48 L 165 82 L 210 24 L 246 54 L 295 10 L 340 28"
                        stroke="url(#growthTrendGradient)"
                        strokeWidth="3.4"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        filter="url(#crispLaserGlow)"
                        fill="none"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0.2 },
                            visible: { pathLength: 1, opacity: 1, transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }
                        }}
                    />

                    {/* Peak Points 1, 2, 3 Diamond Vertex Markers */}
                    {[
                        { x: 54, y: 70, delay: 0.35 },
                        { x: 128, y: 48, delay: 0.6 },
                        { x: 210, y: 24, delay: 0.85 }
                    ].map((pt, idx) => (
                        <motion.polygon
                            key={idx}
                            points={`${pt.x},${pt.y - 3} ${pt.x + 3},${pt.y} ${pt.x},${pt.y + 3} ${pt.x - 3},${pt.y}`}
                            fill="#00FFCC"
                            variants={{
                                hidden: { scale: 0 },
                                visible: { scale: 1, transition: { type: "spring", stiffness: 160, delay: pt.delay } }
                            }}
                        />
                    ))}

                    {/* Vertical Projection Drop-Line from Apex Peak 4 */}
                    <motion.line
                        x1="295"
                        y1="10"
                        x2="295"
                        y2={baselineY}
                        stroke="#BAFF7A"
                        strokeOpacity="0.35"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: { pathLength: 1, opacity: 1, transition: { duration: 0.4, delay: 1.0 } }
                        }}
                    />
                </g>

                {/* Peak Point 4 (Apex Peak at x=295, y=10) with Targeting Reticle */}
                <motion.g
                    variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 140, delay: 1.05 } }
                    }}
                >
                    {/* Pulsing Breathing Outer Diamond Halo */}
                    <motion.polygon
                        points="295,-2 307,10 295,22 283,10"
                        fill="#BAFF7A"
                        fillOpacity="0.2"
                        animate={{
                            scale: [1, 1.35, 1],
                            opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <polygon
                        points="295,4 301,10 295,16 289,10"
                        stroke="#BAFF7A"
                        strokeWidth="1.2"
                        fill="none"
                        filter="url(#apexGlow)"
                    />
                    <polygon points="295,7 298,10 295,13 292,10" fill="#BAFF7A" />
                    <circle cx="295" cy="10" r="1.2" fill="#FFFFFF" />
                </motion.g>

            </motion.svg>
        </div>
    )
}

export function Features() {
    return (
        <section className="py-8 bg-transparent overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-4">

                        {/* 1. Web Engineering (top-left 2-col card) - RIGHT side entrance */}
                        <motion.div
                            initial={{ opacity: 0, x: 60, y: 35 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="col-span-full sm:col-span-3 lg:col-span-2 h-full"
                        >
                            <Card className="relative overflow-hidden liquid-glass-card h-full">
                                <CardContent className="pt-6 flex flex-col justify-start h-full space-y-3">
                                    <div className="relative flex aspect-square size-12 rounded-full border border-cyan/30 bg-cyan/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-cyan/15">
                                        <TerminalIcon size={20} className="m-auto text-lime opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <div className="relative z-10 space-y-2 text-left">
                                        <h3 className="text-xl font-display font-semibold text-white">Web Engineering</h3>
                                        <p className="text-muted text-sm leading-relaxed">Lightning-fast, mobile-first websites designed to convert visitors into consultation bookings.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 2. SME AI Integration - LEFT side entrance */}
                        <motion.div
                            initial={{ opacity: 0, x: -60, y: 35 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="col-span-full sm:col-span-3 lg:col-span-2 h-full"
                        >
                            <Card className="relative overflow-hidden liquid-glass-card h-full">
                                <CardContent className="pt-6 flex flex-col justify-start h-full space-y-3">
                                    <div className="relative flex aspect-square size-12 rounded-full border border-cyan/30 bg-cyan/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-cyan/15">
                                        <BrainCircuitIcon size={20} className="m-auto text-lime opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <div className="relative z-10 space-y-2 text-left">
                                        <h3 className="text-xl font-display font-semibold text-white">AI Integration</h3>
                                        <p className="text-muted text-sm leading-relaxed">Automate internal operations, customer intake, and more with custom AI workflows.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 3. Passion Marketing - RIGHT side entrance */}
                        <motion.div
                            initial={{ opacity: 0, x: 60, y: 35 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="col-span-full sm:col-span-3 lg:col-span-2 h-full"
                        >
                            <Card className="relative overflow-hidden liquid-glass-card h-full">
                                <CardContent className="pt-6 flex flex-col justify-start h-full space-y-3">
                                    <div className="relative flex aspect-square size-12 rounded-full border border-cyan/30 bg-cyan/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-cyan/15">
                                        <WorldIcon size={20} className="m-auto text-lime opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <div className="relative z-10 space-y-2 text-left">
                                        <h3 className="text-xl font-display font-semibold text-white">Passion Marketing</h3>
                                        <p className="text-muted text-sm leading-relaxed">Putting your SME in front of the right eyes — highest-tier SEO, social media marketing, and organic growth strategies that build lasting visibility.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 4. Growth For You (big 3-column card with growing bar graph) - LEFT side entrance */}
                        <motion.div
                            initial={{ opacity: 0, x: -60, y: 35 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="col-span-full lg:col-span-3 h-full"
                        >
                            <Card className="relative overflow-hidden liquid-glass-card h-full">
                                <CardContent className="grid h-full pt-6 sm:grid-cols-2 items-center pb-6 sm:pb-8 gap-6 sm:gap-8">
                                    <div className="relative z-10 flex flex-col justify-start space-y-3 pb-6 sm:pb-0">
                                        <div className="relative flex aspect-square size-12 rounded-full border border-cyan/30 bg-cyan/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-cyan/15">
                                            <ChartBarIcon size={20} className="m-auto text-lime opacity-80" strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-display font-semibold text-white">Growth For You</h3>
                                            <p className="text-muted text-sm">Scale revenue, acquire qualified leads, and dominate SME market share with automated conversion funnels.</p>
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-col justify-end mt-auto sm:self-end sm:pl-2">
                                        {/* Realistic Compounding SaaS Revenue Growth Visualizer */}
                                        <GrowthTrendVisualizer />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 5. Step by Step Card - RIGHT side entrance */}
                        <motion.div
                            initial={{ opacity: 0, x: 60, y: 35 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="col-span-full lg:col-span-3 h-full"
                        >
                            <Card className="relative overflow-hidden liquid-glass-card h-full">
                                <CardContent className="grid h-full pt-6 sm:grid-cols-2 items-center pb-6 sm:pb-8 gap-6 sm:gap-8">
                                    <div className="relative z-10 flex flex-col justify-start space-y-3">
                                        <div className="relative flex aspect-square size-12 rounded-full border border-cyan/30 bg-cyan/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-cyan/15">
                                            <UsersIcon size={20} className="m-auto text-lime opacity-80" strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-display font-semibold text-white">Step by Step</h3>
                                            <p className="text-muted text-sm">A transparent, milestone-driven workflow ensuring precision execution from initial audit to final launch.</p>
                                        </div>
                                    </div>

                                    {/* Clean, Streamlined Straight Horizontal Timeline for Desktop */}
                                    <div className="relative flex items-center justify-center w-full max-w-full mx-auto mt-auto sm:self-end py-1 sm:py-0 overflow-visible">
                                        <motion.svg
                                            className="w-full h-auto min-h-[110px] sm:min-h-[125px] overflow-visible translate-y-1 sm:translate-y-2"
                                            viewBox="12 0 376 72"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: "-20px" }}
                                        >
                                            <defs>
                                                {/* Laser Glow Filters */}
                                                <filter id="stepLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
                                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                                    <feMerge>
                                                        <feMergeNode in="blur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                                <filter id="tickGlow" x="-30%" y="-30%" width="160%" height="160%">
                                                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                                                    <feMerge>
                                                        <feMergeNode in="blur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>

                                                {/* Connecting Track Linear Gradient */}
                                                <linearGradient id="stepperTrackGrad" x1="40" y1="24" x2="360" y2="24" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0%" stopColor="#00FFCC" stopOpacity="0.8" />
                                                    <stop offset="50%" stopColor="#2CE8B8" stopOpacity="0.9" />
                                                    <stop offset="100%" stopColor="#BAFF7A" stopOpacity="1" />
                                                </linearGradient>
                                            </defs>

                                            {/* 1. Base Subtle Straight Track Line (Y = 24) */}
                                            <line
                                                x1="40"
                                                y1="24"
                                                x2="360"
                                                y2="24"
                                                stroke="rgba(255, 255, 255, 0.18)"
                                                strokeWidth="2.5"
                                                strokeDasharray="3 4"
                                            />

                                            {/* 2. Active Animated Linear Progress Lines */}
                                            {/* Segment 1: Node 1 -> Node 2 */}
                                            <motion.line
                                                x1="62"
                                                y1="24"
                                                x2="125"
                                                y2="24"
                                                stroke="url(#stepperTrackGrad)"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
                                                }}
                                            />
                                            {/* Segment 1 Directional Chevron */}
                                            <motion.path
                                                d="M 92 18.5 L 98 24 L 92 29.5"
                                                stroke="#00FFCC"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.8 },
                                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.45 } }
                                                }}
                                            />

                                            {/* Segment 2: Node 2 -> Node 3 */}
                                            <motion.line
                                                x1="169"
                                                y1="24"
                                                x2="232"
                                                y2="24"
                                                stroke="url(#stepperTrackGrad)"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.6 } }
                                                }}
                                            />
                                            {/* Segment 2 Directional Chevron */}
                                            <motion.path
                                                d="M 199 18.5 L 205 24 L 199 29.5"
                                                stroke="#2CE8B8"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.8 },
                                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.75 } }
                                                }}
                                            />

                                            {/* Segment 3: Node 3 -> Node 4 */}
                                            <motion.line
                                                x1="276"
                                                y1="24"
                                                x2="338"
                                                y2="24"
                                                stroke="url(#stepperTrackGrad)"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.9 } }
                                                }}
                                            />
                                            {/* Segment 3 Directional Chevron */}
                                            <motion.path
                                                d="M 305 18.5 L 311 24 L 305 29.5"
                                                stroke="#BAFF7A"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.8 },
                                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 1.05 } }
                                                }}
                                            />

                                            {/* ============================================================== */}
                                            {/* NODE 1: AUDIT (x = 40, y = 24) - PURE CYAN */}
                                            {/* ============================================================== */}
                                            <g>
                                                {/* Smoothly Rotating Outer Dotted Orbit Ring */}
                                                <motion.g
                                                    style={{ transformOrigin: "40px 24px" }}
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <circle
                                                        cx="40"
                                                        cy="24"
                                                        r="22"
                                                        stroke="#00FFCC"
                                                        strokeOpacity="0.4"
                                                        strokeWidth="1.6"
                                                        strokeDasharray="3.5 4"
                                                        fill="none"
                                                    />
                                                </motion.g>

                                                {/* Inner Cyan Core Circle */}
                                                <motion.circle
                                                    cx="40"
                                                    cy="24"
                                                    r="17"
                                                    fill="rgba(0, 255, 204, 0.22)"
                                                    stroke="#00FFCC"
                                                    strokeWidth="2.4"
                                                    filter="url(#stepLaserGlow)"
                                                    variants={{
                                                        hidden: { scale: 0 },
                                                        visible: { scale: 1, transition: { type: "spring", stiffness: 160, delay: 0.12 } }
                                                    }}
                                                />
                                                <motion.text
                                                    x="40"
                                                    y="29.5"
                                                    textAnchor="middle"
                                                    fill="#00FFCC"
                                                    fontSize="15"
                                                    fontWeight="800"
                                                    fontFamily="monospace"
                                                    variants={{
                                                        hidden: { opacity: 0 },
                                                        visible: { opacity: 1, transition: { duration: 0.3, delay: 0.22 } }
                                                    }}
                                                >
                                                    1
                                                </motion.text>
                                                <text x="40" y="61" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="700" fontFamily="sans-serif">Audit</text>
                                            </g>

                                            {/* ============================================================== */}
                                            {/* NODE 2: STRATEGY (x = 147, y = 24) - PURE CYAN */}
                                            {/* ============================================================== */}
                                            <g>
                                                {/* Smoothly Rotating Outer Dotted Orbit Ring */}
                                                <motion.g
                                                    style={{ transformOrigin: "147px 24px" }}
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <circle
                                                        cx="147"
                                                        cy="24"
                                                        r="22"
                                                        stroke="#00FFCC"
                                                        strokeOpacity="0.4"
                                                        strokeWidth="1.6"
                                                        strokeDasharray="3.5 4"
                                                        fill="none"
                                                    />
                                                </motion.g>

                                                {/* Inner Cyan Core Circle */}
                                                <motion.circle
                                                    cx="147"
                                                    cy="24"
                                                    r="17"
                                                    fill="rgba(0, 255, 204, 0.22)"
                                                    stroke="#00FFCC"
                                                    strokeWidth="2.4"
                                                    filter="url(#stepLaserGlow)"
                                                    variants={{
                                                        hidden: { scale: 0 },
                                                        visible: { scale: 1, transition: { type: "spring", stiffness: 160, delay: 0.42 } }
                                                    }}
                                                />
                                                <motion.text
                                                    x="147"
                                                    y="29.5"
                                                    textAnchor="middle"
                                                    fill="#00FFCC"
                                                    fontSize="15"
                                                    fontWeight="800"
                                                    fontFamily="monospace"
                                                    variants={{
                                                        hidden: { opacity: 0 },
                                                        visible: { opacity: 1, transition: { duration: 0.3, delay: 0.52 } }
                                                    }}
                                                >
                                                    2
                                                </motion.text>
                                                <text x="147" y="61" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="700" fontFamily="sans-serif">Strategy</text>
                                            </g>

                                            {/* ============================================================== */}
                                            {/* NODE 3: BUILD (x = 254, y = 24) - PURE CYAN */}
                                            {/* ============================================================== */}
                                            <g>
                                                {/* Smoothly Rotating Outer Dotted Orbit Ring */}
                                                <motion.g
                                                    style={{ transformOrigin: "254px 24px" }}
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <circle
                                                        cx="254"
                                                        cy="24"
                                                        r="22"
                                                        stroke="#00FFCC"
                                                        strokeOpacity="0.4"
                                                        strokeWidth="1.6"
                                                        strokeDasharray="3.5 4"
                                                        fill="none"
                                                    />
                                                </motion.g>

                                                {/* Inner Cyan Core Circle */}
                                                <motion.circle
                                                    cx="254"
                                                    cy="24"
                                                    r="17"
                                                    fill="rgba(0, 255, 204, 0.22)"
                                                    stroke="#00FFCC"
                                                    strokeWidth="2.4"
                                                    filter="url(#stepLaserGlow)"
                                                    variants={{
                                                        hidden: { scale: 0 },
                                                        visible: { scale: 1, transition: { type: "spring", stiffness: 160, delay: 0.72 } }
                                                    }}
                                                />
                                                <motion.text
                                                    x="254"
                                                    y="29.5"
                                                    textAnchor="middle"
                                                    fill="#00FFCC"
                                                    fontSize="15"
                                                    fontWeight="800"
                                                    fontFamily="monospace"
                                                    variants={{
                                                        hidden: { opacity: 0 },
                                                        visible: { opacity: 1, transition: { duration: 0.3, delay: 0.82 } }
                                                    }}
                                                >
                                                    3
                                                </motion.text>
                                                <text x="254" y="61" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="700" fontFamily="sans-serif">Build</text>
                                            </g>

                                            {/* ============================================================== */}
                                            {/* NODE 4: SCALE (x = 360, y = 24) - LIME CHECKMARK */}
                                            {/* ============================================================== */}
                                            <g>
                                                {/* Smoothly Rotating Outer Dotted Orbit Ring */}
                                                <motion.g
                                                    style={{ transformOrigin: "360px 24px" }}
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <circle
                                                        cx="360"
                                                        cy="24"
                                                        r="22.5"
                                                        stroke="#BAFF7A"
                                                        strokeOpacity="0.5"
                                                        strokeWidth="1.6"
                                                        strokeDasharray="3.5 4"
                                                        fill="none"
                                                    />
                                                </motion.g>

                                                <motion.circle
                                                    cx="360"
                                                    cy="24"
                                                    r="17.5"
                                                    fill="rgba(186, 255, 122, 0.15)"
                                                    stroke="#BAFF7A"
                                                    strokeWidth="2.6"
                                                    filter="url(#tickGlow)"
                                                    variants={{
                                                        hidden: { scale: 0 },
                                                        visible: { scale: 1, transition: { type: "spring", stiffness: 140, delay: 1.0 } }
                                                    }}
                                                />
                                                <motion.path
                                                    d="M 353 24 L 358 29 L 368 17"
                                                    stroke="#BAFF7A"
                                                    strokeWidth="3.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    filter="url(#tickGlow)"
                                                    variants={{
                                                        hidden: { pathLength: 0, opacity: 0 },
                                                        visible: { pathLength: 1, opacity: 1, transition: { duration: 0.3, delay: 1.2 } }
                                                    }}
                                                />
                                                <text x="360" y="61" textAnchor="middle" fill="#BAFF7A" fontSize="14" fontWeight="700" fontFamily="sans-serif">Scale</text>
                                            </g>
                                        </motion.svg>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    )
}

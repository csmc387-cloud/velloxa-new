import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, Bot, Code2, TrendingUp, LineChart } from 'lucide-react'
import { motion } from 'framer-motion'

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
                                <CardContent className="pt-6 flex flex-col justify-between h-full space-y-8">
                                    <div className="relative flex aspect-square size-12 rounded-full border border-lime/30 bg-lime/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-lime/15">
                                        <Code2 className="m-auto size-5 text-lime opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <div className="relative z-10 space-y-2 text-left">
                                        <h2 className="text-xl font-display font-semibold text-white">Web Engineering</h2>
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
                                <CardContent className="pt-6 flex flex-col justify-between h-full space-y-8">
                                    <div className="relative flex aspect-square size-12 rounded-full border border-cyan/30 bg-cyan/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-cyan/15">
                                        <Bot className="m-auto size-5 text-cyan opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <div className="relative z-10 space-y-2 text-left">
                                        <h2 className="text-xl font-display font-semibold text-white">AI Integration</h2>
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
                                <CardContent className="pt-6 flex flex-col justify-between h-full space-y-8">
                                    <div className="relative flex aspect-square size-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/10">
                                        <TrendingUp className="m-auto size-5 text-white opacity-80" strokeWidth={1.5} />
                                    </div>
                                    <div className="relative z-10 space-y-2 text-left">
                                        <h2 className="text-xl font-display font-semibold text-white">Passion Marketing</h2>
                                        <p className="text-muted text-sm leading-relaxed">Putting your SME in front of the right eyes — highest-tier SEO, social media marketing, and organic growth strategies that build lasting visibility.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* 4. Growth For You (big 3-column card with growing graph) - LEFT side entrance */}
                        <motion.div
                            initial={{ opacity: 0, x: -60, y: 35 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="col-span-full lg:col-span-3 h-full"
                        >
                            <Card className="relative overflow-hidden liquid-glass-card h-full">
                                <CardContent className="grid pt-6 sm:grid-cols-2 h-full">
                                    <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6 pb-6 sm:pb-0">
                                        <div className="relative flex aspect-square size-12 rounded-full border border-lime/30 bg-lime/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-lime/15">
                                            <LineChart className="m-auto size-5 text-lime opacity-80" strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-display font-semibold text-white">Growth For You</h2>
                                            <p className="text-muted text-sm">Scale revenue, acquire qualified leads, and dominate SME market share with automated conversion funnels.</p>
                                        </div>
                                    </div>
                                    <div className="rounded-tl-2xl relative -mb-6 -mr-6 mt-6 sm:mt-auto sm:self-end border-l border-t border-white/10 p-4 sm:ml-6 overflow-hidden flex items-end bg-black/20 backdrop-blur-sm">
                                        <div className="absolute left-3 top-3 flex gap-1.5 z-20">
                                            <span className="block size-2 rounded-full border border-lime/40 bg-lime shadow-sm shadow-lime/30"></span>
                                            <span className="block size-2 rounded-full border border-cyan/40 bg-cyan shadow-sm shadow-cyan/30"></span>
                                            <span className="block size-2 rounded-full border border-white/20 bg-white/20"></span>
                                        </div>

                                        {/* Pure Detailed Pointy Angular Graphic Graph (Sharp Edge Growth) */}
                                        <motion.svg
                                            className="w-full h-36 sm:h-44"
                                            viewBox="0 0 320 120"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: "-20px" }}
                                        >
                                            <defs>
                                                <linearGradient id="growthAreaGradient" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0%" stopColor="#BAFF7A" stopOpacity="0.45" />
                                                    <stop offset="60%" stopColor="#00FFCC" stopOpacity="0.12" />
                                                    <stop offset="100%" stopColor="#BAFF7A" stopOpacity="0.0" />
                                                </linearGradient>
                                                <linearGradient id="growthLineGradient" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0%" stopColor="#00FFCC" />
                                                    <stop offset="50%" stopColor="#80FFB4" />
                                                    <stop offset="100%" stopColor="#BAFF7A" />
                                                </linearGradient>
                                                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                                    <feMerge>
                                                        <feMergeNode in="blur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>

                                            {/* Grid Lines */}
                                            <line x1="20" y1="0" x2="20" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                                            <line x1="65" y1="0" x2="65" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                                            <line x1="110" y1="0" x2="110" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                                            <line x1="145" y1="0" x2="145" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                                            <line x1="200" y1="0" x2="200" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                                            <line x1="235" y1="0" x2="235" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                                            <line x1="300" y1="0" x2="300" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                                            {/* Baseline Comparison Line (dashed angular line) */}
                                            <motion.path
                                                d="M 20 106 L 90 98 L 160 90 L 230 84 L 300 78"
                                                stroke="rgba(255,255,255,0.22)"
                                                strokeWidth="1.5"
                                                strokeDasharray="4 4"
                                                strokeLinejoin="miter"
                                                fill="none"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut", delay: 0.1 } }
                                                }}
                                            />

                                            {/* Vertical Projection drop lines from sharp vertices */}
                                            <motion.line
                                                x1="110" y1="68" x2="110" y2="120"
                                                stroke="#00FFCC" strokeOpacity="0.25" strokeDasharray="2 2"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.4, delay: 0.7 } }
                                                }}
                                            />
                                            <motion.line
                                                x1="200" y1="36" x2="200" y2="120"
                                                stroke="#00FFCC" strokeOpacity="0.35" strokeDasharray="2 2"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.4, delay: 1.1 } }
                                                }}
                                            />
                                            <motion.line
                                                x1="300" y1="10" x2="300" y2="120"
                                                stroke="#BAFF7A" strokeOpacity="0.5" strokeDasharray="2 2"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.4, delay: 1.6 } }
                                                }}
                                            />

                                            {/* Pointy Gradient Area Fill */}
                                            <motion.path
                                                d="M 20 104 L 65 92 L 110 68 L 145 74 L 200 36 L 235 42 L 300 10 L 300 120 L 20 120 Z"
                                                fill="url(#growthAreaGradient)"
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    visible: { opacity: 1, transition: { duration: 1.0, delay: 1.0 } }
                                                }}
                                            />

                                            {/* Glowing Pointy Veloxa Growth Polyline (Sharp Edges) */}
                                            <motion.path
                                                d="M 20 104 L 65 92 L 110 68 L 145 74 L 200 36 L 235 42 L 300 10"
                                                stroke="url(#growthLineGradient)"
                                                strokeWidth="3.5"
                                                strokeLinejoin="miter"
                                                strokeMiterlimit="10"
                                                strokeLinecap="square"
                                                filter="url(#neonGlow)"
                                                fill="none"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0.3 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } }
                                                }}
                                            />

                                            {/* Sharp Pointed Vertex Nodes */}
                                            <motion.circle
                                                cx="65" cy="92" r="3.5" fill="#00FFCC"
                                                variants={{
                                                    hidden: { scale: 0 },
                                                    visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 0.5 } }
                                                }}
                                            />
                                            <motion.circle
                                                cx="110" cy="68" r="4.5" fill="#00FFCC"
                                                variants={{
                                                    hidden: { scale: 0 },
                                                    visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 0.7 } }
                                                }}
                                            />
                                            <motion.circle
                                                cx="145" cy="74" r="3.5" fill="#00FFCC"
                                                variants={{
                                                    hidden: { scale: 0 },
                                                    visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 0.9 } }
                                                }}
                                            />

                                            {/* Point 4 Surge Node with Halo */}
                                            <motion.circle
                                                cx="200" cy="36" r="4.5" fill="#80FFB4"
                                                variants={{
                                                    hidden: { scale: 0 },
                                                    visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 1.1 } }
                                                }}
                                            />
                                            <motion.circle
                                                cx="200" cy="36" r="9" stroke="#80FFB4" strokeOpacity="0.4" strokeWidth="1.5" fill="none"
                                                variants={{
                                                    hidden: { scale: 0, opacity: 0 },
                                                    visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 1.2 } }
                                                }}
                                            />

                                            <motion.circle
                                                cx="235" cy="42" r="3.5" fill="#BAFF7A"
                                                variants={{
                                                    hidden: { scale: 0 },
                                                    visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 1.3 } }
                                                }}
                                            />

                                            {/* Sharp Final Peak Node with Double Halo */}
                                            <motion.circle
                                                cx="300" cy="10" r="11" fill="#BAFF7A" fillOpacity="0.15"
                                                variants={{
                                                    hidden: { scale: 0, opacity: 0 },
                                                    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 1.6 } }
                                                }}
                                            />
                                            <motion.circle
                                                cx="300" cy="10" r="7" stroke="#BAFF7A" strokeOpacity="0.6" strokeWidth="1.5" fill="none"
                                                variants={{
                                                    hidden: { scale: 0, opacity: 0 },
                                                    visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 1.5 } }
                                                }}
                                            />
                                            <motion.circle
                                                cx="300" cy="10" r="4" fill="#BAFF7A"
                                                variants={{
                                                    hidden: { scale: 0 },
                                                    visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 1.5 } }
                                                }}
                                            />
                                        </motion.svg>
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
                                <CardContent className="grid h-full pt-6 sm:grid-cols-2 items-end pb-6 sm:pb-8 gap-6">
                                    <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                        <div className="relative flex aspect-square size-12 rounded-full border border-lime/30 bg-lime/10 backdrop-blur-md opacity-75 before:absolute before:-inset-2 before:rounded-full before:border before:border-lime/15">
                                            <Users className="m-auto size-6 text-lime opacity-80" strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-display font-semibold text-white">Step by Step</h2>
                                            <p className="text-muted text-sm">A transparent, milestone-driven workflow ensuring precision execution from initial audit to final launch.</p>
                                        </div>
                                    </div>

                                    {/* Prominent Straight Horizontal Timeline for Desktop */}
                                    <div className="relative flex items-center justify-center sm:mt-auto sm:mb-1 w-full max-w-full sm:max-w-xl lg:max-w-2xl mx-auto py-2 sm:py-0 sm:pl-2">
                                        <motion.svg
                                            className="w-full h-20 sm:h-28 overflow-visible"
                                            viewBox="0 0 400 65"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: "-20px" }}
                                        >
                                            <defs>
                                                <filter id="xGlow" x="-30%" y="-30%" width="160%" height="160%">
                                                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                                                    <feMerge>
                                                        <feMergeNode in="blur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>

                                            {/* Straight Dotted White Line: Segment 1 (Node 1 -> 2) */}
                                            <motion.line
                                                x1="51" y1="22" x2="124" y2="22"
                                                stroke="rgba(255, 255, 255, 0.85)"
                                                strokeWidth="3.5"
                                                strokeDasharray="1 8"
                                                strokeLinecap="round"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
                                                }}
                                            />
                                            {/* Segment 1 Midpoint Lime Arrow Chevron */}
                                            <motion.path
                                                d="M 85 18 L 91 22 L 85 26"
                                                stroke="#BAFF7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.5 },
                                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.45 } }
                                                }}
                                            />

                                            {/* Straight Dotted White Line: Segment 2 (Node 2 -> 3) */}
                                            <motion.line
                                                x1="156" y1="22" x2="229" y2="22"
                                                stroke="rgba(255, 255, 255, 0.85)"
                                                strokeWidth="3.5"
                                                strokeDasharray="1 8"
                                                strokeLinecap="round"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.6 } }
                                                }}
                                            />
                                            {/* Segment 2 Midpoint Lime Arrow Chevron */}
                                            <motion.path
                                                d="M 190 18 L 196 22 L 190 26"
                                                stroke="#BAFF7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.5 },
                                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.75 } }
                                                }}
                                            />

                                            {/* Straight Dotted White Line: Segment 3 (Node 3 -> 4 / X Marker) */}
                                            <motion.line
                                                x1="261" y1="22" x2="346" y2="22"
                                                stroke="rgba(255, 255, 255, 0.85)"
                                                strokeWidth="3.5"
                                                strokeDasharray="1 8"
                                                strokeLinecap="round"
                                                variants={{
                                                    hidden: { pathLength: 0, opacity: 0 },
                                                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.9 } }
                                                }}
                                            />
                                            {/* Segment 3 Midpoint Lime Arrow Chevron */}
                                            <motion.path
                                                d="M 302 18 L 308 22 L 302 26"
                                                stroke="#BAFF7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.5 },
                                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 1.05 } }
                                                }}
                                            />

                                            {/* Node 1: Audit */}
                                            <g>
                                                <motion.circle
                                                    cx="35" cy="22" r="14" fill="rgba(0, 255, 204, 0.15)" stroke="#00FFCC" strokeWidth="2"
                                                    variants={{
                                                        hidden: { scale: 0 },
                                                        visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 0.1 } }
                                                    }}
                                                />
                                                <motion.text
                                                    x="35" y="26" textAnchor="middle" fill="#00FFCC" fontSize="12" fontWeight="700" fontFamily="monospace"
                                                    variants={{
                                                        hidden: { opacity: 0 },
                                                        visible: { opacity: 1, transition: { duration: 0.3, delay: 0.2 } }
                                                    }}
                                                >
                                                    1
                                                </motion.text>
                                                <text x="35" y="55" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600" fontFamily="monospace">Audit</text>
                                            </g>

                                            {/* Node 2: Strategy */}
                                            <g>
                                                <motion.circle
                                                    cx="140" cy="22" r="14" fill="rgba(0, 255, 204, 0.15)" stroke="#00FFCC" strokeWidth="2"
                                                    variants={{
                                                        hidden: { scale: 0 },
                                                        visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 0.4 } }
                                                    }}
                                                />
                                                <motion.text
                                                    x="140" y="26" textAnchor="middle" fill="#00FFCC" fontSize="12" fontWeight="700" fontFamily="monospace"
                                                    variants={{
                                                        hidden: { opacity: 0 },
                                                        visible: { opacity: 1, transition: { duration: 0.3, delay: 0.5 } }
                                                    }}
                                                >
                                                    2
                                                </motion.text>
                                                <text x="140" y="55" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600" fontFamily="monospace">Strategy</text>
                                            </g>

                                            {/* Node 3: Build */}
                                            <g>
                                                <motion.circle
                                                    cx="245" cy="22" r="14" fill="rgba(186, 255, 122, 0.15)" stroke="#BAFF7A" strokeWidth="2"
                                                    variants={{
                                                        hidden: { scale: 0 },
                                                        visible: { scale: 1, transition: { type: "spring", stiffness: 120, delay: 0.7 } }
                                                    }}
                                                />
                                                <motion.text
                                                    x="245" y="26" textAnchor="middle" fill="#BAFF7A" fontSize="12" fontWeight="700" fontFamily="monospace"
                                                    variants={{
                                                        hidden: { opacity: 0 },
                                                        visible: { opacity: 1, transition: { duration: 0.3, delay: 0.8 } }
                                                    }}
                                                >
                                                    3
                                                </motion.text>
                                                <text x="245" y="55" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600" fontFamily="monospace">Build</text>
                                            </g>

                                            {/* Node 4: "X MARKS THE SPOT" (Scale) */}
                                            <g>
                                                {/* Outer Glowing Dashed Target Ring */}
                                                <motion.circle
                                                    cx="365" cy="22" r="18" stroke="#FF4D4D" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="3 3" fill="none"
                                                    variants={{
                                                        hidden: { scale: 0, opacity: 0 },
                                                        visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 1.1 } }
                                                    }}
                                                />

                                                {/* Translucent Crimson Circle Container */}
                                                <motion.circle
                                                    cx="365" cy="22" r="14" fill="rgba(255, 77, 77, 0.18)" stroke="#FF4D4D" strokeWidth="2" filter="url(#xGlow)"
                                                    variants={{
                                                        hidden: { scale: 0 },
                                                        visible: { scale: 1, transition: { type: "spring", stiffness: 140, delay: 1.0 } }
                                                    }}
                                                />

                                                {/* Crimson 'X' Mark */}
                                                <motion.path
                                                    d="M 359 16 L 371 28 M 371 16 L 359 28"
                                                    stroke="#FF4D4D"
                                                    strokeWidth="3.2"
                                                    strokeLinecap="round"
                                                    filter="url(#xGlow)"
                                                    variants={{
                                                        hidden: { pathLength: 0, opacity: 0 },
                                                        visible: { pathLength: 1, opacity: 1, transition: { duration: 0.3, delay: 1.2 } }
                                                    }}
                                                />

                                                {/* Label under X Marks the Spot */}
                                                <text x="365" y="55" textAnchor="middle" fill="#FF4D4D" fillOpacity="0.9" fontSize="11" fontWeight="700" fontFamily="monospace">Scale</text>
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

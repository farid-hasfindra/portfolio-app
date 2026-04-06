"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronRight, Search, Lightbulb, PenTool, Code, CheckCircle, Rocket, Brain, ChevronDown } from "lucide-react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import type { Project } from "@prisma/client";

const FRAMEWORK_STEPS = [
    { label: "Find Gap", icon: Search, description: "Find a gap in existing systems, processes, or workflows." },
    { label: "Problem Identify", icon: Lightbulb, description: "Identify whether the gap is an actual problem worth solving." },
    { label: "Design Solution", icon: PenTool, description: "If it's a problem, then I design an optimized solution tailored for it." },
    { label: "Build", icon: Code, description: "Build solutions efficiently using the appropriate technology stack." },
    { label: "Test", icon: CheckCircle, description: "Rigorously test the solution to ensure maximum reliability." },
    { label: "Deploy", icon: Rocket, description: "Bring the solution to the real world so that it can be used by many people." },
];

export function Projects({ projects }: { projects: Project[] }) {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);
    const [showProcess, setShowProcess] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    return (
        <section id="projects" className="py-24 relative bg-[#030014] overflow-hidden">
            {/* Advanced Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Animated particles placeholder effect */}
            <motion.div 
                animate={{ 
                    y: [0, -20, 0],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full blur-[1px]" 
            />
            <motion.div 
                animate={{ 
                    y: [0, 20, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px]" 
            />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 pb-5 py-2">
                        My Portfolio
                    </h2>
                    <p className="mt-2 text-neutral-500 text-sm md:text-base max-w-2xl mx-auto font-medium">
                        Crafting innovative solutions by bridging gaps in technology and design.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => {
                                setIsAnimating(true);
                                setShowProcess(!showProcess);
                            }}
                            className={`group flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-500 hover:scale-105 active:scale-95 ${showProcess ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'}`}
                        >
                            <Brain className={`w-4 h-4 transition-transform duration-500 ${showProcess ? 'rotate-[360deg]' : 'group-hover:rotate-12'}`} />
                            <span className="text-[11px] font-bold uppercase tracking-widest">How I Think</span>
                            <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${showProcess ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {showProcess && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: "auto", opacity: 1, marginTop: 32 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                onAnimationStart={() => setIsAnimating(true)}
                                onAnimationComplete={() => setIsAnimating(false)}
                                style={{ overflow: isAnimating ? 'hidden' : 'visible' }}
                                className="relative"
                            >
                                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md max-w-3xl mx-auto shadow-2xl relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
                                    <p className="text-[10px] font-bold text-neutral-500 mb-6 tracking-[0.2em] uppercase text-center relative z-10">
                                        The mindset framework I usually use when starting a project
                                    </p>
                                    <div className="flex flex-wrap justify-center items-start gap-y-6 gap-x-2 md:gap-x-1 mb-2 relative z-10">
                                        {FRAMEWORK_STEPS.map((step, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <div 
                                                    className="flex flex-col items-center gap-2 group w-16 cursor-pointer relative"
                                                    onMouseEnter={() => setHoveredStep(idx)}
                                                    onMouseLeave={() => setHoveredStep(null)}
                                                >
                                                    <div className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-500 shadow-xl ${hoveredStep === idx ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400 scale-110 rotate-3' : 'bg-neutral-900/50 border-white/5 text-neutral-400 group-hover:border-white/10 group-hover:text-neutral-200'}`}>
                                                        <step.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={`text-[9px] font-semibold text-center transition-colors duration-300 ${hoveredStep === idx ? 'text-cyan-400' : 'text-neutral-500 group-hover:text-neutral-300'}`}>{step.label}</span>
            
                                                    {/* Refined Tooltip for Readability & Premium Glow */}
                                                    <div className={`absolute -top-28 left-1/2 -translate-x-1/2 w-44 p-4 rounded-2xl bg-black border border-white/10 shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-500 z-[100] pointer-events-none flex flex-col items-center
                                                        ${hoveredStep === idx ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-2 scale-95'}
                                                    `} style={{ backdropFilter: 'blur(40px)', backgroundColor: 'rgba(0, 0, 0, 0.98)' }}>
                                                        <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                                                        
                                                        <p className="text-[10px] text-neutral-300 text-center leading-relaxed relative z-10">
                                                            <span className="font-bold text-cyan-400 block mb-1.5 text-[11px] tracking-wide">{step.label}</span>
                                                            {step.description}
                                                        </p>
                                                        
                                                        <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black border-b border-r border-white/10 transform rotate-45 shadow-[2px_2px_10px_rgba(34,211,238,0.05)]"></div>
                                                    </div>
                                                </div>
                                                {idx !== FRAMEWORK_STEPS.length - 1 && (
                                                    <ChevronRight className={`w-4 h-4 mx-0.5 md:mx-1.5 mt-[-18px] transition-colors duration-300 ${hoveredStep === idx || hoveredStep === idx + 1 ? 'text-cyan-500/50' : 'text-neutral-800'}`} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="h-full relative group"
                        >
                            {/* Orbital Glow behind the card */}
                            <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-[2rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <MagicCard 
                                className="h-full bg-[#0a0a0a]/90 border-white/[0.05] relative z-10 overflow-hidden shadow-2xl rounded-[2rem]" 
                                gradientColor="rgba(34, 211, 238, 0.08)"
                            >
                                <div className="flex flex-col h-full">
                                    {/* Cinematic Image Container with Aura Fill */}
                                    <div className="relative h-56 w-full overflow-hidden bg-neutral-950 transform-gpu">
                                        {/* Aura Fill: Blurred Background of the same image */}
                                        <div className="absolute inset-0 z-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={project.image}
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover blur-2xl opacity-40 scale-125 saturate-150 transform-gpu"
                                            />
                                        </div>
                                        
                                        {/* Inner Shadow Vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                                        
                                        {/* Main Sharp Image */}
                                        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="max-w-full max-h-full object-contain transform transition-transform duration-700 group-hover:scale-105 transform-gpu"
                                            />
                                        </div>

                                        {/* Floating Tag Overlay */}
                                        <div className="absolute top-4 left-4 z-30">
                                            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                                                Project
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-7 flex-grow flex flex-col justify-between">
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 tracking-tight">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div>
                                            {/* Stack Tag Container */}
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.tags.slice(0, 4).map((tag) => (
                                                    <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-neutral-500 hover:text-neutral-300 hover:border-white/10 transition-all duration-300">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 4 && (
                                                    <span className="text-[10px] text-neutral-500 italic">+{project.tags.length - 4} more</span>
                                                )}
                                            </div>
                                            
                                            {/* Glass Action Buttons */}
                                            <div className="flex gap-3">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="flex-1 h-11 rounded-xl text-xs font-bold tracking-wider border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 text-neutral-300 hover:text-white transition-all duration-500 group/btn shadow-inner" 
                                                    asChild
                                                >
                                                    <Link href={project.githubUrl} target="_blank">
                                                        <Github className="mr-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-1" /> GitHub
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    className="flex-1 h-11 rounded-xl text-xs font-bold tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-500 group/btn" 
                                                    asChild
                                                >
                                                    <Link href={project.demoUrl} target="_blank">
                                                        <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" /> Live Demo
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

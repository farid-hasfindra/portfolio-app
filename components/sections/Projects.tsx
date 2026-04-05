"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronRight, Search, Lightbulb, PenTool, Code, CheckCircle, Rocket } from "lucide-react";
import Link from "next/link";
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

    return (
        <section id="projects" className="py-20 relative bg-[#030014]">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">My Portfolio</h2>
                    <p className="mt-4 text-neutral-400 text-lg">My innovative projects are built based on gaps found in existing systems.</p>
                    <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm max-w-4xl mx-auto">
                        <p className="text-sm font-bold text-white mb-8 tracking-widest uppercase text-center">
The mindset framework I usually use when starting a project</p>
                        <div className="flex flex-wrap justify-center items-start gap-y-6 gap-x-2 md:gap-x-4 mb-6">
                            {FRAMEWORK_STEPS.map((step, idx) => (
                                <div key={step.label} className="flex items-center">
                                    <div 
                                        className="flex flex-col items-center gap-3 group w-20 cursor-pointer relative"
                                        onMouseEnter={() => setHoveredStep(idx)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                    >
                                        <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg ${hoveredStep === idx ? 'bg-purple-500/20 border-purple-500/50 text-purple-400 scale-110' : 'bg-neutral-800/50 border-neutral-700 text-neutral-300 group-hover:bg-neutral-700'}`}>
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-xs font-medium text-center transition-colors duration-300 ${hoveredStep === idx ? 'text-purple-400' : 'text-neutral-300'}`}>{step.label}</span>

                                        {/* Floating Tooltip */}
                                        <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-[#0a0a0a] border border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 z-50 pointer-events-none flex flex-col items-center
                                            ${hoveredStep === idx ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-2 scale-95'}
                                        `}>
                                            <p className="text-xs text-neutral-300 text-center leading-relaxed">
                                                <span className="font-semibold text-purple-400 block mb-1">{step.label}</span>
                                                {step.description}
                                            </p>
                                            <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0a0a0a] border-b border-r border-purple-500/30 transform rotate-45"></div>
                                        </div>
                                    </div>
                                    {idx !== FRAMEWORK_STEPS.length - 1 && (
                                        <ChevronRight className={`w-5 h-5 mx-1 md:mx-3 mt-[-28px] transition-colors duration-300 ${hoveredStep === idx || hoveredStep === idx + 1 ? 'text-purple-400/50' : 'text-neutral-600'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="h-full"
                        >
                            <MagicCard className="h-full bg-neutral-900/50 border-neutral-800" gradientColor="rgba(139, 92, 246, 0.2)">
                                <div className="flex flex-col h-full">
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent z-10" />
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between z-20 relative">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                            </div>
                                            <p className="text-neutral-400 text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-neutral-300 border-white/5">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex gap-3">
                                                <Button variant="outline" size="sm" className="w-full border-neutral-700 bg-transparent hover:bg-white/5 hover:text-white" asChild>
                                                    <Link href={project.githubUrl} target="_blank">
                                                        <Github className="mr-2 h-4 w-4" /> Code
                                                    </Link>
                                                </Button>
                                                <Button size="sm" className="w-full bg-white text-black hover:bg-neutral-200" asChild>
                                                    <Link href={project.demoUrl} target="_blank">
                                                        <ExternalLink className="mr-2 h-4 w-4" /> Demo
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

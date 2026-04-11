"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Experience as ExperienceType } from "@prisma/client";

export function Experience({ experience }: { experience: ExperienceType[] }) {
    return (
        <section id="experience" className="py-20 bg-[#030014] relative no-visible-scrollbar overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 translate-y-1/2" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 pb-4 py-2">
                        Professional Experience
                    </h2>
                    <p className="mt-2 text-neutral-500 text-sm md:text-base font-medium">My journey in the tech industry.</p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-12 relative">
                    {/* Refined Timeline line */}
                    <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent md:-translate-x-1/2" />

                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""} relative`}
                        >
                            <div className="hidden md:block w-1/2" />



                            <div className="md:w-1/2 pl-10 md:pl-0">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    animate={{ 
                                        y: [0, -25, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.5
                                    }}
                                    className="h-full"
                                >
                                    <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-300 group overflow-hidden">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="relative z-10 flex flex-col gap-2">
                                            <div className="flex justify-between items-start gap-4">
                                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                                                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter shrink-0 mt-1">{exp.period}</span>
                                            </div>
                                            <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest">{exp.company}</p>
                                            <p className="text-neutral-400 text-[11px] leading-relaxed mt-1">{exp.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

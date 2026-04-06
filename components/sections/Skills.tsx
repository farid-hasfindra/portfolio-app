"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Skill } from "@prisma/client";

export function Skills({ skills }: { skills: Skill[] }) {
    return (
        <section id="skills" className="py-24 bg-[#030014] relative overflow-hidden">
            {/* Advanced Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse transform-gpu will-change-transform" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse transform-gpu will-change-transform" style={{ animationDelay: '2s' }} />
            
            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 pb-5 py-2">
                        My Skills
                    </h2>
                    <p className="mt-2 text-neutral-500 text-sm md:text-base max-w-2xl mx-auto font-medium">
                        Modern tech stack tailored for building high-performance applications.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto pb-10">
                    {skills.map((skill, index) => {
                        const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code2;
                        return (
                            <motion.div
                                key={index}
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.15
                                }}
                                style={{ willChange: 'transform' }}
                                className="group relative transform-gpu"
                            >
                                <div className="relative p-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-500/40 hover:to-blue-500/40 transition-all duration-500 overflow-hidden shadow-xl">
                                    <div className="bg-black/80 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-3 transition-colors duration-500">
                                        <div className="relative h-5 w-5 flex items-center justify-center">
                                            <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <IconComponent className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10" />
                                        </div>
                                        <span className="text-[11px] font-bold tracking-[0.1em] text-neutral-300 group-hover:text-white transition-colors duration-300 uppercase">
                                            {skill.name}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

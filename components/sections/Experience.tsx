"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/lib/data";

export function Experience() {
    return (
        <section id="experience" className="py-20 bg-[#030014] relative no-visible-scrollbar overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 translate-y-1/2" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Professional Experience</h2>
                    <p className="mt-4 text-neutral-400 text-lg">My journey in the tech industry.</p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8 relative">
                    {/* Timeline line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-1/2" />

                    {EXPERIENCE.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""} relative`}
                        >
                            <div className="hidden md:block w-1/2" />

                            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-black z-10 md:-translate-x-1/2 mt-6" />

                            <motion.div
                                className="md:w-1/2 pl-12 md:pl-0"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const, delay: index * 0.2 }}
                            >
                                <Card className="relative overflow-hidden bg-neutral-900/50 border border-white/10 backdrop-blur-md">
                                    <CardHeader>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl text-white font-bold">{exp.role}</CardTitle>
                                                <Badge variant="outline" className="border-primary/50 text-white bg-primary/10 w-fit text-xs px-2 py-0.5">{exp.period}</Badge>
                                            </div>
                                            <CardDescription className="text-base font-medium text-cyan-400">{exp.company}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-neutral-400 text-sm leading-relaxed">{exp.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

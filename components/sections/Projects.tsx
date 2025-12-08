"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

export function Projects() {
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
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Feature Work</h2>
                    <p className="mt-4 text-neutral-400 text-lg">A selection of recent AI engineering projects.</p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {PROJECTS.map((project, index) => (
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
                                                    <Link href={project.links.github} target="_blank">
                                                        <Github className="mr-2 h-4 w-4" /> Code
                                                    </Link>
                                                </Button>
                                                <Button size="sm" className="w-full bg-white text-black hover:bg-neutral-200" asChild>
                                                    <Link href={project.links.demo} target="_blank">
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

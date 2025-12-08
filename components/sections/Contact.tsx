"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Contact() {
    return (
        <section id="contact" className="py-20 relative overflow-hidden bg-[#030014]">
            {/* Background glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10" />

            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6 text-white">Let&apos;s Work Together</h2>
                        <p className="text-neutral-400 mb-8 text-lg">
                            I&apos;m always open to discussing product design work or partnership opportunities.
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:farid06hasfindra@gmail.com" className="flex items-center gap-4 p-4 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 transition-colors border border-white/5 group">
                                <div className="bg-primary/20 p-3 rounded-full group-hover:bg-primary/30 transition-colors">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Email Me</p>
                                    <p className="text-neutral-400">farid06hasfindra@gmail.com</p>
                                </div>
                            </a>

                            <div className="flex gap-4 mt-8">
                                <Button variant="outline" size="icon" className="border-neutral-700 bg-transparent hover:bg-white/10 text-white" asChild>
                                    <Link href="https://github.com" target="_blank"><Github className="h-5 w-5" /></Link>
                                </Button>
                                <Button variant="outline" size="icon" className="border-neutral-700 bg-transparent hover:bg-white/10 text-white" asChild>
                                    <Link href="https://linkedin.com" target="_blank"><Linkedin className="h-5 w-5" /></Link>
                                </Button>
                                <Button variant="outline" size="icon" className="border-neutral-700 bg-transparent hover:bg-white/10 text-white" asChild>
                                    <Link href="https://twitter.com" target="_blank"><Twitter className="h-5 w-5" /></Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Simple Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-neutral-900/30 border border-white/10 rounded-xl p-8 shadow-2xl backdrop-blur-md"
                    >
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-neutral-300">Name</label>
                                <input
                                    id="name"
                                    className="w-full h-10 rounded-md border border-neutral-800 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full h-10 rounded-md border border-neutral-800 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-neutral-300">Message</label>
                                <textarea
                                    id="message"
                                    className="w-full min-h-[120px] rounded-md border border-neutral-800 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Tell me about your project..."
                                />
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-[0_0_20px_rgba(139,92,246,0.2)]">Send Message</Button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <footer className="mt-20 border-t border-neutral-800 py-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Farid Hasfindra. All rights reserved.</p>
                <p className="mt-2 text-xs text-neutral-500">Built with Next.js, Tailwind CSS & Framer Motion.</p>
            </footer>
        </section>
    );
}

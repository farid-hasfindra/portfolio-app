"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast-provider";
import Link from "next/link";

interface ContactProps {
    personalInfo: any;
}

export function Contact({ personalInfo }: ContactProps) {
    const normalizeUrl = (url: string | null) => {
        if (!url || url === "#") return "#";
        return url.startsWith("http") ? url : `https://${url}`;
    };

    const socialLinks = [
        { icon: Github, href: normalizeUrl(personalInfo.githubUrl), label: "GitHub", color: "hover:text-white hover:bg-neutral-800" },
        { icon: Linkedin, href: normalizeUrl(personalInfo.linkedinUrl), label: "LinkedIn", color: "hover:text-blue-400 hover:bg-blue-500/10" },
        { icon: Instagram, href: normalizeUrl(personalInfo.instagramUrl), label: "Instagram", color: "hover:text-pink-400 hover:bg-pink-500/10" }
    ];

    return (
        <section id="contact" className="pt-24 pb-20 relative bg-[#030014] overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] -z-10 animate-pulse transform-gpu will-change-transform" />
            
            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl mx-auto transform-gpu will-change-transform"
                >
                    <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 via-white/[0.02] to-cyan-500/10 shadow-2xl overflow-hidden">
                        <div className="relative z-10 bg-[#030014]/90 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-14 flex flex-col items-center text-center">
                            {/* Decorative Label */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6">
                                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                                Available for chat
                            </div>

                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white mb-4 leading-tight">
                                Let&apos;s <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Connect</span>
                            </h2>
                            
                            <p className="text-neutral-400 text-sm md:text-base mb-10 max-w-lg leading-relaxed font-medium">
                                Open for new opportunities. Ready to help your team build high-performance AI solutions.
                            </p>

                            {/* Main Contact Tile */}
                            <motion.a 
                                href={`mailto:${personalInfo.email}`}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group/mail w-full max-w-sm p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-transparent hover:from-cyan-500/40 transition-all duration-500 mb-10"
                            >
                                <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-5 flex items-center gap-4 transition-colors group-hover/mail:bg-white/[0.04]">
                                    <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover/mail:bg-cyan-500/20 group-hover/mail:border-cyan-500/40 transition-all shrink-0">
                                        <Mail className="h-6 w-6 text-cyan-400" />
                                    </div>
                                    <div className="flex flex-col items-start overflow-hidden">
                                        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold mb-0.5">Email Address</span>
                                        <span className="text-base md:text-lg text-white font-bold tracking-tight truncate w-full">
                                            {personalInfo.email}
                                        </span>
                                    </div>
                                </div>
                            </motion.a>

                            {/* Social Grid */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {socialLinks.map((social, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -3 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className={cn(
                                                "h-11 px-6 rounded-xl border-white/5 bg-white/[0.01] text-neutral-400 transition-all duration-300 gap-2.5 font-bold text-[11px] uppercase tracking-wider",
                                                social.color
                                            )} 
                                            asChild
                                        >
                                            <Link href={social.href} target="_blank" rel="noopener noreferrer">
                                                <social.icon size={16} />
                                                <span>{social.label}</span>
                                            </Link>
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import type { PersonalInfo } from "@prisma/client";

export function Hero({ personalInfo }: { personalInfo: PersonalInfo }) {
    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-[#030014]">
            {/* Spotlight Effect */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transform-gpu will-change-transform" />

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 max-w-4xl"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-sm font-medium backdrop-blur-md bg-black/40 text-white mb-4 shadow-[0_0_15px_rgba(34,211,238,0.3)] transform-gpu will-change-transform">
                        <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
                        Available for new opportunities
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 pb-6 py-2 leading-none">
                        {personalInfo.name}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 pb-2">
                        {personalInfo.title}
                    </h2>
                    <p className="text-neutral-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
                        {personalInfo.tagline}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                >
                    <Button size="lg" className="h-12 rounded-full px-12 text-sm bg-white text-black hover:bg-neutral-200 transition-all font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]" asChild>
                        <Link href="#projects">
                            View Portfolio
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

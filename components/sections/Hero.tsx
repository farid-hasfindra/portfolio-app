"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { Spotlight } from "@/components/ui/spotlight";

export function Hero() {
    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-[#030014]">
            {/* Spotlight Effect */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 max-w-4xl"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-sm font-medium backdrop-blur-md bg-black/40 text-white mb-4 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
                        Available for new opportunities
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 pb-4">
                        {PERSONAL_INFO.name}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x">
                        {PERSONAL_INFO.title}
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {PERSONAL_INFO.tagline}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 w-full justify-center"
                >
                    <Button size="lg" className="rounded-full px-8 text-lg bg-primary text-white hover:bg-primary/80 transition-all font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]" asChild>
                        <Link href="#projects">
                            View Work
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 text-lg border-neutral-700 bg-black/50 backdrop-blur-md hover:bg-neutral-900 transition-all text-white hover:border-neutral-500" asChild>
                        <Link href="/resume.pdf">
                            Download CV
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

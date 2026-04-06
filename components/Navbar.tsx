"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 px-4 md:px-0 transition-all duration-500",
                isScrolled ? "pt-4" : "pt-6"
            )}
        >
            <div 
                className={cn(
                    "container mx-auto px-6 h-14 flex items-center justify-between transition-all duration-500 rounded-full border",
                    isScrolled 
                        ? "bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-4xl" 
                        : "bg-transparent border-transparent max-w-7xl"
                )}
            >
                <Link href="/" className="text-xl font-bold tracking-tighter text-white hover:text-cyan-400 transition-colors group">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500 group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500">
                        My Portfolio
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-[13px] font-semibold text-neutral-400 hover:text-cyan-400 transition-all hover:scale-105"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#030014] border-b border-white/10"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm font-medium text-white hover:text-cyan-400 transition-colors py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

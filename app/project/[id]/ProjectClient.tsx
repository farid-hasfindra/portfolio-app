"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft, ChevronLeft, ChevronRight, Layers, Maximize2, X, ChevronDown } from "lucide-react";
import type { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface GithubLink {
    name: string;
    url: string;
}

export function ProjectClient({ project, otherProjects }: { project: Project, otherProjects: Project[] }) {
    const router = useRouter();
    const allImages = [project.image, ...(project.gallery || [])];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isGithubDropdownOpen, setIsGithubDropdownOpen] = useState(false);
    const githubDropdownRef = useRef<HTMLDivElement>(null);

    // Parse githubLinks safely from JSON field
    const githubLinks: GithubLink[] = Array.isArray(project.githubLinks)
        ? (project.githubLinks as unknown as GithubLink[])
        : [];
    const hasSingleGithubLink = githubLinks.length === 1;
    const hasMultipleGithubLinks = githubLinks.length > 1;

    // Handle ESC key to close zoom and dropdown
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsZoomed(false);
                setIsGithubDropdownOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (githubDropdownRef.current && !githubDropdownRef.current.contains(e.target as Node)) {
                setIsGithubDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <main className="min-h-screen bg-[#060606] text-[#f1f1f1] overflow-x-hidden">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full bg-[#060606]/90 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between shadow-sm">
                <div className="container mx-auto max-w-[1500px] flex items-center justify-between">
                    <Button 
                        onClick={() => router.push('/#projects')} 
                        variant="ghost"
                        className="text-neutral-300 hover:text-white hover:bg-white/10 rounded-full px-4 h-10 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1500px]">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    
                    {/* LEFT COLUMN: Main Presentation Area */}
                    <div className="flex flex-col lg:w-[75%]">
                        
                        {/* Ambient Video Mode Player Wrapper */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative mb-5 w-full"
                        >
                            
                            {/* Ambient Glow (Bleeds outside the player) */}
                            <div className="absolute -inset-4 md:-inset-8 z-0 pointer-events-none opacity-50 mix-blend-screen">
                                <img
                                    src={allImages[currentImageIndex]}
                                    alt=""
                                    className="w-full h-full object-cover blur-[80px] saturate-[2] transform-gpu transition-all duration-1000 scale-110"
                                />
                            </div>

                            {/* Actual Media Player Container */}
                            <div className="relative z-10 w-full h-[30vh] md:h-[350px] lg:h-[400px] xl:h-[450px] rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center group shadow-2xl">
                                
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        src={allImages[currentImageIndex]}
                                        alt={`${project.title} - Main View`}
                                        className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                                    />
                                </AnimatePresence>

                            {/* Image Controls */}
                            {allImages.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110 border border-white/20 z-20"
                                    >
                                        <ChevronLeft className="w-6 h-6 -ml-0.5" />
                                    </button>
                                    <button 
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110 border border-white/20 z-20"
                                    >
                                        <ChevronRight className="w-6 h-6 ml-0.5" />
                                    </button>
                                    
                                    {/* Position Indicator */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                        {allImages.map((_, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/40'}`} 
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Zoom / Fullscreen Button */}
                            <button 
                                onClick={() => setIsZoomed(true)}
                                className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110 border border-white/20 z-20"
                                title="View Fullscreen"
                            >
                                <Maximize2 className="w-5 h-5" />
                            </button>
                        </div>
                        </motion.div>

                        {/* Professional Content Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/5 shadow-xl"
                        >
                            {/* Header: Title, Actions and Tech Stack */}
                            <div className="mb-8">
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                                        {project.title}
                                    </h1>
                                    
                                    {/* Action Buttons (Icon Only for single GitHub, Dropdown for multiple) */}
                                    <div className="flex items-center gap-3 shrink-0 md:pt-1">
                                        {/* GitHub Button - Conditional */}
                                        {hasSingleGithubLink && (
                                            <Button 
                                                variant="outline"
                                                size="icon"
                                                className="h-10 w-10 md:h-12 md:w-12 rounded-full border-white/20 bg-transparent hover:bg-white/5 text-white transition-all transform hover:-translate-y-1 shadow-sm"
                                                asChild
                                                title={githubLinks[0].name || "View Source Code"}
                                            >
                                                <a href={githubLinks[0].url} target="_blank" rel="noreferrer">
                                                    <Github className="h-4 w-4 md:h-5 md:w-5" />
                                                </a>
                                            </Button>
                                        )}

                                        {hasMultipleGithubLinks && (
                                            <div className="relative" ref={githubDropdownRef}>
                                                <Button 
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-10 w-10 md:h-12 md:w-12 rounded-full border-white/20 bg-transparent hover:bg-white/5 text-white transition-all transform hover:-translate-y-1 shadow-sm relative"
                                                    onClick={() => setIsGithubDropdownOpen(prev => !prev)}
                                                    title="View Source Code"
                                                >
                                                    <Github className="h-4 w-4 md:h-5 md:w-5" />
                                                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[9px] font-extrabold text-black flex items-center justify-center">
                                                        {githubLinks.length}
                                                    </span>
                                                </Button>

                                                <AnimatePresence>
                                                    {isGithubDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                                            className="absolute right-0 top-14 z-50 min-w-[200px] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                                        >
                                                            <div className="p-2 flex flex-col gap-1">
                                                                {githubLinks.map((link, idx) => (
                                                                    <a
                                                                        key={idx}
                                                                        href={link.url}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        onClick={() => setIsGithubDropdownOpen(false)}
                                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                                                                    >
                                                                        <Github className="w-4 h-4 text-neutral-500 group-hover/item:text-white transition-colors shrink-0" />
                                                                        <span className="text-sm font-semibold text-neutral-300 group-hover/item:text-white transition-colors">
                                                                            {link.name || `Repository ${idx + 1}`}
                                                                        </span>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}

                                        {/* Live Demo Button */}
                                        {project.demoUrl && (
                                            <Button 
                                                size="icon"
                                                className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white text-black hover:bg-neutral-200 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all transform hover:-translate-y-1"
                                                asChild
                                                title="Visit Live Project"
                                            >
                                                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                                                    <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-semibold text-neutral-400 mr-2 flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Tech Stack:
                                    </span>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-bold px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10 text-cyan-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-8" />

                            {/* Detailed Description */}
                            <div className="prose prose-invert prose-lg max-w-none">
                                <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                                <div className="text-neutral-300 leading-relaxed space-y-4 font-medium text-[1.05rem]">
                                    {project.description.split('\n').map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="lg:w-[25%] flex flex-col mt-8 lg:mt-0 flex-shrink-0"
                    >
                        <div className="sticky top-24 origin-top-right w-full overflow-hidden">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                                <h2 className="text-lg font-bold text-white uppercase tracking-wider text-sm whitespace-nowrap">
                                    Explore More Projects
                                </h2>
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                {otherProjects.length > 0 ? (
                                    otherProjects.map((p) => (
                                        <Link 
                                            key={p.id} 
                                            href={`/project/${p.id}`}
                                            className="group flex gap-4 p-3 rounded-2xl hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-all"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative w-28 h-[4rem] flex-shrink-0 bg-neutral-900 rounded-xl overflow-hidden shadow-md">
                                                <img 
                                                    src={p.image} 
                                                    alt={p.title} 
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-col justify-center overflow-hidden w-full">
                                                <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 leading-snug break-words">
                                                    {p.title}
                                                </h3>
                                                <p className="text-[11px] font-medium text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                                                    {p.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-sm text-neutral-500 p-4 border border-white/5 rounded-xl bg-[#0a0a0a] text-center">
                                        No other projects added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                </div>
                
                {/* Footer Spacer */}
                <div className="h-24" />
            </div>

            {/* Zoom Lightbox Modal */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
                        onClick={() => setIsZoomed(false)} // Close when clicking background
                    >
                        {/* Close Button */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[110]"
                            title="Close Fullscreen (Esc)"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        {/* Image */}
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            src={allImages[currentImageIndex]} 
                            alt={`${project.title} - Fullscreen`} 
                            className="w-full h-full object-contain max-w-[95vw] max-h-[95vh] p-4 md:p-8 drop-shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image itself
                        />

                        {/* Arrows in Zoom Mode */}
                        {allImages.length > 1 && (
                            <>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all border border-white/20 z-[110]"
                                >
                                    <ChevronLeft className="w-8 h-8 -ml-1" />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all border border-white/20 z-[110]"
                                >
                                    <ChevronRight className="w-8 h-8 ml-1" />
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

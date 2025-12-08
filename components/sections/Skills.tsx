"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SKILLS } from "@/lib/data";

const floatingAnimationVariants = {
    initial: { y: 0 },
    animate: (index: number) => ({
        y: [0, -10, 0],
        transition: {
            duration: 3 + (index % 2),
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: index * 0.1,
        },
    }),
};

export function Skills() {
    return (
        <section id="skills" className="py-20 bg-[#030014] relative">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                        Technologies & Tools
                    </h2>
                    <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
                        My technical arsenal for building intelligent systems.
                    </p>
                </motion.div>

                <ul className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {SKILLS.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <motion.div
                                    variants={floatingAnimationVariants}
                                    initial="initial"
                                    animate="animate"
                                    custom={index}
                                    whileHover={{ scale: 1.1, translateY: -5 }}
                                >
                                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-colors h-14 flex items-center px-4">
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-6 h-6 text-primary" />
                                            <span className="font-medium text-neutral-200">{skill.name}</span>
                                        </div>
                                    </Card>
                                </motion.div>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

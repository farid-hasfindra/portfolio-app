"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Briefcase, Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";
import { addExperience, deleteExperience, reorderExperience } from "@/app/actions/experience";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    order: number;
}

interface ExperienceClientProps {
    initialExperience: ExperienceItem[];
}

export function ExperienceClient({ initialExperience }: ExperienceClientProps) {
    const { showToast } = useToast();
    const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperience);
    const [isPending, setIsPending] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    async function handleAddExperience(formData: FormData) {
        setIsPending(true);
        try {
            const result = await addExperience(formData);
            if (result?.success) {
                showToast(result.message, "success");
                (document.getElementById("add-experience-form") as HTMLFormElement)?.reset();
            } else {
                showToast(result?.message || "Failed to add experience", "error");
            }
        } catch (error) {
            showToast("An unexpected error occurred", "error");
        } finally {
            setIsPending(false);
        }
    }

    async function handleDelete(id: string) {
        setDeletingId(id);
        try {
            const result = await deleteExperience(id);
            if (result?.success) {
                showToast(result.message, "success");
                setExperiences((prev) => prev.filter(e => e.id !== id));
            } else {
                showToast(result?.message || "Failed to delete experience", "error");
            }
        } catch (error) {
            showToast("An unexpected error occurred", "error");
        } finally {
            setDeletingId(null);
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = experiences.findIndex((e) => e.id === active.id);
            const newIndex = experiences.findIndex((e) => e.id === over.id);

            const newExperiences = arrayMove(experiences, oldIndex, newIndex);
            setExperiences(newExperiences);

            const items = newExperiences.map((e: ExperienceItem, index: number) => ({
                id: e.id,
                order: index,
            }));

            const result = await reorderExperience(items);
            if (!result.success) {
                showToast(result.message, "error");
                setExperiences(experiences);
            }
        }
    }

    useEffect(() => {
        setExperiences(initialExperience);
    }, [initialExperience]);

    return (
        <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-5">
                    <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Plus size={16} className="text-cyan-400" /> Add Experience
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">Add your career milestones.</p>
                    </div>
                    <form id="add-experience-form" action={handleAddExperience} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Company</Label>
                                <Input name="company" required placeholder="e.g. Google"
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10 focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/50" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Role</Label>
                                <Input name="role" required placeholder="e.g. AI Engineer"
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10 focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/50" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm italic">Period (e.g. 2022 - Present)</Label>
                            <Input name="period" required placeholder="2022 - 2024"
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10 focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/50" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">Description</Label>
                            <Textarea name="description" required placeholder="Key responsibilities and achievements..."
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl resize-none min-h-[100px] focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/50" />
                        </div>
                        <Button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <><Plus size={16} className="mr-2" /> Add Experience</>
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
                <h3 className="font-semibold text-white">Career History ({experiences.length})</h3>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={experiences.map(e => e.id)} strategy={verticalListSortingStrategy}>
                        <div className="grid gap-3">
                            {experiences.map(exp => {
                                const isDeleting = deletingId === exp.id;
                                return (
                                    <div key={exp.id}>
                                        <SortableItem id={exp.id}>
                                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group relative">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-cyan-400">
                                                            <Briefcase size={14} />
                                                            <span className="text-xs font-bold uppercase tracking-wider">{exp.company}</span>
                                                        </div>
                                                        <h4 className="font-bold text-white text-base">{exp.role}</h4>
                                                        <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1">
                                                            <Calendar size={12} />
                                                            <span>{exp.period}</span>
                                                        </div>
                                                        <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{exp.description}</p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(exp.id)}
                                                        disabled={isDeleting}
                                                        className="p-1.5 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        {isDeleting ? (
                                                            <Loader2 className="h-4 w-4 animate-spin text-red-400" />
                                                        ) : (
                                                            <Trash2 size={16} />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </SortableItem>
                                    </div>
                                );
                            })}
                            {experiences.length === 0 && (
                                <div className="text-center py-10 text-neutral-600 bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
                                    No experience listed yet.
                                </div>
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}

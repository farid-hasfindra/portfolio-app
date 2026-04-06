"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addSkill, deleteSkill, reorderSkills } from "@/app/actions/skills";
import * as LucideIcons from "lucide-react";
import { Plus, Trash2, ExternalLink, Loader2, GripVertical } from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";
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

interface SkillItem {
    id: string;
    name: string;
    icon: string;
    order: number;
}

interface SkillsClientProps {
    initialSkills: SkillItem[];
}

export function SkillsClient({ initialSkills }: SkillsClientProps) {
    const { showToast } = useToast();
    const [skills, setSkills] = useState(initialSkills);
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

    async function handleAddSkill(formData: FormData) {
        setIsPending(true);
        try {
            const result = await addSkill(formData);
            if (result?.success) {
                showToast(result.message, "success");
                (document.getElementById("add-skill-form") as HTMLFormElement)?.reset();
            } else {
                showToast(result?.message || "Failed to add skill", "error");
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
            const result = await deleteSkill(id);
            if (result?.success) {
                showToast(result.message, "success");
                setSkills((prev: SkillItem[]) => prev.filter(s => s.id !== id));
            } else {
                showToast(result?.message || "Failed to delete skill", "error");
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
            const oldIndex = skills.findIndex((s) => s.id === active.id);
            const newIndex = skills.findIndex((s) => s.id === over.id);

            const newSkills = arrayMove(skills, oldIndex, newIndex);
            setSkills(newSkills);

            // Update in DB
            const items = newSkills.map((s: SkillItem, index: number) => ({
                id: s.id,
                order: index,
            }));

            const result = await reorderSkills(items);
            if (!result.success) {
                showToast(result.message, "error");
                setSkills(skills); // Revert
            }
        }
    }

    useEffect(() => {
        setSkills(initialSkills);
    }, [initialSkills]);

    return (
        <div className="grid gap-8 lg:grid-cols-5">
            {/* Add Form */}
            <div className="lg:col-span-2">
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-5">
                    <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Plus size={16} className="text-cyan-400" /> Add New Skill
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">Pick an icon name from Lucide React.</p>
                    </div>
                    <form id="add-skill-form" action={handleAddSkill} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">Skill Name</Label>
                            <Input
                                name="name" required
                                placeholder="e.g. TensorFlow"
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">
                                Lucide Icon Name{" "}
                                <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer"
                                    className="text-cyan-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-0.5">
                                    Browse <ExternalLink size={11} />
                                </a>
                            </Label>
                            <Input
                                name="icon"
                                placeholder="e.g. Brain (optional, default: Code2)"
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl h-10"
                            />
                        </div>
                        <Button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20"
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <><Plus size={16} className="mr-2" /> Add Skill</>
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Current Skills */}
            <div className="lg:col-span-3 space-y-4">
                <h3 className="font-semibold text-white">Current Skills ({skills.length})</h3>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={skills.map((s: SkillItem) => s.id)} strategy={verticalListSortingStrategy}>
                        <div className="grid gap-2">
                            {skills.map((skill: SkillItem) => {
                                const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code2;
                                const isDeleting = deletingId === skill.id;

                                return (
                                    <SortableItem key={skill.id} id={skill.id}>
                                        <div
                                            className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white/5">
                                                    <IconComponent size={16} className="text-cyan-400" />
                                                </div>
                                                <span className="text-sm text-neutral-200 font-medium">{skill.name}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(skill.id)}
                                                disabled={isDeleting}
                                                className="p-1.5 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                                title="Remove skill"
                                            >
                                                {isDeleting ? (
                                                    <Loader2 className="h-4 w-4 animate-spin text-red-400" />
                                                ) : (
                                                    <Trash2 size={14} />
                                                )}
                                            </Button>
                                        </div>
                                    </SortableItem>
                                );
                            })}
                            {skills.length === 0 && (
                                <div className="col-span-2 text-center py-10 text-neutral-600">No skills yet. Add one!</div>
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}

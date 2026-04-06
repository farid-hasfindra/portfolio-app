"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, ExternalLink, Github, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";
import { addProject, deleteProject, reorderProjects } from "@/app/actions/projects";
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

interface ProjectItem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    githubUrl: string;
    demoUrl: string;
    order: number;
}

interface ProjectsClientProps {
    initialProjects: ProjectItem[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
    const { showToast } = useToast();
    const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
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

    async function handleAddProject(formData: FormData) {
        setIsPending(true);
        try {
            const result = await addProject(formData);
            if (result?.success) {
                showToast(result.message, "success");
                (document.getElementById("add-project-form") as HTMLFormElement)?.reset();
            } else {
                showToast(result?.message || "Failed to add project", "error");
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
            const result = await deleteProject(id);
            if (result?.success) {
                showToast(result.message, "success");
                setProjects((prev) => prev.filter(p => p.id !== id));
            } else {
                showToast(result?.message || "Failed to delete project", "error");
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
            const oldIndex = projects.findIndex((p) => p.id === active.id);
            const newIndex = projects.findIndex((p) => p.id === over.id);

            const newProjects = arrayMove(projects, oldIndex, newIndex);
            setProjects(newProjects);

            // Update in DB
            const items = newProjects.map((p: ProjectItem, index: number) => ({
                id: p.id,
                order: index,
            }));

            const result = await reorderProjects(items);
            if (!result.success) {
                showToast(result.message, "error");
                setProjects(projects); // Revert
            }
        }
    }

    useEffect(() => {
        setProjects(initialProjects);
    }, [initialProjects]);

    return (
        <div className="grid gap-8 lg:grid-cols-5">
            {/* Add Form */}
            <div className="lg:col-span-2">
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-5">
                    <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Plus size={16} className="text-purple-400" /> Add New Project
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">Showcase your latest work.</p>
                    </div>
                    <form id="add-project-form" action={handleAddProject} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">Project Title</Label>
                            <Input
                                name="title" required
                                placeholder="e.g. AI Content Generator"
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">Description</Label>
                            <Textarea
                                name="description" required
                                placeholder="What did you build?"
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl min-h-[100px]"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Tags (comma separated)</Label>
                                <Input
                                    name="tags" required
                                    placeholder="Next.js, Python, AI"
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Image URL</Label>
                                <Input
                                    name="image" required
                                    placeholder="https://..."
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">GitHub URL</Label>
                                <Input
                                    name="githubUrl" required
                                    placeholder="https://github.com/..."
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Demo URL</Label>
                                <Input
                                    name="demoUrl" required
                                    placeholder="https://..."
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl"
                                />
                            </div>
                        </div>
                        <Button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20"
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <><Plus size={16} className="mr-2" /> Add Project</>
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            {/* List */}
            <div className="lg:col-span-3 space-y-4">
                <h3 className="font-semibold text-white">Current Projects ({projects.length})</h3>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                        <div className="grid gap-3">
                            {projects.map(project => {
                                const isDeleting = deletingId === project.id;
                                return (
                                    <SortableItem key={project.id} id={project.id}>
                                        <div className="flex bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all">
                                            <div className="w-32 sm:w-40 shrink-0 relative overflow-hidden">
                                                <img 
                                                    src={project.image} 
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-1 p-4 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-bold text-white text-base">{project.title}</h4>
                                                    <p className="text-neutral-500 text-xs mt-1 line-clamp-2">{project.description}</p>
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {project.tags.map((tag: string) => (
                                                            <span key={tag}
                                                                className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-3">
                                                        <a href={project.githubUrl} target="_blank" rel="noreferrer" 
                                                            className="text-neutral-500 hover:text-white transition-colors">
                                                            <Github size={16} />
                                                        </a>
                                                        <a href={project.demoUrl} target="_blank" rel="noreferrer"
                                                            className="text-neutral-500 hover:text-white transition-colors">
                                                            <ExternalLink size={16} />
                                                        </a>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(project.id)}
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
                                        </div>
                                    </SortableItem>
                                );
                            })}
                            {projects.length === 0 && (
                                <div className="text-center py-10 text-neutral-600 bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
                                    No projects yet.
                                </div>
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}

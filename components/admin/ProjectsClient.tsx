"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, ExternalLink, Github, Loader2, X, Pencil } from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";
import { addProject, deleteProject, reorderProjects, updateProject } from "@/app/actions/projects";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { FileUpload } from "./FileUpload";
import { motion, AnimatePresence } from "framer-motion";
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

interface GithubLink {
    name: string;
    url: string;
}

interface Attachment {
    name: string;
    url: string;
}

interface ProjectItem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    gallery: string[];
    attachments: Attachment[];
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
    
    // Add form states
    const [thumbnail, setThumbnail] = useState<string[]>([]);
    const [gallery, setGallery] = useState<string[]>([]);
    const [githubLinks, setGithubLinks] = useState<GithubLink[]>([{ name: "", url: "" }]);
    const [attachments, setAttachments] = useState<Attachment[]>([]);

    // Edit modal states
    const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
    const [editIsPending, setEditIsPending] = useState(false);
    const [editThumbnail, setEditThumbnail] = useState<string[]>([]);
    const [editGallery, setEditGallery] = useState<string[]>([]);
    const [editGithubLinks, setEditGithubLinks] = useState<GithubLink[]>([{ name: "", url: "" }]);
    const [editAttachments, setEditAttachments] = useState<Attachment[]>([]);

    const addGithubLink = () => setGithubLinks(prev => [...prev, { name: "", url: "" }]);
    const removeGithubLink = (idx: number) => setGithubLinks(prev => prev.filter((_, i) => i !== idx));
    const updateGithubLink = (idx: number, field: keyof GithubLink, value: string) =>
        setGithubLinks(prev => prev.map((link, i) => i === idx ? { ...link, [field]: value } : link));

    const addEditGithubLink = () => setEditGithubLinks(prev => [...prev, { name: "", url: "" }]);
    const removeEditGithubLink = (idx: number) => setEditGithubLinks(prev => prev.filter((_, i) => i !== idx));
    const updateEditGithubLink = (idx: number, field: keyof GithubLink, value: string) =>
        setEditGithubLinks(prev => prev.map((link, i) => i === idx ? { ...link, [field]: value } : link));

    const addAttachment = () => setAttachments(prev => [...prev, { name: "", url: "" }]);
    const removeAttachment = (idx: number) => setAttachments(prev => prev.filter((_, i) => i !== idx));
    const updateAttachment = (idx: number, field: keyof Attachment, value: string) =>
        setAttachments(prev => prev.map((att, i) => i === idx ? { ...att, [field]: value } : att));

    const addEditAttachment = () => setEditAttachments(prev => [...prev, { name: "", url: "" }]);
    const removeEditAttachment = (idx: number) => setEditAttachments(prev => prev.filter((_, i) => i !== idx));
    const updateEditAttachment = (idx: number, field: keyof Attachment, value: string) =>
        setEditAttachments(prev => prev.map((att, i) => i === idx ? { ...att, [field]: value } : att));

    const openEditModal = (project: ProjectItem) => {
        setEditingProject(project);
        setEditThumbnail(project.image ? [project.image] : []);
        setEditGallery(project.gallery || []);
        setEditGithubLinks(
            project.githubLinks?.length > 0
                ? project.githubLinks
                : [{ name: "", url: "" }]
        );
        setEditAttachments(project.attachments || []);
    };

    const closeEditModal = () => {
        setEditingProject(null);
        setEditThumbnail([]);
        setEditGallery([]);
        setEditGithubLinks([{ name: "", url: "" }]);
        setEditAttachments([]);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    async function handleAddProject(formData: FormData) {
        if (thumbnail.length === 0) {
            showToast("Please upload a thumbnail image", "error");
            return;
        }
        setIsPending(true);
        formData.append("image", thumbnail[0]);
        formData.append("gallery", JSON.stringify(gallery));
        const validLinks = githubLinks.filter(l => l.url.trim() !== "");
        formData.append("githubLinks", JSON.stringify(validLinks));
        const validAttachments = attachments.filter(a => a.url.trim() !== "");
        formData.append("attachments", JSON.stringify(validAttachments));
        try {
            const result = await addProject(formData);
            if (result?.success) {
                showToast(result.message, "success");
                setThumbnail([]);
                setGallery([]);
                setGithubLinks([{ name: "", url: "" }]);
                setAttachments([]);
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

    async function handleUpdateProject(formData: FormData) {
        if (!editingProject) return;
        if (editThumbnail.length === 0) {
            showToast("A thumbnail image is required", "error");
            return;
        }
        setEditIsPending(true);
        formData.append("image", editThumbnail[0]);
        formData.append("gallery", JSON.stringify(editGallery));
        const validLinks = editGithubLinks.filter(l => l.url.trim() !== "");
        formData.append("githubLinks", JSON.stringify(validLinks));
        const validAttachments = editAttachments.filter(a => a.url.trim() !== "");
        formData.append("attachments", JSON.stringify(validAttachments));
        try {
            const result = await updateProject(editingProject.id, formData);
            if (result?.success) {
                showToast(result.message, "success");
                // Optimistically update local state
                setProjects(prev => prev.map(p =>
                    p.id === editingProject.id
                        ? {
                            ...p,
                            title: formData.get("title") as string,
                            description: formData.get("description") as string,
                            tags: (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean),
                            image: editThumbnail[0],
                            gallery: editGallery,
                            githubLinks: validLinks,
                            demoUrl: formData.get("demoUrl") as string,
                            attachments: validAttachments,
                          }
                        : p
                ));
                closeEditModal();
            } else {
                showToast(result?.message || "Failed to update project", "error");
            }
        } catch (error) {
            showToast("An unexpected error occurred", "error");
        } finally {
            setEditIsPending(false);
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
            const items = newProjects.map((p: ProjectItem, index: number) => ({ id: p.id, order: index }));
            const result = await reorderProjects(items);
            if (!result.success) {
                showToast(result.message, "error");
                setProjects(projects);
            }
        }
    }

    useEffect(() => {
        setProjects(initialProjects);
    }, [initialProjects]);

    // Close edit modal on ESC key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeEditModal(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <>
        <div className="grid gap-8 lg:grid-cols-5">
            {/* Add Form */}
            <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 space-y-5">
                    <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Plus size={16} className="text-cyan-400" /> Add New Project
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">Showcase your latest work.</p>
                    </div>
                    <form id="add-project-form" action={handleAddProject} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">Project Title</Label>
                            <Input name="title" required placeholder="e.g. AI Content Generator"
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">Description</Label>
                            <Textarea name="description" required placeholder="What did you build?"
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl min-h-[80px]" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">Tags (comma separated)</Label>
                            <Input name="tags" required placeholder="Next.js, Python, AI"
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl" />
                        </div>
                        <div className="space-y-4 pt-2">
                            <ImageUpload endpoint="imageUploader" value={thumbnail}
                                onChange={(urls) => setThumbnail(urls)} onRemove={() => setThumbnail([])}
                                label="Project Thumbnail (Standard)" maxFiles={1} />
                            <ImageUpload endpoint="imageUploader" value={gallery}
                                onChange={(urls) => setGallery(urls)}
                                onRemove={(url) => setGallery(gallery.filter(g => g !== url))}
                                label="Gallery / Screenshots (Multiple)" maxFiles={10} />
                        </div>
                        
                        {/* Attachments - Dynamic */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-neutral-300 text-sm">Design System / Documents</Label>
                                <button type="button" onClick={addAttachment}
                                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                                    <Plus size={12} /> Add Document
                                </button>
                            </div>
                            {attachments.map((att, idx) => (
                                <div key={idx} className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 relative group">
                                    <button type="button" onClick={() => removeAttachment(idx)}
                                        className="absolute top-2 right-2 text-neutral-600 hover:text-red-400 transition-colors">
                                        <X size={14} />
                                    </button>
                                    <Input value={att.name} onChange={(e) => updateAttachment(idx, "name", e.target.value)}
                                        placeholder="Display Name (e.g. Bahasa Indonesia)"
                                        className="bg-white/[0.03] border-white/10 text-white text-xs h-8" />
                                    <FileUpload endpoint="documentUploader" value={att.url} name=""
                                        onChange={(url) => updateAttachment(idx, "url", url)}
                                        onRemove={() => updateAttachment(idx, "url", "")}
                                        label="" />
                                </div>
                            ))}
                        </div>
                        {/* GitHub Links - Dynamic */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-neutral-300 text-sm">GitHub Repositories</Label>
                                <button type="button" onClick={addGithubLink}
                                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                                    <Plus size={12} /> Add Repo
                                </button>
                            </div>
                            {githubLinks.map((link, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                    <div className="flex-1 grid grid-cols-5 gap-2">
                                        <Input value={link.name} onChange={(e) => updateGithubLink(idx, "name", e.target.value)}
                                            placeholder="Name (e.g. Frontend)"
                                            className="col-span-2 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl text-xs h-9" />
                                        <Input value={link.url} onChange={(e) => updateGithubLink(idx, "url", e.target.value)}
                                            placeholder="https://github.com/..."
                                            className="col-span-3 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl text-xs h-9" />
                                    </div>
                                    {githubLinks.length > 1 && (
                                        <button type="button" onClick={() => removeGithubLink(idx)}
                                            className="mt-1.5 text-neutral-600 hover:text-red-400 transition-colors">
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-neutral-300 text-sm">Demo URL</Label>
                            <Input name="demoUrl" placeholder="https://..."
                                className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl" />
                        </div>
                        <Button type="submit" disabled={isPending}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20">
                            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus size={16} className="mr-2" /> Add Project</>}
                        </Button>
                    </form>
                </div>
            </div>

            {/* List */}
            <div className="lg:col-span-3 space-y-4">
                <h3 className="font-semibold text-white">Current Projects ({projects.length})</h3>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                        <div className="grid gap-3">
                            {projects.map(project => {
                                const isDeleting = deletingId === project.id;
                                return (
                                    <SortableItem key={project.id} id={project.id}>
                                        <div className="flex bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all">
                                            <div className="w-32 sm:w-40 shrink-0 relative overflow-hidden bg-neutral-900/50">
                                                {project.image && (
                                                    <img src={project.image} alt={project.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                )}
                                            </div>
                                            <div className="flex-1 p-4 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-bold text-white text-base">{project.title}</h4>
                                                    <p className="text-neutral-500 text-xs mt-1 line-clamp-2">{project.description}</p>
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {project.tags.map((tag: string) => (
                                                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/5">{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-3">
                                                        {project.githubLinks?.map((link: GithubLink, i: number) => (
                                                            <a key={i} href={link.url} target="_blank" rel="noreferrer"
                                                                title={link.name || "GitHub"}
                                                                className="text-neutral-500 hover:text-white transition-colors">
                                                                <Github size={16} />
                                                            </a>
                                                        ))}
                                                        {project.demoUrl && (
                                                            <a href={project.demoUrl} target="_blank" rel="noreferrer"
                                                                className="text-neutral-500 hover:text-white transition-colors">
                                                                <ExternalLink size={16} />
                                                            </a>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {/* Edit Button */}
                                                        <Button variant="ghost" size="icon"
                                                            onClick={() => openEditModal(project)}
                                                            className="p-1.5 rounded-lg text-neutral-600 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all opacity-0 group-hover:opacity-100">
                                                            <Pencil size={15} />
                                                        </Button>
                                                        {/* Delete Button */}
                                                        <Button variant="ghost" size="icon"
                                                            onClick={() => handleDelete(project.id)}
                                                            disabled={isDeleting}
                                                            className="p-1.5 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100">
                                                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin text-red-400" /> : <Trash2 size={16} />}
                                                        </Button>
                                                    </div>
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

        {/* ===== EDIT MODAL ===== */}
        <AnimatePresence>
            {editingProject && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                        onClick={closeEditModal}
                    />

                    {/* Slide-over Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 280 }}
                        className="fixed top-0 right-0 h-full w-full max-w-xl z-50 bg-[#0c0c12] border-l border-white/10 shadow-2xl overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-[#0c0c12]/95 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <div>
                                <h2 className="font-bold text-white text-lg flex items-center gap-2">
                                    <Pencil size={16} className="text-cyan-400" /> Edit Project
                                </h2>
                                <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{editingProject.title}</p>
                            </div>
                            <button onClick={closeEditModal}
                                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Form */}
                        <form action={handleUpdateProject} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Project Title</Label>
                                <Input name="title" required defaultValue={editingProject.title}
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Description</Label>
                                <Textarea name="description" required defaultValue={editingProject.description}
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl min-h-[100px]" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Tags (comma separated)</Label>
                                <Input name="tags" required defaultValue={editingProject.tags.join(", ")}
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl" />
                            </div>

                            {/* Images */}
                            <div className="space-y-4">
                                <ImageUpload endpoint="imageUploader" value={editThumbnail}
                                    onChange={(urls) => setEditThumbnail(urls)}
                                    onRemove={() => setEditThumbnail([])}
                                    label="Project Thumbnail" maxFiles={1} />
                                <ImageUpload endpoint="imageUploader" value={editGallery}
                                    onChange={(urls) => setEditGallery(urls)}
                                    onRemove={(url) => setEditGallery(editGallery.filter(g => g !== url))}
                                    label="Gallery / Screenshots" maxFiles={10} />
                            </div>

                            {/* Edit Attachments - Dynamic */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-neutral-300 text-sm">Design System / Documents</Label>
                                    <button type="button" onClick={addEditAttachment}
                                        className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                                        <Plus size={12} /> Add Document
                                    </button>
                                </div>
                                {editAttachments.map((att, idx) => (
                                    <div key={idx} className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 relative group">
                                        <button type="button" onClick={() => removeEditAttachment(idx)}
                                            className="absolute top-2 right-2 text-neutral-600 hover:text-red-400 transition-colors">
                                            <X size={14} />
                                        </button>
                                        <Input value={att.name} onChange={(e) => updateEditAttachment(idx, "name", e.target.value)}
                                            placeholder="Display Name (e.g. Bahasa Indonesia)"
                                            className="bg-white/[0.03] border-white/10 text-white text-xs h-8" />
                                        <FileUpload endpoint="documentUploader" value={att.url} name=""
                                            onChange={(url) => updateEditAttachment(idx, "url", url)}
                                            onRemove={() => updateEditAttachment(idx, "url", "")}
                                            label="" />
                                    </div>
                                ))}
                            </div>

                            {/* GitHub Links */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-neutral-300 text-sm">GitHub Repositories</Label>
                                    <button type="button" onClick={addEditGithubLink}
                                        className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                                        <Plus size={12} /> Add Repo
                                    </button>
                                </div>
                                {editGithubLinks.map((link, idx) => (
                                    <div key={idx} className="flex gap-2 items-start">
                                        <div className="flex-1 grid grid-cols-5 gap-2">
                                            <Input value={link.name}
                                                onChange={(e) => updateEditGithubLink(idx, "name", e.target.value)}
                                                placeholder="Name (e.g. Frontend)"
                                                className="col-span-2 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl text-xs h-9" />
                                            <Input value={link.url}
                                                onChange={(e) => updateEditGithubLink(idx, "url", e.target.value)}
                                                placeholder="https://github.com/..."
                                                className="col-span-3 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl text-xs h-9" />
                                        </div>
                                        {editGithubLinks.length > 1 && (
                                            <button type="button" onClick={() => removeEditGithubLink(idx)}
                                                className="mt-1.5 text-neutral-600 hover:text-red-400 transition-colors">
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Demo URL */}
                            <div className="space-y-2">
                                <Label className="text-neutral-300 text-sm">Demo URL</Label>
                                <Input name="demoUrl" defaultValue={editingProject.demoUrl || ""}
                                    placeholder="https://..."
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 rounded-xl" />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2 pb-4">
                                <Button type="button" variant="outline" onClick={closeEditModal}
                                    className="flex-1 rounded-xl border-white/10 text-neutral-400 hover:text-white hover:bg-white/5">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={editIsPending}
                                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/20">
                                    {editIsPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        </>
    );
}

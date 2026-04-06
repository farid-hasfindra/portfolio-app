"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Type, FileText, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast-provider";
import { updatePersonalInfo } from "@/app/actions/personal-info";

interface PersonalInfoFormProps {
    info: any;
}

export function PersonalInfoForm({ info }: PersonalInfoFormProps) {
    const { showToast } = useToast();
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        try {
            const result = await updatePersonalInfo(formData);
            if (result?.success) {
                showToast(result.message, "success");
            } else {
                showToast(result?.message || "Something went wrong", "error");
            }
        } catch (error) {
            showToast("An unexpected error occurred", "error");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-300 flex items-center gap-2">
                        <User size={13} className="text-neutral-500" /> Full Name
                    </Label>
                    <Input
                        id="name" name="name"
                        defaultValue={info?.name ?? ""}
                        required
                        placeholder="e.g. Farid Hasfindra"
                        className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-300 flex items-center gap-2">
                        <Mail size={13} className="text-neutral-500" /> Email
                    </Label>
                    <Input
                        id="email" name="email" type="email"
                        defaultValue={info?.email ?? ""}
                        required
                        placeholder="you@example.com"
                        className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="title" className="text-neutral-300 flex items-center gap-2">
                    <Type size={13} className="text-neutral-500" /> Professional Title
                </Label>
                <Input
                    id="title" name="title"
                    defaultValue={info?.title ?? ""}
                    required
                    placeholder="e.g. AI Engineer"
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="tagline" className="text-neutral-300 flex items-center gap-2">
                    <Sparkles size={13} className="text-neutral-500" /> Tagline
                </Label>
                <Input
                    id="tagline" name="tagline"
                    defaultValue={info?.tagline ?? ""}
                    required
                    placeholder="e.g. Building production-ready AI systems..."
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                    <Label htmlFor="githubUrl" className="text-neutral-300">GitHub URL</Label>
                    <Input
                        id="githubUrl" name="githubUrl"
                        defaultValue={info?.githubUrl ?? ""}
                        placeholder="https://github.com/your-username"
                        className="bg-white/[0.03] border-white/10 text-white rounded-xl h-10"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedinUrl" className="text-neutral-300">LinkedIn URL</Label>
                    <Input
                        id="linkedinUrl" name="linkedinUrl"
                        defaultValue={info?.linkedinUrl ?? ""}
                        placeholder="https://linkedin.com/in/your-profile"
                        className="bg-white/[0.03] border-white/10 text-white rounded-xl h-10"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instagramUrl" className="text-neutral-300">Instagram URL</Label>
                    <Input
                        id="instagramUrl" name="instagramUrl"
                        defaultValue={info?.instagramUrl ?? ""}
                        placeholder="https://instagram.com/your-username"
                        className="bg-white/[0.03] border-white/10 text-white rounded-xl h-10"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-neutral-300 flex items-center gap-2">
                    <FileText size={13} className="text-neutral-500" /> About / Description
                </Label>
                <Textarea
                    id="description" name="description"
                    defaultValue={info?.description ?? ""}
                    required
                    rows={4}
                    className="bg-white/[0.03] border-white/10 text-white focus:border-purple-500/50 rounded-xl resize-none"
                />
            </div>

            <div className="flex justify-end pt-2">
                <Button 
                    type="submit" 
                    disabled={isPending}
                    className="px-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20 transition-all duration-200"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </div>
        </form>
    );
}

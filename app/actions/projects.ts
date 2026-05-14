"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addProject(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tagsString = formData.get("tags") as string;
    const image = formData.get("image") as string;
    const gallerySerialized = formData.get("gallery") as string;
    const githubLinksSerialized = formData.get("githubLinks") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const attachmentSerialized = formData.get("attachments") as string;
    const attachments = attachmentSerialized ? JSON.parse(attachmentSerialized) : [];
    
    const tags = tagsString.split(",").map(tag => tag.trim());
    const gallery = gallerySerialized ? JSON.parse(gallerySerialized) : [];
    const githubLinks = githubLinksSerialized ? JSON.parse(githubLinksSerialized) : [];

    const maxOrderProject = await prisma.project.findFirst({
      orderBy: { order: "desc" },
    });
    
    const newOrder = maxOrderProject ? maxOrderProject.order + 1 : 0;

    await prisma.project.create({
      data: { 
        title, 
        description, 
        tags, 
        image, 
        gallery,
        githubLinks, 
        demoUrl, 
        attachments,
        order: newOrder 
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, message: "Project added successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to add project." };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, message: "Project deleted successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to delete project." };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tagsString = formData.get("tags") as string;
    const image = formData.get("image") as string;
    const gallerySerialized = formData.get("gallery") as string;
    const githubLinksSerialized = formData.get("githubLinks") as string;
    const demoUrl = formData.get("demoUrl") as string;
    const attachmentSerialized = formData.get("attachments") as string;
    const attachments = attachmentSerialized ? JSON.parse(attachmentSerialized) : [];

    const tags = tagsString.split(",").map(tag => tag.trim()).filter(Boolean);
    const gallery = gallerySerialized ? JSON.parse(gallerySerialized) : [];
    const githubLinks = githubLinksSerialized ? JSON.parse(githubLinksSerialized) : [];

    await prisma.project.update({
      where: { id },
      data: { title, description, tags, image, gallery, githubLinks, demoUrl, attachments },
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");
    revalidatePath(`/project/${id}`);
    return { success: true, message: "Project updated successfully!" };
  } catch (error) {
    console.error("Update project error:", error);
    return { success: false, message: "Failed to update project." };
  }
}

export async function reorderProjects(items: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.project.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, message: "Projects reordered successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to reorder projects." };
  }
}

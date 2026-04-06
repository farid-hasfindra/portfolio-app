"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addProject(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tagsString = formData.get("tags") as string;
    const image = formData.get("image") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const demoUrl = formData.get("demoUrl") as string;
    
    // Defaulting to empty image if empty because the schema doesn't specify optional yet
    const tags = tagsString.split(",").map(tag => tag.trim());

    const maxOrderProject = await prisma.project.findFirst({
      orderBy: { order: "desc" },
    });
    
    const newOrder = maxOrderProject ? maxOrderProject.order + 1 : 0;

    await prisma.project.create({
      data: { title, description, tags, image, githubUrl, demoUrl, order: newOrder },
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

"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addExperience(formData: FormData) {
  try {
    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const period = formData.get("period") as string;
    const description = formData.get("description") as string;
    
    const maxOrder = await prisma.experience.findFirst({
      orderBy: { order: "desc" },
    });
    
    const newOrder = maxOrder ? maxOrder.order + 1 : 0;

    await prisma.experience.create({
      data: { company, role, period, description, order: newOrder },
    });

    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true, message: "Experience added successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to add experience." };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true, message: "Experience deleted successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to delete experience." };
  }
}

export async function reorderExperience(items: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.experience.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true, message: "Experience reordered successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to reorder experience." };
  }
}

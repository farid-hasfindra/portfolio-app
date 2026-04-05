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
    return { success: true };
  } catch (error) {
    return { error: "Failed to add experience" };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete experience" };
  }
}

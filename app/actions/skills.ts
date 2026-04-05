"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addSkill(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    
    const maxOrderSkill = await prisma.skill.findFirst({
      orderBy: { order: "desc" },
    });
    
    const newOrder = maxOrderSkill ? maxOrderSkill.order + 1 : 0;

    await prisma.skill.create({
      data: { name, icon, order: newOrder },
    });

    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error) {
    return { error: "Failed to add skill" };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete skill" };
  }
}

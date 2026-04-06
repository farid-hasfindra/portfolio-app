"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addSkill(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const icon = (formData.get("icon") as string) || "Code2";
    
    const maxOrderSkill = await prisma.skill.findFirst({
      orderBy: { order: "desc" },
    });
    
    const newOrder = maxOrderSkill ? maxOrderSkill.order + 1 : 0;

    await prisma.skill.create({
      data: { name, icon, order: newOrder },
    });

    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true, message: "Skill added successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to add skill." };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true, message: "Skill deleted successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to delete skill." };
  }
}

export async function reorderSkills(items: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.skill.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true, message: "Skills reordered successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to reorder skills." };
  }
}

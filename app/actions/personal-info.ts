"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updatePersonalInfo(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      title: formData.get("title") as string,
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string,
      email: formData.get("email") as string,
    };

    await prisma.personalInfo.update({
      where: { id: 1 },
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin/personal-info");
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update personal info" };
  }
}

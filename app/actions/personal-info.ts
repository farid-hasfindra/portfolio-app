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
      githubUrl: formData.get("githubUrl") as string,
      linkedinUrl: formData.get("linkedinUrl") as string,
      instagramUrl: formData.get("instagramUrl") as string,
    };

    console.log("Updating Personal Info with data:", data);

    await prisma.personalInfo.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });

    console.log("Personal Info updated successfully");

    revalidatePath("/");
    revalidatePath("/admin/personal-info");
    
    return;
  } catch (error) {
    console.error("Error updating personal info:", error);
    throw error; // Re-throw to see it in terminal
  }
}

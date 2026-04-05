"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  // Look up admin from database
  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return { error: "Invalid username or password" };
  }

  // Compare password against hashed value in DB
  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return { error: "Invalid username or password" };
  }

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_token", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}

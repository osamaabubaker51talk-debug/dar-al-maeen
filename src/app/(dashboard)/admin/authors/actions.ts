"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-");
}

type AuthorState = { error?: string; success?: boolean };

export async function createAuthor(
  _prevState: AuthorState,
  formData: FormData
): Promise<AuthorState> {
  const name = (formData.get("name") as string) ?? "";
  const nameAr = (formData.get("nameAr") as string) ?? "";
  const slugInput = (formData.get("slug") as string) ?? "";
  const bio = (formData.get("bio") as string) ?? "";
  const image = (formData.get("image") as string) ?? "";

  if (!name || !nameAr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const slug = slugInput || slugify(nameAr || name);

  const existing = await prisma.author.findUnique({ where: { slug } });
  if (existing) {
    return { error: "يوجد مؤلف بنفس الرابط بالفعل" };
  }

  await prisma.author.create({
    data: {
      name,
      nameAr,
      slug,
      bio: bio || null,
      image: image || null,
    },
  });

  redirect("/admin/authors");
}

export async function updateAuthor(
  _prevState: AuthorState,
  formData: FormData
): Promise<AuthorState> {
  const id = (formData.get("id") as string) ?? "";
  const name = (formData.get("name") as string) ?? "";
  const nameAr = (formData.get("nameAr") as string) ?? "";
  const slugInput = (formData.get("slug") as string) ?? "";
  const bio = (formData.get("bio") as string) ?? "";
  const image = (formData.get("image") as string) ?? "";

  if (!id) return { error: "معرف المؤلف مطلوب" };
  if (!name || !nameAr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const slug = slugInput || slugify(nameAr || name);

  await prisma.author.update({
    where: { id },
    data: {
      name,
      nameAr,
      slug,
      bio: bio || null,
      image: image || null,
    },
  });

  revalidatePath("/admin/authors");
  redirect("/admin/authors");
}

export async function deleteAuthor(id: string) {
  await prisma.author.delete({ where: { id } });
  revalidatePath("/admin/authors");
}

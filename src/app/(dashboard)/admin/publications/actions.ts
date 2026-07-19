"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type PublicationState = { error?: string; success?: boolean };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-");
}

export async function createPublication(
  _prevState: PublicationState,
  formData: FormData
): Promise<PublicationState> {
  const title = (formData.get("title") as string) ?? "";
  const titleAr = (formData.get("titleAr") as string) ?? "";
  const author = (formData.get("author") as string) ?? "";
  const content = (formData.get("content") as string) ?? "";
  const contentAr = (formData.get("contentAr") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const isPublished = formData.get("isPublished") === "on";

  if (!title || !titleAr || !author || !content || !contentAr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const slug = slugify(titleAr || title);

  await prisma.article.create({
    data: {
      title,
      titleAr,
      slug,
      author,
      category: "WEEKLY_PUBLICATION",
      content,
      contentAr,
      excerpt: excerpt || null,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    },
  });

  redirect("/admin/publications");
}

export async function deletePublication(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/publications");
}

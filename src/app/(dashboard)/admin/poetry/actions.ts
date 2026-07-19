"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type PoemState = { error?: string; success?: boolean };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-");
}

export async function createPoem(
  _prevState: PoemState,
  formData: FormData
): Promise<PoemState> {
  const titleAr = (formData.get("titleAr") as string) ?? "";
  const slug = (formData.get("slug") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const content = (formData.get("content") as string) ?? "";
  const isPublished = formData.get("isPublished") === "on";

  if (!titleAr || !content) {
    return { error: "العنوان والمحتوى مطلوبان" };
  }

  const finalSlug = slug || slugify(titleAr);

  const existing = await prisma.article.findUnique({ where: { slug: finalSlug } });
  if (existing) {
    return { error: "يوجد مقال بنفس الرابط" };
  }

  await prisma.article.create({
    data: {
      title: titleAr,
      titleAr,
      slug: finalSlug,
      author: "",
      category: "POETRY",
      content,
      contentAr: content,
      excerpt: excerpt || null,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    },
  });

  redirect("/admin/poetry");
}

export async function deletePoem(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/poetry");
}

export async function updatePoemStatus(id: string, isPublished: boolean) {
  await prisma.article.update({
    where: { id },
    data: {
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    },
  });
  revalidatePath("/admin/poetry");
}

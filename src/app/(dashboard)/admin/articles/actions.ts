"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type ArticleState = { error?: string; success?: boolean };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-");
}

export async function createArticle(
  _prevState: ArticleState,
  formData: FormData
): Promise<ArticleState> {
  const title = (formData.get("title") as string) ?? "";
  const titleAr = (formData.get("titleAr") as string) ?? "";
  const author = (formData.get("author") as string) ?? "";
  const category = (formData.get("category") as string) ?? "";
  const content = (formData.get("content") as string) ?? "";
  const contentAr = (formData.get("contentAr") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const isPublished = formData.get("isPublished") === "on";

  if (!title || !titleAr || !author || !category || !content || !contentAr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const slug = slugify(titleAr || title);

  await prisma.article.create({
    data: {
      title,
      titleAr,
      slug,
      author,
      category: category as "NEWS" | "STUDY" | "POETRY" | "WEEKLY_PUBLICATION",
      content,
      contentAr,
      excerpt: excerpt || null,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    },
  });

  redirect("/admin/articles");
}

export async function updateArticle(
  _prevState: ArticleState,
  formData: FormData
): Promise<ArticleState> {
  const id = (formData.get("id") as string) ?? "";
  const title = (formData.get("title") as string) ?? "";
  const titleAr = (formData.get("titleAr") as string) ?? "";
  const author = (formData.get("author") as string) ?? "";
  const category = (formData.get("category") as string) ?? "";
  const content = (formData.get("content") as string) ?? "";
  const contentAr = (formData.get("contentAr") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const isPublished = formData.get("isPublished") === "on";

  if (!id) return { error: "معرف المقال مطلوب" };
  if (!title || !titleAr || !author || !category || !content || !contentAr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const slug = slugify(titleAr || title);
  const existing = await prisma.article.findUnique({ where: { id } });

  await prisma.article.update({
    where: { id },
    data: {
      title,
      titleAr,
      slug,
      author,
      category: category as "NEWS" | "STUDY" | "POETRY" | "WEEKLY_PUBLICATION",
      content,
      contentAr,
      excerpt: excerpt || null,
      isPublished,
      publishedAt:
        isPublished && !existing?.publishedAt ? new Date() : existing?.publishedAt,
    },
  });

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
}

export async function togglePublish(id: string, publish: boolean) {
  await prisma.article.update({
    where: { id },
    data: {
      isPublished: publish,
      publishedAt: publish ? new Date() : null,
    },
  });
  revalidatePath("/admin/articles");
}

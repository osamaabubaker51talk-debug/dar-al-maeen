"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type StudyState = { error?: string; success?: boolean };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-");
}

export async function createStudy(
  _prevState: StudyState,
  formData: FormData
): Promise<StudyState> {
  const titleAr = (formData.get("titleAr") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const content = (formData.get("content") as string) ?? "";
  const isPublished = formData.get("isPublished") === "on";

  if (!titleAr || !content) {
    return { error: "العنوان والمحتوى مطلوبان" };
  }

  const slug = slugify(titleAr);

  await prisma.article.create({
    data: {
      title: titleAr,
      titleAr,
      slug,
      content,
      contentAr: content,
      excerpt: excerpt || null,
      author: "Admin",
      category: "STUDY",
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    },
  });

  redirect("/admin/studies");
}

export async function deleteStudy(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/studies");
}

export async function updateStudyStatus(id: string, publish: boolean) {
  await prisma.article.update({
    where: { id },
    data: {
      isPublished: publish,
      publishedAt: publish ? new Date() : null,
    },
  });
  revalidatePath("/admin/studies");
}

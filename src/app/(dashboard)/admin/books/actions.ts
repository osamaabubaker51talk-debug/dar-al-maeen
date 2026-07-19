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

type BookState = { error?: string; success?: boolean };

export async function createBook(
  _prevState: BookState,
  formData: FormData
): Promise<BookState> {
  const title = (formData.get("title") as string) ?? "";
  const titleAr = (formData.get("titleAr") as string) ?? "";
  const author = (formData.get("author") as string) ?? "";
  const authorAr = (formData.get("authorAr") as string) ?? "";
  const category = (formData.get("category") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const descriptionAr = (formData.get("descriptionAr") as string) ?? "";
  const priceStr = (formData.get("price") as string) ?? "";
  const isFree = formData.get("isFree") === "on";
  const isbn = (formData.get("isbn") as string) ?? "";
  const pagesStr = (formData.get("pages") as string) ?? "";
  const tagsRaw = (formData.get("tags") as string) ?? "";

  if (!title || !titleAr || !author || !authorAr || !category) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const slug = slugify(titleAr || title);

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const price = priceStr ? parseFloat(priceStr) : null;
  const pages = pagesStr ? parseInt(pagesStr, 10) : null;

  await prisma.book.create({
    data: {
      title,
      titleAr,
      slug,
      author,
      authorAr,
      category,
      description: description || null,
      descriptionAr: descriptionAr || null,
      price,
      isFree,
      isbn: isbn || null,
      pages,
      tags,
    },
  });

  redirect("/admin/books");
}

export async function updateBook(
  _prevState: BookState,
  formData: FormData
): Promise<BookState> {
  const id = (formData.get("id") as string) ?? "";
  const title = (formData.get("title") as string) ?? "";
  const titleAr = (formData.get("titleAr") as string) ?? "";
  const author = (formData.get("author") as string) ?? "";
  const authorAr = (formData.get("authorAr") as string) ?? "";
  const category = (formData.get("category") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const descriptionAr = (formData.get("descriptionAr") as string) ?? "";
  const priceStr = (formData.get("price") as string) ?? "";
  const isFree = formData.get("isFree") === "on";
  const isbn = (formData.get("isbn") as string) ?? "";
  const pagesStr = (formData.get("pages") as string) ?? "";
  const tagsRaw = (formData.get("tags") as string) ?? "";
  const coverImage = (formData.get("coverImage") as string) || null;
  const pdfFile = (formData.get("pdfFile") as string) || null;
  const audioFile = (formData.get("audioFile") as string) || null;

  if (!id) return { error: "معرف الكتاب مطلوب" };
  if (!title || !titleAr || !author || !authorAr || !category) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const slug = slugify(titleAr || title);
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const price = priceStr ? parseFloat(priceStr) : null;
  const pages = pagesStr ? parseInt(pagesStr, 10) : null;

  await prisma.book.update({
    where: { id },
    data: {
      title,
      titleAr,
      slug,
      author,
      authorAr,
      category,
      description: description || null,
      descriptionAr: descriptionAr || null,
      price,
      isFree,
      isbn: isbn || null,
      pages,
      tags,
      coverImage,
      pdfFile,
      audioFile,
    },
  });

  revalidatePath("/admin/books");
  redirect("/admin/books");
}

export async function deleteBook(id: string) {
  await prisma.book.delete({ where: { id } });
  revalidatePath("/admin/books");
}

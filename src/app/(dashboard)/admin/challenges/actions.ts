"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type ChallengeState = { error?: string; success?: boolean };

export async function createChallenge(
  _prevState: ChallengeState,
  formData: FormData
): Promise<ChallengeState> {
  const nameAr = (formData.get("nameAr") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const startDateStr = (formData.get("startDate") as string) ?? "";
  const endDateStr = (formData.get("endDate") as string) ?? "";
  const targetBooksStr = (formData.get("targetBooks") as string) ?? "";

  if (!nameAr || !startDateStr || !endDateStr || !targetBooksStr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const targetBooks = parseInt(targetBooksStr, 10);
  if (isNaN(targetBooks) || targetBooks < 1) {
    return { error: "عدد الكتب المستهدف يجب أن يكون رقماً أكبر من صفر" };
  }

  await prisma.readingChallenge.create({
    data: {
      name: nameAr,
      nameAr,
      description: description || null,
      startDate: new Date(startDateStr),
      endDate: new Date(endDateStr),
      targetBooks,
    },
  });

  redirect("/admin/challenges");
}

export async function deleteChallenge(id: string) {
  await prisma.readingChallenge.delete({ where: { id } });
  revalidatePath("/admin/challenges");
}

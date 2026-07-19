"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type GiftCardState = { error?: string; success?: boolean };

export async function createGiftCard(
  _prevState: GiftCardState,
  formData: FormData
): Promise<GiftCardState> {
  const code = (formData.get("code") as string) ?? "";
  const amountStr = (formData.get("amount") as string) ?? "";

  if (!code || !amountStr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    return { error: "المبلغ يجب أن يكون رقماً أكبر من صفر" };
  }

  const existing = await prisma.giftCard.findUnique({
    where: { code: code.toUpperCase() },
  });
  if (existing) {
    return { error: "كود بطاقة الهدايا موجود بالفعل" };
  }

  await prisma.giftCard.create({
    data: {
      code: code.toUpperCase(),
      amount,
      balance: amount,
    },
  });

  redirect("/admin/giftcards");
}

export async function deleteGiftCard(id: string) {
  await prisma.giftCard.delete({ where: { id } });
  revalidatePath("/admin/giftcards");
}

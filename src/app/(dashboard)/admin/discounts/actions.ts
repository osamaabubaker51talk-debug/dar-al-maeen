"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type DiscountState = { error?: string; success?: boolean };

export async function createDiscount(
  _prevState: DiscountState,
  formData: FormData
): Promise<DiscountState> {
  const code = (formData.get("code") as string) ?? "";
  const discountValueStr = (formData.get("discountValue") as string) ?? "";
  const maxUsesStr = (formData.get("maxUses") as string) ?? "";
  const expiresAtStr = (formData.get("expiresAt") as string) ?? "";

  if (!code || !discountValueStr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const discountValue = parseFloat(discountValueStr);
  if (isNaN(discountValue) || discountValue <= 0) {
    return { error: "قيمة الخصم يجب أن تكون رقماً أكبر من صفر" };
  }

  const existing = await prisma.discountCode.findUnique({
    where: { code: code.toUpperCase() },
  });
  if (existing) {
    return { error: "كود الخصم موجود بالفعل" };
  }

  const maxUses = maxUsesStr ? parseInt(maxUsesStr, 10) : null;

  await prisma.discountCode.create({
    data: {
      code: code.toUpperCase(),
      discountType: "PERCENTAGE",
      discountValue,
      maxUses,
      expiresAt: expiresAtStr ? new Date(expiresAtStr) : null,
    },
  });

  redirect("/admin/discounts");
}

export async function deleteDiscount(id: string) {
  await prisma.discountCode.delete({ where: { id } });
  revalidatePath("/admin/discounts");
}

export async function toggleDiscount(id: string) {
  const discount = await prisma.discountCode.findUnique({ where: { id } });
  if (!discount) return;

  await prisma.discountCode.update({
    where: { id },
    data: { isActive: !discount.isActive },
  });
  revalidatePath("/admin/discounts");
}

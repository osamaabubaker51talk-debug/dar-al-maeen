"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type BundleState = { error?: string; success?: boolean };

export async function createBundle(
  _prevState: BundleState,
  formData: FormData
): Promise<BundleState> {
  const name = (formData.get("name") as string) ?? "";
  const nameAr = (formData.get("nameAr") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const coverImage = (formData.get("coverImage") as string) ?? "";
  const originalPriceStr = (formData.get("originalPrice") as string) ?? "";
  const bundlePriceStr = (formData.get("bundlePrice") as string) ?? "";

  if (!name || !nameAr || !originalPriceStr || !bundlePriceStr) {
    return { error: "جميع الحقول المطلوبة يجب ملؤها" };
  }

  const originalPrice = parseFloat(originalPriceStr);
  const bundlePrice = parseFloat(bundlePriceStr);

  if (isNaN(originalPrice) || isNaN(bundlePrice)) {
    return { error: "الأسعار يجب أن تكون أرقام صحيحة" };
  }

  await prisma.bookBundle.create({
    data: {
      name,
      nameAr,
      description: description || null,
      coverImage: coverImage || null,
      originalPrice,
      bundlePrice,
    },
  });

  redirect("/admin/bundles");
}

export async function deleteBundle(id: string) {
  await prisma.bookBundle.delete({ where: { id } });
  revalidatePath("/admin/bundles");
}

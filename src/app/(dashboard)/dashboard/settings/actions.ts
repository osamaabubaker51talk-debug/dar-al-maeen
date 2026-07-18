"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

type ProfileState =
  | { error?: string; success?: boolean; name?: string; email?: string }
  | undefined;

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "غير مصرح" };
  }
  const userId = session.user.id;

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name?.trim() || !email?.trim()) {
    return { error: "يرجى ملء جميع الحقول", name, email };
  }

  if (email !== session.user.email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "البريد الإلكتروني مستخدم بالفعل", name, email };
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { name: name.trim(), email: email.trim() },
  });

  return { success: true, name: name.trim(), email: email.trim() };
}

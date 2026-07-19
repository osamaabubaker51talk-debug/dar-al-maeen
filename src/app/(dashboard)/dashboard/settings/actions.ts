"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

type ProfileState =
  | { error?: string; success?: boolean; name?: string; email?: string }
  | undefined;

export async function getProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, image: true },
  });
}

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "غير مصرح" };

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name?.trim() || !email?.trim()) {
    return { error: "يرجى ملء جميع الحقول", name, email };
  }

  if (email !== (session.user as { email?: string }).email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "البريد الإلكتروني مستخدم بالفعل", name, email };
    }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name.trim(), email: email.trim() },
  });

  return { success: true, name: name.trim(), email: email.trim() };
}

type PasswordState = { error?: string; success?: boolean } | undefined;

export async function changePassword(
  _prev: PasswordState,
  formData: FormData
): Promise<PasswordState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "غير مصرح" };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmNewPassword = formData.get("confirmNewPassword") as string;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return { error: "يرجى ملء جميع الحقول" };
  }

  if (newPassword !== confirmNewPassword) {
    return { error: "كلمتا المرور الجديدتان غير متطابقتين" };
  }

  if (newPassword.length < 8) {
    return { error: "يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل" };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { error: "المستخدم غير موجود" };

  if (user.password) {
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return { error: "كلمة المرور الحالية غير صحيحة" };
  }

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return { success: true };
}

export async function uploadAvatar(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("غير مصرح");

  const file = formData.get("avatar") as File;
  if (!file || file.size === 0) throw new Error("لا توجد صورة");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: dataUrl },
  });

  return { success: true };
}

"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function loginWithCredentials(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "يرجى ملء جميع الحقول" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    if ((err as { digest?: string })?.digest?.includes("NEXT_REDIRECT")) {
      throw err;
    }
    return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
  }
}

export async function registerUser(
  _prev: { error?: string; success?: boolean } | undefined,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password) {
    return { error: "يرجى ملء جميع الحقول" };
  }

  if (password !== confirmPassword) {
    return { error: "كلمتا المرور غير متطابقتين" };
  }

  if (password.length < 8) {
    return { error: "يجب أن تكون كلمة المرور 8 أحرف على الأقل" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    if (existing.provider === "google") {
      return { error: "هذا البريد مرتبط بحساب Google. سجّل الدخول بـ Google بدلاً من ذلك." };
    }
    return { error: "البريد الإلكتروني مستخدم بالفعل" };
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashed, provider: "credentials" },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    if ((err as { digest?: string })?.digest?.includes("NEXT_REDIRECT")) {
      throw err;
    }
    return { success: true };
  }
}

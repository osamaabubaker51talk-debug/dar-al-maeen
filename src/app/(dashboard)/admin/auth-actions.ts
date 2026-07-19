"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "admin_session";
const secret = new TextEncoder().encode(process.env.ADMIN_SECRET_KEY || "dar-al-maeen-admin-2026");

export async function adminLogin(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const key = formData.get("secretKey") as string;

  if (!key) {
    return { error: "أدخل المفتاح السري" };
  }

  if (key !== (process.env.ADMIN_SECRET_KEY || "dar-al-maeen-admin-2026")) {
    return { error: "المفتاح السري غير صحيح" };
  }

  const token = await new SignJWT({ role: "ADMIN", name: "المدير" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);
    return payload as { role: string; name: string };
  } catch {
    return null;
  }
}

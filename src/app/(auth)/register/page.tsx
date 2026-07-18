"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "../actions";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUser, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-xl font-bold text-white">
              م
            </div>
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold text-navy">
            إنشاء حساب جديد
          </h1>
          <p className="mt-1 text-sm text-navy/60">
            انضم إلى مجتمع دار المعين
          </p>
        </div>

        <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-700">
                {state.error}
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                الاسم
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                placeholder="اسمك الكامل"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                placeholder="بريدك@الالكتروني.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                placeholder="8 أحرف على الأقل"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                تأكيد كلمة المرور
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                placeholder="أعد كتابة كلمة المرور"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-primary py-3 font-bold text-white transition-colors hover:bg-primary-light disabled:opacity-50"
            >
              {pending ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-navy/60">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary-light">
            سجل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}

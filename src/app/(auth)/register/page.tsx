"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser, loginWithGoogle } from "../actions";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUser, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <img src="/logo.png" alt="دار المعين" className="h-12 w-12 rounded-full" />
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold text-navy">
            إنشاء حساب جديد
          </h1>
          <p className="mt-1 text-sm text-navy/60">
            انضم إلى مجتمع دار المعين
          </p>
        </div>

        <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
          {/* Google Login */}
          <form action={loginWithGoogle}>
            <button
              type="submit"
              className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 font-medium transition-colors hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              التسجيل بـ Google
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-navy/40">أو</span>
            </div>
          </div>

          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-700">
                {state.error}
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">الاسم</label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                placeholder="اسمك الكامل"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
                placeholder="بريدك@الالكتروني.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">كلمة المرور</label>
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
              <label className="mb-1 block text-sm font-medium text-navy">تأكيد كلمة المرور</label>
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

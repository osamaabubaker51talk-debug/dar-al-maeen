"use client";

import { useActionState } from "react";
import { adminLogin } from "../auth-actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy via-navy-light to-primary">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary font-display text-2xl font-bold text-white">
            م
          </div>
          <h1 className="font-display text-2xl font-bold text-navy">
            لوحة التحكم
          </h1>
          <p className="mt-2 text-sm text-navy/50">
            أدخل المفتاح السري للدخول
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="secretKey" className="mb-2 block text-sm font-medium text-navy/70">
              المفتاح السري
            </label>
            <input
              id="secretKey"
              name="secretKey"
              type="password"
              required
              autoFocus
              className="w-full rounded-xl border border-gold/20 bg-cream/50 px-4 py-3 text-center font-mono text-lg tracking-widest text-navy placeholder:text-navy/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-primary py-3 font-bold text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
          >
            {isPending ? "جاري التحقق..." : "دخول"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-navy/40 hover:text-primary">
            ← العودة للموقع
          </a>
        </div>
      </div>
    </div>
  );
}

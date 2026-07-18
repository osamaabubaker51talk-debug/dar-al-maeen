"use client";

import { useActionState } from "react";
import { updateProfile } from "./actions";

export default function SettingsPage() {
  const [state, formAction, pending] = useActionState(updateProfile, undefined);

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        الإعدادات
      </h2>

      <div className="max-w-lg rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
        <form action={formAction} className="space-y-5">
          {state?.success && (
            <div className="rounded-xl bg-green-50 p-3 text-center text-sm text-green-700">
              تم حفظ التغييرات بنجاح
            </div>
          )}
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
              defaultValue={state?.name ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
              placeholder="اسمك"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              defaultValue={state?.email ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
              placeholder="بريدك@الالكتروني.com"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-primary py-3 font-bold text-white transition-colors hover:bg-primary-light disabled:opacity-50"
          >
            {pending ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </form>
      </div>
    </div>
  );
}

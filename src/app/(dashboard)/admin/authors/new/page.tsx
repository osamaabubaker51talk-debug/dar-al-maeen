"use client";

import { useActionState } from "react";
import { createAuthor } from "../actions";

type AuthorState = { error?: string; success?: boolean };

const initialState: AuthorState = {};

export default function NewAuthorPage() {
  const [state, formAction, pending] = useActionState(
    createAuthor,
    initialState
  );

  return (
    <div dir="rtl">
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        إضافة مؤلف جديد
      </h2>

      {state?.error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <form
        action={formAction}
        className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              الاسم (إنجليزي) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              الاسم (عربي) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nameAr"
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              الرابط
            </label>
            <input
              type="text"
              name="slug"
              placeholder="يُولّد تلقائياً إذا ترك فارغاً"
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              صورة المؤلف
            </label>
            <input
              type="text"
              name="image"
              placeholder="رابط الصورة"
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              نبذة عن المؤلف
            </label>
            <textarea
              name="bio"
              rows={4}
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {pending ? "جاري الحفظ..." : "إضافة المؤلف"}
          </button>
          <a
            href="/admin/authors"
            className="rounded-xl border border-gold/20 px-6 py-2.5 text-sm font-medium text-navy/70 transition-colors hover:bg-cream"
          >
            إلغاء
          </a>
        </div>
      </form>
    </div>
  );
}

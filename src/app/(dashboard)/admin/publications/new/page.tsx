"use client";

import { useActionState } from "react";
import { createPublication } from "../actions";

type PublicationState = { error?: string; success?: boolean };

const initialState: PublicationState = {};

export default function NewPublicationPage() {
  const [state, formAction, pending] = useActionState(
    createPublication,
    initialState
  );

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        إضافة نشرة أسبوعية جديدة
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
              العنوان (إنجليزي) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              العنوان (عربي) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="titleAr"
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              المؤلف <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              مقتطف
            </label>
            <input
              type="text"
              name="excerpt"
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              المحتوى (إنجليزي) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              rows={6}
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              المحتوى (عربي) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="contentAr"
              rows={6}
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-navy">
              <input
                type="checkbox"
                name="isPublished"
                className="h-4 w-4 rounded border-gold/20 text-primary focus:ring-primary/20"
              />
              نشر النشرة فوراً
            </label>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {pending ? "جاري الحفظ..." : "إضافة النشرة"}
          </button>
          <a
            href="/admin/publications"
            className="rounded-xl border border-gold/20 px-6 py-2.5 text-sm font-medium text-navy/70 transition-colors hover:bg-cream"
          >
            إلغاء
          </a>
        </div>
      </form>
    </div>
  );
}

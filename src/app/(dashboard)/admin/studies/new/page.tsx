"use client";

import { useActionState } from "react";
import { createStudy } from "../actions";

type StudyState = { error?: string; success?: boolean };

const initialState: StudyState = {};

export default function NewStudyPage() {
  const [state, formAction, pending] = useActionState(
    createStudy,
    initialState
  );

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-[#1A237E]">
        إضافة دراسة جديدة
      </h2>

      {state?.error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <form
        action={formAction}
        className="rounded-2xl border border-[#D4AF37]/10 bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1A237E]">
              العنوان (عربي) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="titleAr"
              required
              className="w-full rounded-xl border border-[#D4AF37]/20 px-4 py-2.5 text-sm text-[#1A237E] placeholder:text-[#1A237E]/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1A237E]">
              المقتطف
            </label>
            <textarea
              name="excerpt"
              rows={3}
              className="w-full rounded-xl border border-[#D4AF37]/20 px-4 py-2.5 text-sm text-[#1A237E] placeholder:text-[#1A237E]/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1A237E]">
              المحتوى <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              rows={8}
              required
              className="w-full rounded-xl border border-[#D4AF37]/20 px-4 py-2.5 text-sm text-[#1A237E] placeholder:text-[#1A237E]/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none dark:text-white"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#1A237E] dark:text-white">
              <input
                type="checkbox"
                name="isPublished"
                className="h-4 w-4 rounded border-[#D4AF37]/20 text-[#D4AF37] focus:ring-[#D4AF37]/20"
              />
              نشر الدراسة فوراً
            </label>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-[#D4AF37] px-6 py-2.5 text-sm font-medium text-[#1A237E] transition-colors hover:bg-[#D4AF37]/90 disabled:opacity-50"
          >
            {pending ? "جاري الحفظ..." : "إضافة الدراسة"}
          </button>
          <a
            href="/admin/studies"
            className="rounded-xl border border-[#D4AF37]/20 px-6 py-2.5 text-sm font-medium text-[#1A237E]/70 transition-colors hover:bg-[#D4AF37]/10"
          >
            إلغاء
          </a>
        </div>
      </form>
    </div>
  );
}

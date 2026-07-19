"use client";

import { useActionState } from "react";
import { createChallenge } from "../actions";

type ChallengeState = { error?: string; success?: boolean };

const initialState: ChallengeState = {};

export default function NewChallengePage() {
  const [state, formAction, pending] = useActionState(
    createChallenge,
    initialState
  );

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        إضافة تحدي قراءة جديد
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
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              عنوان التحدي <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nameAr"
              required
              placeholder="مثال: تحدي قراءة ١٠ كتب في رمضان"
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              الوصف
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="وصف تفصيلي للتحدي..."
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              تاريخ البداية <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              تاريخ النهاية <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              عدد الكتب المستهدف <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="targetBooks"
              required
              min="1"
              placeholder="10"
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
            {pending ? "جاري الحفظ..." : "إنشاء التحدي"}
          </button>
          <a
            href="/admin/challenges"
            className="rounded-xl border border-gold/20 px-6 py-2.5 text-sm font-medium text-navy/70 transition-colors hover:bg-cream"
          >
            إلغاء
          </a>
        </div>
      </form>
    </div>
  );
}

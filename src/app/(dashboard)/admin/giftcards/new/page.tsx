"use client";

import { useActionState } from "react";
import { createGiftCard } from "../actions";

type GiftCardState = { error?: string; success?: boolean };

const initialState: GiftCardState = {};

export default function NewGiftCardPage() {
  const [state, formAction, pending] = useActionState(
    createGiftCard,
    initialState
  );

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        إضافة بطاقة هدية جديدة
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
              كود البطاقة <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              required
              placeholder="مثال: GIFT-2026-ABCD"
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 font-mono text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              المبلغ ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              required
              min="1"
              step="0.01"
              placeholder="25.00"
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
            {pending ? "جاري الحفظ..." : "إنشاء البطاقة"}
          </button>
          <a
            href="/admin/giftcards"
            className="rounded-xl border border-gold/20 px-6 py-2.5 text-sm font-medium text-navy/70 transition-colors hover:bg-cream"
          >
            إلغاء
          </a>
        </div>
      </form>
    </div>
  );
}

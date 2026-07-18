"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function ReadingListButton({
  bookId,
  initialIsInList,
}: {
  bookId: string;
  initialIsInList: boolean;
}) {
  const [isInList, setIsInList] = useState(initialIsInList);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/reading-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "حدث خطأ");
      }
      const data = (await res.json()) as { isInList: boolean };
      setIsInList(data.isInList);
      toast.success(
        data.isInList ? "تمت الإضافة لقائمة القراءة" : "تمت الإزالة من قائمة القراءة"
      );
    } catch (err) {
      toast.error((err as Error).message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
        isInList
          ? "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
          : "border-gold/20 bg-white text-navy/60 hover:bg-cream"
      } disabled:opacity-50`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {isInList ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        )}
      </svg>
      {isInList ? "في قائمة القراءة" : "إضافة للقراءة"}
    </button>
  );
}

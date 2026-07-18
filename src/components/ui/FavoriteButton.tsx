"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function FavoriteButton({
  bookId,
  initialIsFavorite,
}: {
  bookId: string;
  initialIsFavorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "حدث خطأ");
      }
      const data = (await res.json()) as { isFavorite: boolean };
      setIsFavorite(data.isFavorite);
      toast.success(data.isFavorite ? "تمت الإضافة إلى المفضلة" : "تمت الإزالة من المفضلة");
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
        isFavorite
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-gold/20 bg-white text-navy/60 hover:bg-cream"
      } disabled:opacity-50`}
    >
      <svg
        className="h-5 w-5"
        fill={isFavorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {isFavorite ? "في المفضلة" : "إضافة للمفضلة"}
    </button>
  );
}

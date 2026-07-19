"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function BuyButton({
  bookId,
  price,
  title,
}: {
  bookId: string;
  price: number;
  title: string;
}) {
  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (redirectUrl) window.location.replace(redirectUrl);
  }, [redirectUrl]);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, price, title }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "حدث خطأ");
      if (data.url) setRedirectUrl(data.url);
    } catch (err) {
      toast.error((err as Error).message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="mb-3 w-full rounded-xl bg-gold py-3 font-bold text-primary-dark transition-colors hover:bg-gold-light disabled:opacity-50"
    >
      {loading ? "جاري التوجيه..." : "شراء الكتاب"}
    </button>
  );
}

"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type CommentItem = {
  id: string;
  content: string;
  rating: number | null;
  createdAt: string | Date;
  user: { name: string | null; email: string | null };
};

function StarRating({
  value,
  onChange,
  readonly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`text-lg transition-colors ${
            star <= (hover || value) ? "text-gold-dark" : "text-navy/20"
          } ${readonly ? "cursor-default" : "cursor-pointer hover:text-gold"}`}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => onChange?.(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function CommentSection({
  bookId,
  initialComments,
}: {
  bookId: string;
  initialComments: CommentItem[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("يرجى كتابة تعليق");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          content: content.trim(),
          rating: rating || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "حدث خطأ");
      }
      const data = (await res.json()) as {
        comment: CommentItem;
        isApproved: boolean;
      };

      if (data.isApproved) {
        setComments((prev) => [data.comment, ...prev]);
      }

      setContent("");
      setRating(0);
      toast.success(
        data.isApproved ? "تم نشر تعليقك" : "تم إرسال تعليقك للمراجعة"
      );
    } catch (err) {
      toast.error((err as Error).message || "حدث خطأ");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-gold/20 bg-white p-6">
        <h3 className="mb-4 font-display text-lg font-bold text-navy">
          أضف تعليقاً
        </h3>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-navy">
            التقييم (اختياري)
          </label>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-navy">
            تعليقك
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="اكتب تعليقك هنا..."
            className="w-full rounded-xl border border-gold/20 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="rounded-xl bg-primary px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-50"
        >
          {submitting ? "جاري الإرسال..." : "إرسال التعليق"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="py-8 text-center text-navy/40">
            لا توجد تعليقات بعد. كن أول من يعلق!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-gold/10 bg-white p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {(comment.user.name ?? comment.user.email ?? "م").charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-navy">
                      {comment.user.name ?? "مستخدم"}
                    </div>
                    <div className="text-xs text-navy/40">
                      {new Date(comment.createdAt).toLocaleDateString("ar-SA")}
                    </div>
                  </div>
                </div>
                {comment.rating && (
                  <StarRating value={comment.rating} readonly />
                )}
              </div>
              <p className="text-navy/70">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

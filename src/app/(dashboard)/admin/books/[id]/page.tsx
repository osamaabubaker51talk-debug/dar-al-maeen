"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import { updateBook } from "../actions";
import { useRouter } from "next/navigation";

const categories = [
  "القرآن الكريم",
  "التفسير",
  "الحديث",
  "الفقه",
  "العقيدة",
  "السيرة",
  "التاريخ",
  "الأدب",
  "الفلسفة",
  "الchildren",
  "العلوم",
  "أخرى",
];

type BookState = { error?: string; success?: boolean };

const initialState: BookState = {};

type BookData = {
  id: string;
  title: string;
  titleAr: string;
  author: string;
  authorAr: string;
  category: string;
  description: string | null;
  descriptionAr: string | null;
  price: { toString(): string } | null;
  isFree: boolean;
  isbn: string | null;
  pages: number | null;
  tags: string[];
};

export default function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [state, formAction, pending] = useActionState(updateBook, initialState);

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/admin/books/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch(() => {
          router.push("/admin/books");
        });
    });
  }, [params, router]);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/books");
    }
  }, [state, router]);

  if (loading) {
    return (
      <div className="py-12 text-center text-navy/40">جاري التحميل...</div>
    );
  }

  if (!book) {
    return (
      <div className="py-12 text-center text-navy/40">
        الكتاب غير موجود
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        تعديل الكتاب
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
        <input type="hidden" name="id" value={book.id} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              العنوان (إنجليزي) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={book.title}
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
              defaultValue={book.titleAr}
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              المؤلف (إنجليزي) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              defaultValue={book.author}
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              المؤلف (عربي) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="authorAr"
              defaultValue={book.authorAr}
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              التصنيف <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              defaultValue={book.category}
              required
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            >
              <option value="">اختر التصنيف</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              السعر ($)
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              defaultValue={book.price?.toString() ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              defaultValue={book.isbn ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              عدد الصفحات
            </label>
            <input
              type="number"
              name="pages"
              min="0"
              defaultValue={book.pages ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              الوسوم (مفصولة بفاصلة)
            </label>
            <input
              type="text"
              name="tags"
              defaultValue={book.tags?.join(", ") ?? ""}
              placeholder="إسلام, تاريخ, فقه"
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              الوصف (إنجليزي)
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={book.description ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy">
              الوصف (عربي)
            </label>
            <textarea
              name="descriptionAr"
              rows={3}
              defaultValue={book.descriptionAr ?? ""}
              className="w-full rounded-xl border border-gold/20 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-navy">
              <input
                type="checkbox"
                name="isFree"
                defaultChecked={book.isFree}
                className="h-4 w-4 rounded border-gold/20 text-primary focus:ring-primary/20"
              />
              كتاب مجاني
            </label>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {pending ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
          <a
            href="/admin/books"
            className="rounded-xl border border-gold/20 px-6 py-2.5 text-sm font-medium text-navy/70 transition-colors hover:bg-cream"
          >
            إلغاء
          </a>
        </div>
      </form>
    </div>
  );
}

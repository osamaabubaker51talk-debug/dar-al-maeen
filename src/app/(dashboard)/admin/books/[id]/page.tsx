"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import { updateBook } from "../actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FileUpload from "@/components/ui/FileUpload";

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
  coverImage: string | null;
  pdfFile: string | null;
  audioFile: string | null;
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
  const [coverImage, setCoverImage] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<string>("");
  const [audioFile, setAudioFile] = useState<string>("");

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/admin/books/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data);
          setCoverImage(data.coverImage ?? "");
          setPdfFile(data.pdfFile ?? "");
          setAudioFile(data.audioFile ?? "");
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

        {/* File Uploads */}
        <div className="mt-6 space-y-6">
          <h3 className="border-b border-gold/10 pb-2 font-display text-sm font-bold text-navy">
            الملفات
          </h3>

          <div>
            <label className="mb-2 block text-sm font-medium text-navy">
              صورة الغلاف
            </label>
            <input type="hidden" name="coverImage" value={coverImage} />
            {coverImage && (
              <div className="mb-3">
                <img
                  src={coverImage}
                  alt="غلاف الكتاب"
                  className="max-h-40 rounded-xl object-contain"
                />
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  className="mt-2 text-xs text-red-500 hover:underline"
                >
                  إزالة الصورة
                </button>
              </div>
            )}
            <FileUpload
              onUpload={setCoverImage}
              accept="image/jpeg,image/png,image/webp"
              label="اسحب صورة الغلاف هنا أو"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-navy">
              ملف PDF
            </label>
            <input type="hidden" name="pdfFile" value={pdfFile} />
            {pdfFile && (
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-gold/10 bg-cream/50 px-4 py-3">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <span className="flex-1 truncate text-sm text-navy/70">
                  {pdfFile.split("/").pop()}
                </span>
                <button
                  type="button"
                  onClick={() => setPdfFile("")}
                  className="text-xs text-red-500 hover:underline"
                >
                  إزالة
                </button>
              </div>
            )}
            <FileUpload
              onUpload={setPdfFile}
              accept="application/pdf"
              label="اسحب ملف PDF هنا أو"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-navy">
              ملف صوتي
            </label>
            <input type="hidden" name="audioFile" value={audioFile} />
            {audioFile && (
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-gold/10 bg-cream/50 px-4 py-3">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
                <span className="flex-1 truncate text-sm text-navy/70">
                  {audioFile.split("/").pop()}
                </span>
                <button
                  type="button"
                  onClick={() => setAudioFile("")}
                  className="text-xs text-red-500 hover:underline"
                >
                  إزالة
                </button>
              </div>
            )}
            <FileUpload
              onUpload={setAudioFile}
              accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg"
              label="اسحب الملف الصوتي هنا أو"
            />
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
          <Link
            href="/admin/books"
            className="rounded-xl border border-gold/20 px-6 py-2.5 text-center text-sm font-medium text-navy/70 transition-colors hover:bg-cream"
          >
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  );
}

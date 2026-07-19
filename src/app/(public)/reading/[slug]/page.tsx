"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface BookData {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  author: string;
  authorAr: string;
  coverImage: string | null;
  description: string | null;
  descriptionAr: string | null;
  pages: number | null;
  isFree: boolean;
}

export default function ReadingPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fontSize, setFontSize] = useState(20);
  const [darkMode, setDarkMode] = useState(false);

  const progress = Math.round((currentPage / totalPages) * 100);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(`/api/books/slug/${slug}`);
        if (!res.ok) {
          if (!ignore) router.push("/books");
          return;
        }
        const data = (await res.json()) as BookData;
        if (ignore) return;
        setBook(data);
        setTotalPages(data.pages ?? 100);

        const progressRes = await fetch(`/api/books/${data.id}/progress`);
        if (progressRes.ok && !ignore) {
          const progressData = (await progressRes.json()) as { currentPage: number };
          if (progressData.currentPage) {
            setCurrentPage(progressData.currentPage);
          }
        }
      } catch {
        if (!ignore) router.push("/books");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, [slug, router]);

  useEffect(() => {
    if (!book) return;

    const timeout = setTimeout(() => {
      fetch(`/api/books/${book.id}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPage, totalPages }),
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentPage, totalPages, book]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        setCurrentPage((p) => Math.min(p + 1, totalPages));
      } else if (e.key === "ArrowLeft") {
        setCurrentPage((p) => Math.max(p - 1, 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-sm text-navy/50">جاري تحميل الكتاب...</p>
        </div>
      </div>
    );
  }

  if (!book) return null;

  const sampleContent = generateSampleContent(book.titleAr);

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-300 ${
        darkMode ? "bg-[#0F1A2E] text-cream" : "bg-[#FBF7EF] text-navy"
      }`}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="h-1 bg-gold/20 transition-all duration-500"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full bg-gradient-to-l from-gold-dark to-gold" />
        </div>
      </div>

      {/* Top Bar */}
      <header
        className={`sticky top-0 z-40 flex items-center justify-between border-b px-6 py-3 backdrop-blur-md ${
          darkMode
            ? "border-white/10 bg-[#0F1A2E]/90"
            : "border-gold/10 bg-[#FBF7EF]/90"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            href={`/books/${book.slug}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gold/10"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
          <div>
            <h1 className="font-display text-sm font-bold">{book.titleAr}</h1>
            <p
              className={`text-xs ${darkMode ? "text-cream/50" : "text-navy/40"}`}
            >
              {book.authorAr}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Font Size Controls */}
          <div
            className={`flex items-center gap-1 rounded-lg border px-2 py-1 ${
              darkMode ? "border-white/10" : "border-gold/20"
            }`}
          >
            <button
              onClick={() => setFontSize((s) => Math.max(14, s - 2))}
              className="flex h-6 w-6 items-center justify-center rounded text-sm font-bold transition-colors hover:bg-gold/10"
            >
              -
            </button>
            <span className="min-w-[2rem] text-center text-xs font-medium">
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize((s) => Math.min(32, s + 2))}
              className="flex h-6 w-6 items-center justify-center rounded text-sm font-bold transition-colors hover:bg-gold/10"
            >
              +
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              darkMode
                ? "bg-white/10 hover:bg-white/20"
                : "bg-gold/10 hover:bg-gold/20"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Reading Area */}
      <main className="mx-auto flex-1 w-full max-w-3xl px-6 py-12">
        <div
          className={`rounded-3xl border p-8 md:p-12 ${
            darkMode
              ? "border-white/10 bg-[#162038]"
              : "border-gold/15 bg-white shadow-sm"
          }`}
        >
          {/* Book Header */}
          <div
            className="mb-10 border-b pb-8"
            style={{
              borderColor: darkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(212,175,55,0.15)",
            }}
          >
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              {book.titleAr}
            </h2>
            <p
              className={`mt-2 font-display text-lg ${
                darkMode ? "text-cream/60" : "text-navy/50"
              }`}
            >
              {book.authorAr}
            </p>
          </div>

          {/* Page Content */}
          <article
            className="leading-[2.2] font-display"
            style={{ fontSize: `${fontSize}px` }}
            dir="rtl"
          >
            {sampleContent.map((paragraph, i) => (
              <p
                key={i}
                className={`mb-6 ${darkMode ? "text-cream/85" : "text-navy/80"}`}
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Page Number */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <span
              className={`text-sm ${darkMode ? "text-cream/40" : "text-navy/30"}`}
            >
              صفحة {currentPage} من {totalPages}
            </span>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer
        className={`sticky bottom-0 z-40 border-t px-6 py-4 backdrop-blur-md ${
          darkMode
            ? "border-white/10 bg-[#0F1A2E]/90"
            : "border-gold/10 bg-[#FBF7EF]/90"
        }`}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
            className="flex items-center gap-2 rounded-xl border border-gold/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-gold/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg
              className="h-4 w-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            السابق
          </button>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(parseInt(e.target.value))}
              className="w-32 accent-gold"
            />
            <span className="min-w-[4rem] text-center text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-30"
          >
            التالي
            <svg
              className="h-4 w-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

function generateSampleContent(title: string): string[] {
  return [
    "بسم الله الرحمن الرحيم",
    `هذا معاينة من كتاب «${title}». يُقدَّم هذا الكتاب نُظرة شاملة ومُعمّقة في موضوعاته، مُحاولاً الجمع بين الأصالة والحداثة في أسلوب يُسهّل على القارئ استيعاب المعلومة والتأمّل في معانيها.`,
    `يتناول الكتاب محاور أساسية تُشكّل الإطار الفكري للموضوع، مُستعيناً بالأدلة النقلية والعقلية على حدٍّ سواء. وقد رُوعي في تأليفه مراعاة المستويات المختلفة من القارئين، من المُتخصصين إلى العامّة.`,
    "في هذا الفصل، نتطرق إلى الأصول التي يقوم عليها الكتاب، ونستعرض أهم المسائل التي طرحها المؤلّف على مدى صفحاته، مُقدّمين ملخّصاً يُعين القارئ على فهم الإطار العام للموضوع.",
    "تُعدّ هذه النقطة من أهم ما يميّز الكتاب عن غيره من المُؤلّفات في المجال نفسه، إذ يُقدّم صورة متكاملة تجمع بين العمق العلمي والبساطة في العرض.",
    "ولا يفوتنا أن نُشير إلى أن المؤلّف قد أمضى سنوات طويلة في جمع المعلومات ودراستها، مما يضفي على العمل حُجّية علمية تُعزّز قيمة هذا الكتاب في المكتبة العربية المعاصرة.",
    "نأمل أن يكون هذا الكتاب إضافة فعّالة إلى المكتبة العربية، وأن يُفيد القارئين في توسيع آفاقهم المعرفية والتأصيل لفهمهم.",
  ];
}

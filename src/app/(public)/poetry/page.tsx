import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الأشعار",
  description: "تصفح قصائد وأشعار دار المعين للنشر. شعر إسلامي ي握住 المعاني العالية والقيم النبيلة.",
  openGraph: {
    title: "الأشعار | دار المعين للنشر",
    description: "شعر إسلامي في مدح النبي ﷺ وال信仰.",
  },
};

export default async function PoetryPage() {
  let poems: {
    id: string;
    slug: string;
    titleAr: string;
    excerpt: string | null;
    publishedAt: Date | null;
  }[] = [];

  try {
    poems = await prisma.article.findMany({
      where: { category: "POETRY", isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    poems = [];
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="relative mb-12 text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <svg
            className="h-64 w-64 text-gold"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <path d="M100 10 Q130 50 100 90 Q70 50 100 10Z" />
            <path d="M100 90 Q140 60 180 100 Q140 140 100 110Z" />
            <path d="M100 90 Q60 60 20 100 Q60 140 100 110Z" />
            <path d="M100 110 Q130 150 100 190 Q70 150 100 110Z" />
          </svg>
        </div>
        <h1 className="relative mb-3 font-display text-4xl font-bold text-navy">
          الأشعار
        </h1>
        <p className="relative mx-auto max-w-2xl text-lg text-navy/60">
          روائع الشعر العربي الملتزم في مدح النبي الكريم والتراث الإسلامي
        </p>
        <div className="relative mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-gold to-gold-light" />
      </div>

      {poems.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-4 text-5xl">🪶</div>
          <p className="text-lg text-navy/60">لا توجد أشعار حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {poems.map((poem) => (
            <Link
              key={poem.id}
              href={`/poetry/${poem.slug}`}
              className="group overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-center bg-gradient-to-br from-navy/5 to-gold/5 py-8">
                <svg
                  className="h-16 w-16 text-gold/30 transition-colors group-hover:text-gold/50"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
              <div className="p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-navy transition-colors group-hover:text-primary">
                  {poem.titleAr}
                </h2>
                {poem.excerpt && (
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-navy/60">
                    {poem.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between border-t border-gold/10 pt-4">
                  <span className="text-xs text-navy/40">
                    {poem.publishedAt
                      ? new Date(poem.publishedAt).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                  <span className="text-xs font-medium text-primary transition-colors group-hover:text-primary-light">
                    اقرأ القصيدة ←
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

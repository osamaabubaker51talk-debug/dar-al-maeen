import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الكتّاب",
  description: "تصفح قائمة كتّاب دار المعين للنشر. معلومات عن المؤلفين والباحثين المشاركين في إخراج الكتب.",
  openGraph: {
    title: "الكتّاب | دار المعين للنشر",
    description: "تعرف على كتّابنا ومؤلفينا.",
  },
};

export default async function AuthorsPage() {
  let authors: Awaited<ReturnType<typeof prisma.author.findMany>> = [];

  try {
    authors = await prisma.author.findMany({
      orderBy: { name: "asc" },
    });
  } catch {
    // silently handle
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12" dir="rtl">
      <h1 className="mb-8 font-display text-3xl font-bold text-navy">
        الكتّاب
      </h1>

      {authors.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-navy/60">لا يوجد كتّاب حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="group overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-all hover:shadow-lg dark:bg-navy/20"
            >
              <div className="flex aspect-[3/4] items-center justify-center bg-cream">
                {author.image ? (
                  <img
                    src={author.image}
                    alt={author.nameAr}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-navy/20">
                    {author.nameAr.charAt(0)}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-display text-lg font-bold text-navy transition-colors group-hover:text-primary">
                  {author.nameAr}
                </h3>
                {author.bio && (
                  <p className="line-clamp-2 text-sm leading-relaxed text-navy/60">
                    {author.bio}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

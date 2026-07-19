import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudiesPage() {
  let studies: {
    id: string;
    slug: string;
    titleAr: string;
    excerpt: string | null;
    publishedAt: Date | null;
  }[] = [];

  try {
    studies = await prisma.article.findMany({
      where: { category: "STUDY", isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    studies = [];
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-navy">
          الدراسات
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-navy/60">
          دراسات تأصيلية متعمقة في مختلف المجالات العلمية والنبوية
        </p>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-gold to-gold-light" />
      </div>

      {studies.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-4 text-5xl">📚</div>
          <p className="text-lg text-navy/60">لا توجد دراسات حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <Link
              key={study.id}
              href={`/studies/${study.slug}`}
              className="group overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="h-2 bg-gradient-to-r from-gold/60 to-gold-light/60" />
              <div className="p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-navy transition-colors group-hover:text-primary">
                  {study.titleAr}
                </h2>
                {study.excerpt && (
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-navy/60">
                    {study.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between border-t border-gold/10 pt-4">
                  <span className="text-xs text-navy/40">
                    {study.publishedAt
                      ? new Date(study.publishedAt).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                  <span className="text-xs font-medium text-primary transition-colors group-hover:text-primary-light">
                    اقرأ المزيد ←
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

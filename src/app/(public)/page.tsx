import Link from "next/link";
import prisma from "@/lib/prisma";
import Hero3D from "@/components/three/Hero3D";

export default async function HomePage() {
  const featuredBooks = await prisma.book.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    where: { isFree: true },
  });

  const recentArticles = await prisma.article.findMany({
    take: 4,
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="islamic-pattern">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary to-primary-dark py-20 text-white">
        <Hero3D />
        <div className="absolute inset-0 opacity-10">
          <div className="islamic-pattern absolute inset-0" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-6 font-display text-4xl font-bold md:text-6xl">
            <span className="text-gold-gradient">دار المعين</span> للنشر
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80 md:text-xl">
            مؤسسة تعنى بالدراسات التأصيلية في المجالات العلمية والنبوية
            والتربوية والدعوية تحقيقاً وطباعة ونشر
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/books"
              className="rounded-xl bg-gold px-8 py-3 text-lg font-bold text-primary-dark transition-all hover:bg-gold-light hover:shadow-lg"
              style={{ boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}
            >
              تصفح الكتب
            </Link>
            <Link
              href="/about"
              className="rounded-xl border-2 border-gold/50 px-8 py-3 text-lg font-bold text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              عن الدار
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-navy">
              أحدث الإصدارات
            </h2>
            <Link
              href="/books"
              className="text-sm font-medium text-primary transition-colors hover:text-primary-light"
            >
              عرض الكل ←
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooks.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="group overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-all hover:shadow-md dark:bg-navy/20"
              >
                <div className="aspect-[3/4] bg-cream" />
                <div className="p-4">
                  <h3 className="mb-1 font-display text-lg font-bold text-navy transition-colors group-hover:text-primary">
                    {book.titleAr}
                  </h3>
                  <p className="text-sm text-navy/60">{book.authorAr}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-navy/40">{book.category}</span>
                    {book.isFree ? (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        مجاني
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-gold-dark">
                        ${book.price?.toString() ?? "0"}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section className="bg-white/50 py-16 dark:bg-navy/10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold text-navy">
                أحدث المقالات
              </h2>
              <Link
                href="/news"
                className="text-sm font-medium text-primary transition-colors hover:text-primary-light"
              >
                عرض الكل ←
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {recentArticles.map((article) => (
                <article
                  key={article.id}
                  className="overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-all hover:shadow-md dark:bg-navy/20"
                >
                  <div className="flex gap-4 p-4">
                    <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-cream" />
                    <div>
                      <h3 className="mb-1 font-display text-lg font-bold text-navy">
                        {article.titleAr}
                      </h3>
                      <p className="line-clamp-2 text-sm text-navy/60">
                        {article.excerpt ?? ""}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-gold">
            اشترك في نشرتنا البريدية
          </h2>
          <p className="mb-8 text-white/70">
            احصل على آخر الإصدارات والمقالات مباشرة في بريدك
          </p>
          <form className="flex gap-3" action="/api/subscribers" method="POST">
            <input
              type="email"
              name="email"
              required
              placeholder="بريدك الإلكتروني"
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-gold px-6 py-3 font-bold text-primary-dark transition-colors hover:bg-gold-light"
            >
              اشتراك
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

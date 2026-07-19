import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const where = {
    ...(params.category ? { category: params.category } : {}),
    ...(params.search
      ? {
          OR: [
            { titleAr: { contains: params.search, mode: "insensitive" as const } },
            { authorAr: { contains: params.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const books = await prisma.book.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const categories = [
    "العقيدة",
    "الفقه",
    "التفسير",
    "الحديث",
    "السيرة",
    "التاريخ",
    "الدعوة",
    "التربية",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 font-display text-3xl font-bold text-navy">
        الكتب
      </h1>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/books"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !params.category
              ? "bg-primary text-white"
              : "bg-white text-navy hover:bg-cream dark:bg-navy/20"
          }`}
        >
          الكل
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/books?category=${encodeURIComponent(cat)}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              params.category === cat
                ? "bg-primary text-white"
                : "bg-white text-navy hover:bg-cream dark:bg-navy/20"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Search */}
      <form className="mb-8" action="/books" method="GET">
        <div className="flex gap-3">
          {params.category && (
            <input type="hidden" name="category" value={params.category} />
          )}
          <input
            type="text"
            name="search"
            defaultValue={params.search ?? ""}
            placeholder="ابحث عن كتاب..."
            className="flex-1 rounded-xl border border-gold/20 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none dark:bg-navy/20"
          />
          <button
            type="submit"
            className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-light"
          >
            بحث
          </button>
        </div>
      </form>

      {/* Books Grid */}
      {books.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-navy/60">لا توجد كتب حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.slug}`}
              className="group overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-all hover:shadow-lg dark:bg-navy/20"
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
      )}
    </div>
  );
}

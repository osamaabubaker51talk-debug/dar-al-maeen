import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const author = await prisma.author.findUnique({
    where: { slug },
    include: { books: true },
  });

  if (!author) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12" dir="rtl">
      <div className="mb-8 rounded-2xl border border-gold/10 bg-white p-8 shadow-sm dark:bg-navy/20">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-cream">
            {author.image ? (
              <img
                src={author.image}
                alt={author.nameAr}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl text-navy/20">
                {author.nameAr.charAt(0)}
              </span>
            )}
          </div>
          <div className="text-center md:text-right">
            <h1 className="mb-2 font-display text-3xl font-bold text-navy">
              {author.nameAr}
            </h1>
            <p className="mb-1 text-sm text-navy/50">{author.name}</p>
            {author.bio && (
              <p className="mt-4 max-w-xl leading-relaxed text-navy/70">
                {author.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      <h2 className="mb-6 font-display text-2xl font-bold text-navy">
        كتب المؤلف
      </h2>

      {author.books.length === 0 ? (
        <p className="py-12 text-center text-navy/50">
          لا توجد كتب لهذا المؤلف بعد
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {author.books.map((book) => (
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

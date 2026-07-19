import Link from "next/link";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session.user.id;

  const [purchasedOrders, downloads] = await Promise.all([
    prisma.order.findMany({
      where: { userId, status: "COMPLETED", bookId: { not: null } },
      include: { book: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.download.findMany({
      where: { userId },
      include: { book: true },
      orderBy: { downloadedAt: "desc" },
    }),
  ]);

  const purchasedBooks = purchasedOrders
    .map((o) => o.book)
    .filter((b): b is NonNullable<typeof b> => b !== null);
  const downloadedBooks = downloads.map((d) => d.book);

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">مكتبتي</h2>

      {/* Purchased Books */}
      <div className="mb-10">
        <h3 className="mb-4 font-display text-lg font-bold text-navy">الكتب المشتراة</h3>
        {purchasedBooks.length === 0 ? (
          <div className="rounded-2xl border border-gold/10 bg-white py-12 text-center shadow-sm">
            <p className="mb-3 text-navy/40">لم تشترِ أي كتاب بعد</p>
            <Link href="/books" className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light">
              تصفح الكتب
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {purchasedBooks.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="group overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.titleAr} className="aspect-[3/4] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-cream"><span className="text-4xl">📖</span></div>
                )}
                <div className="p-4">
                  <h4 className="mb-1 font-display text-base font-bold text-navy group-hover:text-primary">{book.titleAr}</h4>
                  <p className="text-sm text-navy/50">{book.authorAr}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Downloaded Books */}
      <div>
        <h3 className="mb-4 font-display text-lg font-bold text-navy">الكتب المحملة</h3>
        {downloadedBooks.length === 0 ? (
          <div className="rounded-2xl border border-gold/10 bg-white py-12 text-center shadow-sm">
            <p className="text-navy/40">لم تحمل أي كتاب بعد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {downloadedBooks.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="group overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.titleAr} className="aspect-[3/4] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-cream"><span className="text-4xl">📖</span></div>
                )}
                <div className="p-4">
                  <h4 className="mb-1 font-display text-base font-bold text-navy group-hover:text-primary">{book.titleAr}</h4>
                  <p className="text-sm text-navy/50">{book.authorAr}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

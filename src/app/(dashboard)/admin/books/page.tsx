import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteBook } from "./actions";

export default async function AdminBooksPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  const books = await prisma.book.findMany({
    where: search
      ? {
          OR: [
            { titleAr: { contains: search, mode: "insensitive" } },
            { authorAr: { contains: search, mode: "insensitive" } },
            { category: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">الكتب</h2>
        <Link
          href="/admin/books/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + إضافة كتاب
        </Link>
      </div>

      <form className="mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search ?? ""}
          placeholder="بحث بالعنوان أو المؤلف أو التصنيف..."
          className="w-full rounded-xl border border-gold/20 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
      </form>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {books.length === 0 ? (
          <p className="py-12 text-center text-navy/40">لا توجد كتب بعد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">العنوان</th>
                  <th className="px-4 py-3">المؤلف</th>
                  <th className="px-4 py-3">التصنيف</th>
                  <th className="px-4 py-3">السعر</th>
                  <th className="px-4 py-3">مجاني</th>
                  <th className="px-4 py-3">التقييم</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 font-medium text-navy">
                      {book.titleAr}
                    </td>
                    <td className="px-4 py-3 text-navy/70">{book.authorAr}</td>
                    <td className="px-4 py-3 text-navy/70">{book.category}</td>
                    <td className="px-4 py-3 font-bold text-gold-dark">
                      {book.isFree ? "مجاني" : `$${book.price?.toString() ?? "0"}`}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          book.isFree
                            ? "bg-primary/10 text-primary"
                            : "bg-navy/5 text-navy/50"
                        }`}
                      >
                        {book.isFree ? "نعم" : "لا"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {book.rating > 0
                        ? `${book.rating.toFixed(1)} (${book.ratingCount})`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/books/${book.id}`}
                          className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          تعديل
                        </Link>
                        <form action={deleteBook.bind(null, book.id)}>
                          <button
                            type="submit"
                            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                          >
                            حذف
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

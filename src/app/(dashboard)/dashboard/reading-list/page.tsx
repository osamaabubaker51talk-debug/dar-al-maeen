import Link from "next/link";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ReadingListPage() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session.user.id;

  const items = await prisma.readingList.findMany({
    where: { userId },
    include: { book: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        قائمة القراءة
      </h2>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-gold/10 bg-white py-16 text-center shadow-sm">
          <div className="mb-3 text-4xl">📋</div>
          <p className="mb-3 text-lg text-navy/40">
            قائمة القراءة فارغة
          </p>
          <Link
            href="/books"
            className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
          >
            تصفح الكتب
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/books/${item.book.slug}`}
              className="group overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-[3/4] bg-cream" />
              <div className="p-4">
                <h3 className="mb-1 font-display text-base font-bold text-navy group-hover:text-primary">
                  {item.book.titleAr}
                </h3>
                <p className="text-sm text-navy/50">{item.book.authorAr}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-navy/40">
                    {item.book.category}
                  </span>
                  {item.book.isFree ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      مجاني
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-gold-dark">
                      ${item.book.price?.toString() ?? "0"}
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

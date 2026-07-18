import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session.user.id;

  const [favoriteCount, readingListCount, orderCount, recentFavorites] =
    await Promise.all([
      prisma.favorite.count({ where: { userId } }),
      prisma.readingList.count({ where: { userId } }),
      prisma.order.count({ where: { userId } }),
      prisma.favorite.findMany({
        where: { userId },
        include: { book: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        مرحباً، {session?.user?.name ?? "قارئ"}
      </h2>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm">
          <div className="mb-2 text-2xl">❤️</div>
          <div className="text-2xl font-bold text-navy">{favoriteCount}</div>
          <div className="text-sm text-navy/50">كتاب مفضل</div>
        </div>
        <div className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm">
          <div className="mb-2 text-2xl">📋</div>
          <div className="text-2xl font-bold text-navy">{readingListCount}</div>
          <div className="text-sm text-navy/50">في قائمة القراءة</div>
        </div>
        <div className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm">
          <div className="mb-2 text-2xl">🧾</div>
          <div className="text-2xl font-bold text-navy">{orderCount}</div>
          <div className="text-sm text-navy/50">طلب</div>
        </div>
      </div>

      {/* Recent Favorites */}
      <div className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-navy">
          أحدث المفضلة
        </h3>
        {recentFavorites.length === 0 ? (
          <div className="py-8 text-center">
            <p className="mb-3 text-navy/40">لم تضف أي كتاب مفضل بعد</p>
            <Link
              href="/books"
              className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
            >
              تصفح الكتب
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentFavorites.map((fav) => (
              <Link
                key={fav.id}
                href={`/books/${fav.book.slug}`}
                className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-cream"
              >
                <div>
                  <div className="font-medium text-navy">{fav.book.titleAr}</div>
                  <div className="text-sm text-navy/50">{fav.book.authorAr}</div>
                </div>
                <span className="text-xs text-navy/40">❤️</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

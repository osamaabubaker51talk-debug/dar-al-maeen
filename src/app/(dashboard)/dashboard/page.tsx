import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session.user.id;
  const user = session.user as { name?: string | null; email?: string | null; image?: string | null };

  const [
    favoriteCount,
    readingListCount,
    orderCount,
    noteCount,
    recentFavorites,
    dbUser,
  ] = await Promise.all([
    prisma.favorite.count({ where: { userId } }).catch(() => 0),
    prisma.readingList.count({ where: { userId } }).catch(() => 0),
    prisma.order.count({ where: { userId } }).catch(() => 0),
    prisma.bookNote.count({ where: { userId } }).catch(() => 0),
    prisma.favorite.findMany({
      where: { userId },
      include: { book: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }).catch(() => []),
    prisma.user.findUnique({ where: { id: userId } }).catch(() => null),
  ]);

  const initials = (user.name ?? user.email ?? "م").charAt(0);
  const memberSince = dbUser?.createdAt
    ? new Date(dbUser.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long" })
    : "";

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-5">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name ?? ""}
              className="h-20 w-20 rounded-full object-cover ring-4 ring-gold/20"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-display text-2xl font-bold text-primary ring-4 ring-gold/20">
              {initials}
            </div>
          )}
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">
              مرحباً، {user.name ?? "قارئ"}
            </h2>
            <p className="text-sm text-navy/50">{user.email}</p>
            {memberSince && (
              <p className="mt-1 text-xs text-navy/40">عضو منذ {memberSince}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Link href="/dashboard/library" className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
          <div className="mb-2 text-2xl">📚</div>
          <div className="text-2xl font-bold text-navy">{orderCount}</div>
          <div className="text-sm text-navy/50">كتاب مشترى</div>
        </Link>
        <Link href="/dashboard/favorites" className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
          <div className="mb-2 text-2xl">❤️</div>
          <div className="text-2xl font-bold text-navy">{favoriteCount}</div>
          <div className="text-sm text-navy/50">كتاب مفضل</div>
        </Link>
        <Link href="/dashboard/reading-list" className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
          <div className="mb-2 text-2xl">📋</div>
          <div className="text-2xl font-bold text-navy">{readingListCount}</div>
          <div className="text-sm text-navy/50">في قائمة القراءة</div>
        </Link>
        <Link href="/dashboard/notes" className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
          <div className="mb-2 text-2xl">📝</div>
          <div className="text-2xl font-bold text-navy">{noteCount}</div>
          <div className="text-sm text-navy/50">ملاحظة</div>
        </Link>
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
                className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-cream"
              >
                {fav.book.coverImage ? (
                  <img src={fav.book.coverImage} alt="" className="h-12 w-9 rounded object-cover" />
                ) : (
                  <div className="flex h-12 w-9 items-center justify-center rounded bg-cream text-sm">📖</div>
                )}
                <div className="flex-1">
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

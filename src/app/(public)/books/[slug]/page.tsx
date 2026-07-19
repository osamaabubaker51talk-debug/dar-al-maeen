import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { ReadingListButton } from "@/components/ui/ReadingListButton";
import { CommentSection } from "@/components/ui/CommentSection";

export const dynamic = "force-dynamic";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const book = await prisma.book.findUnique({
    where: { slug },
    include: {
      comments: {
        where: { isApproved: true },
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      },
      authorProfile: true,
    },
  });

  if (!book) notFound();

  let isFavorite = false;
  let isInList = false;

  if (session?.user?.id) {
    const userId = session.user.id;
    const [fav, list] = await Promise.all([
      prisma.favorite.findUnique({
        where: {
          userId_bookId: { userId, bookId: book.id },
        },
      }),
      prisma.readingList.findUnique({
        where: {
          userId_bookId: { userId, bookId: book.id },
        },
      }),
    ]);
    isFavorite = !!fav;
    isInList = !!list;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <nav className="mb-8 text-sm text-navy/50">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <Link href="/books" className="hover:text-primary">
          الكتب
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy">{book.titleAr}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Book Info */}
        <div className="lg:col-span-2">
          <h1 className="mb-2 font-display text-3xl font-bold text-navy">
            {book.titleAr}
          </h1>
          <p className="mb-4 text-lg text-navy/60">{book.authorAr}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {book.category}
            </span>
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cream px-3 py-1 text-xs text-navy/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-6 flex gap-3">
            <FavoriteButton bookId={book.id} initialIsFavorite={isFavorite} />
            <ReadingListButton bookId={book.id} initialIsInList={isInList} />
          </div>

          <div className="prose prose-lg max-w-none text-navy/80">
            <p>{book.descriptionAr ?? book.description ?? ""}</p>
          </div>

          {book.pages && (
            <div className="mt-6 text-sm text-navy/50">
              {book.pages} صفحة
              {book.isbn && <span className="mx-2">|</span>}
              {book.isbn && `ISBN: ${book.isbn}`}
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-12">
            <h2 className="mb-6 font-display text-2xl font-bold text-navy">
              التعليقات والتقييمات
            </h2>
            <CommentSection
              bookId={book.id}
              initialComments={book.comments.map((c) => ({
                ...c,
                user: c.user,
              }))}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
            <div className="mb-4 aspect-[3/4] rounded-xl bg-cream" />

            {book.isFree ? (
              <button className="mb-3 w-full rounded-xl bg-primary py-3 font-bold text-white transition-colors hover:bg-primary-light">
                تحميل مجاني
              </button>
            ) : (
              <>
                <div className="mb-3 text-center text-2xl font-bold text-gold-dark">
                  ${book.price?.toString() ?? "0"}
                </div>
                <button className="mb-3 w-full rounded-xl bg-gold py-3 font-bold text-primary-dark transition-colors hover:bg-gold-light">
                  شراء الكتاب
                </button>
              </>
            )}

            <div className="space-y-3 border-t border-gold/10 pt-4 text-sm text-navy/60">
              {book.rating > 0 && (
                <div className="flex justify-between">
                  <span>التقييم</span>
                  <span className="font-bold text-gold-dark">
                    ★ {book.rating.toFixed(1)} ({book.ratingCount})
                  </span>
                </div>
              )}
              {book.pages && (
                <div className="flex justify-between">
                  <span>عدد الصفحات</span>
                  <span>{book.pages}</span>
                </div>
              )}
              {book.duration && (
                <div className="flex justify-between">
                  <span>المدة الصوتية</span>
                  <span>{book.duration} دقيقة</span>
                </div>
              )}
              {book.isbn && (
                <div className="flex justify-between">
                  <span>ISBN</span>
                  <span>{book.isbn}</span>
                </div>
              )}
              {book.publishDate && (
                <div className="flex justify-between">
                  <span>تاريخ النشر</span>
                  <span>
                    {new Date(book.publishDate).toLocaleDateString("ar-SA")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const notes = await prisma.bookNote
    .findMany({
      where: { userId: session.user.id },
      include: { book: true },
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        ملاحظاتي ومقتبساتي
      </h2>

      {notes.length === 0 ? (
        <div className="rounded-2xl border border-gold/10 bg-white py-16 text-center shadow-sm">
          <div className="mb-3 text-4xl">📝</div>
          <p className="mb-3 text-lg text-navy/40">
            لا توجد ملاحظات بعد
          </p>
          <p className="mb-4 text-sm text-navy/30">
            ابدأ بحفظ ملاحظاتك ومقتبساتك من الكتب التي تقرأها
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
          >
            العودة للوحة التحكم
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <Link
                  href={`/books/${note.book.slug}`}
                  className="font-display text-sm font-bold text-gold-dark hover:text-gold"
                >
                  {note.book.titleAr}
                </Link>
                <span className="text-xs text-navy/40">
                  {note.createdAt.toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="leading-relaxed text-navy/70">{note.content}</p>
              {note.pageNumber && (
                <div className="mt-3">
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold-dark">
                    صفحة {note.pageNumber}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

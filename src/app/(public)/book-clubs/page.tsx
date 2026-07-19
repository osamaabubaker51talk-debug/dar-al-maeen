import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BookClubsPage() {
  let clubs: {
    id: string;
    nameAr: string;
    description: string | null;
    coverImage: string | null;
    maxMembers: number;
    createdAt: Date;
    _count: { members: number };
  }[] = [];

  try {
    clubs = await prisma.bookClub.findMany({
      include: { _count: { select: { members: true } } },
    });
  } catch {
    clubs = [];
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-navy">
          نوادي الكتب
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-navy/60">
          انضم لنادي كتب واستمتع بالقراءة الجماعية والنقاشات المثرية
        </p>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-gold to-gold-light" />
      </div>

      {clubs.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-4 text-5xl">📚</div>
          <p className="text-lg text-navy/60">لا توجد أندية كتب حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="group overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {club.coverImage && (
                <div className="h-40 overflow-hidden bg-gradient-to-br from-navy/5 to-gold/5">
                  <img
                    src={club.coverImage}
                    alt={club.nameAr}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              {!club.coverImage && (
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-navy/5 to-gold/5">
                  <span className="text-5xl opacity-40">📖</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-navy transition-colors group-hover:text-primary">
                  {club.nameAr}
                </h2>
                {club.description && (
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-navy/60">
                    {club.description}
                  </p>
                )}
                <div className="flex items-center justify-between border-t border-gold/10 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {club._count.members}/{club.maxMembers} عضو
                    </span>
                  </div>
                  <span className="text-xs text-navy/40">
                    {new Date(club.createdAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

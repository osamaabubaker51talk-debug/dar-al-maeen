import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BundlesPage() {
  let bundles: {
    id: string;
    nameAr: string;
    description: string | null;
    coverImage: string | null;
    originalPrice: { toString(): string };
    bundlePrice: { toString(): string };
    books: { id: string }[];
  }[] = [];

  try {
    bundles = await prisma.bookBundle.findMany({
      where: { isActive: true },
      include: { books: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // silently handle
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12" dir="rtl">
      <h1 className="mb-8 font-display text-3xl font-bold text-navy">
        الباقات
      </h1>

      {bundles.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-navy/60">لا توجد باقات حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm transition-all hover:shadow-lg dark:bg-navy/20"
            >
              <div className="flex h-48 items-center justify-center bg-cream">
                {bundle.coverImage ? (
                  <img
                    src={bundle.coverImage}
                    alt={bundle.nameAr}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-navy/20">📦</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="mb-2 font-display text-xl font-bold text-navy">
                  {bundle.nameAr}
                </h3>
                {bundle.description && (
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-navy/60">
                    {bundle.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-navy/40">
                    {bundle.books.length} كتب
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-navy/40 line-through">
                      ${bundle.originalPrice.toString()}
                    </span>
                    <span className="text-lg font-bold text-gold-dark">
                      ${bundle.bundlePrice.toString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

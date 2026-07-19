import prisma from "@/lib/prisma";
import { deleteBundle } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBundlesPage() {
  const bundles = await prisma.bookBundle.findMany({
    include: { books: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">الباقات</h2>
        <a
          href="/admin/bundles/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + إضافة باقة
        </a>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {bundles.length === 0 ? (
          <p className="py-12 text-center text-navy/40">لا توجد باقات بعد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">الاسم</th>
                  <th className="px-4 py-3">عدد الكتب</th>
                  <th className="px-4 py-3">السعر الأصلي</th>
                  <th className="px-4 py-3">سعر الباقة</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {bundles.map((bundle) => (
                  <tr key={bundle.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 font-medium text-navy">
                      {bundle.nameAr}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {bundle.books.length}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      ${bundle.originalPrice.toString()}
                    </td>
                    <td className="px-4 py-3 font-bold text-gold-dark">
                      ${bundle.bundlePrice.toString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          bundle.isActive
                            ? "bg-primary/10 text-primary"
                            : "bg-navy/5 text-navy/50"
                        }`}
                      >
                        {bundle.isActive ? "نشط" : "غير نشط"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <form action={deleteBundle.bind(null, bundle.id)}>
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

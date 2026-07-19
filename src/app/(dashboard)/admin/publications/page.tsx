import Link from "next/link";
import prisma from "@/lib/prisma";
import { deletePublication } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPublicationsPage() {
  let publications: {
    id: string;
    titleAr: string;
    author: string;
    isPublished: boolean;
    publishedAt: Date | null;
    createdAt: Date;
  }[] = [];

  try {
    publications = await prisma.article.findMany({
      where: { category: "WEEKLY_PUBLICATION" },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    publications = [];
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">
          النشرات الأسبوعية
        </h2>
        <Link
          href="/admin/publications/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + إضافة نشرة
        </Link>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {publications.length === 0 ? (
          <p className="py-12 text-center text-navy/40">
            لا توجد نشرات بعد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">العنوان</th>
                  <th className="px-4 py-3">المؤلف</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3">تاريخ النشر</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {publications.map((pub) => (
                  <tr key={pub.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 font-medium text-navy">
                      {pub.titleAr}
                    </td>
                    <td className="px-4 py-3 text-navy/70">{pub.author}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          pub.isPublished
                            ? "bg-primary/10 text-primary"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {pub.isPublished ? "منشورة" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy/50">
                      {pub.publishedAt
                        ? pub.publishedAt.toLocaleDateString("ar-EG")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <form action={deletePublication.bind(null, pub.id)}>
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

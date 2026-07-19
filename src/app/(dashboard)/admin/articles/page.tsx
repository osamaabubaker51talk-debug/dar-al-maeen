import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteArticle } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  const categoryLabels: Record<string, string> = {
    NEWS: "أخبار",
    STUDY: "دراسة",
    POETRY: "شعر",
    WEEKLY_PUBLICATION: "نشرة أسبوعية",
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">المقالات</h2>
        <Link
          href="/admin/articles/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + إضافة مقال
        </Link>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {articles.length === 0 ? (
          <p className="py-12 text-center text-navy/40">لا توجد مقالات بعد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">العنوان</th>
                  <th className="px-4 py-3">المؤلف</th>
                  <th className="px-4 py-3">التصنيف</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3">تاريخ النشر</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 font-medium text-navy">
                      {article.titleAr}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {article.author}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {categoryLabels[article.category] ?? article.category}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          article.isPublished
                            ? "bg-primary/10 text-primary"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {article.isPublished ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy/50">
                      {article.publishedAt
                        ? article.publishedAt.toLocaleDateString("ar-EG")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <form action={deleteArticle.bind(null, article.id)}>
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

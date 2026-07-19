import Link from "next/link";
import prisma from "@/lib/prisma";
import { deletePoem, updatePoemStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPoetryPage() {
  const poems = await prisma.article.findMany({
    where: { category: "POETRY" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-[#1A237E]">
          الشعر
        </h2>
        <Link
          href="/admin/poetry/new"
          className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#D4AF37]/90"
        >
          + إضافة قصيدة
        </Link>
      </div>

      <div className="rounded-2xl border border-[#D4AF37]/10 bg-white shadow-sm">
        {poems.length === 0 ? (
          <p className="py-12 text-center text-[#1A237E]/40">
            لا توجد قصائد بعد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#D4AF37]/10 text-right text-[#1A237E]/50">
                  <th className="px-4 py-3">العنوان</th>
                  <th className="px-4 py-3">المقتطف</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3">تاريخ الإنشاء</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {poems.map((poem) => (
                  <tr key={poem.id} className="border-b border-[#D4AF37]/5">
                    <td className="px-4 py-3 font-medium text-[#1A237E]">
                      {poem.titleAr}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-[#1A237E]/70">
                      {poem.excerpt ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          poem.isPublished
                            ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {poem.isPublished ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#1A237E]/50">
                      {poem.createdAt.toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <form
                          action={updatePoemStatus.bind(
                            null,
                            poem.id,
                            !poem.isPublished
                          )}
                        >
                          <button
                            type="submit"
                            className="rounded-lg bg-[#1A237E]/5 px-3 py-1.5 text-xs font-medium text-[#1A237E] transition-colors hover:bg-[#1A237E]/10"
                          >
                            {poem.isPublished ? "إخفاء" : "نشر"}
                          </button>
                        </form>
                        <form action={deletePoem.bind(null, poem.id)}>
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

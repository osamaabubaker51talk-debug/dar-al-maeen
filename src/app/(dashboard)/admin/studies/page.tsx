import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteStudy, updateStudyStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminStudiesPage() {
  const studies = await prisma.article.findMany({
    where: { category: "STUDY" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-[#1A237E]">
          الدراسات
        </h2>
        <Link
          href="/admin/studies/new"
          className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-medium text-[#1A237E] transition-colors hover:bg-[#D4AF37]/90"
        >
          + إضافة دراسة جديدة
        </Link>
      </div>

      <div className="rounded-2xl border border-[#D4AF37]/10 bg-white shadow-sm">
        {studies.length === 0 ? (
          <p className="py-12 text-center text-[#1A237E]/40">
            لا توجد دراسات بعد
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
                {studies.map((study) => (
                  <tr
                    key={study.id}
                    className="border-b border-[#D4AF37]/5"
                  >
                    <td className="px-4 py-3 font-medium text-[#1A237E] dark:text-white">
                      {study.titleAr}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-[#1A237E]/70 dark:text-white/70">
                      {study.excerpt ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          study.isPublished
                            ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {study.isPublished ? "منشور" : "مسودة"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#1A237E]/50 dark:text-white/50">
                      {study.createdAt.toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <form
                          action={updateStudyStatus.bind(
                            null,
                            study.id,
                            !study.isPublished
                          )}
                        >
                          <button
                            type="submit"
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                              study.isPublished
                                ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                                : "bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20"
                            }`}
                          >
                            {study.isPublished ? "إلغاء النشر" : "نشر"}
                          </button>
                        </form>
                        <form action={deleteStudy.bind(null, study.id)}>
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

import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteChallenge } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminChallengesPage() {
  let challenges: {
    id: string;
    nameAr: string;
    description: string | null;
    startDate: Date;
    endDate: Date;
    targetBooks: number;
    createdAt: Date;
    _count: { participants: number };
  }[] = [];

  try {
    challenges = await prisma.readingChallenge.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { participants: true } } },
    });
  } catch {
    challenges = [];
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">
          تحديات القراءة
        </h2>
        <Link
          href="/admin/challenges/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + إضافة تحدٍّ جديد
        </Link>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {challenges.length === 0 ? (
          <p className="py-12 text-center text-navy/40">
            لا توجد تحديات قراءة بعد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">العنوان</th>
                  <th className="px-4 py-3">الوصف</th>
                  <th className="px-4 py-3">تاريخ البداية</th>
                  <th className="px-4 py-3">تاريخ النهاية</th>
                  <th className="px-4 py-3">الهدف</th>
                  <th className="px-4 py-3">المشاركون</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {challenges.map((challenge) => (
                  <tr key={challenge.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 font-medium text-navy">
                      {challenge.nameAr}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-navy/70">
                      {challenge.description || "—"}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {new Date(challenge.startDate).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {new Date(challenge.endDate).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 font-bold text-gold-dark">
                      {challenge.targetBooks} كتاب
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {challenge._count.participants}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <form action={deleteChallenge.bind(null, challenge.id)}>
                        <button
                          type="submit"
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                        >
                          حذف
                        </button>
                      </form>
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

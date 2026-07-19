import prisma from "@/lib/prisma";
import { approveComment, deleteComment } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    include: { user: true, book: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        التعليقات
      </h2>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {comments.length === 0 ? (
          <p className="py-12 text-center text-navy/40">
            لا توجد تعليقات بعد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">المستخدم</th>
                  <th className="px-4 py-3">الكتاب</th>
                  <th className="px-4 py-3">التعليق</th>
                  <th className="px-4 py-3">التقييم</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3">التاريخ</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 text-navy">
                      {comment.user.name ?? comment.user.email}
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {comment.book.titleAr}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-navy/70">
                      {comment.content}
                    </td>
                    <td className="px-4 py-3 text-gold-dark">
                      {comment.rating ? `${comment.rating}/5` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          comment.isApproved
                            ? "bg-primary/10 text-primary"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {comment.isApproved ? "موافق عليه" : "قيد المراجعة"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy/50">
                      {comment.createdAt.toLocaleDateString("ar-EG")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!comment.isApproved && (
                          <form action={approveComment.bind(null, comment.id)}>
                            <button
                              type="submit"
                              className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                            >
                              موافقة
                            </button>
                          </form>
                        )}
                        <form action={deleteComment.bind(null, comment.id)}>
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

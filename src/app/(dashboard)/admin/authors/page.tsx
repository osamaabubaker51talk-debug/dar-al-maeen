import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteAuthor } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminAuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">الكتّاب</h2>
        <Link
          href="/admin/authors/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + إضافة مؤلف
        </Link>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {authors.length === 0 ? (
          <p className="py-12 text-center text-navy/40">
            لا يوجد كتّاب بعد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">الاسم</th>
                  <th className="px-4 py-3">الرابط</th>
                  <th className="px-4 py-3">النبذة</th>
                  <th className="px-4 py-3">عدد الكتب</th>
                  <th className="px-4 py-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author.id} className="border-b border-gold/5">
                    <td className="px-4 py-3 font-medium text-navy">
                      {author.nameAr}
                    </td>
                    <td className="px-4 py-3 text-navy/70">{author.slug}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-navy/70">
                      {author.bio ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-navy/70">0</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/authors/${author.id}`}
                          className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          تعديل
                        </Link>
                        <form action={deleteAuthor.bind(null, author.id)}>
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

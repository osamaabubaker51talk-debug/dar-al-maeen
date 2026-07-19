import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPollsPage() {
  let polls: {
    id: string;
    title: string;
    description: string | null;
    options: unknown;
    isActive: boolean;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
    _count: { votes: number };
  }[] = [];

  try {
    polls = await prisma.bookPoll.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { votes: true } } },
    });
  } catch {
    polls = [];
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">
          استطلاعات الكتب
        </h2>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
        {polls.length === 0 ? (
          <p className="py-12 text-center text-navy/40">
            لا توجد استطلاعات بعد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">السؤال</th>
                  <th className="px-4 py-3">الخيارات</th>
                  <th className="px-4 py-3">الأصوات</th>
                  <th className="px-4 py-3">الحالة</th>
                  <th className="px-4 py-3">تاريخ البداية</th>
                  <th className="px-4 py-3">تاريخ النهاية</th>
                </tr>
              </thead>
              <tbody>
                {polls.map((poll) => {
                  const options = Array.isArray(poll.options)
                    ? (poll.options as string[])
                    : [];
                  return (
                    <tr key={poll.id} className="border-b border-gold/5">
                      <td className="px-4 py-3 font-medium text-navy">
                        {poll.title}
                      </td>
                      <td className="px-4 py-3 text-navy/70">
                        <div className="flex flex-wrap gap-1">
                          {options.map((opt, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-navy/5 px-2 py-0.5 text-xs text-navy/60"
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          {poll._count.votes}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            poll.isActive
                              ? "bg-green-50 text-green-600"
                              : "bg-navy/5 text-navy/50"
                          }`}
                        >
                          {poll.isActive ? "نشط" : "غير نشط"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-navy/70">
                        {new Date(poll.startDate).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-navy/70">
                        {poll.endDate
                          ? new Date(poll.endDate).toLocaleDateString("ar-EG", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

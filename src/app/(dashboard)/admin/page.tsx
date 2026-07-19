import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [totalBooks, totalUsers, totalOrders, totalSubscribers, recentOrders] =
    await Promise.all([
      prisma.book.count(),
      prisma.user.count(),
      prisma.order.count(),
      prisma.subscriber.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: true, book: true },
      }),
    ]);

  const stats = [
    { label: "الكتب", value: totalBooks, icon: "📚" },
    { label: "المستخدمون", value: totalUsers, icon: "👤" },
    { label: "الطلبات", value: totalOrders, icon: "🧾" },
    { label: "المشتركون", value: totalSubscribers, icon: "👥" },
  ];

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        نظرة عامة
      </h2>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm"
          >
            <div className="mb-2 text-2xl">{stat.icon}</div>
            <div className="text-2xl font-bold text-navy">{stat.value}</div>
            <div className="text-sm text-navy/50">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-display text-lg font-bold text-navy">
          أحدث الطلبات
        </h3>
        {recentOrders.length === 0 ? (
          <p className="py-8 text-center text-navy/40">لا توجد طلبات بعد</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10 text-right text-navy/50">
                  <th className="px-4 py-3">المستخدم</th>
                  <th className="px-4 py-3">الكتاب</th>
                  <th className="px-4 py-3">المبلغ</th>
                  <th className="px-4 py-3">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gold/5">
                    <td className="px-4 py-3">{order.user.name ?? order.user.email}</td>
                    <td className="px-4 py-3">{order.book?.titleAr ?? "باقة"}</td>
                    <td className="px-4 py-3 font-bold text-gold-dark">
                      ${order.amount.toString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "COMPLETED"
                            ? "bg-primary/10 text-primary"
                            : order.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
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

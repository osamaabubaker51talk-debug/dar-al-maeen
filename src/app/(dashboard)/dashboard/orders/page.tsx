import Link from "next/link";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  PENDING: "قيد الانتظار",
  COMPLETED: "مكتمل",
  FAILED: "فشل",
  REFUNDED: "مسترد",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  COMPLETED: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session.user.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { book: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-navy">
        طلباتي
      </h2>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-gold/10 bg-white py-16 text-center shadow-sm">
          <div className="mb-3 text-4xl">🧾</div>
          <p className="mb-3 text-lg text-navy/40">لا توجد طلبات بعد</p>
          <Link
            href="/books"
            className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
          >
            تصفح الكتب
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-sm">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="border-b border-gold/10 bg-cream/50">
                <th className="px-6 py-3 font-medium text-navy">التاريخ</th>
                <th className="px-6 py-3 font-medium text-navy">الكتاب</th>
                <th className="px-6 py-3 font-medium text-navy">المبلغ</th>
                <th className="px-6 py-3 font-medium text-navy">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gold/5 last:border-0">
                  <td className="px-6 py-4 text-navy/60">
                    {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                  </td>
                  <td className="px-6 py-4 font-medium text-navy">
                    {order.book?.titleAr ?? "—"}
                  </td>
                  <td className="px-6 py-4 font-bold text-gold-dark">
                    ${order.amount.toString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        statusColors[order.status] ?? "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {statusLabels[order.status] ?? order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

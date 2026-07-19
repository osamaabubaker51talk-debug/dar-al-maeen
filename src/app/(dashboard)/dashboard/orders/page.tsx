import Link from "next/link";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

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
  let orders: Awaited<ReturnType<typeof fetchOrders>> = [];
  let error = false;
  let unauthenticated = false;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      unauthenticated = true;
    } else {
      orders = await fetchOrders(session.user.id);
    }
  } catch {
    error = true;
  }

  if (unauthenticated) {
    return (
      <div className="rounded-2xl border border-gold/10 bg-white py-16 text-center shadow-sm">
        <p className="mb-3 text-lg text-navy/40">يرجى تسجيل الدخول أولاً</p>
        <Link
          href="/login"
          className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white py-16 text-center shadow-sm">
        <p className="text-lg text-red-500">حدث خطأ في تحميل الطلبات</p>
      </div>
    );
  }

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
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-colors hover:border-gold/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-xl">
                    📖
                  </div>
                  <div>
                    <h3 className="font-medium text-navy">
                      {order.book?.titleAr ?? order.book?.title ?? "كتاب"}
                    </h3>
                    <p className="text-sm text-navy/50">
                      {new Date(order.createdAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gold-dark">
                    ${order.amount.toString()}
                  </span>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      statusColors[order.status] ?? "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {statusLabels[order.status] ?? order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function fetchOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { book: { select: { title: true, titleAr: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
}

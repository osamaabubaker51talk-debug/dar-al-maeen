import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let totalBooks = 0;
  let totalUsers = 0;
  let totalOrders = 0;
  let totalSubscribers = 0;
  let dbConnected = false;

  try {
    [totalBooks, totalUsers, totalOrders, totalSubscribers] =
      await Promise.all([
        prisma.book.count(),
        prisma.user.count(),
        prisma.order.count(),
        prisma.subscriber.count(),
      ]);
    dbConnected = true;
  } catch {
    dbConnected = false;
  }

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

      {!dbConnected && (
        <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
          قاعدة البيانات غير متصلة حالياً. بعض البيانات قد لا تظهر حتى يتم الاتصال بـ Supabase.
        </div>
      )}

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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a href="/admin/books/new" className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="text-2xl mb-2">📚</div>
          <div className="font-bold text-navy">إضافة كتاب جديد</div>
          <div className="text-sm text-navy/50">أضف كتاباً للمكتبة</div>
        </a>
        <a href="/admin/articles/new" className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="text-2xl mb-2">📰</div>
          <div className="font-bold text-navy">كتابة مقال</div>
          <div className="text-sm text-navy/50">نشر مقال جديد</div>
        </a>
        <a href="/admin/books" className="rounded-2xl border border-gold/10 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="text-2xl mb-2">📋</div>
          <div className="font-bold text-navy">إدارة المحتوى</div>
          <div className="text-sm text-navy/50">عرض وتعديل الكتب والمقالات</div>
        </a>
      </div>
    </div>
  );
}

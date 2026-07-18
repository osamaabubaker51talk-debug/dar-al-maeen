import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  if ((session.user as { role?: string }).role !== "ADMIN") redirect("/");

  const sidebarLinks = [
    { href: "/admin", label: "الإحصائيات", icon: "📊" },
    { href: "/admin/books", label: "الكتب", icon: "📚" },
    { href: "/admin/bundles", label: "الباقات", icon: "📦" },
    { href: "/admin/content", label: "المحتوى", icon: "📰" },
    { href: "/admin/authors", label: "الكتّاب", icon: "👤" },
    { href: "/admin/comments", label: "التعليقات", icon: "💬" },
    { href: "/admin/subscribers", label: "المشتركون", icon: "👥" },
    { href: "/admin/orders", label: "الطلبات", icon: "🧾" },
    { href: "/admin/discounts", label: "أكواد الخصم", icon: "🏷️" },
    { href: "/admin/gamification", label: "Gamification", icon: "🏆" },
    { href: "/admin/email", label: "البريد", icon: "📧" },
    { href: "/admin/analytics", label: "التحليلات", icon: "📈" },
    { href: "/admin/settings", label: "الإعدادات", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-l border-gold/20 bg-white">
        <div className="border-b border-gold/20 p-4">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-white">
              م
            </div>
            <span className="font-display text-sm font-bold text-navy">
              لوحة التحكم
            </span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-navy/70 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-gold/20 p-4">
          <Link
            href="/"
            className="text-sm text-navy/50 transition-colors hover:text-primary"
          >
            ← العودة للموقع
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-gold/20 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-lg font-bold text-navy">
              لوحة التحكم
            </h1>
            <span className="text-sm text-navy/50">
              {session.user?.name ?? session.user?.email}
            </span>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

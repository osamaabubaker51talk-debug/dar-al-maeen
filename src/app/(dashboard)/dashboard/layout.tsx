import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const sidebarLinks = [
    { href: "/dashboard", label: "نظرة عامة", icon: "📊" },
    { href: "/dashboard/library", label: "مكتبتي", icon: "📚" },
    { href: "/dashboard/favorites", label: "المفضلة", icon: "❤️" },
    { href: "/dashboard/reading-list", label: "قائمة القراءة", icon: "📋" },
    { href: "/dashboard/subscriptions", label: "اشتراكاتي", icon: "🔔" },
    { href: "/dashboard/orders", label: "طلباتي", icon: "🧾" },
    { href: "/dashboard/settings", label: "الإعدادات", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-l border-gold/20 bg-white">
        <div className="border-b border-gold/20 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-white">
              م
            </div>
            <span className="font-display text-sm font-bold text-navy">
              حسابي
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
          <div className="mb-2 text-sm font-medium text-navy">
            {session.user?.name ?? session.user?.email}
          </div>
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
          <h1 className="font-display text-lg font-bold text-navy">
            لوحة التحكم
          </h1>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

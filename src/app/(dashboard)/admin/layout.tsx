import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, adminLogout } from "./auth-actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  const sidebarLinks = [
    { href: "/admin", label: "الإحصائيات", icon: "📊" },
    { href: "/admin/books", label: "الكتب", icon: "📚" },
    { href: "/admin/articles", label: "المقالات", icon: "📰" },
    { href: "/admin/studies", label: "الدراسات", icon: "🔬" },
    { href: "/admin/poetry", label: "الأشعار", icon: "🪶" },
    { href: "/admin/publications", label: "المنشورات", icon: "📋" },
    { href: "/admin/authors", label: "الكتّاب", icon: "✍️" },
    { href: "/admin/bundles", label: "الباقات", icon: "📦" },
    { href: "/admin/comments", label: "التعليقات", icon: "💬" },
    { href: "/admin/orders", label: "الطلبات", icon: "🧾" },
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
        <div className="border-t border-gold/20 p-4 space-y-3">
          <div className="text-sm font-medium text-navy/70">
            {admin.name}
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 rounded-lg bg-cream py-2 text-center text-xs text-navy/50 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              الموقع
            </Link>
            <form action={adminLogout} className="flex-1">
              <button
                type="submit"
                className="w-full rounded-lg bg-red-50 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-100"
              >
                خروج
              </button>
            </form>
          </div>
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
              {admin.name}
            </span>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

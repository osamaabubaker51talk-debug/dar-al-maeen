import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const user = session.user as { id: string; name?: string | null; email?: string | null; image?: string | null; role?: string };
  const initials = (user.name ?? user.email ?? "م").charAt(0);

  const sidebarLinks = [
    { href: "/dashboard", label: "نظرة عامة", icon: "📊" },
    { href: "/dashboard/library", label: "مكتبتي", icon: "📚" },
    { href: "/dashboard/favorites", label: "المفضلة", icon: "❤️" },
    { href: "/dashboard/reading-list", label: "قائمة القراءة", icon: "📋" },
    { href: "/dashboard/notes", label: "ملاحظاتي", icon: "📝" },
    { href: "/dashboard/orders", label: "طلباتي", icon: "🧾" },
    { href: "/dashboard/subscriptions", label: "اشتراكاتي", icon: "🔔" },
    { href: "/dashboard/settings", label: "الإعدادات", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-l border-gold/20 bg-white">
        {/* Profile Card */}
        <div className="border-b border-gold/20 p-4">
          <Link href="/dashboard/settings" className="flex items-center gap-3 group">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name ?? ""}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/20 transition-all group-hover:ring-gold/40"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary ring-2 ring-gold/20 transition-all group-hover:ring-gold/40">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-navy group-hover:text-primary">
                {user.name ?? "مستخدم"}
              </div>
              <div className="truncate text-xs text-navy/40">
                {user.email}
              </div>
            </div>
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
          <h1 className="font-display text-lg font-bold text-navy">
            حسابي
          </h1>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

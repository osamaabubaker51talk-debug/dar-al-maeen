import Link from "next/link";
import { auth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/books", label: "الكتب" },
  { href: "/authors", label: "الكتّاب" },
  { href: "/about", label: "عن الدار" },
  { href: "/contact", label: "تواصل معنا" },
];

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gold/10 dark:bg-navy/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-display text-lg font-bold text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
            م
          </div>
          <span className="font-display text-xl font-bold text-navy dark:text-white">
            دار المعين
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-navy/70 dark:text-white/70 transition-colors duration-300 hover:text-primary rounded-lg hover:bg-primary/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session?.user ? (
            <Link
              href={
                (session.user as { role?: string }).role === "ADMIN"
                  ? "/admin"
                  : "/dashboard"
              }
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              {(session.user as { role?: string }).role === "ADMIN"
                ? "لوحة التحكم"
                : "حسابي"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

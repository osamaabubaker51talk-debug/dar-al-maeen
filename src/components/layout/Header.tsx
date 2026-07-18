import Link from "next/link";
import { auth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/books", label: "الكتب" },
  { href: "/authors", label: "الكتّاب" },
  { href: "/news", label: "الأخبار" },
  { href: "/studies", label: "الدراسات" },
  { href: "/about", label: "عن الدار" },
  { href: "/contact", label: "تواصل معنا" },
];

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-primary/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-primary-dark">
            م
          </div>
          <span className="font-display text-xl font-bold text-white">
            دار المعين
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
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
                  : "/user"
              }
              className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-primary-dark transition-colors hover:bg-gold-light"
            >
              {(session.user as { role?: string }).role === "ADMIN"
                ? "لوحة التحكم"
                : "حسابي"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-primary-dark transition-colors hover:bg-gold-light"
            >
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

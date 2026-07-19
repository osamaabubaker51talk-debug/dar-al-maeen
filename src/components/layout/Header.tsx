"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/books", label: "الكتب" },
  { href: "/authors", label: "الكتّاب" },
  { href: "/about", label: "عن الدار" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Header({ isLoggedIn, userRole }: { isLoggedIn: boolean; userRole?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gold/10 dark:bg-navy/90" role="banner">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 group" aria-label="دار المعين للنشر - الرئيسية">
          <img src="/logo.png" alt="" className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 rounded-full" />
          <span className="font-display text-xl font-bold text-navy dark:text-white">
            دار المعين
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" role="navigation" aria-label="القائمة الرئيسية">
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
          {isLoggedIn ? (
            <Link
              href={userRole === "ADMIN" ? "/admin" : "/dashboard"}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              {userRole === "ADMIN" ? "لوحة التحكم" : "حسابي"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              تسجيل الدخول
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden border-t border-gold/10 bg-white dark:bg-navy px-4 py-4"
          role="navigation"
          aria-label="القائمة الرئيسية"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-navy/70 dark:text-white/70 rounded-lg hover:bg-primary/5 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

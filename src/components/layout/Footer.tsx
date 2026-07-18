import Link from "next/link";

const footerLinks = {
  library: [
    { href: "/books", label: "الكتب" },
    { href: "/authors", label: "الكتّاب" },
    { href: "/books/bundles", label: "باقات الكتب" },
  ],
  content: [
    { href: "/news", label: "الأخبار" },
    { href: "/studies", label: "الدراسات" },
    { href: "/poetry", label: "الأشعار" },
    { href: "/publications", label: "المنشورات" },
  ],
  community: [
    { href: "/book-clubs", label: "مجموعات القراءة" },
    { href: "/challenges", label: "تحديات القراءة" },
    { href: "/polls", label: "استطلاعات الكتب" },
  ],
  info: [
    { href: "/about", label: "عن الدار" },
    { href: "/contact", label: "تواصل معنا" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-gold">
              المكتبة
            </h3>
            <ul className="space-y-2">
              {footerLinks.library.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-gold">
              المحتوى
            </h3>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-gold">
              المجتمع
            </h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-gold">
              عن الدار
            </h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-primary-dark">
                م
              </div>
              <span className="font-display text-sm text-white/60">
                دار المعين للنشر
              </span>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/dar_almueein"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-gold"
              >
                Instagram
              </a>
              <a
                href="https://x.com/dar_almueein"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-gold"
              >
                X
              </a>
              <a
                href="https://www.facebook.com/daralmueein/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-gold"
              >
                Facebook
              </a>
            </div>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} دار المعين للنشر. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

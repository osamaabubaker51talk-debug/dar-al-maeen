import Link from "next/link";
import prisma from "@/lib/prisma";
import Hero3D from "@/components/three/Hero3D";

export const dynamic = "force-dynamic";

const categories = [
  { name: "القرآن الكريم", icon: "📖", slug: "quran" },
  { name: "التفسير", icon: "📚", slug: "tafsir" },
  { name: "الحديث النبوي", icon: "🕌", slug: "hadith" },
  { name: "الفقه", icon: "⚖️", slug: "fiqh" },
  { name: "السيرة", icon: "🌙", slug: "seerah" },
  { name: "الدعوة", icon: "📢", slug: "dawah" },
  { name: "التربية", icon: "🎓", slug: "education" },
  { name: "الدراسات", icon: "🔬", slug: "studies" },
];

const howItWorks = [
  {
    step: "١",
    title: "تصفح المكتبة",
    desc: "استكشف مجموعتنا الغنية من الكتب في various المجالات العلمية والنبوية والدعوية",
  },
  {
    step: "٢",
    title: "اختر كتبك",
    desc: "حدد الكتب التي تريد قراءتها أو شراؤها من بين مئات العناوين المتاحة",
  },
  {
    step: "٣",
    title: "حمّل أو اطلب",
    desc: "احصل على الكتب الرقمية فوراً أو اطلب النسخ المطبوعة لتوصلك لباب بيتك",
  },
  {
    step: "٤",
    title: "انضم للمجتمع",
    desc: "شارك آراءك واقرأ تعليقات القراء الآخرين وانضم لمجموعات القراءة",
  },
];

const faqItems = [
  {
    q: "ما هي دار المعين للنشر؟",
    a: "دار المعين للنشر هي مؤسسة ثقافية تعنى بالدراسات التأصيلية في المجالات العلمية والنبوية والتربوية والدعوية، حيث نقوم بتحقيق وطباعة ونشر كتب مفيدة للمهتمين بالعلم الشرعي والثقافة الإسلامية.",
  },
  {
    q: "هل يمكنني تحميل الكتب مجاناً؟",
    a: "نعم، نوفر العديد من الكتب مجاناً للتحميل. كما نوفر الكتب المطبوعة بأسعار مناسبة للجميع. بعض الكتب قد تتطلب اشتراكاً شهرياً صغيراً للوصول الكامل.",
  },
  {
    q: "كيف أحصل على الكتب المطبوعة؟",
    a: "يمكنك طلب الكتب المطبوعة من خلال الموقع وسيتم توصيلها إلى عنوانك. نعمل مع شركات شحن موثوقة لضمان وصول الكتب بأمان.",
  },
  {
    q: "هل يوجد اشتراك شهري؟",
    a: "نعم، نوفر خطة اشتراك شهري تمنحك وصولاً غير محدود لجميع الكتب الرقمية والمواد التعليمية. كما يمكنك شراء الكتب بشكل منفصل.",
  },
  {
    q: "كيف أتواصل معكم؟",
    a: "يمكنك التواصل معنا عبر صفحة 'تواصل معنا' في الموقع، أو عبر وسائل التواصل الاجتماعي (Instagram، X، Facebook)، أو عبر البريد الإلكتروني.",
  },
];

const featuredBooks = [
  {
    title: "صحيح البخاري",
    author: "الإمام البخاري",
    category: "الحديث النبوي",
    isFree: true,
    slug: "sahih-bukhari",
  },
  {
    title: "تفسير ابن كثير",
    author: "ابن كثير",
    category: "التفسير",
    isFree: true,
    slug: "tafsir-ibn-kathir",
  },
  {
    title: "رياض الصالحين",
    author: "الإمام النووي",
    category: "الفقه",
    price: "15",
    slug: "riyadh-salihin",
  },
  {
    title: "الرحيق المختوم",
    author: "صفي الرحمن المباركفوري",
    category: "السيرة",
    isFree: true,
    slug: "rahiq-makhtum",
  },
  {
    title: "فن۽ة التعامل",
    author: "د. عبد الله السعد",
    category: "التربية",
    price: "12",
    slug: "fann-taamul",
  },
  {
    title: "ortex الدعوية",
    author: "د. محمد ربيع",
    category: "الدعوة",
    price: "10",
    slug: "manhaj-dawah",
  },
];

export default async function HomePage() {
  let dbBooks: any[] = [];

  try {
    dbBooks = await prisma.book.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Database unavailable — use placeholder books
  }

  const books = dbBooks.length > 0 ? dbBooks : featuredBooks;

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light">
        <div className="absolute inset-0 islamic-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Floating geometric elements */}
        <div className="absolute top-20 right-10 w-32 h-32 border border-gold/20 rotate-45 animate-float" />
        <div className="absolute bottom-32 left-16 w-20 h-20 border border-gold/15 rotate-12 animate-float-delay" />
        <div className="absolute top-40 left-1/4 w-16 h-16 border border-gold/10 -rotate-12 animate-float-slow" />

        <div className="relative mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="text-center lg:text-right z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm text-white/80">مؤسسة نشر ثقافية إسلامية</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-gold-gradient">دار المعين</span>
              <br />
              للنشر
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg mx-auto lg:mx-0 lg:max-w-none leading-relaxed">
              نعمل على تحقيق وطباعة ونشر الكتب القيّمة في المجالات العلمية
              والنبوية والتربوية والدعوية. اكتشف عالماً من المعرفة والثقافة.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/books"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 text-lg font-bold text-primary-dark transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105"
              >
                <span>تصفح الكتب</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-gold hover:text-gold hover:bg-white/5"
              >
                عن الدار
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 justify-center lg:justify-start">
              <div>
                <div className="text-3xl font-bold text-gold">+٥٠٠</div>
                <div className="text-sm text-white/60">كتاب منشور</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">+١٠,٠٠٠</div>
                <div className="text-sm text-white/60">قارئ نشط</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold">+٥٠</div>
                <div className="text-sm text-white/60">باحث ومؤلف</div>
              </div>
            </div>
          </div>

          {/* 3D visual side */}
          <div className="relative h-[400px] lg:h-[500px]">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 bg-white/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-navy mb-3">تصفح حسب التصنيف</h2>
            <p className="text-navy/60">اختر مجالك المفضل من تشكيلتنا الواسعة</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/books?category=${cat.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-gold/20 bg-white px-6 py-4 transition-all duration-300 hover:border-gold hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium text-navy group-hover:text-primary transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED BOOKS ===== */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy mb-2">أحدث الإصدارات</h2>
              <p className="text-navy/60">اكتشف أحدث الكتب المضافة لمجموعتنا</p>
            </div>
            <Link
              href="/books"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              عرض الكل
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {books.map((book: any) => (
              <Link
                key={book.slug || book.id}
                href={`/books/${book.slug || book.id}`}
                className="group"
              >
                {/* Book cover placeholder */}
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/10 to-cream border border-gold/10 mb-3 overflow-hidden relative transition-all duration-300 group-hover:shadow-xl group-hover:shadow-gold/10 group-hover:-translate-y-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">📖</span>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">عرض التفاصيل</span>
                  </div>
                </div>
                <h3 className="font-display text-sm font-bold text-navy group-hover:text-primary transition-colors line-clamp-2">
                  {book.title || book.titleAr}
                </h3>
                <p className="text-xs text-navy/50 mt-1">{book.author || book.authorAr}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{book.category}</span>
                  {book.isFree ? (
                    <span className="text-xs font-bold text-primary">مجاني</span>
                  ) : (
                    <span className="text-xs font-bold text-gold-dark">${book.price?.toString() ?? "0"}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/books" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              عرض الكل ←
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-gold mb-3">كيف يعمل الموقع؟</h2>
            <p className="text-white/60 max-w-lg mx-auto">أربع خطوات بسيطة لبدء رحلتك معنا في عالم المعرفة والإسلام</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative group">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 h-full transition-all duration-300 group-hover:border-gold/30 group-hover:bg-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-primary-dark font-display font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 -left-4 w-8 border-t border-dashed border-gold/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-navy mb-3">لماذا دار المعين؟</h2>
            <p className="text-navy/60">نقدم لك تجربة فريدة في عالم النشر والقراءة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-gold/10 bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">كتب موثوقة</h3>
              <p className="text-sm text-navy/60">جميع كتبنا经过 تحقيق ودقيق مراجعة من نخبة من العلماء والباحثين</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gold/10 bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">أسعار مناسبة</h3>
              <p className="text-sm text-navy/60">نحرص على توفير الكتب بأسعار في متناول الجميع، وكتباً مجانية كثيرة</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gold/10 bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">مجتمع قرائي</h3>
              <p className="text-sm text-navy/60">انضم لمجتمع من القراء والباحثين وشارك تجربتك معهم</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">اشترك في نشرتنا البريدية</h2>
          <p className="text-white/70 mb-8">احصل على آخر الإصدارات والمقالات مباشرة في بريدك</p>

          <form className="flex gap-3 max-w-md mx-auto" action="/api/subscribers" method="POST">
            <input
              type="email"
              name="email"
              required
              placeholder="بريدك الإلكتروني"
              className="flex-1 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-3.5 text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
            />
            <button
              type="submit"
              className="rounded-xl bg-gold px-6 py-3.5 font-bold text-primary-dark transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 whitespace-nowrap"
            >
              اشتراك
            </button>
          </form>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 bg-white/50">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy mb-3">الأسئلة الشائعة</h2>
            <p className="text-navy/60"> أجوبة لأكثر الأسئلة تداولاً</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="group rounded-2xl border border-gold/10 bg-white overflow-hidden transition-all duration-300 hover:shadow-md">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-display font-bold text-navy select-none">
                  <span>{item.q}</span>
                  <svg className="w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-navy/60 leading-relaxed border-t border-gold/10 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GIFT CTA ===== */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl bg-gradient-to-l from-gold/10 to-primary/5 border border-gold/20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-right">
              <h2 className="font-display text-2xl font-bold text-navy mb-3">اهديKnowledge</h2>
              <p className="text-navy/60 mb-6">
                من أفضل الهدايا أن تهدي علماً نافعاً. اشترِ هدية رقمية لأحبائك وشاركهم المعرفة.
              </p>
              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-navy-light hover:shadow-lg"
              >
                تصفح الكتب للهدايا
              </Link>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gold/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

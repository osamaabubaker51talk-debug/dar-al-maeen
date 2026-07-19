import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع دار المعين للنشر. هاتف: 07 7105 5010. بغداد، العراق. انستغرام وتويتر: @dar_almueein.",
  openGraph: {
    title: "تواصل معنا | دار المعين للنشر",
    description: "تواصل معنا عبر الهاتف أو وسائل التواصل الاجتماعي.",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-12 text-center font-display text-4xl font-bold text-navy">
        تواصل معنا
      </h1>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Info */}
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold text-navy">
            معلومات التواصل
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                📞
              </div>
              <div>
                <h3 className="font-bold text-navy">الهاتف</h3>
                <p className="text-navy/60" dir="ltr">
                  07 7105 5010
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                📍
              </div>
              <div>
                <h3 className="font-bold text-navy">الموقع</h3>
                <a
                  href="https://maps.app.goo.gl/GZyoBzvcBKDQ1RB58"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary transition-colors hover:text-primary-light"
                >
                  اضغط هنا لفتح الموقع على الخريطة
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                📱
              </div>
              <div>
                <h3 className="font-bold text-navy">التواصل الاجتماعي</h3>
                <div className="mt-1 flex gap-4">
                  <a
                    href="https://www.instagram.com/dar_almueein"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy/60 transition-colors hover:text-primary"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://x.com/dar_almueein"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy/60 transition-colors hover:text-primary"
                  >
                    X
                  </a>
                  <a
                    href="https://www.facebook.com/daralmueein/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy/60 transition-colors hover:text-primary"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d36.1234567!3d33.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDA3JzI0LjQiTiAzNsKwMDcnMjQuNCJF!5e0!3m2!1sar!2sjo!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع دار المعين للنشر"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="mb-6 font-display text-2xl font-bold text-navy">
            أرسل لنا رسالة
          </h2>
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                الاسم
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none dark:bg-navy/20"
                placeholder="اسمك"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none dark:bg-navy/20"
                placeholder="بريدك@الالكتروني.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                الموضوع
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none dark:bg-navy/20"
                placeholder="موضوع الرسالة"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                الرسالة
              </label>
              <textarea
                rows={5}
                required
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none dark:bg-navy/20"
                placeholder="رسالتك هنا..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 font-bold text-white transition-colors hover:bg-primary-light"
            >
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

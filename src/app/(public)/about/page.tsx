export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-center font-display text-4xl font-bold text-navy">
        عن الدار
      </h1>

      <div className="prose prose-lg mx-auto text-navy/80">
        <p className="mb-6 text-center text-xl leading-relaxed">
          دار المعين للنشر هي مؤسسة ثقافية تعنى بالدراسات التأصيلية في
          المجالات العلمية والنبوية والتربوية والدعوية تحقيقاً وطباعة ونشر.
        </p>

        <div className="my-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-gold/20 bg-white p-6 text-center shadow-sm">
            <div className="mb-3 text-3xl">📚</div>
            <h3 className="mb-2 font-display text-lg font-bold text-navy">
              التحقيق العلمي
            </h3>
            <p className="text-sm text-navy/60">
              تحقيق النصوص والمخطوطات بأعلى المعايير العلمية
            </p>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-white p-6 text-center shadow-sm">
            <div className="mb-3 text-3xl">📖</div>
            <h3 className="mb-2 font-display text-lg font-bold text-navy">
              الطباعة والنشر
            </h3>
            <p className="text-sm text-navy/60">
              طباعة ونشر الكتب بجودة عالية وتصميم مميز
            </p>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-white p-6 text-center shadow-sm">
            <div className="mb-3 text-3xl">🎓</div>
            <h3 className="mb-2 font-display text-lg font-bold text-navy">
              الدراسات التأصيلية
            </h3>
            <p className="text-sm text-navy/60">
              إعداد دراسات تأصيلية متعمقة في مختلف المجالات
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let study: {
    id: string;
    titleAr: string;
    slug: string;
    author: string;
    content: string;
    contentAr: string | null;
    excerpt: string | null;
    publishedAt: Date | null;
  } | null = null;

  try {
    study = await prisma.article.findUnique({
      where: { slug, category: "STUDY", isPublished: true },
    });
  } catch {
    notFound();
  }

  if (!study) notFound();

  const content = study.contentAr || study.content;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-8 text-sm text-navy/50">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <Link href="/studies" className="hover:text-primary">
          الدراسات
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy">{study.titleAr}</span>
      </nav>

      <article>
        <header className="mb-10 border-b border-gold/10 pb-8">
          <h1 className="mb-4 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
            {study.titleAr}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-navy/50">
            <span>{study.author}</span>
            {study.publishedAt && (
              <>
                <span>•</span>
                <span>
                  {new Date(study.publishedAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </header>

        {study.excerpt && (
          <div className="mb-8 rounded-2xl border border-gold/20 bg-cream/50 p-6 text-lg leading-relaxed text-navy/70 italic">
            {study.excerpt}
          </div>
        )}

        <div className="prose prose-lg prose-navy max-w-none text-navy/80 leading-relaxed">
          {content.split("\n").map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ) : null
          )}
        </div>
      </article>

      <div className="mt-12 border-t border-gold/10 pt-8 text-center">
        <Link
          href="/studies"
          className="inline-flex items-center gap-2 rounded-xl border border-gold/20 bg-white px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-cream"
        >
          ← العودة للدراسات
        </Link>
      </div>
    </div>
  );
}

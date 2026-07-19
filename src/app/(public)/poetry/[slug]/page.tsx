import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PoetryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let poem: {
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
    poem = await prisma.article.findUnique({
      where: { slug, category: "POETRY", isPublished: true },
    });
  } catch {
    notFound();
  }

  if (!poem) notFound();

  const content = poem.contentAr || poem.content;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-8 text-sm text-navy/50">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <Link href="/poetry" className="hover:text-primary">
          الأشعار
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy">{poem.titleAr}</span>
      </nav>

      <article className="rounded-2xl border border-gold/20 bg-white p-8 shadow-sm md:p-12">
        <header className="mb-10 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold-light/20">
            <svg
              className="h-8 w-8 text-gold"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <h1 className="mb-4 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
            {poem.titleAr}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-navy/50">
            <span>{poem.author}</span>
            {poem.publishedAt && (
              <>
                <span>•</span>
                <span>
                  {new Date(poem.publishedAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
          <div className="mx-auto mt-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-gold to-gold-light" />
        </header>

        {poem.excerpt && (
          <div className="mb-8 border-r-4 border-gold/40 pr-6 text-right text-lg text-navy/70 italic">
            {poem.excerpt}
          </div>
        )}

        <div className="text-center text-lg leading-loose text-navy/80">
          {content.split("\n").map((line, i) =>
            line.trim() ? (
              <p key={i} className="mb-2">
                {line}
              </p>
            ) : (
              <br key={i} />
            )
          )}
        </div>
      </article>

      <div className="mt-12 text-center">
        <Link
          href="/poetry"
          className="inline-flex items-center gap-2 rounded-xl border border-gold/20 bg-white px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-cream"
        >
          ← العودة للأشعار
        </Link>
      </div>
    </div>
  );
}

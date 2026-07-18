import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get("bookId");

  if (!bookId) {
    return NextResponse.json({ error: "bookId مطلوب" }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { bookId, isApproved: true },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ comments });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const userId = session.user.id;

  const { bookId, content, rating } = (await request.json()) as {
    bookId: string;
    content: string;
    rating?: number | null;
  };

  if (!bookId || !content?.trim()) {
    return NextResponse.json(
      { error: "bookId و content مطلوبان" },
      { status: 400 }
    );
  }

  const userRole = (session.user as { role?: string }).role;
  const isAdmin = userRole === "ADMIN";

  const comment = await prisma.comment.create({
    data: {
      userId,
      bookId,
      content: content.trim(),
      rating: rating ?? null,
      isApproved: isAdmin,
    },
  });

  return NextResponse.json({ comment, isApproved: isAdmin });
}

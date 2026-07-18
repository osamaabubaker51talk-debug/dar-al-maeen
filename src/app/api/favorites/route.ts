import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const userId = session.user.id;

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { book: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ favorites: favorites.map((f) => f.book) });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const userId = session.user.id;

  const { bookId } = (await request.json()) as { bookId: string };
  if (!bookId) {
    return NextResponse.json({ error: "bookId مطلوب" }, { status: 400 });
  }

  const existing = await prisma.favorite.findUnique({
    where: { userId_bookId: { userId, bookId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ isFavorite: false });
  }

  await prisma.favorite.create({
    data: { userId, bookId },
  });

  return NextResponse.json({ isFavorite: true });
}

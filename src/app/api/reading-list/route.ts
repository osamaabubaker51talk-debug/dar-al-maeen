import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const userId = session.user.id;

  const items = await prisma.readingList.findMany({
    where: { userId },
    include: { book: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ books: items.map((item) => item.book) });
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

  const existing = await prisma.readingList.findUnique({
    where: { userId_bookId: { userId, bookId } },
  });

  if (existing) {
    await prisma.readingList.delete({ where: { id: existing.id } });
    return NextResponse.json({ isInList: false });
  }

  await prisma.readingList.create({
    data: { userId, bookId },
  });

  return NextResponse.json({ isInList: true });
}

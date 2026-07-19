import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ currentPage: 0, totalPages: 0 });
  }

  const { id } = await params;

  const progress = await prisma.readingProgress.findUnique({
    where: {
      userId_bookId: { userId: session.user.id, bookId: id },
    },
  });

  return NextResponse.json({
    currentPage: progress?.currentPage ?? 0,
    totalPages: progress?.totalPages ?? 0,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { currentPage, totalPages } = await request.json();

  const progress = await prisma.readingProgress.upsert({
    where: {
      userId_bookId: { userId: session.user.id, bookId: id },
    },
    update: {
      currentPage,
      totalPages,
      lastReadAt: new Date(),
    },
    create: {
      userId: session.user.id,
      bookId: id,
      currentPage,
      totalPages,
    },
  });

  return NextResponse.json(progress);
}

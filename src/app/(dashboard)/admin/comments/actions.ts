"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function approveComment(id: string) {
  await prisma.comment.update({
    where: { id },
    data: { isApproved: true },
  });
  revalidatePath("/admin/comments");
}

export async function deleteComment(id: string) {
  await prisma.comment.delete({ where: { id } });
  revalidatePath("/admin/comments");
}

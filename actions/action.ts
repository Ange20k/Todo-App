"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string ;
  
  if (!title || !content) {
  throw new Error("Title and content are required");
}

  await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  revalidatePath("/Posts")
}
export async function deletePost(postId: number) {
  await prisma.post.delete({
    where: { id: postId },
  });
  revalidatePath("/Posts");
}
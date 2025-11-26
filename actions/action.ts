"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string ;
  const dueDate = formData.get("dueDate") as string;
  const category = formData.get("category") as string;
  
  if (!title || !content) {
  throw new Error("Title and content are required");
}

  await prisma.post.create({
    data: {
      title,
      content,
       dueDate: dueDate ? new Date(dueDate) : null, 
        category: category || "Personnel",
    },
  });
  revalidatePath("/Posts");
  redirect ("/posts");
}
export async function deletePost(postId: number) {
  await prisma.post.delete({
    where: { id: postId },
  });
  revalidatePath("/Posts");
}
export async function togglePost(postId: number) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) return;

  await prisma.post.update({
    where: { id: postId },
    data: { completed: !post.completed },
  });

  revalidatePath("/posts");
}  
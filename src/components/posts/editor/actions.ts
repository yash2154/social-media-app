"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { CreatePostSchema } from "@/lib/validation";

export async function submitPost(input: String) {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthrized");
  const { content } = CreatePostSchema.parse({ content: input });
  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
}

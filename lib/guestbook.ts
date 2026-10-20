import { z } from "zod";
import { cacheTag } from "next/cache";
import { prisma } from "./prisma";

export const guestbookInputSchema = z.object({
  name: z.string().trim().min(1, "昵称不能为空").max(20, "昵称最多 20 字"),
  content: z.string().trim().min(1, "留言内容不能为空").max(200, "留言最多 200 字"),
});

export interface GuestbookMessage {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
}

export async function getMessages(): Promise<GuestbookMessage[]> {
  "use cache";
  cacheTag("guestbook");

  return prisma.message.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function addMessage(name: string, content: string): Promise<GuestbookMessage> {
  return prisma.message.create({
    data: {
      name,
      content,
    },
  });
}

export async function deleteMessage(id: number): Promise<void> {
  await prisma.message.delete({
    where: {
      id,
    },
  });
}

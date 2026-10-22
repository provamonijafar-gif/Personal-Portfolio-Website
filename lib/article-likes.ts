import { prisma } from "./prisma";
import { cacheTag } from "next/cache";
import { z } from "zod";

export const likeInputSchema = z.object({
  slug: z.string().trim().min(1, "不能为空").max(100, "最多 100 个字符串"),
});

export async function getLikeCount(slug: string): Promise<number> {
  "use cache";
  cacheTag("likes");

  const row = await prisma.articleLike.findUnique({
    where: { slug },
  });
  return row?.count ?? 0;
}

export async function likeArticle(slug: string): Promise<number> {
  const row = await prisma.articleLike.upsert({
    where: { slug },
    create: { count: 1, slug },
    update: { count: { increment: 1 } },
  });
  return row.count;
}

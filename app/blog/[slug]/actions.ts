"use server";
import { revalidateTag } from "next/cache";
import { likeInputSchema, likeArticle } from "@/lib/article-likes";

export interface LikeState {
  success: boolean;
  error: string | null;
  count: number | null;
}

export async function likeArticleAction(
  prevState: LikeState,
  formData: FormData,
): Promise<LikeState> {
  const parsed = likeInputSchema.safeParse({
    slug: formData.get("slug"),
  });

  if (!parsed.success) {
    return {
      ...prevState,
      success: false,
      error: parsed.error.issues[0]?.message ?? "输入不合法",
    };
  }

  try {
    const count = await likeArticle(parsed.data.slug);
    revalidateTag("likes", "max");

    return { success: true, error: null, count };
  } catch {
    return { success: false, error: "服务器错误，请稍后再试", count: null };
  }
}

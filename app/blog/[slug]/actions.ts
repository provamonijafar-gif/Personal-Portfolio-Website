"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { likeInputSchema, likeArticle, LIKED_COOKIE } from "@/lib/article-likes";

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

  const cookieStore = await cookies();
  const likedSlugs = cookieStore.get(LIKED_COOKIE)?.value.split(",") ?? [];

  if (likedSlugs.includes(parsed.data.slug)) {
    return { success: false, error: "你已经赞过这篇文章啦", count: null };
  }

  try {
    const count = await likeArticle(parsed.data.slug);
    revalidateTag("likes", "max");
    cookieStore.set(LIKED_COOKIE, [...likedSlugs, parsed.data.slug].join(","), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    });

    return { success: true, error: null, count };
  } catch {
    return { success: false, error: "服务器错误，请稍后再试", count: null };
  }
}

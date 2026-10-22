"use client";

import { useActionState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { likeArticleAction, type LikeState } from "./actions";

interface LikeButtonProps {
  slug: string;
  initialCount: number;
  hasLiked: boolean;
}

const initialState: LikeState = { success: false, error: null, count: null };

export function LikeButton({ slug, initialCount, hasLiked }: LikeButtonProps) {
  const [state, formAction, isPending] = useActionState(likeArticleAction, initialState);

  const liked = hasLiked || state.success;
  const count = state.count ?? initialCount;

  return (
    <form action={formAction} className="mt-8">
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        disabled={isPending || liked}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        <FiThumbsUp size={14} />
        {isPending ? "提交中…" : liked ? `已赞 ${count}` : `赞 ${count}`}
      </button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}

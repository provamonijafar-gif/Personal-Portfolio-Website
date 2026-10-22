"use client";

import { useActionState } from "react";
import { likeArticleAction, type LikeState } from "./actions";

interface LikeButtonProps {
  slug: string;
  initialCount: number;
}

const initialState: LikeState = { success: false, error: null, count: null };

export function LikeButton({ slug, initialCount }: LikeButtonProps) {
  const [state, formAction, isPending] = useActionState(likeArticleAction, initialState);

  return (
    <form action={formAction} className="mt-8">
      <input type="hidden" name="slug" value={slug} />
      <button type="submit" disabled={isPending}>
        {isPending ? "提交中…" : `赞 ${state.count ?? initialCount}`}
      </button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}

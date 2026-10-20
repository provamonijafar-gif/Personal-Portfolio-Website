"use client";

import { useActionState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { refreshPostsAction } from "./actions";

interface RefreshState {
  success: boolean;
  message: string | null;
}

const initialState: RefreshState = {
  success: false,
  message: null,
};

export function RefreshPostsButton() {
  const [state, formAction, pending] = useActionState(
    async (): Promise<RefreshState> => {
      try {
        await refreshPostsAction();
        return { success: true, message: "文章缓存已刷新" };
      } catch {
        return { success: false, message: "刷新失败，请重新登录后再试" };
      }
    },
    initialState
  );

  return (
    <div className="space-y-2">
      <form action={formAction}>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          <FiRefreshCw size={14} className={pending ? "animate-spin" : undefined} />
          {pending ? "刷新中..." : "刷新文章缓存"}
        </button>
      </form>
      {state.message && (
        <p className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>
          {state.message}
        </p>
      )}
    </div>
  );
}

"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitMessage, type SubmitState } from "./actions";

const initialState: SubmitState = { success: false, error: null };

export function GuestbookForm() {
  const [state, formAction, isPending] = useActionState(submitMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="p-5 rounded-xl bg-[var(--card)] border border-[var(--card-border)] space-y-3"
    >
      <input
        name="name"
        maxLength={20}
        placeholder="昵称"
        className="w-full px-3 py-2 rounded-lg bg-transparent border border-[var(--card-border)] text-sm focus:outline-none focus:border-[var(--accent)]"
      />
      <textarea
        name="content"
        maxLength={200}
        rows={4}
        placeholder="说点什么吧（最多 200 字）"
        className="w-full px-3 py-2 rounded-lg bg-transparent border border-[var(--card-border)] text-sm resize-none focus:outline-none focus:border-[var(--accent)]"
      />
      {state.error && (
        <p className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {isPending ? "提交中..." : "提交留言"}
      </button>
    </form>
  );
}

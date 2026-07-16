"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center">
      <p className="text-6xl font-bold text-red-500 animate-fade-up">Oops</p>

      <h1 className="mt-6 text-2xl font-bold animate-fade-up [animation-delay:0.1s]">
        出了点问题
      </h1>

      <p className="mt-3 text-[var(--muted)] animate-fade-up [animation-delay:0.2s]">
        页面遇到了意外错误，请稍后再试。
      </p>

      <div className="mt-8 flex items-center justify-center gap-4 animate-fade-up [animation-delay:0.3s]">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          重试
        </button>
        <a
          href="/"
          className="px-5 py-2.5 rounded-lg border border-[var(--card-border)] text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center">
      <p className="text-8xl font-bold text-[var(--accent)] animate-fade-up">
        404
      </p>

      <h1 className="mt-6 text-2xl font-bold animate-fade-up [animation-delay:0.1s]">
        页面未找到
      </h1>

      <p className="mt-3 text-[var(--muted)] animate-fade-up [animation-delay:0.2s]">
        你访问的页面不存在，可能已被移除或链接有误。
      </p>

      <div className="mt-8 flex items-center justify-center gap-4 animate-fade-up [animation-delay:0.3s]">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          返回首页
        </Link>
        <Link
          href="/blog"
          className="px-5 py-2.5 rounded-lg border border-[var(--card-border)] text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors"
        >
          去看博客
        </Link>
      </div>
    </div>
  );
}

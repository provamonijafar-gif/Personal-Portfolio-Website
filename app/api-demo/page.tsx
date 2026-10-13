"use client";

import { useState } from "react";
import { FiClock, FiSearch } from "react-icons/fi";
import type { PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export default function ApiDemoPage() {
  const [tag, setTag] = useState("");
  const [posts, setPosts] = useState<PostMeta[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadPosts() {
    setLoading(true);
    setError(null);

    try {
      // URLSearchParams 会自动编码中文等特殊字符
      const search = new URLSearchParams();
      if (tag.trim()) search.set("tag", tag.trim());
      const query = search.toString();

      const res = await fetch(query ? `/api/posts?${query}` : "/api/posts");
      if (!res.ok) {
        throw new Error(`接口返回了 ${res.status}`);
      }

      const data: { count: number; posts: PostMeta[] } = await res.json();
      setPosts(data.posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">文章接口演示</h1>
      <p className="text-[var(--muted)] mb-8">
        客户端组件通过 fetch 请求 /api/posts，体验浏览器主动向服务端要数据
      </p>

      <div className="flex gap-2 mb-8">
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && loadPosts()}
          placeholder="按标签过滤，留空获取全部"
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        <button
          onClick={loadPosts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          <FiSearch size={14} />
          {loading ? "加载中..." : "加载"}
        </button>
      </div>

      {error && (
        <p className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
          {error}
        </p>
      )}

      {posts === null ? (
        <p className="text-center text-[var(--muted)] py-12">
          点击按钮，从接口加载文章
        </p>
      ) : posts.length === 0 ? (
        <p className="text-center text-[var(--muted)] py-12">该标签下没有文章</p>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-[var(--muted)]">共 {posts.length} 篇文章</p>
          {posts.map((post) => (
            <div
              key={post.slug}
              className="p-5 rounded-xl bg-[var(--card)] border border-[var(--card-border)]"
            >
              <h2 className="font-semibold mb-1">{post.title}</h2>
              <p className="text-sm text-[var(--muted)] mb-3 line-clamp-2">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                <span>{formatDate(post.date)}</span>
                <span className="flex items-center gap-1">
                  <FiClock size={12} />
                  {post.readingTime}
                </span>
                <span>{post.tags.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

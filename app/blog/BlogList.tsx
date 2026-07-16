"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiTag } from "react-icons/fi";
import type { PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
}

export function BlogList({ posts, tags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <>
      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeTag === null
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)] hover:text-[var(--foreground)]"
            }`}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeTag === tag
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)] hover:text-[var(--foreground)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Post list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag || "all"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {filtered.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-12">
              {posts.length === 0
                ? "暂无文章，在 content/posts/ 下添加 .mdx 文件开始写作"
                : "该标签下暂无文章"}
            </p>
          ) : (
            filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-5 rounded-xl bg-[var(--card)] border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-colors group"
                >
                  <h2 className="font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>

                  {post.description && (
                    <p className="text-sm text-[var(--muted)] mb-3 line-clamp-2">
                      {post.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} />
                      {post.readingTime}
                    </span>
                    {post.tags.length > 0 && (
                      <span className="flex items-center gap-1">
                        <FiTag size={12} />
                        {post.tags.join(", ")}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

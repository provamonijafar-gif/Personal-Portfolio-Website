import type { Metadata } from "next";
import { getPosts, getTags } from "@/lib/posts";
import { BlogList } from "./BlogList";
import { MottoBlock } from "@/components/common/MottoBlock";

export const metadata: Metadata = {
  title: "博客",
  description: "技术文章和学习笔记",
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getPosts(), getTags()]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      <BlogList posts={posts} tags={tags} />
      <MottoBlock text="If you can't explain it simply, you don't understand it well enough." />
    </div>
  );
}

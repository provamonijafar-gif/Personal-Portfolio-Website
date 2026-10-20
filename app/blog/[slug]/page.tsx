import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeMermaid } from "@/lib/rehype-mermaid";
import { getPost, getPosts } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx";
import { PostContent } from "./PostContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <PostContent meta={post.meta}>
      <PostBody slug={slug} content={post.content} />
    </PostContent>
  );
}

async function PostBody({
  slug,
  content,
}: {
  slug: string;
  content: string;
}) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `post:${slug}`);

  return (
    <MDXRemote
      source={content}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeMermaid,
            [
              rehypePrettyCode,
              {
                theme: { dark: "one-dark-pro", light: "github-light" },
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  );
}

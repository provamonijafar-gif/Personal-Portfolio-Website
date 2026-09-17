import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  parseFrontmatter,
  slugFromFilename,
  slugIssues,
  type PostValidationIssue,
} from "@/lib/post-schema";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
}

type ParsedPost = {
  meta: PostMeta;
  content: string;
};

function listMdxFilenames(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((filename) => filename.endsWith(".mdx"));
}

function formatValidationError(issues: PostValidationIssue[]): string {
  const details = issues
    .map((issue) => [`${issue.file}:`, ...issue.messages.map((message) => `  - ${message}`)].join("\n"))
    .join("\n");

  return `文章校验失败，已阻断发布。\n${details}`;
}

function parsePostFile(filename: string): { post?: ParsedPost; issue?: PostValidationIssue } {
  const file = `content/posts/${filename}`;
  const slug = slugFromFilename(filename);
  const filePath = path.join(postsDirectory, filename);
  const messages: string[] = slugIssues(slug);

  let data: unknown;
  let content = "";

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const parsed = matter(fileContent);
    data = parsed.data;
    content = parsed.content;
  } catch (error) {
    const reason = error instanceof Error ? error.message : "无法读取文件";
    return { issue: { file, messages: [...messages, reason] } };
  }

  const frontmatter = parseFrontmatter(data);
  if (!frontmatter.ok) {
    messages.push(...frontmatter.messages);
  }
  if (messages.length > 0 || !frontmatter.ok) {
    return { issue: { file, messages } };
  }

  const stats = readingTime(content);

  return {
    post: {
      meta: {
        slug,
        title: frontmatter.data.title,
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        tags: frontmatter.data.tags,
        readingTime: stats.text.replace("min read", "分钟"),
      },
      content,
    },
  };
}

export function collectPostValidationIssues(): PostValidationIssue[] {
  return listMdxFilenames().flatMap((filename) => {
    const { issue } = parsePostFile(filename);
    return issue ? [issue] : [];
  });
}

function requireValidPosts(): ParsedPost[] {
  const issues: PostValidationIssue[] = [];
  const posts: ParsedPost[] = [];

  for (const filename of listMdxFilenames()) {
    const { post, issue } = parsePostFile(filename);
    if (issue) issues.push(issue);
    if (post) posts.push(post);
  }

  if (issues.length > 0) {
    throw new Error(formatValidationError(issues));
  }

  return posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
}

export function getAllPosts(): PostMeta[] {
  return requireValidPosts().map((post) => post.meta);
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { post, issue } = parsePostFile(`${slug}.mdx`);
  if (issue) {
    throw new Error(formatValidationError([issue]));
  }

  return post ?? null;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

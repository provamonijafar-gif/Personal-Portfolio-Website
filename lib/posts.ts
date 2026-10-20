import { cacheLife, cacheTag } from "next/cache";
import {
  getAllPosts,
  getAllTags,
  getPostBySlug,
  type PostMeta,
} from "./mdx";

export async function getPosts(): Promise<PostMeta[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  return getAllPosts();
}

export async function getPost(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `post:${slug}`);

  return getPostBySlug(slug);
}

export async function getTags(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  return getAllTags();
}

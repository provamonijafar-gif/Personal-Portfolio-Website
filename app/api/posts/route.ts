import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/posts";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  console.log("有人调用我,tag是:", tag)
  const posts = await getPosts();
  const filtered = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

  return NextResponse.json({ count: filtered.length, posts: filtered });
}

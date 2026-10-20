import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { getMessages } from "@/lib/guestbook";
import { GuestbookForm } from "./GuestbookForm";

export const metadata: Metadata = {
  title: "留言板",
  description: "写下你的想法和建议",
};

export default function GuestbookPage() {

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">留言板</h1>
      <GuestbookForm />

      <Suspense fallback={<p className="mt-12 text-sm text-[var(--muted)]">加载留言中...</p>}>
        <MessageList />
      </Suspense>
    </div>
  );
}

async function MessageList() {
  await connection();
  const messages = [...(await getMessages())].reverse();

  return (
    <div className="mt-12 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-[var(--muted)] py-12">
            还没有留言，来写下第一条吧
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.createdAt}-${index}`}
              className="p-5 rounded-xl bg-[var(--card)] border border-[var(--card-border)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{message.name}</span>
                <span className="text-xs text-[var(--muted)]">
                  {message.createdAt.toLocaleString("zh-CN")}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          ))
        )}
      </div>
  );
}

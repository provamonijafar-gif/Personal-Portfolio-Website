import { Suspense } from "react";
import { connection } from "next/server";
import { getMessages } from "@/lib/guestbook";
import { RefreshPostsButton } from "./RefreshPostsButton";
import { deleteMessageAction } from "./actions";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-[var(--muted)]">加载留言中...</p>
      }
    >
      <AdminMessages />
    </Suspense>
  );
}

async function AdminMessages() {
  await connection();
  const messages = await getMessages();
  const rows = [...messages].reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">留言管理</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          共 {rows.length} 条留言
        </p>
      </div>

      <RefreshPostsButton />

      {rows.length === 0 ? (
        <div className="p-12 rounded-xl bg-[var(--card)] border border-[var(--card-border)] text-center text-sm text-[var(--muted)]">
          还没有留言
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((message) => (
            <article
              key={message.id}
              className="p-5 rounded-xl bg-[var(--card)] border border-[var(--card-border)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-semibold">{message.name}</span>
                    <span className="text-xs text-[var(--muted)]">
                      #{message.id}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {message.createdAt.toLocaleString("zh-CN")}
                  </p>
                </div>

                <form action={deleteMessageAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-sm hover:bg-red-500/10 transition-colors"
                  >
                    删除
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

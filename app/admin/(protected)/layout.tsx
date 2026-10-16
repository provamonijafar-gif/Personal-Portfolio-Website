import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOutAction } from "./actions";

export const metadata: Metadata = {
  title: "管理后台",
  description: "网站管理员后台",
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--foreground)]">
      <header className="border-b border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-semibold">
              管理后台
            </Link>
            <Link
              href="/"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              返回网站
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--muted)]">
              {session.user.name}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg border border-[var(--card-border)] text-sm hover:border-[var(--accent)] transition-colors"
              >
                退出登录
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}

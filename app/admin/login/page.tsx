import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "管理员登录",
  description: "进入网站管理后台",
};

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm p-6 rounded-xl bg-[var(--card)] border border-[var(--card-border)]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">管理员登录</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            只有网站管理员可以进入后台
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

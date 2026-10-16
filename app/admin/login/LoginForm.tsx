"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {
  success: false,
  error: null,
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          用户名
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          className="w-full px-3 py-2 rounded-lg bg-transparent border border-[var(--card-border)] text-sm focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full px-3 py-2 rounded-lg bg-transparent border border-[var(--card-border)] text-sm focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {state.error && (
        <p className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-500">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {isPending ? "登录中..." : "登录"}
      </button>
    </form>
  );
}

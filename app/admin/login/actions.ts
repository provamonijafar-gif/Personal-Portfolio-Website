"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "@/lib/auth";

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "用户名不能为空")
    .max(20, "用户名最多 20 字"),
  password: z
    .string()
    .min(1, "密码不能为空")
    .max(72, "密码最多 72 位"),
});

export interface LoginState {
  success: boolean;
  error: string | null;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "输入不合法",
    };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: "用户名或密码错误",
      };
    }

    throw error;
  }

  return {
    success: true,
    error: null,
  };
}

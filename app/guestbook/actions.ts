"use server";

import { revalidateTag } from "next/cache";
import { addMessage, guestbookInputSchema } from "@/lib/guestbook";

export interface SubmitState {
  success: boolean;
  error: string | null;
}

export async function submitMessage(
  prevState: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const parsed = guestbookInputSchema.safeParse({
    name: formData.get("name"),
    content: formData.get("content"),
  });

  if (!parsed.success) {
    return {
      ...prevState,
      success: false,
      error: parsed.error.issues[0]?.message ?? "输入不合法",
    };
  }

  try {
    await addMessage(parsed.data.name, parsed.data.content);
  } catch {
    return { ...prevState, success: false, error: "服务器写入失败，请稍后再试" };
  }

  revalidateTag("guestbook", "max");
  return { success: true, error: null };
}

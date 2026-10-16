"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth, signOut } from "@/lib/auth";
import { deleteMessage } from "@/lib/guestbook";

const messageIdSchema = z.coerce.number().int().positive();

export async function deleteMessageAction(formData: FormData): Promise<void> {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("未授权操作");
  }

  const parsed = messageIdSchema.safeParse(formData.get("id"));

  if (!parsed.success) {
    throw new Error("留言 ID 不合法");
  }

  await deleteMessage(parsed.data);

  revalidatePath("/guestbook");
  revalidatePath("/admin");
}

export async function signOutAction(): Promise<void> {
  await signOut({
    redirectTo: "/admin/login",
  });
}

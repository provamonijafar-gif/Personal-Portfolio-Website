import fs from "fs";
import path from "path";
import { z } from "zod";

const dataDirectory = path.join(process.cwd(), "data");
const guestbookFilePath = path.join(dataDirectory, "guestbook.json");

export const guestbookInputSchema = z.object({
  name: z.string().trim().min(1, "昵称不能为空").max(20, "昵称最多 20 字"),
  content: z.string().trim().min(1, "留言内容不能为空").max(200, "留言最多 200 字"),
});

export interface GuestbookMessage {
  name: string;
  content: string;
  createdAt: string;
}

export function getMessages(): GuestbookMessage[] {
  if (!fs.existsSync(guestbookFilePath)) return [];

  try {
    const raw = fs.readFileSync(guestbookFilePath, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GuestbookMessage[]) : [];
  } catch {
    return [];
  }
}

export function addMessage(name: string, content: string): GuestbookMessage {
  const message: GuestbookMessage = {
    name,
    content,
    createdAt: new Date().toISOString(),
  };

  fs.mkdirSync(dataDirectory, { recursive: true });
  const messages = getMessages();
  messages.push(message);
  fs.writeFileSync(guestbookFilePath, JSON.stringify(messages, null, 2), "utf-8");

  return message;
}

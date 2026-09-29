import type { Metadata } from "next";
import { ResumeContent } from "./ResumeContent";

export const metadata: Metadata = {
  title: "张宇豪 | 简历",
  description: "张宇豪的在线简历 - 专注于 React、TypeScript 和 AI 驱动应用的前端开发者。",
};

export default function ResumePage() {
  return <ResumeContent />;
}

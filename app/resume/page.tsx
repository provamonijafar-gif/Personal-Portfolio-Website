import type { Metadata } from "next";
import { ResumeContent } from "./ResumeContent";

export const metadata: Metadata = {
  title: "Yuhao Zhang | Resume",
  description: "Yuhao Zhang's online resume - Frontend Developer specializing in React, TypeScript and AI-powered applications.",
};

export default function ResumePage() {
  return <ResumeContent />;
}

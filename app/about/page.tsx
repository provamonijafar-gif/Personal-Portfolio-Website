import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Yuhao Zhang",
  description: "Learn more about Yuhao Zhang, a Frontend Developer specializing in React, TypeScript and AI-powered applications.",
};

export default function AboutPage() {
  return <AboutContent />;
}

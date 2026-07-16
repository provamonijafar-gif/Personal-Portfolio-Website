"use client";

import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { siteConfig } from "@/lib/site-config";

export function GitHubContribution() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <h2 className="text-2xl font-bold text-center mb-8">GitHub 贡献</h2>

      <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-6 overflow-x-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/2563eb/${siteConfig.github}`}
          alt="GitHub Contribution Graph"
          width={896}
          height={112}
          className="w-full max-w-3xl mx-auto dark:brightness-90"
          loading="lazy"
        />
      </div>

      <div className="text-center mt-4">
        <a
          href={`https://github.com/${siteConfig.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
        >
          <FiGithub size={16} />
          查看 GitHub 主页
        </a>
      </div>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiCode,
  FiTool,
  FiBook,
  FiMail,
  FiGithub,
  FiGlobe,
  FiBookOpen,
} from "react-icons/fi";
import { siteConfig } from "@/lib/site-config";
import { MottoBlock } from "@/components/common/MottoBlock";

const coreSkills = [
  { label: "Frontend Development", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Ant Design", "ECharts"] },
  { label: "AI Application Development", items: ["LLM Integration", "AI-powered Applications", "Data Visualization"] },
];

const toolsAndPlatforms = [
  { label: "Development Tools", items: ["VS Code", "Cursor", "Git", "Chrome DevTools"] },
  { label: "Engineering", items: ["ESLint", "Prettier", "GitHub Actions"] },
  { label: "Deployment", items: ["Vercel", "GitHub"] },
];

const contacts = [
  { icon: FiMail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: FiGithub, label: "GitHub", value: `github.com/${siteConfig.github}`, href: `https://github.com/${siteConfig.github}` },
  { icon: FiGlobe, label: "Portfolio", value: "Personal Website", href: "https://zyh-website1-0.vercel.app/" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function AboutContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="border-b-2 border-[var(--accent)] pb-4 flex items-center gap-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-shrink-0"
          >
            <Image
              src={siteConfig.avatar}
              alt={siteConfig.nameEn}
              width={80}
              height={80}
              className="rounded-full object-cover ring-2 ring-[var(--accent)]/30"
              priority
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Hi, I&apos;m {siteConfig.nameEn}
            </h1>
            <p className="text-sm text-[var(--muted)]">Frontend Developer</p>
          </div>
        </div>
      </motion.div>

      {/* 技术专长 */}
      <Section icon={FiCode} title="核心技术栈">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {coreSkills.map((group) => (
            <motion.div key={group.label} variants={fadeUp}>
              <p className="text-sm font-medium mb-2">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-sm bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 工具与平台 */}
      <Section icon={FiTool} title="工具与平台">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {toolsAndPlatforms.map((group) => (
            <motion.div key={group.label} variants={fadeUp}>
              <p className="text-sm font-medium mb-2">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-sm bg-[var(--card)] border border-[var(--card-border)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 教育与竞赛经历 */}
      <Section icon={FiBook} title="教育与竞赛经历">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-5 rounded-xl bg-[var(--card)] border border-[var(--card-border)]"
        >
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <span className="font-medium">西南科技大学</span>
              <span className="text-[var(--muted)] mx-2">信息管理与信息系统 本科在读</span>
            </div>
            <span className="text-sm text-[var(--muted)]">2024.09 - 至今</span>
          </div>
          <ul className="mt-3 text-sm text-[var(--muted)] space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
              Relevant coursework: Data Structures, Database Systems, Computer Networks and Software Engineering
            </li>
          </ul>
        </motion.div>
      </Section>

      {/* 联系方式 */}
      <Section icon={FiMail} title="联系方式">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {contacts.map((item) => (
            <motion.a
              key={item.label}
              variants={fadeUp}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="flex items-center gap-3 p-4 rounded-xl bg-[var(--card)] border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-colors group"
            >
              <item.icon
                size={16}
                className="text-[var(--accent)] flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs text-[var(--muted)]">{item.label}</p>
                <p className="text-sm font-medium truncate group-hover:text-[var(--accent)] transition-colors">
                  {item.value}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Section>

      <MottoBlock text="Keep building, keep learning." />
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-2 text-base font-semibold mb-4 pb-2 border-b border-[var(--card-border)]">
        <Icon size={16} className="text-[var(--accent)]" />
        {title}
      </h2>
      {children}
    </section>
  );
}

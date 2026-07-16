"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiBook,
  FiTool,
  FiBriefcase,
  FiFolder,
  FiPhone,
  FiMail,
  FiGithub,
  FiGlobe,
} from "react-icons/fi";
import { GitHubContribution } from "@/components/home/GitHubContribution";
import { MottoBlock } from "@/components/common/MottoBlock";
import { siteConfig } from "@/lib/site-config";

interface Experience {
  title: string;
  company: string;
  period: string;
  points: string[];
}

interface ResumeProject {
  name: string;
  tech: string;
  points: string[];
}

interface ResumeVersion {
  key: string;
  label: string;
  date: string;
  header: { name: string; email: string; github: string; blog: string };
  sections: {
    summary: string;
    personalEvaluation?: string[];
    education: { school: string; degree: string; gpa: string; period: string; details: string[] }[];
    skills: string[];
    experience: Experience[];
    projects: ResumeProject[];
  };
}

const resumeVersions: ResumeVersion[] = [
  {
    key: "v1-2026",
    label: "2026 Frontend Internship Resume",
    date: "2026-07",
    header: {
      name: siteConfig.name,
      email: "provamonijafar@gmail.com",
      github: siteConfig.github,
      blog: "https://zyh-website1-0.vercel.app/",
    },
    sections: {
      summary:
        "Information Management and Information Systems student focusing on frontend development and AI-powered applications. Experienced with React, TypeScript and Next.js, with hands-on experience building AI-driven BI analysis platforms and modern web applications.",
      personalEvaluation: [
        "Passionate about frontend development and continuously learning modern web technologies.",
        "Experienced in building practical projects with React, TypeScript and AI applications.",
        "Enjoys solving engineering problems and improving user experience.",
      ],
      education: [
        {
          school: "Southwest University of Science and Technology",
          degree: "Bachelor of Information Management and Information Systems",
          gpa: "",
          period: "2024.09 - 2028.07",
          details: ["Relevant coursework: Data Structures, Database Systems, Computer Networks and Software Engineering"],
        },
      ],
      skills: [
        "Frontend: React, TypeScript, Next.js, Tailwind CSS, Ant Design, ECharts",
        "Backend: Java, Spring Boot, MySQL, Redis",
        "Engineering: Git, GitHub Actions, ESLint, Prettier",
        "AI Application Development: LLM-based applications, AI coding tools",
      ],
      experience: [],
      projects: [
        {
          name: "AI Intelligent BI Analysis Platform",
          tech: "React, TypeScript, ECharts, Ant Design, zod, react-window",
          points: [
            "Built an AI-powered BI analysis platform that allows users to upload Excel/CSV files and generate visualization charts and analysis insights through large language models.",
            "Implemented runtime validation for AI-generated ECharts configurations using zod to improve reliability.",
            "Developed asynchronous task processing and optimized large-scale data rendering with react-window.",
          ],
        },
        {
          name: "Personal Portfolio Website",
          tech: "Next.js, React, TypeScript, Tailwind CSS, MDX, Framer Motion",
          points: [
            "Built and deployed a modern personal portfolio website with responsive design and animation effects.",
            "Integrated MDX-based content management and deployed the application using Vercel.",
          ],
        },
      ],
    },
  },
];

export function ResumeContent() {
  const [activeVersion, setActiveVersion] = useState(resumeVersions[0].key);
  const version = resumeVersions.find((v) => v.key === activeVersion)!;
  const v = version.sections;
  const h = version.header;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Left: Timeline */}
        <div className="sm:w-48 flex-shrink-0">
          <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-4">
            版本历史
          </h2>
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[var(--card-border)]" />
            <div className="space-y-4">
              {resumeVersions.map((ver) => {
                const isActive = ver.key === activeVersion;
                return (
                  <button
                    key={ver.key}
                    onClick={() => setActiveVersion(ver.key)}
                    className="relative flex items-center gap-3 w-full text-left group"
                  >
                    <div
                      className={`relative z-10 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                        isActive
                          ? "bg-[var(--accent)] border-[var(--accent)]"
                          : "bg-[var(--background)] border-[var(--card-border)] group-hover:border-[var(--accent)]"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium transition-colors ${
                          isActive
                            ? "text-[var(--accent)]"
                            : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                        }`}
                      >
                        {ver.label}
                      </p>
                      <p className="text-xs text-[var(--muted)]">{ver.date}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Resume */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVersion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="border-b-2 border-[var(--accent)] pb-4 mb-6">
                <h1 className="text-3xl font-bold mb-2">{h.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
                  {h.email && (
                    <span className="flex items-center gap-1">
                      <FiMail size={14} />
                      {h.email}
                    </span>
                  )}
                  <a
                    href={`https://github.com/${h.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
                  >
                    <FiGithub size={14} />
                    {h.github}
                  </a>
                  {h.blog && (
                    <a
                      href={`https://${h.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
                    >
                      <FiGlobe size={14} />
                      {h.blog}
                    </a>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6 text-sm text-[var(--muted)] leading-relaxed">
                {v.summary}
              </div>

              {/* Education */}
              <ResumeSection icon={FiBook} title="教育背景">
                {v.education.map((edu) => (
                  <div key={edu.school} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <div>
                        <span className="font-medium">{edu.school}</span>
                        <span className="text-[var(--muted)] mx-2">{edu.degree}</span>
                        {edu.gpa && <span className="text-[var(--muted)]">{edu.gpa}</span>}
                      </div>
                      <span className="text-sm text-[var(--muted)]">{edu.period}</span>
                    </div>
                    {edu.details.length > 0 && (
                      <ul className="mt-1 text-sm text-[var(--muted)] list-disc list-inside">
                        {edu.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ResumeSection>

              {/* Skills */}
              <ResumeSection icon={FiTool} title="专业技能">
                <ul className="space-y-1.5 text-sm">
                  {v.skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </ResumeSection>

              {/* Experience */}
              {v.experience.length > 0 && (
                <ResumeSection icon={FiBriefcase} title="实习经历">
                  {v.experience.map((exp) => (
                    <div key={exp.title} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div>
                          <span className="font-medium">{exp.company}</span>
                          <span className="text-[var(--muted)] mx-2">{exp.title}</span>
                        </div>
                        <span className="text-sm text-[var(--muted)]">{exp.period}</span>
                      </div>
                      <ul className="mt-2 text-sm text-[var(--muted)] list-disc list-inside space-y-1">
                        {exp.points.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ResumeSection>
              )}

              {/* Projects */}
              {v.projects.length > 0 && (
                <ResumeSection icon={FiFolder} title="项目经历">
                  {v.projects.map((proj) => (
                    <div key={proj.name} className="mb-4 last:mb-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h4 className="font-medium">{proj.name}</h4>
                        <span className="text-xs text-[var(--accent)]">{proj.tech}</span>
                      </div>
                      <ul className="mt-2 text-sm text-[var(--muted)] list-disc list-inside space-y-1">
                        {proj.points.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ResumeSection>
              )}

              {v.personalEvaluation && v.personalEvaluation.length > 0 && (
                <ResumeSection icon={FiUser} title="个人评价">
                  <ul className="space-y-1.5 text-sm">
                    {v.personalEvaluation.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-[var(--muted)]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </ResumeSection>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8">
        <GitHubContribution />
      </div>

      <MottoBlock text="Stay hungry. Stay foolish." />
    </div>
  );
}

function ResumeSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h3 className="flex items-center gap-2 text-base font-semibold mb-3 pb-2 border-b border-[var(--card-border)]">
        <Icon size={16} className="text-[var(--accent)]" />
        {title}
      </h3>
      {children}
    </section>
  );
}

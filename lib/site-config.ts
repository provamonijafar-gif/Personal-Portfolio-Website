export const siteConfig = {
  name: "张宇豪",
  nameEn: "Yuhao Zhang",
  avatar: "/avatar.png",
  title: "Yuhao Zhang | Frontend Developer",
  description: "Frontend developer specializing in React, TypeScript and AI-powered applications.",
  url: "https://zyh-website1-0.vercel.app/",
  github: "provamonijafar-gif",
  email: "provamonijafar@gmail.com",

  nav: [
    { label: "首页", href: "/" },
    { label: "博客", href: "/blog" },
    { label: "简历", href: "/resume" },
    { label: "关于", href: "/about" },
  ],

  footer: {
    contactLinks: [
      {
        label: "GitHub",
        href: "https://github.com/provamonijafar-gif",
        type: "github" as const,
      },
      {
        label: "provamonijafar@gmail.com",
        href: "mailto:provamonijafar@gmail.com",
        type: "email" as const,
      },
      {
        label: "Aweme",
        href: "https://v.douyin.com/WKSr3QRFYMQ/?utm_campaign=client_share&app=aweme&utm_medium=ios&tt_from=more&utm_source=more",
        type: "aweme" as const,
      },
    ],
    friendLinks: [
      { label: "🍔✌️ - God", href: "https://woleigefou.xyz" },
      { label: "困醒 - 全栈神", href: "https://kunxing-blog.top" },
      {
        label: "acye - 全栈神",
        href: "https://ye-guan-xing.github.io/",
      },
    ],
  },

  particles: {
    enabled: true,
    pages: ["/"],
    mobileParticleCount: 30,
    desktopParticleCount: 100,
  },
  projects: [
    {
      name: "AI Intelligent BI Analysis Platform",
      description: "An AI-powered BI analysis platform that enables users to upload Excel/CSV files and generate interactive visualization charts and analysis insights through large language models.",
      tags: ["React", "TypeScript", "ECharts", "Ant Design", "zod", "react-window"],
      link: "",
      github: "https://github.com/provamonijafar-gif/ai-bi-system",
      category: "resume" as const,
    },
    {
      name: "Personal Portfolio Website",
      description: "A modern personal portfolio website built with Next.js and TypeScript, featuring responsive design, animations and modern frontend engineering practices.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      link: "https://zyh-website1-0.vercel.app/",
      github: "",
      category: "resume" as const,
    },
  ],

  projectCategories: [
    { key: "resume", label: "简历项目" },
    { key: "vibecoding", label: "Vibe Coding" },
    { key: "ForStudy", label: "For Study" },
    { key: "Developing", label: "Developing" },
  ],
};

export type Project = (typeof siteConfig)["projects"][number];

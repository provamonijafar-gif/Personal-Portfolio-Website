import Link from "next/link";
import { FiGithub, FiMail, FiExternalLink } from "react-icons/fi";
import { BiLogoTiktok } from "react-icons/bi";
import { siteConfig } from "@/lib/site-config";

const contactIconMap = {
  github: FiGithub,
  email: FiMail,
  aweme: BiLogoTiktok,
  external: FiExternalLink,
} as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--card-border)] bg-[var(--card)]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">{siteConfig.nameEn}</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              热爱技术，持续学习，记录成长。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3">导航</h3>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Friend Links */}
          <div>
            <h3 className="font-semibold mb-3">友链</h3>
            <ul className="space-y-2">
              {siteConfig.footer.friendLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    <FiExternalLink size={12} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">联系方式</h3>
            <div className="space-y-2">
              {siteConfig.footer.contactLinks.map((link) => {
                const Icon = contactIconMap[link.type];
                const isExternal = !link.href.startsWith("mailto:");

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Icon size={16} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--card-border)] text-center text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} {siteConfig.nameEn}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

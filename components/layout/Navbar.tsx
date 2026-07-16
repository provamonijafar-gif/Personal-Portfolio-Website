"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--card-border)]">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-[var(--accent)] hover:opacity-80 transition-opacity">
          {siteConfig.nameEn}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--accent-light)] text-[var(--accent)] font-medium"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[var(--card-border)] bg-[var(--background)]"
          >
            <div className="px-4 py-2 space-y-1">
              {siteConfig.nav.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--accent-light)] text-[var(--accent)] font-medium"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

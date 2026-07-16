"use client";

import { useEffect, useRef, useState } from "react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function ArticleToc() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [indicatorStyle, setIndicatorStyle] = useState<{
    top: number;
    height: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const allHeadingElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#post-content h1, #post-content h2, #post-content h3, #post-content h4, #post-content h5, #post-content h6"
      )
    );

    const availableLevels = allHeadingElements
      .map((element) => Number(element.tagName.replace("H", "")))
      .filter((level) => Number.isFinite(level));

    const topLevel = availableLevels.length > 0 ? Math.min(...availableLevels) : null;
    const secondLevel = topLevel !== null && topLevel < 6 ? topLevel + 1 : null;

    if (topLevel === null) {
      setHeadings([]);
      setActiveId("");
      return;
    }

    const elements = allHeadingElements
      .map((element) => {
        const level = Number(element.tagName.replace("H", ""));
        const text = element.textContent?.trim() ?? "";

        if (
          !element.id ||
          !text ||
          (level !== topLevel && level !== secondLevel)
        ) {
          return null;
        }

        return {
          id: element.id,
          text,
          level,
        };
      })
      .filter((item): item is HeadingItem => item !== null);

    setHeadings(elements);
    setActiveId(elements[0]?.id ?? "");

    if (elements.length === 0) return;

    const observers = elements
      .map((item) => document.getElementById(item.id))
      .filter((item): item is HTMLElement => item !== null);

    const visibleHeadings = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleHeadings.set(id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(id);
          }
        });

        if (visibleHeadings.size > 0) {
          const nextActive = [...visibleHeadings.entries()].sort(
            (a, b) => a[1] - b[1]
          )[0]?.[0];

          if (nextActive) {
            setActiveId(nextActive);
          }
          return;
        }

        const current = [...observers]
          .reverse()
          .find((element) => element.getBoundingClientRect().top <= 140);

        setActiveId(current?.id ?? elements[0]?.id ?? "");
      },
      {
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    observers.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (headings.length === 0) {
      setIndicatorStyle(null);
      return;
    }

    const updateIndicator = () => {
      if (!activeId || !containerRef.current) return;

      const activeItem = itemRefs.current[activeId];
      if (!activeItem) return;

      const top = activeItem.offsetTop + activeItem.offsetHeight / 2 - 18;
      const height = Math.max(28, Math.min(40, activeItem.offsetHeight - 6));

      setIndicatorStyle({ top, height });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeId, headings]);

  if (headings.length === 0) {
    return null;
  }

  const topLevel = Math.min(...headings.map((heading) => heading.level));
  const secondLevel = topLevel < 6 ? topLevel + 1 : null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = window.scrollY + element.getBoundingClientRect().top - 96;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <aside className="hidden xl:block fixed top-28 left-[calc(50%+26rem)] w-64">
      <div ref={containerRef} className="relative pl-8">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-[var(--card-border)]" />
        {indicatorStyle && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 w-px bg-[var(--accent)] transition-all duration-200"
            style={{ top: indicatorStyle.top, height: indicatorStyle.height }}
          />
        )}

        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            Page Navigation
          </p>
        </div>

        <nav aria-label="文章目录" className="no-scrollbar max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
          <ul className="space-y-2">
            {headings.map((heading) => {
              const isActive = heading.id === activeId;

              return (
                <li
                  key={heading.id}
                  ref={(node) => {
                    itemRefs.current[heading.id] = node;
                  }}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => scrollToHeading(heading.id)}
                    className={[
                      "group flex w-full items-start gap-2 rounded-md text-left leading-6 transition-colors",
                      heading.level === secondLevel
                        ? "py-0.5 pl-4 text-[14px]"
                        : "py-1 text-[15px]",
                      isActive
                        ? "text-[var(--foreground)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]",
                    ].join(" ")}
                  >
                    <span className="line-clamp-2 flex-1 font-medium">{heading.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

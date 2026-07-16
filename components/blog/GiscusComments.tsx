"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    },
    []
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px",
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const container = containerRef.current;
    const existing = container.querySelector("iframe.giscus-frame");

    if (existing) {
      const iframe = existing as HTMLIFrameElement;
      const theme = resolvedTheme === "dark" ? "dark" : "light";
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      );
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "provamonijafar-gif/personal-portfolio"); // TODO: Replace with your GitHub repository for Giscus comments
    script.setAttribute("data-repo-id", "R_kgDORdXyGA");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDORdXyGM4C3mRl");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute(
      "data-theme",
      resolvedTheme === "dark" ? "dark" : "light"
    );
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.appendChild(script);
  }, [isVisible, resolvedTheme]);

  return (
    <div className="mt-12">
      <div ref={sentinelRef} />
      <div ref={containerRef} />
    </div>
  );
}

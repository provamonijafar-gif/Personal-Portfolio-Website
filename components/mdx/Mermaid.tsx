"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "default",
        gantt: {
          useWidth: 800,
          barHeight: 20,
          barGap: 4,
          topPadding: 40,
          sectionFontSize: 13,
          numberSectionStyles: 4,
        },
      });
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      mermaid.render(id, chart.trim()).then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme]);

  return (
    <div
      ref={ref}
      className="mermaid-wrapper overflow-x-auto my-6 [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

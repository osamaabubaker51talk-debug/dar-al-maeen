"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-8 w-8" />;

  const themes = ["light", "dark", "golden"] as const;
  const labels: Record<string, string> = {
    light: "☀️",
    dark: "🌙",
    golden: "✨",
  };

  const current = themes.indexOf((theme as string) ?? "light");
  const next = themes[(current + 1) % themes.length];

  return (
    <button
      onClick={() => setTheme(next)}
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm transition-colors hover:bg-white/20"
      title={`الوضع: ${theme === "light" ? "النهاري" : theme === "dark" ? "الليلي" : "الذهبي"}`}
    >
      {labels[theme as string] ?? "☀️"}
    </button>
  );
}

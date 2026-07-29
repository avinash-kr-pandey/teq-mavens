"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="theme-toggle-pill-placeholder" />;
  }

  return (
    <div className="theme-toggle-pill">
      <button
        type="button"
        className={cn("theme-toggle-btn", resolvedTheme === "light" && "active")}
        aria-label="Use light color theme"
        onClick={() => setTheme("light")}
      >
        <Sun size={13} />
      </button>
      <button
        type="button"
        className={cn("theme-toggle-btn", resolvedTheme === "dark" && "active")}
        aria-label="Use dark color theme"
        onClick={() => setTheme("dark")}
      >
        <Moon size={13} />
      </button>
    </div>
  );
}

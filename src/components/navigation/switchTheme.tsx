"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const SwitchTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      aria-label="theme"
      className="flex items-center gap-x-3 py-3 px-4"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Sun className="svg" /> : <Moon className="svg" />}
      <div className="max-md:hidden">
        {theme === "light" ? "Light" : "Dark"} mode
      </div>
    </button>
  );
};

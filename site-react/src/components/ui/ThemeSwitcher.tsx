"use client";
import React, { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "site-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else {
    if (prefersDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }
}

export default function ThemeSwitcher(): JSX.Element {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = saved || "system";
    setTheme(initial);
    applyTheme(initial);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (localStorage.getItem(STORAGE_KEY) === "system") {
        applyTheme("system");
      }
    };
    try {
      mql.addEventListener("change", listener);
    } catch (e) {
      
      mql.addListener(listener);
    }

    return () => {
      try {
        mql.removeEventListener("change", listener);
      } catch (e) {
        // @ts-ignore
        mql.removeListener(listener);
      }
    };
  }, []);

  const next = (t: Theme) => (t === "light" ? "dark" : t === "dark" ? "system" : "light");

  const cycle = () => {
    const n = next(theme);
    localStorage.setItem(STORAGE_KEY, n);
    setTheme(n);
    applyTheme(n);
  };

  return (
    <button
      onClick={cycle}
      title={`Theme: ${theme}. Click to cycle.`}
      className="px-3 py-2 rounded-full bg-neutral-100/70 dark:bg-neutral-800/70 border border-transparent hover:shadow-md transition"
      aria-pressed="false"
    >
      {theme === "light" && <span>Light</span>}
      {theme === "dark" && <span>Dark</span>}
      {theme === "system" && <span>System</span>}
    </button>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

/**
 * Reads the theme the blocking script in layout.tsx already stamped onto
 * <html data-theme> before hydration, then owns toggling it from here on.
 */
export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [spins, setSpins] = useState(0);

  useEffect(() => {
    // The blocking script in layout.tsx already stamped the right value onto
    // <html data-theme> before this ever mounted (there's no way to read
    // localStorage during SSR to seed useState correctly), so this effect's
    // only job is to bring React's copy into agreement with the DOM.
    const initial = document.documentElement.dataset.theme;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial === "light" || initial === "dark") setMode(initial);
  }, []);

  const toggle = useCallback(() => {
    setMode((prev) => {
      const next: ThemeMode = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      try {
        localStorage.setItem("aditya.theme", next);
      } catch {}
      return next;
    });
    setSpins((s) => s + 1);
  }, []);

  return { mode, toggle, spins };
}

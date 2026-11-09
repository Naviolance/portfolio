"use client";

import { useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import { applyStoredTheme, currentTheme, setTheme } from "@/lib/theme";

// Light/dark switch in the header. The icon is chosen by CSS (the dark:
// prefix), not by React state: the server can't know the visitor's theme,
// so the button renders the same HTML for everyone and shows the right
// icon from the first paint. The moon means "switch to dark", the sun
// "switch to light".
export function ThemeToggle() {
  const t = useTranslations("nav");
  // A layout effect runs after React has updated <html> but before the
  // browser paints, so restoring the choice here never shows a flash.
  useLayoutEffect(applyStoredTheme, []);
  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme() === "dark" ? "light" : "dark")}
      aria-label={t("theme")}
      title={t("theme")}
      className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
    >
      {/* Moon: shown in light mode. */}
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="dark:hidden">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      {/* Sun: shown in dark mode. */}
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="hidden dark:block">
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

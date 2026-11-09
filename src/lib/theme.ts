// Light or dark, chosen with the header button (ThemeToggle). Without a
// choice the site follows the device setting (globals.css).
//
// The choice is kept in this browser only (localStorage), like the cookie
// choice: a display preference, nothing is tracked or sent.
export const THEME_KEY = "theme";
export type Theme = "light" | "dark";

// Runs in <head> before the page is painted, so a visitor who chose dark
// never sees a white flash on load. localStorage can throw (private
// windows, blocked site data): then the device setting applies.
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

// Puts the saved choice back on <html>. Switching language swaps the root
// layout, and React clears <html>'s attributes when it does, so the choice
// themeScript applied on load is lost: ThemeToggle calls this whenever it
// mounts, before the browser paints.
export function applyStoredTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  } catch {
    // Blocked storage: the device setting applies.
  }
}

// The theme on screen now: the visitor's choice, else the device setting.
export function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Not saved: it still applies until the next page load.
  }
}

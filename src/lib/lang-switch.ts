// Switching language swaps the whole page (the language is the root layout),
// so by default you land back at the top and the entrance animations replay.
// This keeps your place instead: before switching we note which section you
// were reading and how far into it; the new page scrolls back to that same
// section (not the same pixel: French text is longer, so pixels drift).

const KEY = "lang-switch-place";

type Place = { id: string | null; offset: number; at: number };

// Called on click of the EN/FR switch, before the navigation starts.
export function rememberPlace() {
  // The last element with an id whose top has scrolled past the nav bar:
  // ids are the same in both languages (#services, #pricing, FAQ entries…).
  let anchor: HTMLElement | null = null;
  for (const el of document.querySelectorAll<HTMLElement>("main [id]")) {
    if (el.getBoundingClientRect().top <= 80) anchor = el;
  }
  const place: Place = anchor
    ? { id: anchor.id, offset: -anchor.getBoundingClientRect().top, at: Date.now() }
    : { id: null, offset: window.scrollY, at: Date.now() };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(place));
  } catch {
    // Storage blocked (private mode…): the switch still works, from the top.
  }
}

// Called by the new page before its first paint (a layout effect). Returns
// true if it restored a place; it also flags <html> so the CSS skips the
// hero's entrance animations (see "Language switch" in globals.css). The flag
// can't be set at click time: React re-renders <html> for the new language
// and drops attributes it doesn't know about.
export function restorePlace(): boolean {
  let place: Place | null = null;
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    place = raw ? (JSON.parse(raw) as Place) : null;
  } catch {
    return false;
  }
  // Ignore a stale entry (e.g. the click opened a new tab instead).
  if (!place || Date.now() - place.at > 10_000) return false;

  const anchor = place.id ? document.getElementById(place.id) : null;
  const top = anchor ? anchor.getBoundingClientRect().top + window.scrollY + place.offset : place.offset;
  window.scrollTo({ top, behavior: "instant" });
  document.documentElement.setAttribute("data-lang-switch", "");
  return true;
}

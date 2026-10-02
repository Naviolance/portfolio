import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";
// Relative, not "@/": next.config.ts imports this file, and the alias
// isn't resolved there.
import { servicePathIn } from "./service-slugs";

// Pages whose address is translated, like the service pages: French words
// in French addresses. Each one is a folder per language under app/[locale]/
// (how-i-work/, ma-methode/), and next.config.ts redirects the wrong-language
// combination (/fr/how-i-work → /fr/ma-methode). Changing one breaks links
// already shared.
export const PROCESS_PATH = { en: "/how-i-work", fr: "/ma-methode" } satisfies Localized;

// The same page's path in another language: translated pages and service
// pages, or null for every other page (whose path is the same in both).
export function translatedPathIn(path: string, from: Locale, to: Locale) {
  if (path === PROCESS_PATH[from]) return PROCESS_PATH[to];
  return servicePathIn(path, from, to);
}

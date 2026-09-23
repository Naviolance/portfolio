import type { Locale } from "@/i18n/routing";

// Long-form content (projects, services, prices, FAQ) keeps every language
// side by side in the data files: { en: "...", fr: "..." }. Because this is
// a Record over every locale, TypeScript refuses to build if one is missing.
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

import type { Locale } from "@/i18n/routing";

// French puts a space before : ; ? ! and %. A normal space there lets the
// browser wrap the sign onto the next line on its own (": vitrine, ...").
// This swaps it for a non-breaking one. English text is returned unchanged.
export function frenchSpacing(text: string, locale: Locale) {
  return locale === "fr" ? text.replace(/ ([:;?!%])/g, " $1") : text;
}

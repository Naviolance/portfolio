import type { Locale } from "@/i18n/routing";

// 1 → "01": step numbers, case study "01 / 03", pricing cards.
export const pad2 = (n: number) => String(n).padStart(2, "0");

// "2026-09-30" → "30 Sept 2026" / "30 sept. 2026" (day) or "Sept 2026" /
// "sept. 2026" (month): footer "Updated", case study facts.
export function formatDate(isoDate: string, locale: Locale, style: "day" | "month" = "day") {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    ...(style === "day" && { day: "numeric" }),
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

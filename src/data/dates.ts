// When each page's content last really changed (YYYY-MM-DD). The sitemap
// and the case studies' structured data report these, so search engines
// and AI crawlers know what's worth re-reading.
//
// ⚠ Bump a date when you change that page's CONTENT (text, prices, projects,
// screenshots), not for code or styling changes. A date that changes on
// every deploy tells Google nothing, which is why these aren't automatic.
export const updated = {
  home: "2026-10-09",
  faq: "2026-10-09",
  cv: "2026-10-20",
  services: "2026-10-09",
  process: "2026-10-09",
  projects: {
    truckparts: "2026-10-09",
    pharmap: "2026-10-09",
    "car-rental": "2026-10-09",
    "seo-audit-tool": "2026-10-19",
  } as Record<string, string>,
};

// The same dates for structured data (JSON-LD). Google wants a full date and
// time with a timezone there ("Invalid datetime value" otherwise); the
// sitemap takes the plain date. Midnight, Cameroon time (WAT, no DST).
export function schemaDate(date: string) {
  return `${date}T00:00:00+01:00`;
}

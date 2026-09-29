// When each page's content last really changed (YYYY-MM-DD). The sitemap
// and the case studies' structured data report these, so search engines
// and AI crawlers know what's worth re-reading.
//
// ⚠ Bump a date when you change that page's CONTENT (text, prices, projects,
// screenshots), not for code or styling changes. A date that changes on
// every deploy tells Google nothing, which is why these aren't automatic.
export const updated = {
  home: "2026-09-29",
  faq: "2026-09-28",
  cv: "2026-09-28",
  projects: {
    truckparts: "2026-09-28",
    pharmap: "2026-09-28",
    "car-rental": "2026-09-28",
  } as Record<string, string>,
};

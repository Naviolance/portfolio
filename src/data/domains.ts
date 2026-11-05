// The site's address. Canonical links, the sitemap, robots.txt, share cards
// and the CV PDF all derive from it (data/site.ts).
// No imports: next.config.ts imports this file, where "@/" isn't resolved.
export const SITE_DOMAIN = "jpfwwebservices.com";

// Former addresses. Each one redirects permanently, page for page, to
// SITE_DOMAIN (next.config.ts), so shared links keep working and search
// engines move their ranking to the new address. Never remove one.
export const OLD_DOMAINS = ["jpfw-webservices.vercel.app"];

// IndexNow (app/api/indexnow, daily via Vercel Cron): tells Bing (so ChatGPT search and
// Copilot), Yandex, Seznam and Naver which pages just changed. Public by
// design: public/<key>.txt holds the same value, which proves the
// notifications come from this site.
export const INDEXNOW_KEY = "f476dd61244947c0098151d0c4a30400";

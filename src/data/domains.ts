// The site's address. Canonical links, the sitemap, robots.txt, share cards
// and the CV PDF all derive from it (data/site.ts).
// No imports: next.config.ts imports this file, where "@/" isn't resolved.
export const SITE_DOMAIN = "jpfwwebservices.com";

// Former addresses. Each one redirects permanently, page for page, to
// SITE_DOMAIN (next.config.ts), so shared links keep working and search
// engines move their ranking to the new address. Never remove one.
export const OLD_DOMAINS = ["jpfw-webservices.vercel.app"];

import { defineRouting } from "next-intl/routing";

// Every page exists once in the code and is served at /en/... and /fr/...
// Separate URLs per language are what let Google index both versions
// (a cookie- or browser-based switch on one URL gets only one indexed).
export const routing = defineRouting({
  locales: ["en", "fr"],
  // Fallback when the browser language is neither English nor French.
  // English because clients can come from anywhere; French browsers
  // (most of Cameroon) are sent to /fr automatically.
  defaultLocale: "en",
  // No hreflang Link header from the middleware: it doesn't know the
  // translated addresses (/fr/services/creation-site-vitrine...) and sent
  // Google wrong ones. The <link hreflang> tags in each page and the sitemap
  // carry the right list (lib/seo.ts, app/sitemap.ts).
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];

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
});

export type Locale = (typeof routing.locales)[number];

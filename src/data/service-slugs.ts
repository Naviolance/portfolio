import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";

// Each service page's address in each language: /en/services/<en>,
// /fr/services/<fr>. French words in French addresses, because these pages
// exist to match French searches. Changing one breaks links already shared.
// Kept apart from services.ts (which imports screenshots) because the
// language switch, a client component, needs them too.
export const SERVICE_SLUGS = {
  "business-websites": { en: "business-websites", fr: "creation-site-vitrine" },
  ecommerce: { en: "ecommerce", fr: "creation-boutique-en-ligne" },
  "web-applications": { en: "web-applications", fr: "developpement-application-web" },
  wordpress: { en: "wordpress", fr: "site-wordpress" },
  seo: { en: "seo-ai-search", fr: "referencement-google-ia" },
} satisfies Record<string, Localized>;

export type ServiceId = keyof typeof SERVICE_SLUGS;

// The same service page's path in another language, or null if `path` isn't
// a service page.
export function servicePathIn(path: string, from: Locale, to: Locale) {
  const slug = path.match(/^\/services\/([^/]+)$/)?.[1];
  const entry = Object.values(SERVICE_SLUGS).find((slugs) => slugs[from] === slug);
  return entry ? `/services/${entry[to]}` : null;
}

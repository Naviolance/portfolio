import { routing, type Locale } from "@/i18n/routing";

// canonical + hreflang for a page, given its path WITHOUT the language
// prefix ("" for home, "/projects/truckparts", "/faq"...).
//   canonical: this language's own URL, so ?ref= links etc. aren't treated
//              as duplicates
//   languages: the same page in every language, so Google shows French
//              searchers /fr/... and English searchers /en/..., and treats
//              them as translations rather than competing copies
//   x-default: what to show people whose language we don't have
export function languageAlternates(locale: Locale, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${routing.defaultLocale}${path}`,
    },
  };
}

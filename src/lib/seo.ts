import { routing, type Locale } from "@/i18n/routing";

// canonical + hreflang for a page, given its path WITHOUT the language
// prefix ("" for home, "/projects/truckparts", "/faq"...), or one path per
// language when the address itself is translated (service pages).
//   canonical: this language's own URL, so ?ref= links etc. aren't treated
//              as duplicates
//   languages: the same page in every language, so Google shows French
//              searchers /fr/... and English searchers /en/..., and treats
//              them as translations rather than competing copies
//   x-default: what to show people whose language we don't have
export function languageAlternates(locale: Locale, path: string | Record<Locale, string>) {
  const pathFor = (l: Locale) => (typeof path === "string" ? path : path[l]);
  return {
    canonical: `/${locale}${pathFor(locale)}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${pathFor(l)}`])),
      "x-default": `/${routing.defaultLocale}${pathFor(routing.defaultLocale)}`,
    },
  };
}

import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { ogSize } from "@/lib/og";

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

// Link previews (WhatsApp, LinkedIn, Facebook, X) for a page: title,
// description, address and the share image.
//
// Next merges metadata from the layout and the page SHALLOWLY: a page that
// sets `openGraph` replaces the layout's whole block, share image included,
// and `twitter` stays the homepage's unless the page sets it too. So every
// page builds both blocks here; tests/pages.spec.ts checks each page has an
// image and its own title.
//
// image: the site's card ([locale]/opengraph-image.tsx) by default, or "own"
// for a page whose folder has its own opengraph-image file (case studies),
// which Next then adds itself.
export function shareMetadata(
  locale: Locale,
  { title, description, path, type = "website", image = "site" }: {
    title: string;
    description: string;
    path: string; // with the language prefix: "/en/faq"
    type?: "website" | "article";
    image?: "site" | "own";
  }
): Pick<Metadata, "openGraph" | "twitter"> {
  const card =
    image === "site"
      ? [{ url: `/${locale}/opengraph-image/card`, ...ogSize, type: "image/png", alt: `${site.name}: ${site.headline[locale]} | ${site.brand}` }]
      : undefined;
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.brand,
      type,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      ...(card && { images: card }),
    },
    twitter: { card: "summary_large_image", title, description, ...(card && { images: card }) },
  };
}

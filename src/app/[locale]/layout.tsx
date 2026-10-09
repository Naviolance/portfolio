import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { languageAlternates, shareMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/SiteShell";
import "../globals.css";

// Pre-render every page in both languages at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = (await props.params) as { locale: Locale };
  // Search words and city first, name last; under 60 characters so Google
  // shows it whole (tests/pages.spec.ts checks every page).
  const title = `${site.headline[locale]} ${locale === "fr" ? "à" : "in"} Douala | ${site.name}`;

  return {
    metadataBase: new URL(site.url),
    // Short suffix: the page's own words get the space Google shows.
    title: { default: title, template: `%s | ${site.name}` },
    description: site.description[locale],
    applicationName: site.brand,
    authors: [{ name: site.fullName, url: site.url }],
    creator: site.fullName,
    // canonical = this language's URL; languages = hreflang tags pointing
    // Google to the same page in the other language.
    alternates: languageAlternates(locale, ""),
    // The homepage's link preview; every other page sets its own through
    // the same helper (lib/seo.ts explains why each page must).
    ...shareMetadata(locale, { title, description: site.description[locale], path: `/${locale}` }),
    // Search engine ownership checks (HTML tag method): Google Search Console
    // and Bing Webmaster Tools. Public by design; they only prove the site is
    // ours. Bing's index also feeds ChatGPT search and Copilot.
    verification: {
      google: "IY2sevyae-juuPN113pCwIWRUFw_1PGNo7ZOR37B3PU",
      other: { "msvalidate.01": "992BD58D8CE1B25023A3E478DF040F6E" },
    },
    // Favicon and apple-touch-icon come from app/icon.png and
    // app/apple-icon.png; the share image from [locale]/opengraph-image.tsx.
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // Lets every server component below render statically for this language.
  setRequestLocale(locale);

  return <SiteShell locale={locale}>{children}</SiteShell>;
}

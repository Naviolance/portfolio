import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { languageAlternates } from "@/lib/seo";
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
  const title = `${site.name}: ${site.headline[locale]} | ${site.brand}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}, ${site.headline[locale]}` },
    description: site.description[locale],
    applicationName: site.brand,
    authors: [{ name: site.fullName, url: site.url }],
    creator: site.fullName,
    // canonical = this language's URL; languages = hreflang tags pointing
    // Google to the same page in the other language.
    alternates: languageAlternates(locale, ""),
    openGraph: {
      title,
      description: site.description[locale],
      siteName: site.brand,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description[locale],
    },
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

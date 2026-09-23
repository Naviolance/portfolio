import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sora, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { languageAlternates } from "@/lib/seo";
import "../globals.css";

// Sora (headings) echoes the wide geometric lettering in the JPFW logo;
// DM Sans keeps body text plain and readable. Both are variable fonts and
// self-hosted by next/font, so visitors never hit Google's servers.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

// Pre-render every page in both languages at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = (await props.params) as { locale: Locale };
  const title = `${site.name}: ${site.role[locale]} | ${site.brand}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}, ${site.role[locale]}` },
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
    // Google Search Console ownership check (URL-prefix property, HTML tag
    // method). Public by design; it only proves the site is ours.
    verification: {
      google: "IY2sevyae-juuPN113pCwIWRUFw_1PGNo7ZOR37B3PU",
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

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${dmSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* Hands this language's interface text to the client components. */}
        <NextIntlClientProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton
            projectTitles={Object.fromEntries(projects.map((p) => [p.slug, p.title]))}
          />
          <RevealOnScroll />
        </NextIntlClientProvider>
        <SiteAnalytics />
      </body>
    </html>
  );
}

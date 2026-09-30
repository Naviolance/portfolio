import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sora, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
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
// Message namespaces used by "use client" components. A client component
// using another namespace would show raw keys: add it here (the e2e tests
// catch that on the pages they visit).
const CLIENT_NAMESPACES = ["nav", "whatsapp", "hero", "work", "gallery", "faq"] as const;

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

  // Only the text that client components use (see CLIENT_NAMESPACES), not
  // the whole site's: server components read their text on the server.
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]));

  // slug → title, for the WhatsApp buttons' "I saw your <project>" message.
  const projectTitles = Object.fromEntries(projects.map((p) => [p.slug, p.title]));

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${dmSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* Hands this language's interface text to the client components. */}
        <NextIntlClientProvider messages={clientMessages}>
          <Nav projectTitles={projectTitles} />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton projectTitles={projectTitles} />
          <RevealOnScroll />
        </NextIntlClientProvider>
        <SiteAnalytics />
      </body>
    </html>
  );
}

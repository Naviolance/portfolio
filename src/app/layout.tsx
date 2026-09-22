import type { Metadata } from "next";
import { Sora, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/data/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { projects } from "@/data/projects";
import "./globals.css";

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

const title = `${site.name}: ${site.role} | ${site.brand}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}, ${site.role}` },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: site.description,
    siteName: site.brand,
    type: "website",
    locale: "en",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  // Favicon and apple-touch-icon come from app/icon.png and app/apple-icon.png;
  // the share image from app/opengraph-image.tsx (Next file conventions).
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${dmSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton
          projectTitles={Object.fromEntries(projects.map((p) => [p.slug, p.title]))}
        />
        <RevealOnScroll />
        <SiteAnalytics />
      </body>
    </html>
  );
}

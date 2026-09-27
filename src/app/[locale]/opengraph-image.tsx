import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";
import { site } from "@/data/site";
import { ogFonts, ogSize } from "@/lib/og";
import { ShippingLabel } from "@/lib/og-label";

// The card shown when the site is shared (WhatsApp, LinkedIn, X...), in the
// language of the page being shared. Next adds the og:image tags itself.
// Drawn as a shipping label: from Priestly in Douala, to your business.

// Used instead of `export const alt` so the alt text follows the language.
export function generateImageMetadata({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  return [
    {
      id: "card",
      size: ogSize,
      contentType: "image/png",
      alt: `${site.name}: ${site.role[locale]} | ${site.brand}`,
    },
  ];
}

const text = {
  from: { en: "FROM", fr: "DE" },
  to: { en: "TO", fr: "POUR" },
  toValue: { en: "Your business, anywhere", fr: "Votre entreprise, partout" },
  service: { en: "SERVICE", fr: "SERVICE" },
  contents: { en: "CONTENTS", fr: "CONTENU" },
  // The tagline without "I build", to read as the parcel's contents.
  heading: {
    en: "Websites and web apps that help businesses sell, manage their work and grow online.",
    fr: "Des sites et des applications web qui aident les entreprises à vendre, à mieux s'organiser et à grandir en ligne.",
  },
  items: {
    en: ["Websites", "Online stores", "Web apps", "SEO"],
    fr: ["Sites web", "Boutiques en ligne", "Applis web", "SEO"],
  },
  stamp: { en: "HANDLE WITH CARE", fr: "MANIPULER AVEC SOIN" },
} satisfies Record<string, Localized | Localized<string[]>>;

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const heading = text.heading[locale];

  return new ImageResponse(
    (
      <ShippingLabel
        fields={[
          { label: text.from[locale], value: `${site.name} · Douala, CM`, width: 372 },
          { label: text.to[locale], value: text.toValue[locale] },
          { label: text.service[locale], value: "JPFW Web", width: 318 },
        ]}
        contentsLabel={text.contents[locale]}
        items={text.items[locale]}
        panel={<div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>JPFW</div>}
        stamp={text.stamp[locale]}
        code="JPFW 2026 0001"
      >
        {/* The French line is longer; shrink it so it stays on 4 lines. */}
        <div style={{ fontSize: heading.length > 100 ? 46 : 54, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.2 }}>
          {heading}
        </div>
      </ShippingLabel>
    ),
    { ...ogSize, fonts: ogFonts },
  );
}

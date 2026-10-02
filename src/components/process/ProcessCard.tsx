import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";
import { processPage as P } from "@/data/process";
import { site } from "@/data/site";
import { ogFonts, ogSize } from "@/lib/og";
import { ShippingLabel } from "@/lib/og-label";
import { bigPanel, cardHeading } from "@/lib/og-panels";
import { pad2 } from "@/lib/format";

// The "How I work" share card. Served by how-i-work/ and ma-methode/
// (opengraph-image.tsx in each re-exports this), in the page's language.

export function generateImageMetadata({ params }: { params: { locale: Locale } }) {
  return [{ id: "card", size: ogSize, contentType: "image/png", alt: `${P.heading[params.locale]} | ${site.brand}` }];
}

const text = {
  from: { en: "FROM", fr: "DE" },
  to: { en: "TO", fr: "POUR" },
  toValue: { en: "Your business, anywhere", fr: "Votre entreprise, partout" },
  steps: { en: "STEPS", fr: "ÉTAPES" },
  contents: { en: "CONTENTS", fr: "CONTENU" },
  items: {
    en: ["Written quote", "50% / 50%", "Previews", "All yours"],
    fr: ["Devis écrit", "50 % / 50 %", "Aperçus", "Tout à vous"],
  },
} satisfies Record<string, Localized | Localized<string[]>>;

export default async function ProcessCard({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const count = pad2(P.steps.length);
  return new ImageResponse(
    (
      <ShippingLabel
        fields={[
          { label: text.from[locale], value: `${site.name} · Douala, CM`, width: 372 },
          { label: text.to[locale], value: text.toValue[locale] },
          { label: text.steps[locale], value: String(P.steps.length), width: 318 },
        ]}
        contentsLabel={text.contents[locale]}
        items={text.items[locale]}
        panel={bigPanel({ note: P.eyebrow[locale].toUpperCase(), value: `01→${count}` })}
        stamp={P.ticket.stamp[locale].toUpperCase()}
        code="JPFW 2026 0007"
      >
        {cardHeading(P.heading[locale])}
      </ShippingLabel>
    ),
    { ...ogSize, fonts: ogFonts },
  );
}

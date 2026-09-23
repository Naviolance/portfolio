import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { ogColors, ogFonts, ogMark } from "@/lib/og";

// The card shown when the site is shared (WhatsApp, LinkedIn, X...), in the
// language of the page being shared. Next adds the og:image tags itself.
const size = { width: 1200, height: 630 };

// Used instead of `export const alt` so the alt text follows the language.
export function generateImageMetadata({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  return [
    {
      id: "card",
      size,
      contentType: "image/png",
      alt: `${site.name}: ${site.role[locale]} | ${site.brand}`,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const tagline = site.tagline[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: ogColors.navy,
          color: ogColors.text,
          fontFamily: "Sora",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ogMark} width={88} height={88} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</div>
            <div style={{ fontSize: 22, letterSpacing: 6, color: ogColors.cyan }}>
              {site.brand.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* The French tagline is longer; shrink it so it stays on 3 lines. */}
          <div
            style={{
              fontSize: tagline.length > 100 ? 44 : 52,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {tagline}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: ogColors.soft }}>
            <div style={{ width: 56, height: 4, background: ogColors.gradient }} />
            {site.role[locale]} · {site.location[locale]}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}

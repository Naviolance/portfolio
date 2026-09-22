import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { ogColors, ogFonts, ogMark } from "@/lib/og";

// The card shown when the site is shared (WhatsApp, LinkedIn, X...).
// Generated once at build time; Next adds the og:image tags automatically.
export const alt = `${site.name}: ${site.role} | ${site.brand}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
            {site.tagline}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: ogColors.soft }}>
            <div style={{ width: 56, height: 4, background: ogColors.gradient }} />
            {site.role} · {site.country}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}

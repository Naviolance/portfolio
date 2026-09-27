import { ImageResponse } from "next/og";
import { join } from "node:path";
import sharp from "sharp";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { ogColors, ogFonts, ogSize } from "@/lib/og";
import { ShippingLabel } from "@/lib/og-label";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";

// Per-project share card: the same shipping label as the homepage card, with
// the project as the parcel's contents and its homepage screenshot, so a
// shared case-study link previews the actual project.

// Per-project alt text ("TruckParts, Automotive / E-commerce"). A plain
// `export const alt` would be the same string for every project.
// Note: Next 16 fails the build if this file also exports
// generateStaticParams, so these images render on first request (~0.3s)
// and are cached after that.
const BY: Localized = { en: "a project by", fr: "un projet de" };

export function generateImageMetadata({ params }: { params: { slug: string; locale: Locale } }) {
  const { locale } = params;
  const project = getProject(params.slug);
  return [
    {
      id: "card",
      size: ogSize,
      contentType: "image/png",
      alt: project
        ? `${project.title}, ${project.category[locale]}: ${BY[locale]} ${site.name}`
        : `${BY[locale]} ${site.name}`,
    },
  ];
}

const text = {
  from: { en: "FROM", fr: "DE" },
  type: { en: "TYPE", fr: "TYPE" },
  parcel: { en: "PARCEL", fr: "COLIS" },
  contents: { en: "CONTENTS", fr: "CONTENU" },
  stamp: { en: "DELIVERED", fr: "LIVRÉ" },
} satisfies Record<string, Localized>;

const pad = (n: number) => String(n).padStart(2, "0");

export default async function Image({ params }: { params: Promise<{ slug: string; locale: Locale }> }) {
  const { slug, locale } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });
  const number = projects.indexOf(project) + 1;
  // First clause of the summary: "An online store for truck spare parts."
  const lead = project.summary[locale].split(/[.:]/)[0].trim();

  // Crop the 1.7MB source PNG to the panel (its top-left corner, where the
  // headline is) before embedding it. Messaging apps (WhatsApp especially)
  // silently drop previews whose image is too heavy.
  const shot = await sharp(join(process.cwd(), `src/assets/screenshots/${slug}/home.png`))
    .resize(624, 632, { fit: "cover", position: "northwest" })
    .jpeg({ quality: 62 })
    .toBuffer();

  return new ImageResponse(
    (
      <ShippingLabel
        fields={[
          { label: text.from[locale], value: `${site.name} · Douala, CM`, width: 372 },
          { label: text.type[locale], value: project.category[locale] },
          { label: text.parcel[locale], value: `${pad(number)} / ${pad(projects.length)}`, width: 318 },
        ]}
        contentsLabel={text.contents[locale]}
        items={project.tags.slice(0, 4)}
        panel={
          <img
            src={`data:image/jpeg;base64,${shot.toString("base64")}`}
            width={312}
            height={316}
            alt=""
            style={{ objectFit: "cover", objectPosition: "left top" }}
          />
        }
        stamp={text.stamp[locale]}
        code={`JPFW 2026 01${pad(number)}`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.2 }}>{project.title}</div>
          <div style={{ fontSize: 26, lineHeight: 1.3, color: ogColors.soft, maxWidth: 680 }}>{`${lead}.`}</div>
        </div>
      </ShippingLabel>
    ),
    { ...ogSize, fonts: ogFonts },
  );
}

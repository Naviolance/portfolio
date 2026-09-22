import { ImageResponse } from "next/og";
import { join } from "node:path";
import sharp from "sharp";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { ogColors, ogFonts, ogMark } from "@/lib/og";

// Per-project share card: title + the project's homepage screenshot, so a
// shared case-study link previews the actual project.
export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  // Shrink the 1.7MB source PNG before embedding it. Messaging apps (WhatsApp
  // especially) silently drop previews whose image is too heavy.
  const shot = await sharp(join(process.cwd(), `src/assets/screenshots/${slug}/home.png`))
    .resize(624)
    .jpeg({ quality: 62 })
    .toBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: ogColors.navy,
          color: ogColors.text,
          fontFamily: "Sora",
        }}
      >
        <div
          style={{
            width: 520,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ogMark} width={56} height={56} alt="" />
            <div style={{ fontSize: 26, fontWeight: 700 }}>{site.name}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 22, letterSpacing: 3, color: ogColors.cyan }}>
              {project.category.toUpperCase()}
            </div>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05 }}>{project.title}</div>
            <div style={{ width: 56, height: 4, background: ogColors.gradient }} />
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingRight: 56 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/jpeg;base64,${shot.toString("base64")}`}
            width={624}
            height={312}
            alt=""
            style={{ border: `2px solid ${ogColors.line}`, borderRadius: 8 }}
          />
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}

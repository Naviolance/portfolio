// These <img> elements are drawn into a PNG by next/og (Satori), not shown
// in a page, so next/image does not apply.
/* eslint-disable @next/next/no-img-element */
import { join } from "node:path";
import sharp from "sharp";
import { ogColors } from "./og";

// The dark panel on the right of a share card (lib/og-label.tsx): a
// screenshot, a before/after pair, or big text such as a price. 312 × 316.
//
// Screenshots are read from src/assets/screenshots and shrunk to JPEG first:
// messaging apps (WhatsApp especially) silently drop previews whose image is
// too heavy. The path stays a `src/assets/screenshots/...` template so the
// build's file tracing ships that folder with the card routes.
const W = 312;
const H = 316;

async function jpeg(file: string, width: number, height: number, position: string) {
  const buffer = await sharp(join(process.cwd(), `src/assets/screenshots/${file}`))
    .resize(width, height, { fit: "cover", position })
    .jpeg({ quality: 66 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

// One screenshot, its top-left corner (where the headline usually is).
export async function shotPanel(file: string) {
  const src = await jpeg(file, W * 2, H * 2, "northwest");
  return <img src={src} width={W} height={H} alt="" style={{ objectFit: "cover" }} />;
}

const tag = (text: string) => (
  <div
    style={{
      position: "absolute",
      left: 8,
      top: 8,
      display: "flex",
      fontFamily: "Plex Mono",
      fontSize: 13,
      letterSpacing: 2,
      padding: "2px 6px",
      background: ogColors.navy,
      color: ogColors.paper,
    }}
  >
    {text}
  </div>
);

// Before on top, after below, each the whole page, split by a cyan line.
export async function beforeAfterPanel(before: string, after: string, labels: { before: string; after: string }) {
  const half = (H - 2) / 2;
  const [b, a] = await Promise.all([jpeg(before, W * 2, half * 2, "north"), jpeg(after, W * 2, half * 2, "north")]);
  const pane = (src: string, label: string) => (
    <div style={{ display: "flex", position: "relative", height: half }}>
      <img src={src} width={W} height={half} alt="" style={{ objectFit: "cover" }} />
      {tag(label)}
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", width: W, height: H }}>
      {pane(b, labels.before)}
      <div style={{ display: "flex", height: 2, background: ogColors.cyan }} />
      {pane(a, labels.after)}
    </div>
  );
}

// Big text on the dark panel: a small cyan line, a big value, a unit.
export function bigPanel({ note, value, unit }: { note: string; value: string; unit?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: ogColors.paper }}>
      <div style={{ fontFamily: "Plex Mono", fontSize: 16, letterSpacing: 3, color: ogColors.cyan }}>{note}</div>
      <div style={{ fontSize: value.length > 5 ? 64 : 72, fontWeight: 700, letterSpacing: -2, marginTop: 8 }}>{value}</div>
      {unit && <div style={{ fontFamily: "Plex Mono", fontSize: 18, letterSpacing: 2, marginTop: 4 }}>{unit}</div>}
    </div>
  );
}

// The big CONTENTS title, smaller as it gets longer so it stays in its box.
export function cardHeading(text: string) {
  const size = text.length > 52 ? 46 : text.length > 40 ? 52 : text.length > 26 ? 60 : 66;
  return <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.06, letterSpacing: -1.4 }}>{text}</div>;
}

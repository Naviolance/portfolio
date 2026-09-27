import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared assets for the generated share images (app/**/opengraph-image.tsx).
// next/og can't use the site's next/font fonts, so it gets its own copies of
// Sora (headings) and IBM Plex Mono (the label's small print); .woff because
// the image renderer doesn't read .woff2.
const fontsource = join(process.cwd(), "node_modules/@fontsource");

const [soraRegular, soraBold, monoRegular, monoBold] = await Promise.all([
  readFile(join(fontsource, "sora/files/sora-latin-400-normal.woff")),
  readFile(join(fontsource, "sora/files/sora-latin-700-normal.woff")),
  readFile(join(fontsource, "ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff")),
  readFile(join(fontsource, "ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff")),
]);

export const ogFonts = [
  { name: "Sora", data: soraRegular, weight: 400 as const, style: "normal" as const },
  { name: "Sora", data: soraBold, weight: 700 as const, style: "normal" as const },
  { name: "Plex Mono", data: monoRegular, weight: 400 as const, style: "normal" as const },
  { name: "Plex Mono", data: monoBold, weight: 700 as const, style: "normal" as const },
];

export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  navy: "#04162a",
  paper: "#f3f1ea",
  soft: "#4a5b6c",
  blue: "#0070a4",
  cyan: "#01b6cb",
};

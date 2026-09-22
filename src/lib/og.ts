import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared assets for the generated share images (app/**/opengraph-image.tsx).
// next/og can't use the site's next/font fonts, so it gets its own Sora files;
// .woff because the image renderer doesn't read .woff2.
const fontDir = join(process.cwd(), "node_modules/@fontsource/sora/files");

const [soraRegular, soraBold, markPng] = await Promise.all([
  readFile(join(fontDir, "sora-latin-400-normal.woff")),
  readFile(join(fontDir, "sora-latin-700-normal.woff")),
  readFile(join(process.cwd(), "src/app/icon.png"), "base64"),
]);

export const ogFonts = [
  { name: "Sora", data: soraRegular, weight: 400 as const, style: "normal" as const },
  { name: "Sora", data: soraBold, weight: 700 as const, style: "normal" as const },
];

export const ogMark = `data:image/png;base64,${markPng}`;

export const ogColors = {
  navy: "#04162a",
  text: "#e6eef5",
  soft: "#9db1c3",
  cyan: "#01b6cb",
  line: "#1a3350",
  gradient: "linear-gradient(90deg, #0070a4, #01b6cb)",
};

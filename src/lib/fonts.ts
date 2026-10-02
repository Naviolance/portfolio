import { Sora, DM_Sans, IBM_Plex_Mono } from "next/font/google";

// Sora (headings) echoes the wide geometric lettering in the JPFW logo;
// DM Sans keeps body text plain and readable. Both are variable fonts and
// self-hosted by next/font, so visitors never hit Google's servers.
// Shared by the site layout and the global 404 page.
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

export const fontVariables = `${sora.variable} ${dmSans.variable} ${plexMono.variable}`;

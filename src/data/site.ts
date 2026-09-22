import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/whatsapp";

export const site = {
  name: "Priestly",
  fullName: "Forsangam Weyegho Junior Priestly",
  role: "Full-Stack Web Developer",
  brand: "JPFW Web Services",
  tagline:
    "I build websites and web apps that help businesses sell, manage their work and grow online.",
  // Meta description: what Google shows under the title (~155 chars max).
  description:
    "Priestly (JPFW Web Services) is a full-stack web developer in Cameroon. I build business websites, online stores and web apps with Next.js, NestJS and PostgreSQL.",
  country: "Cameroon",
  email: "forsangamjunior@gmail.com",
  whatsapp: {
    display: WHATSAPP_DISPLAY,
    href: whatsappLink(),
  },
  linkedin: "https://www.linkedin.com/in/forsangam-weyegho-junior-priestly-965897236",
  github: "https://github.com/Naviolance",
  url: siteUrl(),
} as const;

// Used for canonical/Open Graph URLs, the sitemap and robots.txt.
// SITE_URL wins once a custom domain is attached; otherwise Vercel's own
// production domain (a system env var set on every Vercel build); localhost
// for local dev.
function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

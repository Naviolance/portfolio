import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/whatsapp";
import type { Localized } from "@/lib/localized";

export const site = {
  name: "Priestly",
  fullName: "Forsangam Weyegho Junior Priestly",
  role: {
    en: "Full-Stack Software Engineer",
    fr: "Ingénieur Logiciel Full-Stack",
  } satisfies Localized,
  brand: "JPFW Web Services",
  tagline: {
    en: "I build websites and web apps that help businesses sell, manage their work and grow online.",
    fr: "Je crée des sites et des applications web qui aident les entreprises à vendre, à mieux s'organiser et à grandir en ligne.",
  } satisfies Localized,
  // Meta description: what Google shows under the title (~155 chars max).
  // The title is "Software Engineer", but clients search for "web developer" /
  // "développeur web", so the description keeps both on purpose.
  description: {
    en: "Priestly (JPFW Web Services), software engineer and web developer in Douala, Cameroon, for clients worldwide. Websites, online stores and web apps.",
    fr: "Priestly (JPFW Web Services), ingénieur logiciel et développeur web à Douala, Cameroun. Sites vitrines, boutiques en ligne et applications web.",
  } satisfies Localized,
  location: {
    en: "Douala, Cameroon",
    fr: "Douala, Cameroun",
  } satisfies Localized,
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

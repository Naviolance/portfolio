export const site = {
  name: "Priestly",
  fullName: "Forsangam Weyegho Junior Priestly",
  role: "Full-Stack Web Developer",
  tagline:
    "I build websites and web apps that help businesses sell, manage their work and grow online.",
  email: "forsangamjunior@gmail.com",
  whatsapp: {
    display: "+237 678 369 216",
    href: "https://wa.me/237678369216",
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

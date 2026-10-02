import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";
import { SERVICE_SLUGS, type ServiceId } from "./service-slugs";
import truckpartsHome from "@/assets/screenshots/truckparts/home.png";
import carRentalHome from "@/assets/screenshots/car-rental/home.png";
import siteHome from "@/assets/screenshots/site/home.webp";
import pharmapBeforeHome from "@/assets/screenshots/pharmap/before/home.webp";
import pharmapHome from "@/assets/screenshots/pharmap/home.webp";
import { withFrenchSpacing } from "@/lib/typography";

export type { ServiceId };

export type Service = {
  id: ServiceId;
  // The service page's address in each language (service-slugs.ts).
  slug: Localized;
  title: Localized;
  description: Localized;
  evidence: Localized;
  // Where the example can be seen: a case study ("/projects/...") or an
  // external site. None for this site itself.
  href?: string;
  // Screenshot of the example, shown beside the service. Services without
  // one show text only.
  image?: { src: StaticImageData; label: Localized };
  // Or a before/after pair, shown split down the middle (redesign).
  beforeAfter?: { before: StaticImageData; after: StaticImageData; label: Localized };
};


export const services: Service[] = withFrenchSpacing([
  {
    id: "business-websites",
    slug: SERVICE_SLUGS["business-websites"],
    title: { en: "Business websites", fr: "Sites vitrines" },
    description: {
      en: "Websites for businesses and organizations. They load fast, work well on phones and are easy to find on Google.",
      fr: "Des sites pour les entreprises et les organisations. Ils chargent vite, marchent bien sur téléphone et se trouvent facilement sur Google.",
    },
    evidence: { en: "WordPress site: theastuteink.com", fr: "Site WordPress : theastuteink.com" },
    href: "https://theastuteink.com",
  },
  {
    id: "ecommerce",
    slug: SERVICE_SLUGS["ecommerce"],
    title: { en: "E-commerce", fr: "E-commerce" },
    description: {
      en: "Online stores with a product catalog, cart and checkout that takes Mobile Money and card payments. Plus the admin tools you need to run the store every day.",
      fr: "Des boutiques en ligne avec catalogue, panier et paiement par Mobile Money et carte bancaire. Plus les outils d'administration pour gérer la boutique au quotidien.",
    },
    evidence: {
      en: "TruckParts: truck parts store with Notch Pay checkout and a full admin panel",
      fr: "TruckParts : boutique de pièces de camion avec paiement Notch Pay et un espace d'administration complet",
    },
    href: "/projects/truckparts",
    image: {
      src: truckpartsHome,
      label: { en: "truck-spare-part-store-frontend.vercel.app", fr: "truck-spare-part-store-frontend.vercel.app" },
    },
  },
  {
    id: "web-applications",
    slug: SERVICE_SLUGS["web-applications"],
    title: { en: "Web applications", fr: "Applications web" },
    description: {
      en: "Custom tools built around how your business works: dashboards, booking systems and management portals.",
      fr: "Des outils sur mesure, pensés pour votre façon de travailler : tableaux de bord, systèmes de réservation et outils de gestion.",
    },
    evidence: {
      en: "Car Rental: booking system, driver age rules and an admin panel for the cars",
      fr: "Car Rental : système de réservation, règles d'âge du conducteur et espace d'administration des voitures",
    },
    href: "/projects/car-rental",
    image: {
      src: carRentalHome,
      label: { en: "car-rental-xi-lemon.vercel.app", fr: "car-rental-xi-lemon.vercel.app" },
    },
  },
  {
    id: "wordpress",
    slug: SERVICE_SLUGS["wordpress"],
    title: { en: "WordPress", fr: "WordPress" },
    description: {
      en: "Business websites, theme changes and ongoing maintenance, when WordPress is the better choice for the project.",
      fr: "Sites d'entreprise, modifications de thème et maintenance, quand WordPress est le meilleur choix pour le projet.",
    },
    evidence: { en: "theastuteink.com", fr: "theastuteink.com" },
    href: "https://theastuteink.com",
  },
  {
    id: "seo",
    slug: SERVICE_SLUGS["seo"],
    title: { en: "SEO & AI search (AEO)", fr: "Référencement Google et IA (SEO/AEO)" },
    description: {
      en: "Get found on Google and in AI answers like ChatGPT and Google's AI Overviews: speed, page structure, structured data, Google and Bing setup, and content written so it can be quoted.",
      fr: "Soyez trouvé sur Google et dans les réponses des IA comme ChatGPT et les AI Overviews de Google : vitesse, structure des pages, données structurées, configuration Google et Bing, et des contenus rédigés pour être cités.",
    },
    evidence: {
      en: "This site: structured data, answer-first FAQ, verified on Google and Bing",
      fr: "Ce site : données structurées, FAQ qui répond d'abord, vérifié sur Google et Bing",
    },
    image: { src: siteHome, label: { en: "this site", fr: "ce site" } },
  },
  {
    id: "redesign",
    slug: SERVICE_SLUGS["redesign"],
    title: { en: "Redesign", fr: "Refonte" },
    description: {
      en: "Your site or app works, but it looks dated, is slow on phones or doesn't bring in requests. I redesign it: a modern design you approve first, faster pages, and your content and Google ranking kept.",
      fr: "Votre site ou application fonctionne, mais il paraît daté, rame sur téléphone ou n'apporte pas de demandes. Je le refais : un design moderne que vous validez d'abord, des pages plus rapides, et vos contenus et votre place sur Google conservés.",
    },
    evidence: { en: "PharMap, a client's app, before and after", fr: "PharMap, l'application d'un client, avant et après" },
    href: "/projects/pharmap",
    beforeAfter: {
      before: pharmapBeforeHome,
      after: pharmapHome,
      label: { en: "pharmap-web.vercel.app", fr: "pharmap-web.vercel.app" },
    },
  },
]);

export function getService(id: string) {
  return services.find((service) => service.id === id);
}

// The service whose slug (in that language) is `slug`.
export function serviceBySlug(slug: string, locale: Locale) {
  return services.find((service) => service.slug[locale] === slug);
}

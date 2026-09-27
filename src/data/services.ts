import type { Localized } from "@/lib/localized";

export type Service = {
  title: Localized;
  description: Localized;
  evidence: Localized;
};

export const services: Service[] = [
  {
    title: { en: "Business websites", fr: "Sites vitrines" },
    description: {
      en: "Websites for businesses and organizations. They load fast, work well on phones and are easy to find on Google.",
      fr: "Des sites pour les entreprises et les organisations. Ils chargent vite, marchent bien sur téléphone et se trouvent facilement sur Google.",
    },
    evidence: { en: "WordPress site: theastuteink.com", fr: "Site WordPress : theastuteink.com" },
  },
  {
    title: { en: "E-commerce", fr: "E-commerce" },
    description: {
      en: "Online stores with a product catalog, cart, checkout and real payments. Plus the admin tools you need to run the store every day.",
      fr: "Des boutiques en ligne avec catalogue, panier et vrais paiements. Plus les outils d'administration pour gérer la boutique au quotidien.",
    },
    evidence: {
      en: "TruckParts: truck parts store with Notch Pay checkout and a full admin panel",
      fr: "TruckParts : boutique de pièces de camion avec paiement Notch Pay et un espace d'administration complet",
    },
  },
  {
    title: { en: "Web applications", fr: "Applications web" },
    description: {
      en: "Custom tools built around how your business works: dashboards, booking systems and management portals.",
      fr: "Des outils sur mesure, pensés pour votre façon de travailler : tableaux de bord, systèmes de réservation et outils de gestion.",
    },
    evidence: {
      en: "Car Rental: booking system, driver age rules and an admin panel for the cars",
      fr: "Car Rental : système de réservation, règles d'âge du conducteur et espace d'administration des voitures",
    },
  },
  {
    title: { en: "WordPress", fr: "WordPress" },
    description: {
      en: "Business websites, theme changes and ongoing maintenance, when WordPress is the better choice for the project.",
      fr: "Sites d'entreprise, modifications de thème et maintenance, quand WordPress est le meilleur choix pour le projet.",
    },
    evidence: { en: "theastuteink.com", fr: "theastuteink.com" },
  },
  {
    title: { en: "SEO", fr: "Référencement (SEO)" },
    description: {
      en: "Audits and fixes so your site shows up on Google: speed, page structure, structured data and the technical details search engines check.",
      fr: "Audits et corrections pour que votre site apparaisse sur Google : vitesse, structure des pages, données structurées et les détails techniques que Google vérifie.",
    },
    evidence: {
      en: "This site: structured data, share images, fast static pages",
      fr: "Ce site : données structurées, images de partage, pages statiques rapides",
    },
  },
];

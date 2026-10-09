import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/localized";
import type { ServiceId } from "./services";
import truckpartsHome from "@/assets/screenshots/truckparts/home.png";
import carRentalHome from "@/assets/screenshots/car-rental/home.png";
import siteHome from "@/assets/screenshots/site/home.webp";
import pharmapBeforeHome from "@/assets/screenshots/pharmap/before/home.webp";
import pharmapBeforeAvailability from "@/assets/screenshots/pharmap/before/availability.webp";
import pharmapBeforeAdmin from "@/assets/screenshots/pharmap/before/admin-verification.webp";
import pharmapHome from "@/assets/screenshots/pharmap/home.webp";
import pharmapAvailability from "@/assets/screenshots/pharmap/availability.webp";
import pharmapAdmin from "@/assets/screenshots/pharmap/admin-verification.webp";
import { withFrenchSpacing } from "@/lib/typography";

// The content of each service page (/en/services/..., /fr/services/...).
// The page itself is [locale]/services/[slug]/page.tsx; the slugs and the
// homepage text are in services.ts.
//
// ⚠ Prices: the summary rows and the options read them from pricing.ts,
// but the `lead` sentences and a few notes repeat them in words. Change a
// price in pricing.ts → update the matching sentence here too.
//
// Only write what's true: every line here comes from the pricing, the FAQ,
// the case studies or the homepage service text.

export type SummaryRow = {
  label: "price" | "timeline" | "care" | "monthly";
  // Price rows: the range is computed from these pricing.ts tiers.
  tiers?: string[];
  // Rows that aren't a price (timeline).
  value?: Localized;
  note: Localized;
};

export type ServicePage = {
  // The H1: the words a client types into Google.
  heading: Localized;
  // Shorter page title for Google when the heading is too long to fit
  // (about 48 characters, before " | Priestly"). Defaults to the heading.
  title?: Localized;
  // The first paragraph: the answer in one go (what, for whom, price,
  // timeline). What Google snippets and AI tools quote.
  lead: Localized;
  metaDescription: Localized;
  summary: SummaryRow[];
  includes: Localized[];
  // The pricing.ts tiers to compare, with how long each takes.
  options: { tier: string; timeline: Localized }[];
  proof: {
    title: Localized;
    text: Localized;
    href: string; // internal ("/projects/...") or external
    image?: StaticImageData;
    host?: string;
    // Redesign: before/after screenshot pairs, shown side by side instead
    // of the single image.
    pairs?: { label: Localized; before: StaticImageData; after: StaticImageData }[];
  };
  // The share card (link previews on WhatsApp, LinkedIn...): three short
  // ticked points, and the screenshot shown on the right, a file under
  // src/assets/screenshots ("before" adds a before/after pair). No
  // screenshot: the card shows the starting price instead.
  card: { items: Localized<string[]>; shot?: string; before?: string };
  // FAQ entries (data/faq.ts ids) shown as answer previews.
  faqIds: string[];
  // The main button's label, and its pre-typed WhatsApp message.
  cta: Localized;
  whatsapp: Localized;
};

const ONCE_CONTENT: Localized = { en: "once I have your content", fr: "une fois vos contenus reçus" };

export const servicePages: Record<ServiceId, ServicePage> = withFrenchSpacing({
  "business-websites": {
    heading: { en: "Business websites in Douala, Cameroon", fr: "Création de site vitrine à Douala" },
    lead: {
      en: "I build showcase websites that present your business: your services, photos, contact details and a map. Fast, easy to use on a phone and ready for Google. 150K to 350K FCFA, online in 1 to 2 weeks.",
      fr: "Je crée des sites vitrines qui présentent votre activité : vos services, vos photos, vos contacts et une carte. Rapides, faciles à utiliser sur téléphone et prêts pour Google. De 150K à 350K FCFA, en ligne en 1 à 2 semaines.",
    },
    metaDescription: {
      en: "Showcase website for your business in Douala or anywhere in Cameroon: 150K–350K FCFA, online in 1–2 weeks, mobile-friendly and ready for Google.",
      fr: "Création de site vitrine à Douala et partout au Cameroun : 150K–350K FCFA, en ligne en 1 à 2 semaines, adapté au téléphone et prêt pour Google.",
    },
    summary: [
      { label: "price", tiers: ["showcase"], note: { en: "one-time", fr: "une seule fois" } },
      { label: "timeline", value: { en: "1 – 2 weeks", fr: "1 – 2 semaines" }, note: ONCE_CONTENT },
    ],
    includes: [
      { en: "Pages for your business, your services and your photos", fr: "Des pages pour votre activité, vos services et vos photos" },
      { en: "Your contact details, a WhatsApp button and a map", fr: "Vos contacts, un bouton WhatsApp et une carte" },
      { en: "Works on every phone and loads fast", fr: "Marche sur tous les téléphones et charge vite" },
      { en: "Ready for Google: titles, descriptions, sitemap, Search Console", fr: "Prêt pour Google : titres, descriptions, sitemap, Search Console" },
      { en: "English, French or both", fr: "En français, en anglais ou les deux" },
      { en: "Your domain and hosting in your name, so they stay yours", fr: "Votre nom de domaine et votre hébergement à votre nom, pour qu'ils restent à vous" },
    ],
    options: [
      { tier: "showcase", timeline: { en: "1–2 weeks", fr: "1–2 semaines" } },
      { tier: "care", timeline: { en: "monthly, optional", fr: "mensuel, en option" } },
    ],
    proof: {
      title: { en: "theastuteink.com", fr: "theastuteink.com" },
      text: {
        en: "A WordPress website I built, online now.",
        fr: "Un site WordPress que j'ai créé, en ligne.",
      },
      href: "https://theastuteink.com",
    },
    card: { items: { en: ["Fast on phones", "Ready for Google", "Yours to keep"], fr: ["Rapide sur mobile", "Prêt pour Google", "Bien à vous"] } },
    faqIds: ["showcase-website", "what-to-provide", "cost-after-launch"],
    cta: { en: "Talk about my website ↗", fr: "Parler de mon site ↗" },
    whatsapp: {
      en: "Hi Priestly, I saw your business websites page and I'd like a website for my business.",
      fr: "Bonjour Priestly, j'ai vu votre page sur les sites vitrines et je voudrais un site pour mon activité.",
    },
  },

  ecommerce: {
    heading: { en: "Online stores with Mobile Money payments", fr: "Création de boutique en ligne avec paiement Mobile Money" },
    title: { en: "Online stores with Mobile Money payments", fr: "Boutique en ligne avec paiement Mobile Money" },
    lead: {
      en: "I build online stores for businesses in Cameroon and abroad: product catalogue, cart, Mobile Money and card payments, and an admin panel you can run from your phone. From 150K FCFA, online in 2 to 6 weeks.",
      fr: "Je crée des boutiques en ligne pour les entreprises au Cameroun et ailleurs : catalogue, panier, paiement Mobile Money et carte, et un espace d'administration que vous gérez depuis votre téléphone. À partir de 150K FCFA, en ligne en 2 à 6 semaines.",
    },
    metaDescription: {
      en: "Online store with Mobile Money and card payments, built in Cameroon: from 150K FCFA, online in 2–6 weeks, with an admin panel that works on a phone.",
      fr: "Boutique en ligne avec paiement Mobile Money et carte au Cameroun : dès 150K FCFA, en ligne en 2 à 6 semaines, gérée depuis votre téléphone.",
    },
    summary: [
      {
        label: "price",
        tiers: ["starter-store", "business-store"],
        note: { en: "custom platform from 5M", fr: "plateforme sur mesure dès 5M" },
      },
      { label: "timeline", value: { en: "2 – 6 weeks", fr: "2 – 6 semaines" }, note: ONCE_CONTENT },
    ],
    includes: [
      { en: "Product catalogue with photos, categories and search", fr: "Catalogue avec photos, catégories et recherche" },
      { en: "Cart and checkout that work on any phone", fr: "Panier et paiement qui marchent sur tous les téléphones" },
      { en: "Mobile Money and card payments through a payment provider", fr: "Paiement Mobile Money et carte via un prestataire de paiement" },
      { en: "Order tracking for your customers", fr: "Suivi de commande pour vos clients" },
      { en: "An admin panel for products, stock and orders, usable on a phone", fr: "Un espace d'administration pour les produits, le stock et les commandes, utilisable sur téléphone" },
      { en: "Fast pages, ready for Google and AI search", fr: "Des pages rapides, prêtes pour Google et la recherche IA" },
      { en: "English, French or both", fr: "En français, en anglais ou les deux" },
    ],
    options: [
      { tier: "starter-store", timeline: { en: "2–3 weeks", fr: "2–3 semaines" } },
      { tier: "business-store", timeline: { en: "3–6 weeks", fr: "3–6 semaines" } },
      { tier: "custom", timeline: { en: "quoted per project", fr: "devis par projet" } },
    ],
    proof: {
      title: { en: "TruckParts", fr: "TruckParts" },
      text: {
        en: "Truck parts store: “Find My Part” fit check, a checkout that can't oversell stock, Notch Pay payments and a full admin panel.",
        fr: "Boutique de pièces de camion : vérification « Find My Part », un paiement qui ne peut pas survendre le stock, Notch Pay et un espace d'administration complet.",
      },
      href: "/projects/truckparts",
      image: truckpartsHome,
      host: "truck-spare-part-store-frontend.vercel.app",
    },
    card: { items: { en: ["Catalog & cart", "Mobile Money", "Admin on a phone"], fr: ["Catalogue, panier", "Mobile Money", "Admin sur mobile"] }, shot: "truckparts/home.png" },
    faqIds: ["mobile-money-store", "timeline", "cost-after-launch"],
    cta: { en: "Talk about my store ↗", fr: "Parler de ma boutique ↗" },
    whatsapp: {
      en: "Hi Priestly, I saw your online stores page and I'd like to talk about a store.",
      fr: "Bonjour Priestly, j'ai vu votre page sur les boutiques en ligne et je voudrais parler d'une boutique.",
    },
  },

  "web-applications": {
    heading: { en: "Custom web applications", fr: "Développement d'applications web sur mesure" },
    lead: {
      en: "I build web applications around how your business works: booking systems, dashboards and management tools, with accounts for your staff and your customers. They work on any phone and can be installed like an app. From 5M FCFA, quoted per project.",
      fr: "Je développe des applications web pensées pour votre façon de travailler : systèmes de réservation, tableaux de bord et outils de gestion, avec des comptes pour votre équipe et vos clients. Elles marchent sur tous les téléphones et s'installent comme une application. À partir de 5M FCFA, devis par projet.",
    },
    metaDescription: {
      en: "Custom web applications for businesses in Cameroon and abroad: booking systems, dashboards and management tools that work on any phone. From 5M FCFA.",
      fr: "Applications web sur mesure au Cameroun : réservations, tableaux de bord et outils de gestion, sur tous les téléphones. À partir de 5M FCFA.",
    },
    summary: [
      { label: "price", tiers: ["custom"], note: { en: "quoted per project", fr: "devis par projet" } },
      {
        label: "timeline",
        value: { en: "Per project", fr: "Selon le projet" },
        note: { en: "agreed in the quote", fr: "fixé dans le devis" },
      },
    ],
    includes: [
      { en: "Built around how your business works", fr: "Pensée pour votre façon de travailler" },
      { en: "Booking systems, dashboards and management tools", fr: "Systèmes de réservation, tableaux de bord et outils de gestion" },
      { en: "Accounts and roles for staff, admins and customers", fr: "Comptes et rôles pour l'équipe, les administrateurs et les clients" },
      { en: "Works on any phone, installable like an app", fr: "Marche sur tous les téléphones, s'installe comme une application" },
      { en: "Data that stays correct: checks run inside database transactions", fr: "Des données qui restent justes : vérifications dans des transactions" },
      { en: "English, French or both", fr: "En français, en anglais ou les deux" },
    ],
    options: [
      { tier: "custom", timeline: { en: "quoted per project", fr: "devis par projet" } },
      { tier: "care", timeline: { en: "monthly, optional", fr: "mensuel, en option" } },
    ],
    proof: {
      title: { en: "Car Rental", fr: "Car Rental" },
      text: {
        en: "Booking site: overlapping bookings checked inside a transaction, the driver age rule checked on the server, and an admin panel for the cars.",
        fr: "Site de réservation : chevauchements vérifiés dans une transaction, règle d'âge du conducteur vérifiée sur le serveur, et espace d'administration des voitures.",
      },
      href: "/projects/car-rental",
      image: carRentalHome,
      host: "car-rental-xi-lemon.vercel.app",
    },
    card: { items: { en: ["Your workflow", "Staff accounts", "Works on phones"], fr: ["Sur mesure", "Comptes d'équipe", "Sur téléphone"] }, shot: "car-rental/home.png" },
    faqIds: ["app-or-website", "wordpress-or-custom", "how-to-pay"],
    cta: { en: "Talk about my app ↗", fr: "Parler de mon application ↗" },
    whatsapp: {
      en: "Hi Priestly, I saw your web applications page and I'd like to talk about an application.",
      fr: "Bonjour Priestly, j'ai vu votre page sur les applications web et je voudrais parler d'une application.",
    },
  },

  wordpress: {
    heading: { en: "WordPress websites and maintenance", fr: "Création et maintenance de sites WordPress" },
    lead: {
      en: "When WordPress is the better choice, I build your website or WooCommerce store on it, so you can edit your own content. I also change themes and maintain existing WordPress sites. 150K to 500K FCFA for a new site, maintenance from 25K FCFA a month.",
      fr: "Quand WordPress est le meilleur choix, je crée votre site ou votre boutique WooCommerce dessus, pour que vous puissiez modifier vos contenus vous-même. Je modifie aussi les thèmes et j'assure la maintenance de sites WordPress existants. De 150K à 500K FCFA pour un nouveau site, maintenance à partir de 25K FCFA par mois.",
    },
    metaDescription: {
      en: "WordPress websites, WooCommerce stores and WordPress maintenance in Cameroon: 150K–500K FCFA for a new site, maintenance from 25K FCFA a month.",
      fr: "Création de site WordPress, boutique WooCommerce et maintenance WordPress au Cameroun : 150K–500K FCFA pour un nouveau site, maintenance dès 25K FCFA par mois.",
    },
    summary: [
      {
        label: "price",
        tiers: ["showcase", "starter-store"],
        note: { en: "new website or WooCommerce store", fr: "nouveau site ou boutique WooCommerce" },
      },
      { label: "care", tiers: ["care"], note: { en: "optional maintenance", fr: "maintenance en option" } },
    ],
    includes: [
      { en: "A new WordPress website, or changes to your current theme", fr: "Un nouveau site WordPress, ou des modifications de votre thème actuel" },
      { en: "WooCommerce stores with your products and payments", fr: "Des boutiques WooCommerce avec vos produits et vos paiements" },
      { en: "You edit your own pages and products", fr: "Vous modifiez vous-même vos pages et vos produits" },
      { en: "Speed and security improvements", fr: "Amélioration de la vitesse et de la sécurité" },
      { en: "Maintenance: updates, backups, small fixes and security checks", fr: "Maintenance : mises à jour, sauvegardes, petites corrections et sécurité" },
    ],
    options: [
      { tier: "showcase", timeline: { en: "1–2 weeks", fr: "1–2 semaines" } },
      { tier: "starter-store", timeline: { en: "2–3 weeks", fr: "2–3 semaines" } },
      { tier: "care", timeline: { en: "monthly, optional", fr: "mensuel, en option" } },
    ],
    proof: {
      title: { en: "theastuteink.com", fr: "theastuteink.com" },
      text: {
        en: "A WordPress website I built, online now.",
        fr: "Un site WordPress que j'ai créé, en ligne.",
      },
      href: "https://theastuteink.com",
    },
    card: { items: { en: ["You edit it", "WooCommerce", "Maintenance"], fr: ["Vous le modifiez", "WooCommerce", "Maintenance"] } },
    faqIds: ["wordpress-or-custom", "what-to-provide", "cost-after-launch"],
    cta: { en: "Talk about my WordPress site ↗", fr: "Parler de mon WordPress ↗" },
    whatsapp: {
      en: "Hi Priestly, I saw your WordPress page and I'd like to talk about a WordPress site.",
      fr: "Bonjour Priestly, j'ai vu votre page WordPress et je voudrais parler d'un site WordPress.",
    },
  },

  seo: {
    heading: { en: "SEO and AI search (AEO)", fr: "Référencement Google et IA (SEO/AEO)" },
    lead: {
      en: "I help your business show up on Google and in AI answers like ChatGPT: faster pages, a clear structure, structured data, Google and Bing set up, and content written so it can be quoted. An audit from 75K FCFA, or the audit and fixes from 200K FCFA.",
      fr: "J'aide votre entreprise à apparaître sur Google et dans les réponses des IA comme ChatGPT : pages plus rapides, structure claire, données structurées, Google et Bing configurés, et des contenus rédigés pour être cités. Un audit à partir de 75K FCFA, ou l'audit avec les corrections à partir de 200K FCFA.",
    },
    metaDescription: {
      en: "SEO and AI search (AEO) for businesses in Cameroon: get found on Google and in ChatGPT answers. Audit from 75K FCFA, audit and fixes from 200K FCFA.",
      fr: "Référencement Google et IA au Cameroun : soyez trouvé sur Google et dans les réponses de ChatGPT. Audit dès 75K FCFA, corrections dès 200K.",
    },
    summary: [
      {
        label: "price",
        tiers: ["seo-audit", "seo-fixes"],
        note: { en: "audit, or audit + fixes", fr: "audit, ou audit + corrections" },
      },
      { label: "monthly", tiers: ["seo-care"], note: { en: "optional", fr: "en option" } },
    ],
    includes: [
      { en: "A technical audit: speed, structure and what Google has indexed", fr: "Un audit technique : vitesse, structure et ce que Google a indexé" },
      { en: "Structured data (schema.org) that search engines and AI tools read", fr: "Des données structurées (schema.org) lues par les moteurs et les IA" },
      { en: "Google Search Console and Bing Webmaster Tools set up", fr: "Google Search Console et Bing Webmaster Tools configurés" },
      { en: "Answer-first content that AI tools can quote", fr: "Des contenus qui répondent d'abord, que les IA peuvent citer" },
      { en: "A written report in plain language", fr: "Un rapport écrit en langage simple" },
      { en: "Monthly monitoring, if you want it", fr: "Un suivi mensuel, si vous le souhaitez" },
    ],
    options: [
      { tier: "seo-audit", timeline: { en: "written report", fr: "rapport écrit" } },
      { tier: "seo-fixes", timeline: { en: "audit, then fixes", fr: "audit, puis corrections" } },
      { tier: "seo-care", timeline: { en: "monthly, optional", fr: "mensuel, en option" } },
    ],
    proof: {
      title: { en: "This site", fr: "Ce site" },
      text: {
        en: "Structured data, an answer-first FAQ, fast pages, verified on Google and Bing.",
        fr: "Données structurées, une FAQ qui répond d'abord, des pages rapides, vérifié sur Google et Bing.",
      },
      href: "/",
      image: siteHome,
      host: "jpfw-webservices.vercel.app",
    },
    card: { items: { en: ["Google & Bing", "AI answers", "Plain reports"], fr: ["Google et Bing", "Réponses IA", "Rapports clairs"] }, shot: "site/home.webp" },
    faqIds: ["show-up-on-google", "where-do-you-work", "how-to-pay"],
    cta: { en: "Get my business found ↗", fr: "Parler de mon référencement ↗" },
    whatsapp: {
      en: "Hi Priestly, I saw your SEO and AI search page and I'd like my business to be easier to find.",
      fr: "Bonjour Priestly, j'ai vu votre page sur le référencement et je voudrais que mon entreprise soit plus facile à trouver.",
    },
  },
  redesign: {
    heading: { en: "Website and app redesign", fr: "Refonte de site web et d'application" },
    lead: {
      en: "Your site or app works, but it looks dated, is slow on phones or doesn't bring in requests. I redesign it: a modern design you approve before anything is built, faster pages, and your content and Google ranking kept. From 100K FCFA, in 1 to 5 weeks.",
      fr: "Votre site ou application fonctionne, mais il paraît daté, rame sur téléphone ou n'apporte pas de demandes. Je le refais : un design moderne que vous validez avant toute construction, des pages plus rapides, et vos contenus et votre place sur Google conservés. À partir de 100K FCFA, en 1 à 5 semaines.",
    },
    metaDescription: {
      en: "Website and app redesign in Cameroon: a modern design, faster pages and your Google ranking kept. Site refresh from 100K FCFA, full redesign 300K–700K.",
      fr: "Refonte de site web au Cameroun : design moderne, pages plus rapides, place sur Google conservée. Refonte légère dès 100K FCFA, complète 300K–700K.",
    },
    summary: [
      {
        label: "price",
        tiers: ["redesign-refresh", "redesign-full"],
        note: { en: "app redesign from 600K, quoted", fr: "refonte d'application dès 600K, sur devis" },
      },
      {
        label: "timeline",
        value: { en: "1–5 weeks", fr: "1 à 5 semaines" },
        note: { en: "depends on the number of pages", fr: "selon le nombre de pages" },
      },
    ],
    includes: [
      { en: "A look at your current site first: what works, what loses visitors", fr: "Un état des lieux de votre site actuel : ce qui marche, ce qui fait fuir les visiteurs" },
      { en: "A mockup you approve before anything is built", fr: "Une maquette que vous validez avant toute construction" },
      { en: "Built for phones first, and faster to load", fr: "Pensé d'abord pour le téléphone, et plus rapide à charger" },
      { en: "Your content moved over, nothing lost", fr: "Vos contenus repris, rien de perdu" },
      { en: "Same addresses or redirects, so Google keeps your ranking", fr: "Mêmes adresses ou redirections, pour garder votre place sur Google" },
      { en: "Domain, hosting and accounts stay in your name", fr: "Domaine, hébergement et comptes restent à votre nom" },
    ],
    options: [
      { tier: "redesign-refresh", timeline: { en: "1–2 weeks", fr: "1 à 2 semaines" } },
      { tier: "redesign-full", timeline: { en: "2–5 weeks", fr: "2 à 5 semaines" } },
      { tier: "redesign-app", timeline: { en: "quoted per project", fr: "devis par projet" } },
    ],
    proof: {
      title: { en: "PharMap, before and after", fr: "PharMap, avant et après" },
      text: {
        en: "A client's medicine-finder app that I built, then redesigned: same features, clearer search, a live answer on the homepage, and pages built for phones.",
        fr: "L'application d'un client pour trouver des médicaments, que j'ai construite puis refaite : mêmes fonctionnalités, recherche plus claire, une réponse en direct dès l'accueil, et des pages pensées pour le téléphone.",
      },
      href: "/projects/pharmap",
      host: "pharmap-web.vercel.app",
      pairs: [
        { label: { en: "Homepage", fr: "Page d'accueil" }, before: pharmapBeforeHome, after: pharmapHome },
        { label: { en: "Where a medicine is in stock", fr: "Où un médicament est en stock" }, before: pharmapBeforeAvailability, after: pharmapAvailability },
        { label: { en: "Admin: pharmacy verification", fr: "Admin : vérification des pharmacies" }, before: pharmapBeforeAdmin, after: pharmapAdmin },
      ],
    },
    card: { items: { en: ["Mockup first", "Faster pages", "Google ranking kept"], fr: ["Maquette d'abord", "Plus rapide", "Google gardé"] }, shot: "pharmap/home.webp", before: "pharmap/before/home.webp" },
    faqIds: ["what-to-provide", "show-up-on-google", "how-to-pay"],
    cta: { en: "Talk about my redesign ↗", fr: "Parler de ma refonte ↗" },
    whatsapp: {
      en: "Hi Priestly, I saw your redesign page and I'd like to redesign my site or app.",
      fr: "Bonjour Priestly, j'ai vu votre page sur la refonte et je voudrais refaire mon site ou mon application.",
    },
  },
});

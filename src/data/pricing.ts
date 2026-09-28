import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";

// ⚠ These prices are also written out in the FAQ answers (data/faq.ts:
// website-cost, showcase-website, cost-after-launch, show-up-on-google).
// Change a price here → update it there too.
//
// Prices are stored in FCFA (XAF) only; the USD figure is derived.
// FCFA is pegged to the euro but floats against the dollar, so the USD
// amount is always shown as approximate. Update this one number when the
// rate moves.
export const FCFA_PER_USD = 600;

export type PriceTier = {
  id: string;
  name: Localized;
  description: Localized;
  // max: null means "from <min>" (no upper bound quoted).
  fcfa: { min: number; max: number | null };
  period: "one-time" | "per-month";
  // Shown as one of the big cards at the top of the pricing section;
  // everything else goes in the compact "Also available" list.
  featured?: boolean;
};

export type PriceGroup = {
  id: string;
  title: Localized;
  // Short label shown next to tiers in the "Also available" list.
  tag: Localized;
  tiers: PriceTier[];
};

export const pricing: PriceGroup[] = [
  {
    id: "websites",
    title: { en: "Websites & online stores", fr: "Sites web et boutiques en ligne" },
    tag: { en: "Website", fr: "Site web" },
    tiers: [
      {
        id: "showcase",
        name: { en: "Showcase website", fr: "Site vitrine" },
        description: {
          en: "A clean site that presents your business: your services, photos, contact details and a map. Fast, mobile-friendly and ready for Google.",
          fr: "Un site propre qui présente votre activité : vos services, vos photos, vos contacts et une carte. Rapide, adapté au téléphone et prêt pour Google.",
        },
        fcfa: { min: 150_000, max: 350_000 },
        period: "one-time",
        featured: true,
      },
      {
        id: "starter-store",
        name: { en: "Starter online store", fr: "Boutique en ligne simple" },
        description: {
          en: "A WooCommerce store with your products and payments set up, ready to sell.",
          fr: "Une boutique WooCommerce avec vos produits et les paiements en place, prête à vendre.",
        },
        fcfa: { min: 150_000, max: 500_000 },
        period: "one-time",
      },
      {
        id: "business-store",
        name: { en: "Business e-commerce site", fr: "Site e-commerce professionnel" },
        description: {
          en: "A proper store for a real business: good design, fast pages, SEO and security done right.",
          fr: "Une vraie boutique pour une vraie entreprise : bon design, pages rapides, SEO et sécurité bien faits.",
        },
        fcfa: { min: 800_000, max: 3_000_000 },
        period: "one-time",
        featured: true,
      },
      {
        id: "custom",
        name: { en: "Custom platform", fr: "Plateforme sur mesure" },
        description: {
          en: "Built from scratch when you need your own backend and features, like TruckParts.",
          fr: "Construite de zéro quand vous avez besoin de votre propre backend et de vos propres fonctionnalités, comme TruckParts.",
        },
        fcfa: { min: 5_000_000, max: null },
        period: "one-time",
        featured: true,
      },
      {
        id: "care",
        name: { en: "Website care", fr: "Maintenance du site" },
        description: {
          en: "Optional, after launch: updates, backups, small fixes and security checks. You pay your hosting and domain directly.",
          fr: "En option, après la mise en ligne : mises à jour, sauvegardes, petites corrections et sécurité. Vous payez directement votre hébergement et votre nom de domaine.",
        },
        fcfa: { min: 25_000, max: 75_000 },
        period: "per-month",
      },
    ],
  },
  {
    id: "seo",
    title: { en: "SEO & AI search", fr: "Référencement Google et IA" },
    tag: { en: "SEO & AEO", fr: "SEO et AEO" },
    tiers: [
      {
        id: "seo-audit",
        name: { en: "Audit only", fr: "Audit seul" },
        description: {
          en: "A full technical and content audit of your site for Google and AI search tools, delivered as a written report.",
          fr: "Un audit complet de votre site, technique et contenu, pour Google et les outils de recherche IA, livré sous forme de rapport écrit.",
        },
        fcfa: { min: 75_000, max: 150_000 },
        period: "one-time",
      },
      {
        id: "seo-fixes",
        name: { en: "Audit + fixes", fr: "Audit + corrections" },
        description: {
          en: "The audit, plus I fix what it finds: speed, schema, meta tags, sitemap, Google and Bing setup, and answer-first content.",
          fr: "L'audit, puis je corrige ce qu'il trouve : vitesse, schema, balises meta, sitemap, configuration Google et Bing, et contenus qui répondent d'abord.",
        },
        fcfa: { min: 200_000, max: 450_000 },
        period: "one-time",
      },
      {
        id: "seo-care",
        name: { en: "Ongoing care", fr: "Suivi mensuel" },
        description: {
          en: "Monthly monitoring on Google and Bing, small fixes, and a report in plain language.",
          fr: "Un suivi chaque mois sur Google et Bing, des petites corrections et un rapport en langage simple.",
        },
        fcfa: { min: 100_000, max: 250_000 },
        period: "per-month",
      },
    ],
  },
];

// 150_000 → "150K", 3_000_000 → "3M", 1_500_000 → "1.5M" (French: "1,5M")
export function formatFcfa(amount: number, locale: Locale) {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 1 })}M`;
  }
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
  return String(amount);
}

// Converted, then rounded to a figure people would actually say:
// $333 → $330, $1,333 → $1,350, $8,333 → $8,500.
export function toUsd(fcfa: number) {
  const usd = fcfa / FCFA_PER_USD;
  const step = usd < 1_000 ? 10 : usd < 5_000 ? 50 : 500;
  return Math.round(usd / step) * step;
}

// English: $1,350. French: 1 350 $ (French puts the symbol after).
export function formatUsd(amount: number, locale: Locale) {
  const n = amount.toLocaleString(locale === "fr" ? "fr-FR" : "en-US");
  return locale === "fr" ? `${n} $` : `$${n}`;
}

const FROM: Localized = { en: "from", fr: "à partir de" };

export function priceLabel({ min, max }: PriceTier["fcfa"], locale: Locale) {
  const f = (n: number) => formatFcfa(n, locale);
  const u = (n: number) => formatUsd(toUsd(n), locale);
  // amount: the figure without its currency, for layouts that set "FCFA"
  // smaller beside it.
  const amount = max === null ? `${FROM[locale]} ${f(min)}` : `${f(min)}–${f(max)}`;
  return {
    amount,
    fcfa: `${amount} FCFA`,
    usd: max === null ? `≈ ${FROM[locale]} ${u(min)}` : `≈ ${u(min)}–${u(max)}`,
  };
}

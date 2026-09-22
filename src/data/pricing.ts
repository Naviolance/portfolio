// Prices are stored in FCFA (XAF) only; the USD figure is derived.
// FCFA is pegged to the euro but floats against the dollar, so the USD
// amount is always shown as approximate. Update this one number when the
// rate moves.
export const FCFA_PER_USD = 600;

export type PriceTier = {
  name: string;
  description: string;
  // max: null means "from <min>" (no upper bound quoted).
  fcfa: { min: number; max: number | null };
  period: "one-time" | "per month";
};

export type PriceGroup = {
  title: string;
  tiers: PriceTier[];
};

export const pricing: PriceGroup[] = [
  {
    title: "Websites & online stores",
    tiers: [
      {
        name: "Starter online store",
        description: "A WooCommerce store with your products and payments set up, ready to sell.",
        fcfa: { min: 150_000, max: 500_000 },
        period: "one-time",
      },
      {
        name: "Business e-commerce site",
        description: "A proper store for a real business: good design, fast pages, SEO and security done right.",
        fcfa: { min: 800_000, max: 3_000_000 },
        period: "one-time",
      },
      {
        name: "Custom platform",
        description: "Built from scratch when you need your own backend and features, like TruckParts.",
        fcfa: { min: 5_000_000, max: null },
        period: "one-time",
      },
    ],
  },
  {
    title: "SEO",
    tiers: [
      {
        name: "Audit only",
        description: "A full technical and on-page audit of your site, delivered as a written report.",
        fcfa: { min: 75_000, max: 150_000 },
        period: "one-time",
      },
      {
        name: "Audit + fixes",
        description: "The audit, plus I fix what it finds: speed, schema, meta tags and sitemap.",
        fcfa: { min: 200_000, max: 450_000 },
        period: "one-time",
      },
      {
        name: "Ongoing care",
        description: "Monthly monitoring, small fixes, and a report in plain language.",
        fcfa: { min: 100_000, max: 250_000 },
        period: "per month",
      },
    ],
  },
];

// 150_000 → "150K", 3_000_000 → "3M", 1_500_000 → "1.5M"
export function formatFcfa(amount: number) {
  if (amount >= 1_000_000) return `${+(amount / 1_000_000).toFixed(1)}M`;
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

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function priceLabel({ min, max }: PriceTier["fcfa"]) {
  const fcfa = max === null
    ? `from ${formatFcfa(min)} FCFA`
    : `${formatFcfa(min)}–${formatFcfa(max)} FCFA`;
  const usd = max === null
    ? `≈ from ${formatUsd(toUsd(min))}`
    : `≈ ${formatUsd(toUsd(min))}–${formatUsd(toUsd(max))}`;
  return { fcfa, usd };
}

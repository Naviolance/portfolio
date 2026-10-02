import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/localized";
import { services, serviceBySlug } from "@/data/services";
import { servicePages, type SummaryRow } from "@/data/service-pages";
import { formatFcfa, getTier, priceLabel, tiersRange } from "@/data/pricing";
import { site } from "@/data/site";
import { ogFonts, ogSize } from "@/lib/og";
import { ShippingLabel } from "@/lib/og-label";
import { beforeAfterPanel, bigPanel, cardHeading, shotPanel } from "@/lib/og-panels";
import { pad2 } from "@/lib/format";

// The share card of a service page, in the page's language. Everything on it
// comes from the page's own data (data/service-pages.ts), so the card can't
// say something the page doesn't:
// - with a screenshot (`card.shot`): the work on the right, the price on top
// - without: the starting price on the right, the next summary row on top

export function generateImageMetadata({ params }: { params: { slug: string; locale: Locale } }) {
  const service = serviceBySlug(params.slug, params.locale);
  const heading = service ? servicePages[service.id].heading[params.locale] : site.brand;
  return [{ id: "card", size: ogSize, contentType: "image/png", alt: `${heading} | ${site.brand}` }];
}

const text = {
  from: { en: "FROM", fr: "DE" },
  service: { en: "SERVICE", fr: "SERVICE" },
  contents: { en: "CONTENTS", fr: "CONTENU" },
  startsAt: { en: "FROM", fr: "DÈS" },
  // True for every service: the written quote comes before any payment.
  stamp: { en: "FREE QUOTE", fr: "DEVIS GRATUIT" },
} satisfies Record<string, Localized>;

export default async function Image({ params }: { params: Promise<{ slug: string; locale: Locale }> }) {
  const { slug, locale } = await params;
  const service = serviceBySlug(slug, locale);
  if (!service) return new Response("Not found", { status: 404 });
  const page = servicePages[service.id];
  const t = await getTranslations({ locale, namespace: "service" });

  const priceRow = page.summary.find((row) => row.label === "price")!;
  const range = tiersRange(priceRow.tiers!);
  // A summary row as label + value for the top-right box. "/ month" goes in
  // the label: the value box only fits ~16 characters.
  const corner = (row: SummaryRow) => {
    const monthly = row.tiers?.every((id) => getTier(id).period === "per-month");
    return {
      label: `${t(row.label)}${monthly ? ` ${t("perMonth")}` : ""}`.toUpperCase(),
      value: row.value ? row.value[locale] : priceLabel(tiersRange(row.tiers!), locale).fcfa,
    };
  };
  const { shot, before, items } = page.card;
  const nextRow = page.summary.find((row) => row !== priceRow);

  const panel = !shot
    ? bigPanel({ note: text.startsAt[locale], value: formatFcfa(range.min, locale), unit: "FCFA" })
    : before
      ? await beforeAfterPanel(before, shot, { before: t("before").toUpperCase(), after: t("after").toUpperCase() })
      : await shotPanel(shot);
  const top = corner(shot || !nextRow ? priceRow : nextRow);

  return new ImageResponse(
    (
      <ShippingLabel
        fields={[
          { label: text.from[locale], value: `${site.name} · Douala, CM`, width: 372 },
          { label: text.service[locale], value: service.title[locale] },
          { ...top, width: 318 },
        ]}
        contentsLabel={text.contents[locale]}
        items={items[locale]}
        panel={panel}
        stamp={text.stamp[locale]}
        code={`JPFW 2026 ${pad2(services.indexOf(service) + 1).padStart(4, "0")}`}
      >
        {cardHeading(page.heading[locale])}
      </ShippingLabel>
    ),
    { ...ogSize, fonts: ogFonts },
  );
}

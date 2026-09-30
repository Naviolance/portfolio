import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { pricing, priceLabel } from "@/data/pricing";
import { whatsappLink } from "@/lib/whatsapp";
import { pad2 } from "@/lib/format";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClass } from "@/components/ui/button";

// "Three main packages + list": the featured website tiers as big cards,
// every other tier (store, care, SEO) in a compact list underneath. No tabs,
// so every price stays on the page.
export function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale() as Locale;

  const tiers = pricing.flatMap((group) => group.tiers.map((tier) => ({ ...tier, group })));
  const featured = tiers.filter((tier) => tier.featured);
  const others = tiers.filter((tier) => !tier.featured);
  const featuredGroup = featured[0]?.group;

  return (
    <section id="pricing" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <SectionHeader eyebrow={t("eyebrow")} title={t("heading")} intro={t("note")} />

        {featuredGroup && (
          <Eyebrow as="h3" className="mt-10 sm:mt-14">
            {featuredGroup.title[locale]}
          </Eyebrow>
        )}
        <ul className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {featured.map((tier, i) => {
            const price = priceLabel(tier.fcfa, locale);
            // The middle card is set apart: lifted, with an accent border.
            const middle = featured.length === 3 && i === 1;
            return (
              <li
                key={tier.id}
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`flex flex-col border p-6 sm:p-7 ${middle ? "border-accent bg-panel lg:-translate-y-2.5 lg:shadow-[0_30px_60px_var(--shade)]" : "border-line"}`}
              >
                <span className="font-mono text-[11px] text-label">{pad2(i + 1)}</span>
                <p className="mt-3 font-display text-xl font-semibold text-ink">{tier.name[locale]}</p>
                <p className="mt-5 font-display text-3xl font-bold tracking-tight text-ink">
                  {price.amount}
                  <span className="text-sm font-semibold text-ink-soft"> FCFA</span>
                </p>
                <p className="mt-1 text-sm text-ink-soft">{price.usd}</p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">{tier.description[locale]}</p>
                <a
                  href={whatsappLink(t("askMessage", { name: tier.name[locale] }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex min-h-11 w-fit items-center gap-2 text-sm text-ink-soft link-underline"
                >
                  {t("ask")}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <Eyebrow as="h3" className="mt-12">{t("alsoAvailable")}</Eyebrow>
        <ul data-reveal className="mt-3 border-t border-line">
          {others.map((tier) => {
            const price = priceLabel(tier.fcfa, locale);
            return (
              <li
                key={tier.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-b border-line py-4 lg:grid-cols-[260px_minmax(0,1fr)_auto] lg:items-center lg:gap-x-8"
              >
                <div>
                  <p className="font-display font-semibold text-ink">{tier.name[locale]}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                    {tier.group.tag[locale]}
                    {tier.period === "per-month" && ` · ${t("period.per-month")}`}
                  </p>
                </div>
                <div className="text-right lg:order-last">
                  <p className="whitespace-nowrap font-display font-bold text-ink">{price.fcfa}</p>
                  <p className="whitespace-nowrap text-[13px] text-ink-soft">{price.usd}</p>
                </div>
                <p className="col-span-2 mt-1 text-sm leading-relaxed text-ink-soft lg:col-span-1 lg:mt-0">
                  {tier.description[locale]}
                </p>
              </li>
            );
          })}
        </ul>

        <div
          data-reveal
          className="mt-12 grid grid-cols-1 gap-6 border border-line bg-panel p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12"
        >
          <p className="text-ink">{t("outro")}</p>
          <a
            href={whatsappLink(t("quoteMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            // min-h, not h: the French label wraps to two lines on narrow phones.
            className={buttonClass({ className: "lg:row-span-2" })}
          >
            {t("quote")}
            <span aria-hidden>↗</span>
          </a>
          <p className="text-xs leading-relaxed text-ink-soft">{t("disclaimer")}</p>
        </div>
      </div>
    </section>
  );
}

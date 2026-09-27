import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { pricing, priceLabel } from "@/data/pricing";
import { whatsappLink } from "@/lib/whatsapp";

// Each group: one-off prices as a row of cards, monthly options as a slim
// "optional, monthly" row underneath. Every price stays visible (no tabs),
// so all of it is readable on the page.
export function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale() as Locale;

  return (
    <section id="pricing" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-label">{t("eyebrow")}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
              {t("heading")}
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">{t("note")}</p>
        </div>

        {pricing.map((group) => {
          const oneOff = group.tiers.filter((tier) => tier.period === "one-time");
          const monthly = group.tiers.filter((tier) => tier.period === "per-month");
          return (
            <div key={group.id} className="mt-12 sm:mt-14">
              <h3 className="font-mono text-xs uppercase tracking-wider text-label">{group.title[locale]}</h3>

              {/* Cards and their monthly row reveal as one piece, so the
                  row never detaches from the grid above it. */}
              <div data-reveal className="mt-4">
                {/* gap-px over a line-coloured background = 1px hairlines
                    between cards at any column count. */}
                <ul
                  className={`grid gap-px border border-line bg-line sm:grid-cols-2 ${oneOff.length >= 4 ? "lg:grid-cols-4" : ""}`}
                >
                  {oneOff.map((tier) => {
                    const price = priceLabel(tier.fcfa, locale);
                    return (
                      <li
                        key={tier.id}
                        className="group relative flex flex-col bg-paper p-6"
                      >
                        <span aria-hidden className="card-line absolute inset-x-0 top-0 h-0.5 bg-accent" />
                        {/* Two lines reserved on desktop so every price in the
                            row lines up, even when a name wraps. */}
                        <p className="font-display text-lg font-semibold text-ink lg:min-h-14">{tier.name[locale]}</p>
                        <p className="mt-4 font-display text-xl font-bold tracking-tight text-ink">{price.fcfa}</p>
                        <p className="mt-1 text-sm text-ink-soft">{price.usd}</p>
                        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{tier.description[locale]}</p>
                      </li>
                    );
                  })}
                </ul>

                {monthly.map((tier) => {
                  const price = priceLabel(tier.fcfa, locale);
                  return (
                    <div
                      key={tier.id}
                      className="group relative grid gap-4 border-x border-b border-line p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10"
                    >
                      <span aria-hidden className="card-line absolute inset-x-0 top-0 h-0.5 bg-accent" />
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-label">{t("addOn")}</p>
                        <p className="mt-2 font-display text-lg font-semibold text-ink">{tier.name[locale]}</p>
                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{tier.description[locale]}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-ink">{price.fcfa}</p>
                        <p className="whitespace-nowrap text-sm text-ink-soft">
                          {price.usd}
                          <span className="ml-2 font-mono text-[11px] uppercase text-label">{t(`period.${tier.period}`)}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div
          data-reveal
          className="mt-12 grid gap-6 border border-line bg-panel p-6 sm:mt-14 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12"
        >
          <div>
            <p className="text-ink">{t("outro")}</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">{t("disclaimer")}</p>
          </div>
          <a
            href={whatsappLink(t("quoteMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex h-12 w-fit items-center gap-2.5 border border-accent bg-accent px-5 text-[15px] font-medium text-paper transition-colors hover:border-accent-ink hover:bg-accent-ink"
          >
            {t("quote")}
            <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

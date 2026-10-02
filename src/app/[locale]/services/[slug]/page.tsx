import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { services, serviceBySlug, type Service } from "@/data/services";
import { servicePages, type SummaryRow } from "@/data/service-pages";
import { getTier, priceLabel, tiersRange } from "@/data/pricing";
import { faq } from "@/data/faq";
import { site } from "@/data/site";
import { updated } from "@/data/dates";
import { JsonLd } from "@/components/JsonLd";
import { FaqPreview, localizeFaq } from "@/components/faq/FaqItem";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { buttonClass } from "@/components/ui/button";
import { languageAlternates, shareMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { pad2 } from "@/lib/format";
import { cx } from "@/lib/cx";
import { beforeAfterTag } from "@/components/ui/before-after";
import { PROCESS_PATH } from "@/data/page-paths";

// One page per service, at a translated address: /en/services/ecommerce,
// /fr/services/creation-boutique-en-ligne. Content in data/service-pages.ts,
// prices from data/pricing.ts. Layout: the content on the left, the price /
// timeline / WhatsApp card staying in view on the right (under the heading
// on phones).

// Each language only has its own slugs; any other address is a 404.
export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return services.map((service) => ({ slug: service.slug[locale] }));
}

const pathsOf = (service: Service) => ({
  en: `/services/${service.slug.en}`,
  fr: `/services/${service.slug.fr}`,
});

export async function generateMetadata(props: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { slug, locale } = (await props.params) as { slug: string; locale: Locale };
  const service = serviceBySlug(slug, locale);
  if (!service) return {};
  const page = servicePages[service.id];
  return {
    title: page.heading[locale],
    description: page.metaDescription[locale],
    alternates: languageAlternates(locale, pathsOf(service)),
    ...shareMetadata(locale, {
      title: page.heading[locale],
      description: page.metaDescription[locale],
      path: `/${locale}${pathsOf(service)[locale]}`,
    }),
  };
}

function rowValue(row: SummaryRow, locale: Locale, perMonth: string) {
  if (row.value) return row.value[locale];
  const range = tiersRange(row.tiers!);
  const monthly = row.tiers!.every((id) => getTier(id).period === "per-month");
  return `${priceLabel(range, locale).fcfa}${monthly ? ` ${perMonth}` : ""}`;
}

export default async function ServicePage(props: PageProps<"/[locale]/services/[slug]">) {
  const { slug, locale } = (await props.params) as { slug: string; locale: Locale };
  setRequestLocale(locale);
  const service = serviceBySlug(slug, locale)!;
  const page = servicePages[service.id];
  const t = await getTranslations("service");
  const tf = await getTranslations("faqTeaser");
  const url = `${site.url}/${locale}${pathsOf(service)[locale]}`;
  const questions = page.faqIds.map((id) => localizeFaq(faq.find((entry) => entry.id === id)!, locale));
  const care = priceLabel(getTier("care").fcfa, locale).amount;

  // What this service is, who provides it (the same Person as the homepage
  // and CV) and its price range: for search engines and AI answer tools.
  const priceTiers = page.summary.find((row) => row.label === "price")!.tiers!;
  const range = tiersRange(priceTiers);
  const schema = [
    {
      "@type": "Service",
      name: page.heading[locale],
      serviceType: service.title[locale],
      description: page.metaDescription[locale],
      url,
      inLanguage: locale,
      provider: { "@id": `${site.url}/#person` },
      areaServed: [{ "@type": "Country", name: "Cameroon" }, "Worldwide"],
      offers: {
        "@type": "Offer",
        url,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "XAF",
          minPrice: range.min,
          ...(range.max !== null && { maxPrice: range.max }),
        },
      },
      dateModified: updated.services,
    },
    {
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer.replace(/• /g, "") },
      })),
    },
  ];

  const summaryCard = (
    <div className="border border-line bg-panel p-5">
      <dl>
        {page.summary.map((row, i) => (
          <div key={row.label} className={i ? "border-t border-line py-3" : "pb-3"}>
            <Eyebrow as="dt">{t(row.label)}</Eyebrow>
            <dd className="mt-1 font-display text-xl font-bold text-ink">{rowValue(row, locale, t("perMonth"))}</dd>
            <dd className="text-[13px] text-ink-soft">{row.note[locale]}</dd>
          </div>
        ))}
        <div className="border-t border-line py-3">
          <Eyebrow as="dt">{t("payment")}</Eyebrow>
          <dd className="mt-1 font-display text-xl font-bold text-ink">{t("paymentValue")}</dd>
          <dd className="text-[13px] text-ink-soft">{t("paymentNote")}</dd>
        </div>
      </dl>
      <div className="mt-2 grid gap-2">
        <a
          href={whatsappLink(page.whatsapp[locale])}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass({ display: "flex" })}
        >
          {page.cta[locale]}
        </a>
        <Link href={{ pathname: "/", hash: "pricing" }} className={buttonClass({ variant: "secondary", display: "flex" })}>
          {t("seePrices")}
        </Link>
      </div>
    </div>
  );

  const proofLink = page.proof.href.startsWith("http")
    ? t("proofExternal")
    : page.proof.href === "/"
      ? t("proofHome")
      : t("proofInternal");
  const proofBody = (
    <>
      {page.proof.image && (
        <BrowserFrame size="sm" host={page.proof.host ?? ""}>
          <div className="relative aspect-[16/10]">
            <Image
              src={page.proof.image}
              alt={`${page.proof.title[locale]}: ${page.proof.text[locale]}`}
              sizes="(min-width: 1024px) 260px, 100vw"
              placeholder="blur"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
          </div>
        </BrowserFrame>
      )}
      <div>
        <p className="font-display text-xl font-bold text-ink group-hover:text-accent-ink">{page.proof.title[locale]}</p>
        <p className="mt-1.5 text-[15px] text-ink-soft">{page.proof.text[locale]}</p>
        <p className="mt-2.5 font-medium text-accent-ink">{proofLink}</p>
      </div>
    </>
  );
  const proofClass = `group grid grid-cols-1 items-center gap-5 border border-line bg-panel p-4 transition-colors hover:border-accent ${
    page.proof.image ? "sm:grid-cols-[260px_minmax(0,1fr)]" : ""
  }`;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-x-14 px-5 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_300px]">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": schema }} />

      <div className="min-w-0">
        <Eyebrow>
          {t("crumb")} · {service.title[locale]}
        </Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.06]">
          {page.heading[locale]}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink sm:text-lg">{page.lead[locale]}</p>

        {/* Phones: the price card right under the heading. */}
        <div className="mt-8 lg:hidden">{summaryCard}</div>

        <section className="mt-14">
          <Eyebrow as="h2">{t("includesTitle")}</Eyebrow>
          <ul className="mt-4 grid grid-cols-1 gap-x-7 gap-y-2.5 sm:grid-cols-2">
            {page.includes.map((item) => (
              <li key={item.en} className="flex gap-2.5 text-[15.5px] text-ink">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="mt-1 shrink-0 text-accent">
                  <path d="M3 8.5l3.2 3.2L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                {item[locale]}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <Eyebrow as="h2">{t("optionsTitle")}</Eyebrow>
          <ul className={`mt-4 grid grid-cols-1 hairline-grid ${page.options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {page.options.map(({ tier: id, timeline }) => {
              const tier = getTier(id);
              const price = priceLabel(tier.fcfa, locale);
              return (
                <li key={id} className="bg-paper p-5">
                  <h3 className="font-semibold text-ink">{tier.name[locale]}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{tier.description[locale]}</p>
                  <p className="mt-4 font-display text-lg font-bold text-ink">
                    {price.fcfa}
                    {tier.period === "per-month" && ` ${t("perMonth")}`}
                  </p>
                  <p className="font-mono text-xs text-label">
                    {price.usd} · {timeline[locale]}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-14">
          <Eyebrow as="h2">{page.proof.pairs ? t("beforeAfterTitle") : t("proofTitle")}</Eyebrow>
          {/* Redesign: before and after side by side, one pair per screen. */}
          {page.proof.pairs && (
            <div className="mt-4 space-y-6">
              {page.proof.pairs.map((pair) => (
                <figure key={pair.label.en}>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {(["before", "after"] as const).map((when) => (
                      <BrowserFrame key={when} size="sm" host={page.proof.host ?? ""}>
                        <div className="relative aspect-[2/1]">
                          <Image
                            src={pair[when]}
                            alt={`${page.proof.title[locale]}, ${pair.label[locale]}: ${t(when)}`}
                            sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
                            placeholder="blur"
                            className="absolute inset-0 h-full w-full object-cover object-top"
                          />
                          <span aria-hidden className={cx(beforeAfterTag, "left-2")}>
                            {t(when)}
                          </span>
                        </div>
                      </BrowserFrame>
                    ))}
                  </div>
                  <figcaption className="mt-2 font-mono text-xs text-ink-soft">{pair.label[locale]}</figcaption>
                </figure>
              ))}
            </div>
          )}
          <div className="mt-4">
            {page.proof.href.startsWith("http") ? (
              <a href={page.proof.href} target="_blank" rel="noopener noreferrer" className={proofClass}>
                {proofBody}
              </a>
            ) : (
              <Link href={page.proof.href} className={proofClass}>
                {proofBody}
              </Link>
            )}
          </div>
        </section>

        <section className="mt-14">
          <Eyebrow as="h2">{t("stepsTitle")}</Eyebrow>
          <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
            {(["1", "2", "3", "4"] as const).map((n, i) => (
              <li key={n} className={`border-t-2 pt-3 ${i === 0 ? "border-accent" : "border-line"}`}>
                <p className="font-mono text-xs text-label">{pad2(i + 1)}</p>
                <h3 className="mt-1 font-semibold text-ink">{t(`steps.${n}.title`)}</h3>
                <p className="mt-1 text-sm text-ink-soft">{t(`steps.${n}.text`, { care })}</p>
              </li>
            ))}
          </ol>
          <Link href={PROCESS_PATH[locale]} className="mt-5 inline-flex min-h-11 items-center font-medium text-accent-ink hover:text-ink">
            {t("stepsMore")} →
          </Link>
        </section>

        <section className="mt-14">
          <Eyebrow as="h2" className="mb-2">
            {t("faqTitle")}
          </Eyebrow>
          <div>
            {questions.map((q) => (
              <FaqPreview
                key={q.id}
                item={q}
                anchorId={`faq-${q.id}`}
                labels={{ answer: tf("answer"), details: tf("more") }}
              />
            ))}
          </div>
        </section>

        <nav aria-label={t("otherTitle")} className="mt-14 border-t border-line pt-6">
          <Eyebrow as="h2">{t("otherTitle")}</Eyebrow>
          <ul className="mt-3 flex flex-wrap gap-2">
            {services
              .filter((other) => other.id !== service.id)
              .map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/services/${other.slug[locale]}`}
                    className="inline-flex min-h-11 items-center border border-line px-4 text-sm text-ink transition-colors hover:border-accent hover:text-accent-ink"
                  >
                    {other.title[locale]} →
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      {/* Desktop: the card stays in view while reading. */}
      <aside className="hidden lg:sticky lg:top-24 lg:block">{summaryCard}</aside>
    </div>
  );
}

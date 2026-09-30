import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { services } from "@/data/services";
import { pad2 } from "@/lib/format";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

const exampleLink =
  "link-underline";

// "Rows with proof": one row per service, each with the real example behind
// it, and a screenshot of that example where there is one.
export function Services() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;

  return (
    <section id="services" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <SectionHeader eyebrow={t("eyebrow")} title={t("heading")} intro={t("intro")} />

        <ul className="mt-10 sm:mt-14">
          {services.map((service, i) => (
            <li
              key={service.title.en}
              data-reveal
              className="grid grid-cols-1 gap-x-10 gap-y-5 border-t border-line py-8 sm:grid-cols-[60px_minmax(0,1fr)] lg:grid-cols-[60px_minmax(0,1fr)_300px] lg:items-center"
            >
              <span className="font-mono text-xs text-label lg:self-start lg:pt-2">{pad2(i + 1)}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{service.title[locale]}</h3>
                <p className="mt-2.5 max-w-xl text-ink-soft">{service.description[locale]}</p>
                <p className="mt-3.5 font-mono text-xs leading-relaxed text-ink-soft">
                  <span className="text-label">{t("example")}</span>{" "}
                  {service.href?.startsWith("/") ? (
                    <Link href={service.href} className={exampleLink}>
                      {service.evidence[locale]}
                    </Link>
                  ) : service.href ? (
                    <a href={service.href} target="_blank" rel="noopener noreferrer" className={exampleLink}>
                      {service.evidence[locale]}
                    </a>
                  ) : (
                    service.evidence[locale]
                  )}
                </p>
              </div>
              {service.image && (
                <BrowserFrame size="sm" host={service.image.label[locale]} className="sm:col-start-2 lg:col-start-3">
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={service.image.src}
                      alt={`${service.title[locale]}: ${service.evidence[locale]}`}
                      fill
                      sizes="(min-width: 1024px) 300px, 100vw"
                      placeholder="blur"
                      className="object-cover object-top"
                    />
                  </div>                </BrowserFrame>              )}
            </li>
          ))}
        </ul>

        <div
          data-reveal
          className="flex flex-col gap-5 border border-line bg-panel p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8"
        >
          <div>
            <p className="font-display text-xl font-semibold text-ink">{t("ctaTitle")}</p>
            <p className="mt-1.5 text-ink-soft">{t("ctaText")}</p>
          </div>
          <Link
            href={{ pathname: "/", hash: "contact" }}
            className={buttonClass({ className: "shrink-0" })}
          >
            {t("cta")}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

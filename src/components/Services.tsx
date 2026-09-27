import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { services } from "@/data/services";

const pad = (n: number) => String(n).padStart(2, "0");

// A hairline grid of numbered service cards. The sixth cell is a "not sure
// what you need?" prompt, which also completes the 3 x 2 grid on desktop.
export function Services() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;

  return (
    <section id="services" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-label">{t("eyebrow")}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
              {t("heading")}
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">{t("intro")}</p>
        </div>

        {/* Borders: the grid draws top/left, each cell right/bottom, so
            every line is 1px wherever the cells wrap. The grid reveals as
            one piece: scaling single cells would pull their borders apart
            mid-animation. */}
        <ul data-reveal className="mt-10 grid border-l border-t border-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li
              key={service.title.en}
              className="group relative flex flex-col border-b border-r border-line p-6 sm:p-7"
            >
              <span aria-hidden className="card-line absolute inset-x-0 -top-px h-0.5 bg-accent" />
              <span className="font-mono text-xs text-label">{pad(i + 1)}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{service.title[locale]}</h3>
              <p className="mt-2 flex-1 text-ink-soft">{service.description[locale]}</p>
              <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-ink-soft">
                <span className="text-label">{t("example")}</span>{" "}
                {service.href?.startsWith("/") ? (
                  <Link href={service.href} className="underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent">
                    {service.evidence[locale]}
                  </Link>
                ) : service.href ? (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
                  >
                    {service.evidence[locale]}
                  </a>
                ) : (
                  service.evidence[locale]
                )}
              </p>
            </li>
          ))}
          <li className="flex flex-col justify-between gap-6 border-b border-r border-line bg-panel p-6 sm:p-7">
            <div>
              <p className="font-display text-xl font-semibold text-ink">{t("ctaTitle")}</p>
              <p className="mt-2 text-ink-soft">{t("ctaText")}</p>
            </div>
            <Link
              href={{ pathname: "/", hash: "contact" }}
              className="group/cta inline-flex h-12 w-fit items-center gap-2.5 border border-accent bg-accent px-5 text-[15px] font-medium text-paper transition-colors hover:border-accent-ink hover:bg-accent-ink"
            >
              {t("cta")}
              <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

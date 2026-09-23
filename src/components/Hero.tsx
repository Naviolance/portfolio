import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            {site.tagline[locale]}
          </h1>
          <p className="mt-5 text-base text-ink-soft">{t("intro", { name: site.name })}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={{ pathname: "/", hash: "work" }}
              className="border border-ink bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent hover:border-accent"
            >
              {t("viewWork")}
            </Link>
            <Link
              href={{ pathname: "/", hash: "contact" }}
              className="border border-ink px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-ink"
            >
              {t("workTogether")}
            </Link>
          </div>
        </div>

        <div className="border border-line bg-panel p-5">
          <p className="font-mono text-xs text-ink-soft">{t("recent")}</p>
          <ul className="mt-4 flex flex-col divide-y divide-line">
            {projects.map((project) => (
              <li key={project.slug} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink">{project.title}</p>
                  <p className="text-xs text-ink-soft">{project.category[locale]}</p>
                </div>
                <span className="whitespace-nowrap border border-label px-2 py-1 font-mono text-[10px] text-label">
                  {t("liveDemo")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

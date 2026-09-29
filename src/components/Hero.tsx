import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { ProjectShowcase, type ShowcaseItem } from "./ProjectShowcase";

// What "done" means, each backed by a project on this page.
const DONE = [
  { key: "payments", tag: "TruckParts · Notch Pay" },
  { key: "stock", tag: "TruckParts" },
  { key: "bookings", tag: "Car Rental" },
  { key: "phone", tag: "TruckParts" },
  { key: "a11y", tag: "TruckParts" },
] as const;

// Server component: everything here is plain HTML in the first response.
// Only <ProjectShowcase> (the deck / swipe strip) ships JavaScript.
export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  const items: ShowcaseItem[] = projects.map((project) => {
    const shot = project.screenshots.find((s) => s.key === "home") ?? project.screenshots[0];
    return {
      slug: project.slug,
      title: project.title,
      category: project.category[locale],
      host: new URL(project.liveUrl).host,
      image: shot.src,
      alt: shot.alt[locale],
    };
  });

  return (
    // overflow-x-clip: the rotated deck cards may poke past the edge at
    // exactly 1024px; clip (unlike hidden) doesn't create a scroll container.
    <section className="overflow-x-clip border-b border-line">
      <div className="mx-auto grid max-w-5xl grid-cols-1 px-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="py-12 sm:py-16 lg:py-20 lg:pr-12">
          <p className="hero-rise flex flex-col gap-1 font-mono text-xs uppercase tracking-wider text-label sm:flex-row sm:gap-5">
            <span>{t("role")}</span>
            <span className="text-ink-soft">{site.location[locale]}</span>
          </p>
          {/* Never animated: it is the page's LCP element, so it must paint
              on the first frame. */}
          <h1 className="mt-5 font-display text-[2rem] font-bold leading-[1.14] tracking-tight text-ink sm:text-5xl sm:leading-[1.08] lg:text-[2.75rem]">
            {site.tagline[locale]}
          </h1>
          <p className="hero-rise mt-5 max-w-xl text-base text-ink-soft [animation-delay:100ms] sm:text-lg">
            {t("intro", { name: site.name })}
          </p>
          <div className="hero-rise mt-8 flex flex-col gap-2.5 [animation-delay:200ms] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href={{ pathname: "/", hash: "work" }}
              className="group inline-flex h-12 items-center justify-center gap-2.5 border border-accent bg-accent px-5 text-[15px] font-medium text-paper transition-colors hover:border-accent-ink hover:bg-accent-ink"
            >
              {t("viewWork")}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={{ pathname: "/", hash: "contact" }}
              className="inline-flex h-12 items-center justify-center border border-ink px-5 text-[15px] font-medium text-ink transition-colors hover:border-accent hover:text-accent-ink"
            >
              {t("workTogether")}
            </Link>
            {/* For recruiters: the CV, one click from the top (the page has the PDF). */}
            <Link
              href="/cv"
              className="inline-flex min-h-11 items-center justify-center text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent sm:ml-2"
            >
              {t("cv")}
            </Link>
          </div>
        </div>

        <div className="relative pb-12 lg:py-16 lg:pl-12">
          <span aria-hidden className="draw-y absolute inset-y-0 left-0 hidden w-px bg-line lg:block" />
          <ProjectShowcase items={items} />
        </div>
      </div>

      <div aria-hidden className="draw-x h-px bg-line [animation-delay:300ms]" />

      <div className="mx-auto max-w-5xl px-5 py-10">
        <h2 className="font-mono text-xs uppercase tracking-wider text-label">{t("doneHeading")}</h2>
        <ul data-reveal className="mt-3 grid grid-cols-1 lg:mt-6 lg:grid-cols-5">
          {DONE.map((item, i) => (
            <li
              key={item.key}
              style={{ "--d": `${300 + i * 250}ms` } as CSSProperties}
              className="flex gap-3.5 border-b border-line py-4 last:border-b-0 lg:flex-col lg:border-b-0 lg:border-l lg:px-5 lg:py-1 lg:first:border-l-0 lg:first:pl-0"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="shrink-0 text-ink-soft">
                <rect x="0.5" y="0.5" width="21" height="21" fill="none" stroke="currentColor" />
                <path
                  className="done-tick stroke-accent"
                  d="M5 11.5l4 4 8-9"
                  fill="none"
                  strokeWidth="2.2"
                  strokeLinecap="square"
                />
              </svg>
              <div>
                <p className="done-text font-medium leading-snug">{t(`done.${item.key}`)}</p>
                <p className="mt-1 font-mono text-[11px] uppercase text-ink-soft">{item.tag}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

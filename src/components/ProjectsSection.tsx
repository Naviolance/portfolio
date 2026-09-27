import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { ProjectScreens } from "./ProjectScreens";

// "Case files": one row per project, screenshots and text alternating sides.
// Server component; only <ProjectScreens> (thumbnails + lightbox) ships JS.
export function ProjectsSection() {
  const t = useTranslations("work");
  const locale = useLocale() as Locale;

  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 pb-8 pt-16 sm:pt-24">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-label">
              {t("eyebrow", { count: projects.length })}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
              {t("heading")}
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">{t("intro")}</p>
        </div>

        <div className="mt-10 sm:mt-14">
          {projects.map((project, i) => (
            <article
              key={project.slug}
              data-reveal
              className="grid gap-8 border-t border-line py-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16"
            >
              {/* Every other project puts its screenshots on the right. */}
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <ProjectScreens
                  projectTitle={project.title}
                  host={new URL(project.liveUrl).host}
                  screenshots={project.screenshots}
                  showcase={project.showcase}
                />
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-label">
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} ·{" "}
                  {project.category[locale]}
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
                  <Link href={`/projects/${project.slug}`} className="hover:text-accent-ink">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-4 text-ink-soft">{project.summary[locale]}</p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {project.highlights.map((highlight, k) => (
                    <li
                      key={highlight.en}
                      style={{ "--d": `${250 + k * 220}ms` } as CSSProperties}
                      className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-3 text-[15px] leading-snug text-ink"
                    >
                      <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden className="text-ink-soft">
                        <rect x="0.5" y="0.5" width="21" height="21" fill="none" stroke="currentColor" />
                        <path
                          className="done-tick stroke-accent"
                          d="M5 11.5l4 4 8-9"
                          fill="none"
                          strokeWidth="2.2"
                          strokeLinecap="square"
                        />
                      </svg>
                      {highlight[locale]}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("stack")}>
                  {project.tags.map((tag) => (
                    <li key={tag} className="border border-line px-2 py-1 font-mono text-[11px] text-ink-soft">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group inline-flex h-12 items-center gap-2.5 border border-accent bg-accent px-5 text-[15px] font-medium text-paper transition-colors hover:border-accent-ink hover:bg-accent-ink"
                  >
                    {t("howBuilt")}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-ink-soft underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
                  >
                    {t("liveDemo")} <span aria-hidden>&nbsp;↗</span>
                  </a>
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-ink-soft underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
                    >
                      {t("github")}
                    </a>
                  ) : (
                    <span className="text-ink-soft">{t("privateCode")}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

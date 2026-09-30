import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { CV_PDF, education, experience } from "@/data/cv";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClass } from "@/components/ui/button";

// Compact rows under About: experience and education side by side. Each
// job's details sit in a native <details> (in the HTML even while closed,
// so search engines still read them). Skills live on the CV page.
export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;

  return (
    <section id="experience" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-5 pt-4 pb-16 sm:pb-24 lg:grid-cols-2 lg:gap-14">
        <div data-reveal>
          <Eyebrow as="h2">{t("work")}</Eyebrow>
          <ol className="mt-3">
            {experience.map((job) => (
              <li key={job.company} className="border-t border-line">
                <details className="group">
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-4 [&::-webkit-details-marker]:hidden">
                    <span className="font-semibold text-ink transition-colors group-hover:text-accent-ink">
                      {job.role[locale]} · {job.company}
                    </span>
                    <span className="pt-1 text-right font-mono text-xs text-label">{job.period[locale]}</span>
                    <span className="col-span-2 text-sm text-ink-soft">
                      {job.place[locale]}
                      <span className="ml-2 whitespace-nowrap font-mono text-xs text-accent-ink">
                        <span aria-hidden className="inline-block transition-transform group-open:rotate-45">
                          +
                        </span>{" "}
                        {t("details")}
                      </span>
                    </span>
                  </summary>
                  <div className="pb-5 text-[15px] text-ink-soft">
                    {job.note && <p className="text-sm text-label">{job.note[locale]}</p>}
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {job.points.map((point) => (
                        <li key={point.en}>{point[locale]}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal>
          <Eyebrow as="h2">{t("education")}</Eyebrow>
          <ul className="mt-3">
            {education.map((item) => (
              <li
                key={item.title.en}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-t border-line py-4"
              >
                <span className="font-semibold text-ink">{item.title[locale]}</span>
                <span className="pt-1 text-right font-mono text-xs text-label">{item.period}</span>
                <span className="col-span-2 text-sm text-ink-soft">{item.place[locale]}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={CV_PDF}
              download
              className={buttonClass({ variant: "secondary", size: "sm" })}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M7 1v8M3.5 5.5 7 9l3.5-3.5M2 12.5h10" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
              {t("download")}
            </a>
            <Link
              href="/cv"
              className={buttonClass({ variant: "secondary", size: "sm" })}
            >
              {t("view")}
            </Link>
            <Link
              href={{ pathname: "/cv", hash: "skills" }}
              className="inline-flex h-11 items-center text-sm text-ink-soft link-underline"
            >
              {t("allSkills")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { CV_PDF, education, experience, skills, spokenLanguages } from "@/data/cv";

// The CV, as a homepage section: work experience, education, skills, and
// the PDF for recruiters who want the one-page version.
export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;

  const subheading = "font-mono text-xs uppercase tracking-widest text-label";

  return (
    <section id="experience" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div data-reveal className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{t("heading")}</h2>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">{t("intro")}</p>
            <a
              href={CV_PDF}
              download
              className="mt-5 inline-flex items-center gap-2 border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent hover:text-paper"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M7 1v8M3.5 5.5 7 9l3.5-3.5M2 12.5h10" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
              {t("download")}
            </a>
            <p className="mt-2 font-mono text-[11px] text-ink-soft">{t("downloadHint")}</p>
          </div>

          <div className="max-w-2xl space-y-12">
            <div>
              <h3 className={subheading}>{t("work")}</h3>
              <ol className="mt-4 border-t border-line">
                {experience.map((job) => (
                  <li key={job.company} className="border-b border-line py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="text-lg font-semibold text-ink">
                        {job.role[locale]} · {job.company}
                      </p>
                      <p className="font-mono text-xs text-ink-soft">{job.period[locale]}</p>
                    </div>
                    <p className="text-sm text-ink-soft">
                      {job.place[locale]}
                      {job.note && <span className="text-label"> · {job.note[locale]}</span>}
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-soft">
                      {job.points.map((point) => (
                        <li key={point.en}>{point[locale]}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className={subheading}>{t("education")}</h3>
              <ul className="mt-4 border-t border-line">
                {education.map((item) => (
                  <li
                    key={item.title.en}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-3"
                  >
                    <p className="font-medium text-ink">
                      {item.title[locale]}
                      <span className="font-normal text-ink-soft">, {item.place[locale]}</span>
                    </p>
                    <p className="font-mono text-xs text-ink-soft">{item.period}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={subheading}>{t("skills")}</h3>
              <dl className="mt-4 space-y-4">
                {skills.map((group) => (
                  <div key={group.label.en} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-4">
                    <dt className="pt-1 text-sm font-medium text-ink">{group.label[locale]}</dt>
                    <dd className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span key={skill} className="border border-line px-2 py-1 font-mono text-[11px] text-ink-soft">
                          {skill}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
                <div className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-4">
                  <dt className="text-sm font-medium text-ink">{t("spoken")}</dt>
                  <dd className="text-sm text-ink-soft">{spokenLanguages[locale]}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

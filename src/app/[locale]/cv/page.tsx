import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { CV_PDF, cvProjects, education, experience, profile, skills, spokenLanguages } from "@/data/cv";
import { languageAlternates } from "@/lib/seo";

// The web version of the CV: same content as the PDF, readable on any phone,
// in both languages, and indexable. Built from data/cv.ts, like the
// homepage Experience section, so the two can't drift apart.

export async function generateMetadata(props: PageProps<"/[locale]/cv">): Promise<Metadata> {
  const { locale } = (await props.params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "cv" });
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: languageAlternates(locale, "/cv"),
    openGraph: { title: `${t("title")}: ${site.fullName}`, description: t("metaDescription"), url: `/${locale}/cv` },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid-page">
      <h2 className="border-b-2 border-accent pb-1 font-display text-sm font-bold uppercase tracking-wider text-accent-ink">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Row({ title, date }: { title: React.ReactNode; date: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
      <p className="font-semibold text-ink">{title}</p>
      <p className="font-mono text-xs text-ink-soft">{date}</p>
    </div>
  );
}

export default async function CvPage(props: PageProps<"/[locale]/cv">) {
  const { locale } = (await props.params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("cv");
  const link = "text-accent-ink underline decoration-line underline-offset-2 hover:decoration-accent";
  // French puts a space before a colon ("Langues :"), English doesn't.
  const colon = locale === "fr" ? " :" : ":";

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 print:max-w-none print:p-0">
      {/* Actions: hidden when printing, the page itself prints as the CV. */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/" className="text-sm text-ink-soft hover:text-accent-ink">
          ← {t("back")}
        </Link>
        <div className="text-right">
          <a
            href={CV_PDF}
            download
            className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-accent hover:bg-accent"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 1v8M3.5 5.5 7 9l3.5-3.5M2 12.5h10" stroke="currentColor" strokeWidth="1.6" fill="none" />
            </svg>
            {t("download")}
          </a>
          <p className="mt-1 font-mono text-[11px] text-ink-soft">{t("downloadHint")}</p>
        </div>
      </div>

      <article className="mt-8 border border-line bg-paper p-6 sm:p-10 print:mt-0 print:border-0 print:p-0">
        <header className="text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {site.fullName.toUpperCase()}
          </h1>
          <p className="mt-1 font-display text-lg font-semibold text-accent-ink">{site.role[locale]}</p>
          <p className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-ink-soft">
            <span>{site.location[locale]}</span>
            <span aria-hidden="true">·</span>
            <span>{site.whatsapp.display}</span>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
            <span aria-hidden="true">·</span>
            <span>{t("openToRemote")}</span>
          </p>
          <p className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm">
            <a href={`${site.url}/${locale}`} className={link}>
              jpfw-webservices.vercel.app
            </a>
            <span aria-hidden="true" className="text-ink-soft">·</span>
            <a href={site.linkedin} className={link}>
              LinkedIn
            </a>
            <span aria-hidden="true" className="text-ink-soft">·</span>
            <a href={site.github} className={link}>
              github.com/Naviolance
            </a>
          </p>
        </header>

        <Section title={t("profile")}>
          <p className="text-ink-soft">{profile[locale]}</p>
        </Section>

        <Section title={t("experience")}>
          <div className="space-y-5">
            {experience.map((job) => (
              <div key={job.company} className="break-inside-avoid">
                <Row title={`${job.role[locale]}, ${job.company}`} date={job.period[locale]} />
                <p className="text-sm italic text-ink-soft">
                  {job.place[locale]}
                  {job.note && ` · ${job.note[locale]}`}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
                  {job.points.map((point) => (
                    <li key={point.en}>{point[locale]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t("projects")}>
          <div className="space-y-5">
            {cvProjects.map((project) => (
              <div key={project.title.en} className="break-inside-avoid">
                <Row title={project.title[locale]} date={project.year} />
                {(project.stack || project.liveUrl) && (
                  <p className="text-sm italic text-ink-soft">
                    {project.stack}
                    {project.liveUrl && (
                      <>
                        {" · "}
                        <a href={project.liveUrl} className={link}>
                          {t("liveDemo")}
                        </a>
                      </>
                    )}
                    {project.codeUrl && (
                      <>
                        {" · "}
                        <a href={project.codeUrl} className={link}>
                          {t("code")}
                        </a>
                      </>
                    )}
                    {project.slug && (
                      <>
                        {" · "}
                        <Link href={`/projects/${project.slug}`} className={link}>
                          {t("caseStudy")}
                        </Link>
                      </>
                    )}
                  </p>
                )}
                <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
                  {project.points.map((point) => (
                    <li key={point.en}>{point[locale]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t("education")}>
          <div className="space-y-2">
            {education.map((item) => (
              <Row
                key={item.title.en}
                title={
                  <>
                    {item.title[locale]}
                    <span className="font-normal text-ink-soft">, {item.place[locale]}</span>
                  </>
                }
                date={item.period}
              />
            ))}
          </div>
        </Section>

        <Section title={t("skills")}>
          <dl className="space-y-1 text-sm">
            {skills.map((group) => (
              <div key={group.label.en} className="sm:flex sm:gap-2">
                <dt className="font-semibold text-ink">
                  {group.label[locale]}
                  {colon}
                </dt>
                <dd className="text-ink-soft">{group.items.join(", ")}</dd>
              </div>
            ))}
            <div className="sm:flex sm:gap-2">
              <dt className="font-semibold text-ink">
                {t("languages")}
                {colon}
              </dt>
              <dd className="text-ink-soft">{spokenLanguages[locale]}</dd>
            </div>
          </dl>
        </Section>
      </article>
    </div>
  );
}

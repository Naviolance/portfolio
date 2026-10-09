import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { updated } from "@/data/dates";
import { CV_PDF, cvProjects, education, experience, profile, skills, spokenLanguages } from "@/data/cv";
import { getProject } from "@/data/projects";
import photo from "@/assets/photo/priestly.webp";
import { JsonLd } from "@/components/JsonLd";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClass } from "@/components/ui/button";
import { languageAlternates, shareMetadata } from "@/lib/seo";
import { personSchema } from "@/lib/person-schema";
import { formatDate, pad2 } from "@/lib/format";

// The web CV: a recruiter's summary first (who, stack, availability, proof),
// then the full CV. Same data as the homepage Experience section and the
// PDFs (data/cv.ts), so none of them can drift apart.

const FACTS = ["stack", "experience", "based", "languages"] as const;

export async function generateMetadata(props: PageProps<"/[locale]/cv">): Promise<Metadata> {
  const { locale } = (await props.params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "cv" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: languageAlternates(locale, "/cv"),
    ...shareMetadata(locale, { title: `${t("title")}: ${site.fullName}`, description: t("metaDescription"), path: `/${locale}/cv` }),
  };
}

function Section({ n, title, id, children }: { n: number; title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 break-inside-avoid-page">
      <Eyebrow as="h2" className="border-b border-line pb-3">
        {pad2(n)} · {title}
      </Eyebrow>
      <div>{children}</div>
    </section>
  );
}

// One CV entry: dates in a left column on wider screens, above on phones.
function Row({ date, children }: { date: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-line py-4 last:border-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6 break-inside-avoid">
      <p className="font-mono text-xs text-label sm:pt-1">{date}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-ink-soft">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const Download = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M7 1v8M3.5 5.5 7 9l3.5-3.5M2 12.5h10" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);

export default async function CvPage(props: PageProps<"/[locale]/cv">) {
  const { locale } = (await props.params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("cv");
  const tAbout = await getTranslations("about");
  const link = "text-ink link-underline";
  const monoLink = "text-accent-ink hover:underline";

  // A page about one person: search engines and AI tools use this to
  // answer "who is …" and to connect the CV to the homepage's Person.
  // (@context undefined: it's set once, on the outer object.)
  const person = { ...personSchema(locale), "@context": undefined };
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${site.url}/${locale}/cv`,
    inLanguage: locale,
    dateModified: updated.cv,
    mainEntity: person,
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14 print:max-w-none print:p-0">
      <JsonLd data={profileSchema} />
      <Link href="/" className="font-mono text-[13px] text-ink-soft hover:text-accent-ink print:hidden">
        ← {t("back")}
      </Link>

      {/* The recruiter's summary: who, what, available, how to reach. */}
      <header className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
        <div>
          <Eyebrow>{t("updated", { date: formatDate(updated.cv, locale, "month") })}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
            {site.fullName}
          </h1>
          <p className="mt-2 font-display text-lg font-semibold text-accent-ink sm:text-xl">{site.role[locale]}</p>
          <p className="mt-5 inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-xs text-ink print:hidden">
            <span aria-hidden className="size-2 rounded-full bg-emerald-400" />
            {t("availability")}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 print:hidden">
            <a href={CV_PDF[locale]} download className={buttonClass({})}>
              <Download />
              {t("download")}
            </a>
            <a href={`mailto:${site.email}`} className={buttonClass({ variant: "secondary" })}>
              {t("email")}
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "secondary" })}>
              LinkedIn ↗
            </a>
          </div>
          <p className="mt-2 font-mono text-[11px] text-ink-soft print:hidden">{t("downloadHint")}</p>
          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
            <span>{site.location[locale]}</span>
            <span>{site.whatsapp.display}</span>
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
            <a href={site.github} className={link}>
              github.com/Naviolance
            </a>
          </p>
        </div>
        {/* First on phones, so the face comes before the text. */}
        <figure className="order-first w-32 border border-line bg-panel sm:w-40 lg:order-none lg:w-full print:hidden">
          <Image
            src={photo}
            alt={tAbout("photoAlt")}
            sizes="(min-width: 1024px) 200px, 160px"
            placeholder="blur"
            priority
            className="aspect-[6/7] h-auto w-full object-cover"
          />
        </figure>
      </header>

      <dl className="mt-10 grid grid-cols-2 hairline-grid lg:grid-cols-4 print:hidden">
        {FACTS.map((fact) => (
          <div key={fact} className="bg-paper p-4 sm:p-5">
            <Eyebrow as="dt">{t(`facts.${fact}.label`)}</Eyebrow>
            <dd className="mt-1.5 font-semibold leading-snug text-ink">{t(`facts.${fact}.value`)}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 print:hidden">
        <Eyebrow>{t("proofTitle")}</Eyebrow>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {cvProjects
            .filter((project) => project.slug && project.proof)
            .map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full border border-line bg-panel p-4 transition-colors hover:border-accent"
                >
                  <span className="font-semibold text-ink group-hover:text-accent-ink">
                    {getProject(project.slug!)?.title} →
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">{project.proof![locale]}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* The full CV. */}
      <Section n={1} title={t("profile")}>
        <p className="max-w-3xl pt-4 text-ink-soft">{profile[locale]}</p>
      </Section>

      <Section n={2} title={t("experience")}>
        {experience.map((job) => (
          <Row key={job.company} date={job.period[locale]}>
            <p className="font-semibold text-ink">
              {job.role[locale]} · {job.company}
            </p>
            <p className="mt-0.5 text-sm text-ink-soft">
              {job.place[locale]}
              {job.note && ` · ${job.note[locale]}`}
            </p>
            <Points items={job.points.map((point) => point[locale])} />
          </Row>
        ))}
      </Section>

      <Section n={3} title={t("projects")}>
        {cvProjects.map((project) => (
          <Row key={project.title.en} date={project.year}>
            <p className="font-semibold text-ink">{project.title[locale]}</p>
            {project.stack && <p className="mt-0.5 text-sm text-ink-soft">{project.stack}</p>}
            {(project.slug || project.liveUrl) && (
              <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
                {project.slug && (
                  <Link href={`/projects/${project.slug}`} className={monoLink}>
                    {t("caseStudy")} →
                  </Link>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={monoLink}>
                    {t("liveDemo")} ↗
                  </a>
                )}
                {project.codeUrl ? (
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={monoLink}>
                    {t("code")} ↗
                  </a>
                ) : (
                  project.liveUrl && <span className="text-ink-soft">{t("privateCode")}</span>
                )}
              </p>
            )}
            <Points items={project.points.map((point) => point[locale])} />
          </Row>
        ))}
      </Section>

      <Section n={4} title={t("education")}>
        {education.map((item) => (
          <Row key={item.title.en} date={item.period}>
            <p className="font-semibold text-ink">{item.title[locale]}</p>
            <p className="mt-0.5 text-sm text-ink-soft">{item.place[locale]}</p>
          </Row>
        ))}
      </Section>

      <Section n={5} title={t("skills")} id="skills">
        {skills.map((group) => (
          <Row key={group.label.en} date={group.label[locale]}>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="border border-line px-2 py-0.5 font-mono text-xs text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </Row>
        ))}
        <Row date={t("spokenLanguages")}>
          <p className="text-ink">{spokenLanguages[locale]}</p>
        </Row>
      </Section>
    </div>
  );
}

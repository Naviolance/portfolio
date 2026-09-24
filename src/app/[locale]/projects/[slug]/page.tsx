import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProject, projects } from "@/data/projects";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { languageAlternates } from "@/lib/seo";

// Combined with the layout's locales: every project in every language.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[locale]/projects/[slug]">
): Promise<Metadata> {
  const { slug, locale } = (await props.params) as { slug: string; locale: Locale };
  const project = getProject(slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  const summary = project.summary[locale];
  return {
    title: project.title,
    description: summary,
    alternates: languageAlternates(locale, path),
    openGraph: {
      title: project.title,
      description: summary,
      type: "article",
      url: `/${locale}${path}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: summary,
    },
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-bold text-ink">{label}</h2>
      <div className="mt-4 max-w-2xl text-ink-soft">{children}</div>
    </div>
  );
}

export default async function ProjectPage(props: PageProps<"/[locale]/projects/[slug]">) {
  const { slug, locale } = (await props.params) as { slug: string; locale: Locale };
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations("project");

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: project.title,
    description: project.summary[locale],
    inLanguage: locale,
    url: project.liveUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    ...(project.githubUrl && { sameAs: project.githubUrl }),
    author: { "@type": "Person", name: site.fullName, url: `${site.url}/${locale}` },
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <JsonLd data={projectSchema} />
      <Link href={{ pathname: "/", hash: "work" }} className="text-sm text-ink-soft hover:text-accent-ink">
        ← {t("back")}
      </Link>

      <header className="mt-6 border-b border-line pb-10">
        <p className="font-mono text-xs text-label">{project.category[locale]}</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-ink-soft">{project.summary[locale]}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink px-4 py-2 font-medium text-ink transition-colors hover:border-accent hover:bg-accent hover:text-paper"
          >
            {t("liveDemo")}
          </a>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line px-4 py-2 font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              {t("repo")}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 border border-dashed border-line px-4 py-2 text-ink-soft">
              <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true">
                <rect x="2.5" y="6" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path d="M4.5 6V4.2a2.5 2.5 0 0 1 5 0V6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              {t("privateRepo")}
            </span>
          )}
        </div>
        {project.demoNote && (
          <p className="mt-5 max-w-2xl border-l-2 border-accent pl-4 text-sm text-ink-soft">
            {project.demoNote.text[locale]}{" "}
            <a
              href={project.demoNote.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
            >
              {project.demoNote.linkLabel[locale]}
            </a>
          </p>
        )}
      </header>

      <Field label={t("overview")}>
        <p>{project.summary[locale]}</p>
      </Field>

      <Field label={t("problem")}>
        <p>{project.problem[locale]}</p>
      </Field>

      <Field label={t("solution")}>
        <p>{project.solution[locale]}</p>
      </Field>

      <Field label={t("features")}>
        <ul className="list-disc space-y-2 pl-5">
          {project.keyFeatures.map((feature) => (
            <li key={feature.en}>{feature[locale]}</li>
          ))}
        </ul>
      </Field>

      <div data-reveal className="border-t border-line py-8">
        <h2 className="font-display text-xl font-bold text-ink">{t("howBuilt")}</h2>
        {/* Stacked on phones (a 3-column table is unreadable at 360px);
            a label / choice / why grid from sm up. */}
        <div className="mt-4 max-w-3xl border-t border-line text-sm">
          <div className="hidden grid-cols-[130px_170px_1fr] gap-4 border-b border-line py-2 text-left font-medium text-ink-soft sm:grid">
            <span>{t("layer")}</span>
            <span>{t("choice")}</span>
            <span>{t("why")}</span>
          </div>
          <dl>
            {project.techStack.map((entry) => (
              <div
                key={entry.choice}
                className="grid gap-1 border-b border-line py-3 sm:grid-cols-[130px_170px_1fr] sm:gap-4"
              >
                <dt className="font-mono text-xs text-label sm:pt-0.5">{entry.layer[locale]}</dt>
                <dd className="font-medium text-ink">{entry.choice}</dd>
                <dd className="text-ink-soft">{entry.why[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Field label={t("challenges")}>
        <ul className="list-disc space-y-2 pl-5">
          {project.challenges.map((challenge) => (
            <li key={challenge.en}>{challenge[locale]}</li>
          ))}
        </ul>
      </Field>

      <Field label={t("result")}>
        <p>{project.outcome[locale]}</p>
      </Field>

      <div data-reveal className="border-t border-line py-8">
        <h2 className="font-display text-xl font-bold text-ink">{t("screenshots")}</h2>
        <p className="mt-2 text-sm text-ink-soft">{t("screenshotsHint")}</p>
        <div className="mt-4">
          <ScreenshotGallery
            projectTitle={project.title}
            screenshots={project.screenshots}
            variant="grid"
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 45vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
}

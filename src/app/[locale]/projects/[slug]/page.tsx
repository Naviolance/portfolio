import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProject, projects, type Project } from "@/data/projects";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { JsonLd } from "@/components/JsonLd";
import { updated } from "@/data/dates";
import { site } from "@/data/site";
import { languageAlternates } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { formatDate, pad2 } from "@/lib/format";
import { spyLink, spyScope, spyTarget } from "@/lib/scroll-spy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { cx } from "@/lib/cx";
import { buttonClass } from "@/components/ui/button";

// Only the known projects: any other slug matches no route and gets the
// server-rendered global 404 (app/global-not-found.tsx). Next.js logs
// "NoFallbackError" for such a request: expected, the visitor still gets
// the 404 page.
export const dynamicParams = false;

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


// The chapters, in page order. Their ids are the index's link targets.
const CHAPTERS = ["decisions", "built", "hard", "result", "screens"] as const;

function Chapter({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-reveal style={spyTarget(id)} className="scroll-mt-24 border-t border-line py-10 sm:py-12">
      <p className="font-mono text-xs text-label">{pad2(n)}</p>
      <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">{title}</h2>
      {children}
    </section>
  );
}

// "Stopping overselling. Reading the stock…": the first sentence is the
// headline of the challenge, the rest explains it.
function splitFirstSentence(text: string) {
  const i = text.indexOf(". ");
  return i === -1 ? { head: text, rest: "" } : { head: text.slice(0, i + 1), rest: text.slice(i + 2) };
}

// Case study, "problem → decision → proof": every claim sits next to the
// screen that proves it. A sticky index (CSS only, no JavaScript) lists the
// chapters on desktop.
export default async function ProjectPage(props: PageProps<"/[locale]/projects/[slug]">) {
  const { slug, locale } = (await props.params) as { slug: string; locale: Locale };
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations("project");
  const tw = await getTranslations("whatsapp");

  const index = projects.indexOf(project);
  const next: Project = projects[(index + 1) % projects.length];
  const shot = (key: string) => project.screenshots.find((s) => s.key === key);
  const cover = shot(project.showcase[0]) ?? project.screenshots[0];
  const lastUpdate = updated.projects[project.slug];
  const lastUpdateLabel = lastUpdate && formatDate(lastUpdate, locale, "month");

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
    ...(lastUpdate && { dateModified: lastUpdate }),
  };

  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-16 sm:pt-14 sm:pb-24">
      <JsonLd data={projectSchema} />
      <Link href={{ pathname: "/", hash: "work" }} className="font-mono text-xs text-ink-soft hover:text-accent-ink">
        ← {t("back")}
      </Link>

      <header className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div>
          <Eyebrow>
            {t("kicker", { n: pad2(index + 1), total: pad2(projects.length) })} · {project.category[locale]}
          </Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-[3.25rem] sm:leading-[1.05]">
            {project.title}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink">{project.summary[locale]}</p>

          <dl className="mt-6 grid grid-cols-2 hairline-grid text-sm">
            {[
              [t("facts.role"), project.role[locale]],
              [t("facts.status"), project.statusNote[locale]],
              [t("facts.stack"), project.stackLine.join(" · ")],
              [t("facts.updated"), lastUpdateLabel],
            ]
              .filter(([, value]) => value)
              .map(([term, value]) => (
                <div key={term} className="bg-paper px-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-label">{term}</dt>
                  <dd className="mt-0.5 text-ink">{value}</dd>
                </div>
              ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass()}
            >
              {t("liveDemo")} <span aria-hidden>↗</span>
            </a>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass({ variant: "secondary" })}
              >
                {t("repo")} <span aria-hidden>↗</span>
              </a>
            ) : (
              <span className="inline-flex min-h-12 items-center gap-2 border border-dashed border-line px-4 text-sm text-ink-soft">
                <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true">
                  <rect x="2.5" y="6" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M4.5 6V4.2a2.5 2.5 0 0 1 5 0V6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                {t("privateRepo")}
              </span>
            )}
          </div>
          {project.demoNote && (
            <p className="mt-4 text-sm text-ink-soft">
              {project.demoNote.text[locale]}{" "}
              <a
                href={project.demoNote.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink link-underline"
              >
                {project.demoNote.linkLabel[locale]}
              </a>
            </p>
          )}
        </div>

        {/* The page's main image: requested first and eagerly, at the size it
            is shown (it's the likely LCP element on desktop). */}
        <div className={cx("relative", project.phones && "lg:mb-24")}>
          <BrowserFrame host={new URL(project.liveUrl).host}>
            <div className="relative aspect-[2/1]">
              <Image
                src={cover.src}
                alt={cover.alt[locale]}
                loading="eager"
                fetchPriority="high"
                placeholder="blur"
                sizes="(min-width: 1024px) 520px, 100vw"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </BrowserFrame>
          {/* Phone screenshots as a stair over the bottom-right corner, each
              one a step higher. Wide screens only: on a phone the visitor is
              already looking at one. Lazy images inside display:none aren't
              downloaded, so phones don't pay for them. */}
          {project.phones && (
            <div className="absolute -bottom-24 right-0 hidden items-end lg:flex xl:-right-12">
              {project.phones.map((phone, i) => (
                <div
                  key={i}
                  className="w-[108px] overflow-hidden rounded-[20px] border-[5px] border-brand-navy bg-brand-navy shadow-[0_16px_36px_var(--shade)]"
                  style={{ marginLeft: i ? -22 : 0, transform: `translateY(${-28 * i}px)`, zIndex: i + 1 }}
                >
                  <Image src={phone.src} alt={phone.alt[locale]} sizes="108px" className="block h-auto w-full rounded-[15px]" />
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      <div
        style={spyScope(CHAPTERS)}
        className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12"
      >
        {/* Sticky index: plain links + position: sticky, and a "you are
            here" marker from lib/scroll-spy. No JavaScript, so it works from
            the first paint, even on a slow connection. */}
        <nav aria-label={t("onThisPage")} className="hidden lg:block">
          <div className="sticky top-24">
            <Eyebrow>{t("onThisPage")}</Eyebrow>
            <ol className="mt-3 font-mono text-[13px]">
              {CHAPTERS.map((id, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    style={spyLink(id)}
                    className="spy-link block border-l-2 border-line py-1.5 pl-3 text-ink-soft transition-colors hover:text-accent-ink"
                  >
                    <span className="text-label">{pad2(i + 1)}</span> {t(`toc.${id}`)}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0">
          <Chapter id="decisions" n={1} title={t("decisionsTitle")}>
            <p className="mt-3 max-w-2xl text-ink-soft">{project.problem[locale]}</p>
            <div className="mt-8 space-y-10">
              {project.decisions.map((decision, i) => {
                const proof = shot(decision.shot);
                return (
                  <div
                    key={decision.shot}
                    className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 sm:gap-8"
                  >
                    <div className={i % 2 === 1 ? "sm:order-2" : undefined}>
                      <Eyebrow>
                        {pad2(i + 1)} · {decision.label[locale]}
                      </Eyebrow>
                      <p className="mt-2 text-[15px] text-ink-soft">
                        <span className="mr-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#b4232c] dark:text-[#f5a3a3]">
                          {t("problemLabel")}
                        </span>
                        {decision.problem[locale]}
                      </p>
                      <p className="mt-3 text-[16px] text-ink">
                        <span className="mr-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-label">
                          {t("builtLabel")}
                        </span>
                        {decision.built[locale]}
                      </p>
                      {decision.tech && (
                        <p className="mt-3 border-l-2 border-accent pl-3 font-mono text-[12.5px] leading-relaxed text-ink-soft">
                          {decision.tech[locale]}
                        </p>
                      )}
                    </div>
                    {proof && (
                      <BrowserFrame>
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={proof.src}
                            alt={proof.alt[locale]}
                            placeholder="blur"
                            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                            className="absolute inset-0 h-full w-full object-cover object-left-top"
                          />
                        </div>
                      </BrowserFrame>
                    )}
                  </div>
                );
              })}
            </div>
            <details className="group mt-10">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 font-mono text-[13px] text-accent-ink [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="transition-transform group-open:rotate-45">
                  +
                </span>
                {t("allFeatures", { count: project.keyFeatures.length })}
              </summary>
              <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-[15px] text-ink-soft">
                {project.keyFeatures.map((feature) => (
                  <li key={feature.en}>{feature[locale]}</li>
                ))}
              </ul>
            </details>
          </Chapter>

          <Chapter id="built" n={2} title={t("howBuilt")}>
            <p className="mt-3 max-w-2xl text-ink-soft">{project.solution[locale]}</p>
            <dl className="mt-6 border-b border-line text-[15px]">
              {project.techStack.map((entry) => (
                <div
                  key={entry.choice}
                  className="grid grid-cols-1 gap-1 border-t border-line py-3.5 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4"
                >
                  <Eyebrow as="dt" className="sm:pt-1">
                    {entry.layer[locale]}
                  </Eyebrow>
                  <dd>
                    <span className="font-medium text-ink">{entry.choice}</span>
                    <span className="mt-0.5 block text-sm text-ink-soft">{entry.why[locale]}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Chapter>

          <Chapter id="hard" n={3} title={t("hardTitle")}>
            <ul className="mt-5 border-b border-line">
              {project.challenges.map((challenge) => {
                const { head, rest } = splitFirstSentence(challenge[locale]);
                return (
                  <li key={challenge.en} className="border-t border-line py-4 text-[15px] text-ink-soft">
                    <strong className="font-semibold text-ink">{head}</strong> {rest}
                  </li>
                );
              })}
            </ul>
          </Chapter>

          <Chapter id="result" n={4} title={t("resultTitle")}>
            <p className="mt-3 max-w-2xl text-ink-soft">{project.outcome[locale]}</p>
          </Chapter>

          <Chapter id="screens" n={5} title={t("screensTitle")}>
            <p className="mt-2 font-mono text-xs text-ink-soft">
              {t("screensHint", { count: project.screenshots.length })}
            </p>
            <div className="mt-5">
              <ScreenshotGallery projectTitle={project.title} screenshots={project.screenshots} />
            </div>
          </Chapter>
        </div>
      </div>

      <div
        data-reveal
        className="mt-6 grid grid-cols-1 gap-6 border border-line bg-panel p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12"
      >
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">{project.cta.title[locale]}</h2>
          <p className="mt-2 text-ink-soft">{project.cta.text[locale]}</p>
        </div>
        <a
          href={whatsappLink(tw("project", { project: project.title }))}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass()}
        >
          {t("ctaButton")} <span aria-hidden>↗</span>
        </a>
      </div>

      <nav className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
        <Link href={{ pathname: "/", hash: "work" }} className="font-mono text-xs text-ink-soft hover:text-accent-ink">
          ← {t("back")}
        </Link>
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <span className="block font-mono text-xs uppercase tracking-wider text-ink-soft">
            {t("next", { n: pad2(projects.indexOf(next) + 1), total: pad2(projects.length) })}
          </span>
          <span className="mt-1 block font-display text-2xl font-bold text-ink group-hover:text-accent-ink">
            {next.title} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </nav>
    </div>
  );
}

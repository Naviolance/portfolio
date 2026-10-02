import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { processPage as P } from "@/data/process";
import { PROCESS_PATH } from "@/data/page-paths";
import { getTier, priceLabel } from "@/data/pricing";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClass } from "@/components/ui/button";
import { languageAlternates, shareMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { pad2 } from "@/lib/format";
import { cx } from "@/lib/cx";

// The "How I work" page, served at /en/how-i-work and /fr/ma-methode (one
// tiny page file per address, both rendering this). Text in data/process.ts.
//
// The six steps light up one by one as you scroll, in CSS only (the .step-*
// classes in globals.css, same technique as lib/scroll-spy.ts): each step's
// number box names a view timeline, and the step's title, text and "you
// get" box animate from dim to lit on it. Passed steps stay lit. Browsers
// without scroll-driven animations show every step lit.

type Props = { params: Promise<{ locale: string }> };

export async function processMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return {
    title: P.title[locale],
    description: P.metaDescription[locale],
    alternates: languageAlternates(locale, PROCESS_PATH),
    ...shareMetadata(locale, { title: P.title[locale], description: P.metaDescription[locale], path: `/${locale}${PROCESS_PATH[locale]}`, image: "own" }),
  };
}

const timeline = (i: number) => `--step-${i + 1}`;
// Lights up as the step's number box crosses a line halfway down the screen.
// The number box both defines the timeline and animates on it.
const stepTarget = (i: number): CSSProperties => ({
  viewTimelineName: timeline(i),
  viewTimelineInset: "50% 49.9%",
  animationTimeline: timeline(i),
});
const onStep = (i: number): CSSProperties => ({ animationTimeline: timeline(i) });

const mono = "font-mono text-[11px] uppercase tracking-[0.12em]";

export async function ProcessPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const L = (text: { en: string; fr: string }) => text[locale];
  const care = priceLabel(getTier("care").fcfa, locale).amount;
  const steps = P.steps;
  const whatsapp = whatsappLink(P.whatsapp[locale]);

  const tag = (label: string, money: boolean) => (
    <span className={cx("border px-2 py-0.5", mono, money ? "border-money text-money" : "border-accent text-label")}>{label}</span>
  );

  return (
    <div>
      {/* Hero: the promise, then the "work order" with the four answers people look for. */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-x-14 gap-y-12 px-5 pt-14 pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <Eyebrow>{L(P.eyebrow)}</Eyebrow>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-[3.25rem] sm:leading-[1.04]">
            {L(P.heading)}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink sm:text-lg">{L(P.lead)}</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass()}>
              {L(P.cta.button)} <span aria-hidden>↗</span>
            </a>
            <Link href={{ pathname: "/", hash: "pricing" }} className={buttonClass({ variant: "secondary" })}>
              {L(P.cta.prices)}
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="border border-line bg-panel">
            <div className={cx("flex justify-between gap-4 border-b border-line px-5 py-3.5 text-ink-soft", mono)}>
              <span>{L(P.ticket.title)}</span>
              <span className="text-ink">{P.ticket.number}</span>
            </div>
            <dl className="px-5 py-1.5">
              {P.ticket.rows.map((row, i) => (
                <div
                  key={row.label.en}
                  className={cx("grid grid-cols-[96px_minmax(0,1fr)] gap-3 py-3", i < P.ticket.rows.length - 1 && "border-b border-dashed border-line")}
                >
                  <dt className={cx("pt-0.5 text-ink-soft", mono)}>{L(row.label)}</dt>
                  <dd className={cx("font-medium", row.highlight ? "text-accent-ink" : "text-ink")}>{L(row.value)}</dd>
                </div>
              ))}
            </dl>
            <p className={cx("border-t-2 border-dashed border-line px-5 py-3.5 text-ink-soft", mono)}>{L(P.ticket.footer)}</p>
          </div>
          <p
            aria-hidden
            className={cx("absolute -top-3.5 right-3 -rotate-6 border-2 border-accent bg-paper px-2.5 py-1 font-medium text-label", mono)}
          >
            {L(P.ticket.stamp)}
          </p>
        </div>
      </section>

      {/* The six steps. timelineScope lets the sticky counter (outside the
          list) see every step's timeline. */}
      <section
        aria-labelledby="steps-title"
        style={{ timelineScope: steps.map((_, i) => timeline(i)).join(", ") }}
      >
        <div className="sticky top-16 z-30 border-y border-line bg-paper/95 backdrop-blur">
          <div className="mx-auto max-w-5xl px-5">
            <div className="flex items-baseline justify-between gap-4 py-3">
              <h2 id="steps-title" className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {L(P.stepsTitle)}
              </h2>
              <p aria-hidden className={cx("step-counter text-ink-soft", mono)}>
                {L(P.labels.step)}{" "}
                <span className="relative inline-block h-[1.4em] w-[2.4ch] overflow-hidden align-bottom text-label">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={cx("step-digit absolute inset-0", i === 0 && "step-digit-first", i === steps.length - 1 && "step-digit-last")}
                      style={{
                        animationTimeline: [i > 0 && timeline(i), i < steps.length - 1 && timeline(i + 1)].filter(Boolean).join(", "),
                      }}
                    >
                      {pad2(i + 1)}
                    </span>
                  ))}
                </span>{" "}
                {L(P.labels.of)} {pad2(steps.length)}
              </p>
            </div>
            <div aria-hidden className={cx("hidden grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)_240px] pb-2.5 text-ink-soft lg:grid", mono)}>
              <span className="pl-16">{L(P.labels.step)}</span>
              <span className="px-6">{L(P.labels.you)}</span>
              <span className="px-6">{L(P.labels.me)}</span>
              <span className="px-5 text-label">{L(P.labels.get)}</span>
            </div>
          </div>
        </div>

        <ol className="mx-auto max-w-5xl px-5">
          {steps.map((step, i) => {
            const first = i === 0;
            const last = i === steps.length - 1;
            return (
              <li key={step.title.en} className={cx("relative pl-12 lg:pl-0", !last && "border-b border-line")}>
                {/* The spine: grey, with a cyan line that fills as this step passes the middle of the screen. */}
                {[false, true].map((fill) => (
                  <span
                    key={String(fill)}
                    aria-hidden
                    className={cx(
                      "absolute left-[15px] w-0.5 lg:left-[19px]",
                      fill ? "step-fill z-[1] origin-top bg-accent" : "bg-line",
                      first ? "top-11" : "top-0",
                      last ? "h-11" : "bottom-0",
                    )}
                  />
                ))}
                <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)_240px]">
                  <div className="relative pt-7 pb-4 lg:py-7 lg:pl-16">
                    <span
                      aria-hidden
                      className="step-node absolute top-7 -left-12 lg:top-[26px] z-[2] flex h-8 w-8 items-center justify-center border-2 border-accent bg-accent font-mono text-xs font-medium text-paper lg:left-[3px] lg:h-9 lg:w-9 lg:text-[13px]"
                      style={stepTarget(i)}
                    >
                      {pad2(i + 1)}
                    </span>
                    <p className={cx("text-ink-soft", mono)}>{L(step.when)}</p>
                    <h3 className="step-dim mt-1 font-display text-xl font-bold leading-snug text-ink" style={onStep(i)}>
                      <span className="sr-only">{pad2(i + 1)}. </span>
                      {L(step.title)}
                    </h3>
                    {(step.pays || step.handover) && (
                      <p className="step-dim mt-3 flex flex-wrap gap-1.5" style={onStep(i)}>
                        {step.pays && tag(L(P.labels.pay), true)}
                        {step.handover && tag(L(P.labels.handover), false)}
                      </p>
                    )}
                  </div>
                  <div className="step-dim lg:px-6 lg:py-7" style={onStep(i)}>
                    <p className={cx("text-ink-soft lg:sr-only", mono)}>{L(P.labels.you)}</p>
                    <p className="mt-0.5 text-ink-soft lg:mt-0">{L(step.you)}</p>
                  </div>
                  <div className="step-dim mt-3 lg:mt-0 lg:px-6 lg:py-7" style={onStep(i)}>
                    <p className={cx("text-ink-soft lg:sr-only", mono)}>{L(P.labels.me)}</p>
                    <p className="mt-0.5 text-ink-soft lg:mt-0">{L(step.me)}</p>
                  </div>
                  <div
                    className="step-stub mt-4 mb-7 border-t-2 border-dashed border-accent bg-panel px-4 py-3 lg:my-0 lg:border-t-0 lg:border-l-2 lg:px-5 lg:py-7"
                    style={onStep(i)}
                  >
                    <p className={cx("text-label lg:sr-only", mono)}>{L(P.labels.get)}</p>
                    <p className="step-dim mt-0.5 font-medium text-ink lg:mt-0" style={onStep(i)}>
                      {L(step.get).replace("{care}", care)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <p className={cx("mx-auto max-w-5xl px-5 pt-2 pl-[68px] text-label lg:pl-[84px]", mono)}>✓ {L(P.labels.done)}</p>
      </section>

      {/* What stays theirs, and what I need from them. */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 pt-20 md:grid-cols-2 md:gap-6">
        <div className="border border-accent p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="shrink-0 text-accent">
              <circle cx="8" cy="15" r="4" />
              <path d="M11 12l9-9M17 6l3 3M14 9l2 2" />
            </svg>
            <h2 className="font-display text-2xl font-bold text-ink">{L(P.own.title)}</h2>
          </div>
          <p className="mt-2.5 text-ink-soft">{L(P.own.text)}</p>
          <ul className="mt-5 border-b border-line">
            {P.own.items.map((item) => (
              <li key={item.what.en} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 border-t border-line py-3">
                <span className="text-ink">{L(item.what)}</span>
                <span className={cx("pt-0.5 text-label", mono)}>{L(item.status)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-panel p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-ink">{L(P.need.title)}</h2>
          <p className="mt-2.5 text-ink-soft">{L(P.need.text)}</p>
          <ul className="mt-5 space-y-3">
            {P.need.items.map((item) => (
              <li key={item.en} className="flex gap-3 text-ink">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="mt-1 shrink-0 text-accent">
                  <path d="M3 8.5l3.2 3.2L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                {L(item)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Back to step 01. */}
      <section className="mx-auto max-w-5xl px-5 pt-20 pb-24">
        <div className="grid grid-cols-1 items-end gap-8 border-t-2 border-dashed border-line pt-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Eyebrow>{L(P.cta.eyebrow)}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
              {L(P.cta.title)}
            </h2>
            <p className="mt-3 max-w-lg text-[17px] text-ink-soft">{L(P.cta.text)}</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass()}>
              {L(P.cta.button)} <span aria-hidden>↗</span>
            </a>
            <Link href="/faq" className="inline-flex min-h-11 items-center font-medium text-accent-ink hover:text-ink">
              {L(P.cta.faq)} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

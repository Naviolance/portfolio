import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { FaqEntry } from "@/data/faq";

// One FAQ entry, already in the page's language (plain strings, so it can
// be passed to the client-side browser without shipping both languages).
export type FaqItemData = {
  id: string;
  category: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export function localizeFaq(entry: FaqEntry, locale: Locale): FaqItemData {
  return {
    id: entry.id,
    category: entry.category,
    question: entry.question[locale],
    answer: entry.answer[locale],
    link: entry.link && { href: entry.link.href, label: entry.link.label[locale] },
  };
}

// Answers open with the answer itself (see data/faq.ts), so the first
// paragraph can be shown on its own: "Between 150K FCFA ... :" becomes a
// sentence, and the list and details after it go behind "Details".
export function splitAnswer(answer: string) {
  const [first, ...rest] = answer.split("\n\n");
  // French puts a space before the colon ("faire :"), so drop that too.
  const lead = first.replace(/\s*:$/, ".");
  return { lead, rest: rest.join("\n\n") };
}

// Answers are plain text: paragraphs separated by a blank line, and a
// paragraph whose lines all start with "• " becomes a bullet list.
export function FaqAnswer({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((line) => line.startsWith("• "))) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </>
  );
}

// "Answer preview": the question, its one-sentence answer always visible
// (what visitors skim, and what search and AI tools quote), and the rest
// in a native <details>, which is in the HTML even while closed. Used on
// the homepage and on the FAQ page.
export function FaqPreview({
  item,
  anchorId,
  labels,
  open,
  action,
}: {
  item: FaqItemData;
  anchorId: string;
  labels: { answer: string; details: string };
  open?: boolean;
  // Shown beside the question (the FAQ page's copy-link button).
  action?: ReactNode;
}) {
  const { lead, rest } = splitAnswer(item.answer);
  const external = item.link?.href.startsWith("http");
  const linkClass = "inline-block font-medium text-ink link-underline";

  return (
    <article id={anchorId} className="scroll-mt-24 border-t border-line py-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
        {action}
      </div>
      <p className="mt-1.5 text-ink">
        <span className="mr-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-label">
          {labels.answer}
        </span>
        {lead}
      </p>
      {(rest || item.link) && (
        <details open={open} className="group mt-2">
          <summary className="inline-flex min-h-8 cursor-pointer list-none items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-accent-ink [&::-webkit-details-marker]:hidden">
            <span aria-hidden className="font-mono text-accent-ink transition-transform group-open:rotate-45">
              +
            </span>
            {labels.details}
          </summary>
          <div className="mt-2 max-w-2xl space-y-3 text-[15px] text-ink-soft">
            {rest && <FaqAnswer text={rest} />}
            {item.link &&
              (external ? (
                <a href={item.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.link.label}
                </a>
              ) : (
                <Link href={item.link.href} className={linkClass}>
                  {item.link.label}
                </Link>
              ))}
          </div>
        </details>
      )}
    </article>
  );
}

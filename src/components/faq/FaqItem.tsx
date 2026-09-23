import { Link } from "@/i18n/navigation";

// One FAQ entry, already in the page's language (plain strings, so it can
// be passed to the client-side browser without shipping both languages).
export type FaqItemData = {
  id: string;
  category: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

// Answers are plain text: paragraphs separated by a blank line, and a
// paragraph whose lines all start with "• " becomes a bullet list.
function FaqAnswer({ text }: { text: string }) {
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

// Native <details>: keyboard-accessible, works without JavaScript, and the
// answer is in the HTML even while closed, so search engines read it.
export function FaqItem({ item, open }: { item: FaqItemData; open?: boolean }) {
  const external = item.link?.href.startsWith("http");
  return (
    <details id={item.id} open={open} className="group scroll-mt-24 border-b border-line">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-base font-semibold text-ink transition-colors hover:text-accent-ink [&::-webkit-details-marker]:hidden">
        <span>{item.question}</span>
        {/* + that turns into × when open */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          aria-hidden="true"
          className="mt-1 shrink-0 text-label transition-transform duration-200 group-open:rotate-45"
        >
          <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </summary>
      <div className="max-w-2xl space-y-3 pb-5 text-ink-soft">
        <FaqAnswer text={item.answer} />
        {item.link &&
          (external ? (
            <a
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
            >
              {item.link.label}
            </a>
          ) : (
            <Link
              href={item.link.href}
              className="inline-block font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
            >
              {item.link.label}
            </Link>
          ))}
      </div>
    </details>
  );
}

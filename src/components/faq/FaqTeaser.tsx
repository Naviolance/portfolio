import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { faq } from "@/data/faq";
import { whatsappLink } from "@/lib/whatsapp";
import { FaqAnswer } from "./FaqItem";

// Answers open with the answer itself (see data/faq.ts), so the first
// paragraph can be shown on its own: "Between 150K FCFA ... :" becomes a
// sentence, and the list and details after it go behind "Details".
function splitAnswer(answer: string) {
  const [first, ...rest] = answer.split("\n\n");
  // French puts a space before the colon ("faire :"), so drop that too.
  const lead = first.replace(/\s*:$/, ".");
  return { lead, rest: rest.join("\n\n") };
}

// "Answer preview": the homepage's featured questions, each with its
// one-sentence answer always visible (what visitors skim, and what search
// and AI tools quote), and the rest one tap away.
export function FaqTeaser() {
  const t = useTranslations("faqTeaser");
  const tf = useTranslations("faq");
  const locale = useLocale() as Locale;
  const featured = faq.filter((item) => item.featured);

  return (
    <section id="faq" className="border-b border-line">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-label">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.08]">
            {t("heading")}
          </h2>
          <p className="mt-4 text-ink-soft">{t("intro")}</p>
          <Link
            href="/faq"
            className="mt-6 inline-flex h-11 items-center gap-2 border border-line px-4 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-ink"
          >
            {tf("seeAll", { count: faq.length })} →
          </Link>
          <p className="mt-4 font-mono text-xs text-ink-soft">
            {t("unsure")}{" "}
            <a
              href={whatsappLink(tf("askGeneralMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              {t("ask")}
            </a>
          </p>
        </div>

        <ul data-reveal className="border-b border-line">
          {featured.map((item) => {
            const { lead, rest } = splitAnswer(item.answer[locale]);
            return (
              <li key={item.id} id={`home-${item.id}`} className="scroll-mt-24 border-t border-line py-5">
                <h3 className="text-lg font-semibold text-ink">{item.question[locale]}</h3>
                <p className="mt-1.5 text-ink">
                  <span className="mr-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-label">
                    {t("answer")}
                  </span>
                  {lead}
                </p>
                {(rest || item.link) && (
                  <details className="group mt-2">
                    <summary className="inline-flex min-h-8 cursor-pointer list-none items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-accent-ink [&::-webkit-details-marker]:hidden">
                      <span aria-hidden className="font-mono text-accent-ink transition-transform group-open:rotate-45">
                        +
                      </span>
                      {t("more")}
                    </summary>
                    <div className="mt-2 max-w-2xl space-y-3 text-[15px] text-ink-soft">
                      {rest && <FaqAnswer text={rest} />}
                      {item.link && (
                        <Link
                          href={item.link.href}
                          className="inline-block font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
                        >
                          {item.link.label[locale]}
                        </Link>
                      )}
                    </div>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

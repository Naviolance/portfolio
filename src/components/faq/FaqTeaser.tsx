import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { faq } from "@/data/faq";
import { FaqItem } from "./FaqItem";

// Homepage section: the questions marked `featured` in data/faq.ts, with a
// link to the full /faq page.
export function FaqTeaser() {
  const t = useTranslations("faq");
  const locale = useLocale() as Locale;
  const featured = faq.filter((item) => item.featured);

  return (
    <section id="faq" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div data-reveal className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{t("teaserHeading")}</h2>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">{t("teaserIntro")}</p>
          </div>
          <div className="max-w-2xl">
            <div className="border-t border-line">
              {featured.map((item) => (
                <FaqItem
                  key={item.id}
                  item={{
                    id: `home-${item.id}`,
                    category: item.category,
                    question: item.question[locale],
                    answer: item.answer[locale],
                    link: item.link && { href: item.link.href, label: item.link.label[locale] },
                  }}
                />
              ))}
            </div>
            <Link
              href="/faq"
              className="mt-6 inline-block font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
            >
              {t("seeAll", { count: faq.length })} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

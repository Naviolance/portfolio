import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { faq } from "@/data/faq";
import { whatsappLink } from "@/lib/whatsapp";
import { FaqPreview, localizeFaq } from "./FaqItem";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClass } from "@/components/ui/button";

// The homepage's featured questions, as answer previews (see FaqPreview).
export function FaqTeaser() {
  const t = useTranslations("faqTeaser");
  const tf = useTranslations("faq");
  const locale = useLocale() as Locale;
  const featured = faq.filter((item) => item.featured);

  return (
    <section id="faq" className="border-b border-line">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        <div data-reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.08]">
            {t("heading")}
          </h2>
          <p className="mt-4 text-ink-soft">{t("intro")}</p>
          <Link
            href="/faq"
            className={buttonClass({ variant: "secondary", size: "sm", className: "mt-6" })}
          >
            {tf("seeAll", { count: faq.length })} →
          </Link>
          <p className="mt-4 font-mono text-xs text-ink-soft">
            {t("unsure")}{" "}
            <a
              href={whatsappLink(tf("askGeneralMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink link-underline"
            >
              {t("ask")}
            </a>
          </p>
        </div>

        <div data-reveal className="border-b border-line">
          {featured.map((entry) => (
            <FaqPreview
              key={entry.id}
              item={localizeFaq(entry, locale)}
              anchorId={`home-${entry.id}`}
              labels={{ answer: t("answer"), details: t("more") }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

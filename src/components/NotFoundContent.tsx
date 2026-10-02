import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClass } from "@/components/ui/button";
import { RequestedPath } from "@/components/RequestedPath";

// The 404 content: a shipping label like the share cards, but every line
// talks to the visitor: what happened (address not found) and what to do
// (try these instead). Shown by app/global-not-found.tsx and, as a fallback,
// by [locale]/not-found.tsx.
const PAGES = [
  { key: "projects", href: "/#work" },
  { key: "pricing", href: "/#pricing" },
  { key: "faq", href: "/faq" },
  { key: "cv", href: "/cv" },
] as const;

// Fixed label colours (the share card's), the same in light and dark mode:
// it's a printed label, not part of the page's theme.
const navy = "#04162a";
const smallPrint = "font-mono text-[11px] tracking-[0.2em] text-[#4a5b6c]";

export async function NotFoundContent() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-5 py-14 sm:py-24 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
      <div>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
          {t("heading")}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{t("text")}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          <Link href="/" className={buttonClass({})}>
            ← {t("home")}
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "secondary" })}>
            WhatsApp ↗
          </a>
        </div>
      </div>

      {/* The label. First on phones, so the "what happened" is seen first. */}
      <div
        style={{ borderColor: navy, color: navy }}
        className="relative order-first border-4 bg-[#f3f1ea] pb-12 font-display lg:order-none lg:pb-0"
      >
        <div style={{ borderColor: navy }} className="grid grid-cols-[minmax(0,1fr)_auto] border-b-4">
          <div className="min-w-0 px-4 py-3">
            <p className={smallPrint}>{t("to")}</p>
            <p className="mt-1 break-all font-mono text-[15px] font-bold">
              <RequestedPath />
            </p>
          </div>
          <div style={{ borderColor: navy }} className="border-l-4 px-4 py-3">
            <p className={smallPrint}>{t("status")}</p>
            <p className="mt-1 font-mono text-[15px] font-bold">404</p>
          </div>
        </div>

        <div className="px-4 pt-4 pb-4">
          <p className={smallPrint}>{t("tryInstead")}</p>
          <ul className="mt-2">
            {PAGES.map(({ key, href }) => (
              <li key={key} className="border-t border-[#c9c6bb]">
                <Link
                  href={href}
                  className="group flex items-baseline justify-between gap-3 py-2.5 transition-colors hover:text-[#0070a4]"
                >
                  <span className="font-bold group-hover:underline">{t(`pages.${key}.label`)} →</span>
                  <span className="text-right text-[13px] text-[#4a5b6c]">{t(`pages.${key}.hint`)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* The stamp: on the corner on desktop, in the space below the list
            on phones so it never covers a line. */}
        <p
          aria-hidden
          className="absolute right-3 bottom-3 -rotate-6 rounded border-[3px] border-[#0070a4] bg-[#f3f1ea]/90 px-2.5 py-1 font-mono text-[13px] font-bold tracking-[0.12em] text-[#0070a4] lg:top-16 lg:-right-5 lg:bottom-auto lg:-rotate-9 lg:text-[15px]"
        >
          {t("stamp")}
        </p>
      </div>
    </div>
  );
}

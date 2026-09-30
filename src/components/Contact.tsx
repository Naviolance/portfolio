import { useTranslations } from "next-intl";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Eyebrow } from "@/components/ui/Eyebrow";

const cardLink =
  "mt-4 inline-flex min-h-11 items-center text-[15px] text-accent-ink link-underline";

// "Pick your channel": each way to reach me says what it's best for, so a
// visitor picks the right one instead of guessing. Upwork is here for
// clients abroad who want a platform's contract and payment protection.
export function Contact() {
  const t = useTranslations("contact");
  const tw = useTranslations("whatsapp");

  const external = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <section id="contact">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <div data-reveal>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] text-ink-soft">{t("intro")}</p>
          <p className="mt-2 font-mono text-xs text-ink-soft">{t("hours")}</p>
        </div>

        <ul
          data-reveal
          className="mt-10 grid grid-cols-1 hairline-grid sm:grid-cols-2 lg:grid-cols-4"
        >
          <li className="flex flex-col bg-panel p-6 shadow-[inset_0_3px_0_var(--color-accent)]">
            <Eyebrow>{t("whatsapp.kicker")}</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">{t("whatsapp.title")}</h3>
            <p className="mt-2 flex-1 text-[15px] text-ink-soft">{t("whatsapp.text")}</p>
            <p className="mt-4 font-mono text-sm text-ink">{site.whatsapp.display}</p>
            <a href={whatsappLink(tw("default"))} {...external} className={cardLink}>
              {t("whatsapp.action")} ↗
            </a>
          </li>
          <li className="flex flex-col bg-paper p-6">
            <Eyebrow>{t("email.kicker")}</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">{t("email.title")}</h3>
            <p className="mt-2 flex-1 text-[15px] text-ink-soft">{t("email.text")}</p>
            {/* <wbr>: if the address has to wrap, it breaks after the "@". */}
            <p className="mt-4 font-mono text-[13px] text-ink">
              {site.email.split("@")[0]}@<wbr />
              {site.email.split("@")[1]}
            </p>
            <a href={`mailto:${site.email}`} className={cardLink}>
              {t("email.action")} →
            </a>
          </li>
          <li className="flex flex-col bg-paper p-6">
            <Eyebrow>{t("upwork.kicker")}</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">{t("upwork.title")}</h3>
            <p className="mt-2 flex-1 text-[15px] text-ink-soft">{t("upwork.text")}</p>
            <a href={site.upwork} {...external} className={cardLink}>
              {t("upwork.action")} ↗
            </a>
          </li>
          <li className="flex flex-col bg-paper p-6">
            <Eyebrow>{t("profiles.kicker")}</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">{t("profiles.title")}</h3>
            <p className="mt-2 flex-1 text-[15px] text-ink-soft">{t("profiles.text")}</p>
            <div className="mt-4 flex gap-5">
              <a href={site.linkedin} {...external} className={cardLink.replace("mt-4 ", "")}>
                {t("profiles.linkedin")} ↗
              </a>
              <a href={site.github} {...external} className={cardLink.replace("mt-4 ", "")}>
                {t("profiles.github")} ↗
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

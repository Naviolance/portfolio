"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CONSENT_OPEN_EVENT, readConsent, saveConsent, type ConsentChoice } from "@/lib/consent";
import { buttonClass } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/Eyebrow";

// Asks once whether GA4 may run (lib/consent.ts). Accept and Refuse are the
// same size and one tap each: refusing must be as easy as accepting (EU
// rules). Shown after hydration, only to visitors who haven't chosen, so the
// server HTML is the same for everyone and nothing flashes for the rest.
// Fixed, so it never moves the page (no layout shift).
export function CookieBanner() {
  const t = useTranslations("consent");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the stored choice only exists in the browser
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
  };

  return (
    <section
      aria-label={t("label")}
      // Above the floating WhatsApp button (z-30) until the visitor chooses.
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(4,22,42,0.12)] print:hidden lg:inset-x-auto lg:bottom-6 lg:left-6 lg:max-w-md lg:border lg:pb-5"
    >
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t("text")}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose("granted")} className={buttonClass({ size: "sm" })}>
          {t("accept")}
        </button>
        <button type="button" onClick={() => choose("denied")} className={buttonClass({ size: "sm", variant: "outline" })}>
          {t("refuse")}
        </button>
      </div>
    </section>
  );
}

// The footer's "Cookie settings" link: reopens the banner to change the choice.
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className="text-left transition-colors hover:text-ink"
    >
      {label}
    </button>
  );
}

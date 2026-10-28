"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/whatsapp";
import { buttonClass } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/Eyebrow";

// "Test your site": a visitor asks for their site to be analysed and says
// where to send the report. No server and nothing stored here: the request
// opens in WhatsApp (or the visitor's e-mail program), already written, and
// the visitor sends it. Priestly runs the audit tool and sends the report back.

/** "monsite.cm" or "https://monsite.cm/": a web address with a dot in its host, else null. */
export function siteAddress(input: string): string | null {
  const text = input.trim();
  if (!text) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
    return url.hostname.includes(".") && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

type Field = "site" | "name" | "contact" | "sector" | "city";

export function TestSiteForm({ email }: { email: string }) {
  const t = useTranslations("testSite");
  const [values, setValues] = useState<Record<Field, string>>({ site: "", name: "", contact: "", sector: "", city: "" });
  const [error, setError] = useState<string | null>(null);

  // The request as the visitor will send it, in their language; empty optional lines left out.
  const request = (site: string) =>
    [
      t("message.hello"),
      "",
      `${t("message.site")} ${site}`,
      `${t("message.name")} ${values.name.trim()}`,
      ...(values.sector.trim() ? [`${t("message.sector")} ${values.sector.trim()}`] : []),
      ...(values.city.trim() ? [`${t("message.city")} ${values.city.trim()}`] : []),
      `${t("message.contact")} ${values.contact.trim()}`,
    ].join("\n");

  // Checked before anything opens; the window opens in the click itself, or
  // browsers block it.
  const send = (channel: "whatsapp" | "email") => {
    const site = siteAddress(values.site);
    const missing = !site ? "site" : !values.name.trim() ? "name" : !values.contact.trim() ? "contact" : null;
    if (missing) {
      setError(t(`errors.${missing}`));
      document.getElementById(`test-field-${missing}`)?.focus();
      return;
    }
    setError(null);
    const text = request(site!);
    if (channel === "whatsapp") window.open(whatsappLink(text), "_blank", "noopener");
    else window.location.href = `mailto:${email}?subject=${encodeURIComponent(t("message.subject"))}&body=${encodeURIComponent(text)}`;
  };

  const input = (field: Field, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="grid gap-1.5 text-sm font-medium text-ink">
      <span>
        {t(`fields.${field}.label`)}
        {props.required ? <span className="text-accent-ink"> *</span> : <span className="font-normal text-ink-soft"> {t("optional")}</span>}
      </span>
      <input
        id={`test-field-${field}`}
        value={values[field]}
        onChange={(e) => setValues((v) => ({ ...v, [field]: e.target.value }))}
        placeholder={t(`fields.${field}.placeholder`)}
        maxLength={200}
        className="min-h-12 border border-line bg-paper px-3 text-[15px] font-normal text-ink placeholder:text-ink-soft/70 focus:border-accent focus:outline-none"
        {...props}
      />
    </label>
  );

  return (
    <section id="test-site" className="mt-14 scroll-mt-24 border border-line bg-panel p-5 shadow-[inset_0_3px_0_var(--color-accent)] sm:p-7">
      <Eyebrow as="h2">{t("kicker")}</Eyebrow>
      <p className="mt-2 font-display text-2xl font-bold text-ink">{t("title")}</p>
      <p className="mt-1 font-mono text-sm text-label">{t("price")}</p>
      <p className="mt-2 text-[15.5px] text-ink-soft">{t("intro")}</p>
      <form
        noValidate
        className="mt-5 grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          send("whatsapp");
        }}
      >
        <div className="sm:col-span-2">{input("site", { required: true, inputMode: "url", autoComplete: "url" })}</div>
        {input("name", { required: true, autoComplete: "name" })}
        {input("contact", { required: true })}
        {input("sector")}
        {input("city", { autoComplete: "address-level2" })}
        <p role="alert" aria-live="polite" className="text-sm font-medium text-accent-ink sm:col-span-2 empty:hidden">
          {error}
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button type="submit" className={buttonClass()}>
            {t("sendWhatsapp")} ↗
          </button>
          <button type="button" onClick={() => send("email")} className={buttonClass({ variant: "secondary" })}>
            {t("sendEmail")}
          </button>
        </div>
        <p className="text-[13px] text-ink-soft sm:col-span-2">{t("note")}</p>
      </form>
    </section>
  );
}

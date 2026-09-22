import { site } from "@/data/site";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "WhatsApp", value: site.whatsapp.display, href: site.whatsapp.href },
  { label: "LinkedIn", value: "forsangam-weyegho-junior-priestly", href: site.linkedin },
  { label: "GitHub", value: "Naviolance", href: site.github },
];

export function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <h2 className="font-display text-2xl font-bold text-ink">Contact</h2>
          <div className="max-w-2xl">
            <p className="text-ink-soft">
              Tell me what you&apos;re building and what it needs to do.
              I&apos;ll reply directly — no forms, no gatekeeping.
            </p>
            <div className="mt-8 divide-y divide-line border-t border-line">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.label === "Email" ? undefined : "_blank"}
                  rel={
                    channel.label === "Email"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group flex items-center justify-between gap-4 py-4 first:pt-0"
                >
                  <span className="font-mono text-xs text-steel">
                    {channel.label}
                  </span>
                  <span className="text-ink group-hover:text-rust-ink">
                    {channel.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

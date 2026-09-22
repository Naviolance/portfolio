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
              Tell me what you want to build and what it needs to do.
              I&apos;ll get back to you myself.
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
                  className="group flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="font-mono text-xs text-steel">
                    {channel.label}
                  </span>
                  <span className="min-w-0 text-ink group-hover:text-rust-ink [overflow-wrap:anywhere]">
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

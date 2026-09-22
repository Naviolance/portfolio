import { pricing, priceLabel } from "@/data/pricing";
import { whatsappLink } from "@/lib/whatsapp";

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Pricing</h2>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              Prices in FCFA. Dollar amounts are approximate.
            </p>
          </div>

          <div className="max-w-2xl space-y-12">
            {pricing.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-label">
                  {group.title}
                </h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {group.tiers.map((tier) => {
                    const price = priceLabel(tier.fcfa);
                    return (
                      <li
                        key={tier.name}
                        className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:gap-8"
                      >
                        <div>
                          <p className="text-lg font-semibold text-ink">{tier.name}</p>
                          <p className="mt-1 text-ink-soft">{tier.description}</p>
                        </div>
                        <div className="sm:text-right">
                          <p className="whitespace-nowrap font-display text-lg font-bold text-ink">
                            {price.fcfa}
                          </p>
                          <p className="whitespace-nowrap text-sm text-ink-soft">
                            {price.usd}
                            <span className="ml-2 font-mono text-[11px] uppercase text-label">
                              {tier.period}
                            </span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <p className="text-ink-soft">
              Every project is different, so these are ranges. Need a business
              website or a web app instead? Tell me what it needs to do and
              I&apos;ll give you an exact quote.{" "}
              <a
                href={whatsappLink(
                  "Hi Priestly, I saw your prices and I'd like a quote for my project."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-accent-ink hover:decoration-accent"
              >
                Get a quote on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

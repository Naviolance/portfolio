// Kept separate from data/site.ts so client components can import it
// (site.ts reads server-only env vars for the site URL).
export const WHATSAPP_NUMBER = "237678369216";
export const WHATSAPP_DISPLAY = "+237 678 369 216";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Priestly, I saw your portfolio and I'd like to talk about a project.";

// Click-to-chat link with the message already typed in, so people don't
// face an empty chat and have to work out what to say.
export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

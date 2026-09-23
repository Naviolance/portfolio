# Portfolio: JPFW Web Services

My portfolio and business site, in English and French. It shows the projects I've built, what I
can do for clients, my prices, answers to common questions, my CV, and how to reach me.

**Live:** https://jpfw-webservices.vercel.app

## What's on it

- **Projects** (TruckParts, Car Rental), each with a case study page and a screenshot viewer
  (swipe, pinch and double-tap zoom)
- **About, Experience** (from my CV) and **Services**
- **Pricing** in FCFA, with approximate US dollar amounts
- **FAQ** page with search, topic filters and shareable links to each answer
- **Downloadable CV** (PDF)
- **WhatsApp button** with a message already typed, which names the page the visitor came from
- **English and French**, each at its own URL (`/en/...`, `/fr/...`)

## Stack

- **Next.js 16** (App Router) + **TypeScript**, every page pre-rendered as static HTML
- **next-intl** for English/French routing and text
- **Tailwind CSS v4**, colors taken from the JPFW Web Services logo
- **Sora** (headings) + **DM Sans** (body), self-hosted with `next/font`
- **yet-another-react-lightbox** for the screenshot viewer, loaded only when opened
- **Vercel Web Analytics** for visit counts (no cookies, no consent banner)
- Hosted on **Vercel**

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. It redirects to `/en` or `/fr` depending on your browser
language.

## How the two languages work

- Every page exists once in the code, under `src/app/[locale]/`, and is served at `/en/...` and
  `/fr/...`. `src/proxy.ts` sends `/` to the visitor's language (English if it isn't French).
- **Short interface text** (menu, buttons, headings) is in `messages/en.json` and
  `messages/fr.json`.
- **Longer content** (projects, services, prices, FAQ, CV) is in `src/data/`, with both languages
  side by side: `{ en: "...", fr: "..." }`. TypeScript won't build if one is missing.
- Every page has canonical and `hreflang` tags, and the sitemap lists both languages, so search
  engines show each visitor the right version.

## Where things are

| Path | What's in it |
|---|---|
| `src/data/projects.ts` | Projects and their case studies |
| `src/data/pricing.ts` | Prices (stored in FCFA; the dollar rate is one constant) |
| `src/data/faq.ts` | FAQ questions and answers |
| `src/data/cv.ts` | Experience, education and skills (keep in step with the CV) |
| `src/data/services.ts`, `src/data/site.ts` | Services, name, title, contact details |
| `messages/` | Interface text, English and French |
| `src/components/` | Page sections (Hero, Work, About, Experience, Services, Pricing, FAQ, Contact) |
| `src/assets/screenshots/` | Project screenshots (imported, so they get hashed names and blur placeholders) |
| `public/cv/` | The CV PDF |
| `cv/cv-2026.html` | Source of the CV PDF, with the command to regenerate it |
| `public/brand/` | Logo files |

**To add a project:** add an entry to `src/data/projects.ts`, put its screenshots in
`src/assets/screenshots/<slug>/` and import them there.

**To add a FAQ question:** add an entry to `src/data/faq.ts` in both languages. It appears on
both FAQ pages automatically. `featured: true` also shows it on the homepage (keep that to 4).

**To change a price:** edit `src/data/pricing.ts`, and update the FAQ answers that mention it
(listed at the top of that file).

## Tracked links

Share the site with `?ref=` at the end to see if a specific person opened it:

```
https://jpfw-webservices.vercel.app/?ref=acme-corp
```

The visit shows up in Vercel Analytics under **Pages** as `/ref/acme-corp/en` (or `/fr`). Only
the first page is tagged, and nothing is stored in the visitor's browser. If they then message
you on WhatsApp, the message ends with `(ref: acme-corp)`.

## Environment variables

None are needed on Vercel. The site URL comes from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`.
Set `SITE_URL` only when a custom domain is added.

## License

© 2026 Forsangam Weyegho Junior Priestly (JPFW Web Services). All rights reserved.

This code is public so clients and employers can review my work. It is **not open source**: you
may not copy, deploy, modify or sell it without my written permission. See [LICENSE](LICENSE).

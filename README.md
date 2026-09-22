# Portfolio

My personal portfolio site. It shows the projects I've built, what I can do for clients, and how to reach me.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**, brand colors from the JPFW Web Services logo
- **Sora** (headings) + **DM Sans** (body), self-hosted with `next/font`
- **yet-another-react-lightbox** for the screenshot viewer (swipe, pinch and double-tap zoom)
- **Vercel Web Analytics** for visit counts (no cookies, no consent banner)
- Hosted on **Vercel**

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things are

| Path | What's in it |
|---|---|
| `src/data/` | All the content: projects, services, contact details |
| `src/components/` | The page sections (Hero, Work, About, Services, Contact) |
| `src/app/projects/[slug]/` | One page per project |
| `src/assets/screenshots/` | Project screenshots (imported, so they get hashed file names and blur placeholders) |
| `public/brand/` | Logo files |

To add a project, add an entry to `src/data/projects.ts` and put its screenshots in `src/assets/screenshots/<slug>/` and import them there.

## Tracked links

Share the site with `?ref=` at the end to see if a specific person opened it:

```
https://<site>/?ref=acme-corp
```

The visit shows up in Vercel Analytics under **Pages** as `/ref/acme-corp`. Only the first page is tagged, and nothing is stored in the visitor's browser.

## Environment variables

None are needed on Vercel. The site URL comes from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. Set `SITE_URL` only when a custom domain is added.

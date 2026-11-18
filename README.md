# AI, Data and Martech Consultant

Mobile-first consulting website built with Astro, React islands, Tailwind CSS v4 and the Cloudflare Workers adapter. Public pages are prerendered for speed. React is used only for the theme toggle; the homepage motion uses CSS and a small IntersectionObserver script.

## Run locally

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env` and set `PUBLIC_SITE_URL`, `PUBLIC_CONTACT_EMAIL` and `PUBLIC_BOOKING_URL` before publishing. The contact form prepares an email draft and does not store submissions. Connect a form service or a Worker endpoint if server-side submissions are needed.

## Deploy

The project is configured for Astro SSR on Cloudflare Workers. Build with `npm run build`; preview the output locally with `npm run preview`. Set the site URL and public contact/booking values as build environment variables in Cloudflare.

## Routes

- `/` homepage
- `/services` and `/services/[slug]`
- `/who-i-help`, `/work`, `/insights`, `/about`, `/contact`
- `/privacy`, `/thank-you`, `/robots.txt`, `/sitemap.xml`

No Next.js app area was added because the brief describes it as optional for a separate app-style feature. The public consulting site follows the Astro-first architecture.

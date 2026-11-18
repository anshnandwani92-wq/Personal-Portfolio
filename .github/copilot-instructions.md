# Copilot instructions: AI, Data and Martech Consultant website

Save this file as `.github/copilot-instructions.md` in the repository root. GitHub Copilot in VS Code reads it automatically and applies it to every chat and code suggestion in this repo. Keep it up to date as decisions change.

---

## 1. What we are building

A lead-generation website for an independent consultant. The site label is **"AI, Data and Martech Consultant"** (use it in the header, page titles and meta descriptions).

**Goal:** turn visitors into booked calls and audit requests.

**Target visitors (in priority order):**
1. Ad agencies (media, performance, multicultural)
2. Ad-tech companies and publishers
3. Businesses running Google Ads and Meta Ads
4. Mid-size brands planning digital or AI transformation

**Positioning line (editable):** AI-native martech and data consulting for agencies, ad-tech teams and growing businesses, from a leader who has built the data products, AI agents and websites behind the results.

**Expected traffic:** under 5K visitors per month. Free tiers are enough; do not add paid services without asking.

---

## 2. Content and brand rules (strict)

### 2.1 Anonymise every client and employer
- Never write real client or employer names, logos, product names, league names or proprietary ID names anywhere: code, content, comments, seed data, alt text, file names, commit messages.
- Use descriptors instead:
  - "a major Canadian bank"
  - "a national sports and media company"
  - "a national restaurant brand"
  - "a global agency network" / "a Toronto multicultural agency"
  - "a leading automotive brand"
  - "a cross-channel planning and measurement product"
  - "an in-house identity graph and proprietary ID"
- A client may be named only when the owner adds `permissionToName: true` to the case study in the CMS. Default is `false`.
- Vendor and platform names (Salesforce, Google Ads, Meta, Adobe, AWS, Databricks, Snowflake, Sanity, Tailwind) are fine because they describe tools, not clients.

### 2.2 Approved proof points (use only these numbers)
- CAD $30M first-year revenue from a cross-channel planning and measurement product.
- 120%+ fill-rate lift from custom pacing curves built with Google and ad-serving partners.
- Do not invent statistics, testimonials, logos, client counts or awards. If a number is missing, leave a clearly marked placeholder: `TODO(content): add metric`.

### 2.3 Four service lanes
1. **AI and automation strategy:** readiness assessment, use-case roadmap, proof of concept, agentic AI and workflow automation.
2. **Salesforce, Data Cloud and CRM:** Salesforce Data Cloud and CDP design, unified customer view, Service Cloud and Financial Services Cloud (CRM), integrations across channels and systems, identity and first-party audiences, attribution and media mix modelling.
3. **Paid media performance:** Google Ads and Meta Ads audits, in-language search and social, conversion tracking, SEO, reporting dashboards.
4. **Owned channels, web and personalization:** email, SMS and web personalization journeys run end to end (strategy, build, testing, reporting), next-best-offer and journey orchestration, conversion-focused sites and landing pages built in React and Next.js, web performance.

### 2.3.1 Tone
Plain, specific, numbers first. No buzzwords ("synergy", "cutting-edge", "revolutionary", "leverage"). Short sentences. Active voice.

### 2.4 Every page ends in one action
Primary call to action: **Book a call**. Secondary: **See my work** or **Request a free audit**. One primary call to action per screen.

---

## 3. Tech stack

| Concern | Choice |
| --- | --- |
| Primary framework | **Astro** (content-led pages, minimal JavaScript, React islands for interactivity) |
| Secondary framework | **Next.js**, only for app-style features such as a client portal. Do not mix both frameworks in the same page tree. *(Decision pending: if the owner picks Next.js as primary, update this section.)* |
| Interactive UI | React components inside Astro islands (`client:visible` or `client:idle`, never `client:load` unless required) |
| Styling | **Tailwind CSS** plus custom `@keyframes` |
| CMS | **Sanity** (Free plan), query through the CDN endpoint |
| Rendering | **Server-side rendering** with per-page prerendering for stable pages |
| Hosting | **Cloudflare Workers** (Astro uses the `@astrojs/cloudflare` adapter; Next.js, if used, runs via Cloudflare's vinext, currently beta, with OpenNext as fallback) |
| Language | TypeScript, strict mode |
| Forms | A free form service or a Worker endpoint; no custom backend servers |
| Booking | Embedded or linked Cal.com or Calendly |
| Analytics | Privacy-friendly or GA4; track conversion events listed in section 11 |

**Free-tier limits to respect** (verified Nov 2026):
- Sanity Free: 10k documents, 250k API requests, 1M CDN requests, 100GB bandwidth per month.
- Cloudflare Workers Free: 100,000 requests per day, **10 ms CPU time per request**, 50 subrequests per invocation. Keep server-rendered pages light, cache CMS responses, and prerender anything that rarely changes.

---

## 4. Suggested repository structure

```
.
├── .github/copilot-instructions.md
├── astro.config.mjs
├── tailwind config / global styles
├── sanity/                  # Sanity Studio project and schemas
│   └── schemas/
├── src/
│   ├── components/
│   │   ├── ui/              # Button, Card, Tag, ThemeToggle, Skeleton
│   │   ├── sections/        # Hero, ProofTiles, ServiceGrid, CaseStudyCard, Cta
│   │   └── motion/          # Reveal, CountUp, HeroGraph
│   ├── layouts/
│   ├── lib/                 # sanity client, queries, haptics, seo helpers
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services/
│   │   ├── who-i-help/
│   │   ├── work/
│   │   ├── insights/
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── thank-you.astro
│   └── styles/global.css    # theme tokens and @keyframes
└── public/
```

---

## 5. Pages and routes

| Route | Purpose |
| --- | --- |
| `/` | Hero, trust strip, three audience cards, four service cards, proof tiles, featured case study, "How I work" (Audit, Pilot, Scale), About snippet, closing call to action |
| `/services` and `/services/[slug]` | Hub plus one page per lane. Each page: promise, who it is for, deliverables, process, tools, one case study, FAQ, call to action. The Salesforce lane also has a spotlight section: platform stack (Data Cloud, Service Cloud, Financial Services Cloud), integration map, journey examples by channel (email, SMS, web) |
| `/who-i-help` and `/who-i-help/[slug]` | Landing pages: `agencies`, `ad-tech`, `businesses`. Each names one featured case study and one offer |
| `/work` and `/work/[slug]` | Filterable case-study grid (by service and audience). Cards show the result number first |
| `/insights` and `/insights/[slug]` | Articles. Categories: AI for marketing; Measurement and attribution; Identity and first-party data; Salesforce and CRM; Owned-channel journeys; Google and Meta Ads; Web and personalization |
| `/about` | First-person story, credentials, approach, photo, LinkedIn link |
| `/contact` | Booking link first, then a short form (name, email, company, need by service, budget range, message). Promise a response time |
| `/thank-you` | Confirms the submission and offers the free audit checklist |

**Navigation:** Services, Who I help, Work, Insights, About, plus a persistent **Book a call** button. Sticky header. Footer: LinkedIn, certifications, email, privacy.

**No dead ends:** every service page links to one case study, one insight and the contact page.

---

## 6. Content model (Sanity schemas)

Build these nine document types. Use references between them instead of duplicating content. Add `slug`, `title`, `seoTitle`, `seoDescription` where relevant.

| Type | Fields |
| --- | --- |
| `service` | name, slug, lane (enum of the four lanes), promise (one line), problem, deliverables (array), processSteps (array), platforms (array of strings), engagementType (audit, pilot, retainer), faq (refs), cta, caseStudies (refs), audiences (refs), insights (refs) |
| `audiencePage` | name, slug, headline, topThreePains (array of 3), recommendedServices (refs), featuredCaseStudy (ref), objections, offer (ref) |
| `caseStudy` | title, slug, clientLabel (anonymised), industry, challenge, approach (array), tools (array), results (array of `{metric, value}`; at least one required), timeframe, myRole, confidential (boolean, default true), permissionToName (boolean, default false), image, services (refs), audiences (refs), testimonial (ref) |
| `insight` | title, slug, summary, category, body (portable text), publishDate, readingTime, relatedService (ref), cta |
| `testimonial` | quote, name, role, company, permissionToPublish (boolean), photo, caseStudy (ref) |
| `credential` | name, issuer, year, logo, verificationUrl |
| `offer` | name, promise, formFields, deliveryMethod, thankYouCopy (lead magnets: Google and Meta Ads audit checklist, AI readiness checklist, Salesforce Data Cloud readiness checklist) |
| `faq` | question, answer, topic, related services and audiences (refs) |
| `siteSettings` (singleton) | navigation, footerLinks, defaultCta, socialLinks, contactEmail, bookingUrl |

**Validation rules:**
- `caseStudy.results` needs at least one item with a number.
- Any text field in `caseStudy` that matches a known client name must fail validation (maintain a deny-list in `sanity/lib/denylist.ts`).
- `testimonial` renders only when `permissionToPublish` is true.

**Case study template (render in this order):**
1. One-line result headline with the number.
2. Context and challenge (three sentences).
3. What I did (three to five bullets).
4. Tools and platforms used.
5. Results (two to four metrics).
6. "What a client like you would get" and the call to action.

---

## 7. Design system

**Direction:** minimalist, technical, future-ready. One accent colour, generous whitespace, at most two typefaces, short copy blocks.

### 7.1 Tailwind
- Define colours, spacing, radii and fonts as **theme tokens**. Do not hard-code hex values in components.
- Use semantic token names (`bg-surface`, `text-muted`, `border-subtle`, `accent`) so light and dark themes swap through CSS variables.
- Prefer utility classes in markup; extract a component, not a custom CSS class, when a pattern repeats.

### 7.2 Dark mode
- Follow the visitor's system setting by default (`prefers-color-scheme`), with a header toggle that overrides it.
- Remember the choice in `localStorage`; wrap every read and write in `try/catch`.
- Apply the theme with a tiny inline script in `<head>` before first paint to avoid a flash.
- Design light and dark together; check text contrast in both themes (WCAG AA: 4.5:1 for body text).

### 7.3 Intuitive layout rules
- One primary call to action per screen; sticky header with **Book a call**.
- Tap targets at least 44 x 44 px. Visible keyboard focus on every interactive element.
- No more than three clicks from any page to proof of results.
- Body text at least 16 px; line length 60 to 75 characters.

---

## 8. Motion and animation

Animation should showcase technology and future-ready services without hurting speed. It is a decorative layer on top of content that already loads quickly.

### 8.1 Homepage hero
- A quiet animated line graph linking four nodes labelled **Data, AI, Media, Growth** (mirrors the service lanes). Draw it as **inline SVG** animated with CSS `@keyframes`. No video, no WebGL, no heavy animation library.
- The `<h1>`, subhead and buttons are plain server-rendered text and must be the largest contentful element. They paint first. The graph starts afterwards and never blocks them.
- Ambient motion only: slow line draw, soft node pulse, faint gradient drift.

### 8.2 As content loads
- Staggered **fade-up** as each section enters the viewport (use `IntersectionObserver`, no scroll-listener loops).
- **Count-up** on proof numbers when they scroll into view.
- **Skeleton shimmer** placeholders for the Work and Insights lists while data streams in.
- Keep transitions roughly 300 to 600 ms. Animate **only `transform` and `opacity`**.

### 8.3 Keyframe names (define once in `global.css`, expose as Tailwind utilities)
`fade-up`, `draw-line`, `node-pulse`, `gradient-drift`, `shimmer`, `marquee`

### 8.4 Reduced motion (mandatory)
Wrap decorative motion in Tailwind's `motion-safe:` variant and add a global fallback:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

When motion is reduced, show the final state (full graph, visible content, final numbers).

### 8.5 Vibration (haptic) feedback
Use the Vibration API for very short pulses (10 to 20 ms) at only a few moments: tapping **Book a call**, a successful form submit, and the dark mode toggle.

```ts
// src/lib/haptics.ts
export function haptic(ms = 15): void {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  navigator.vibrate(ms);
}
```

- As far as we know it works on Android Chrome but not on iPhone Safari. Treat it as a bonus: feature-detect, never depend on it, never block an action on it.
- Maximum three or four moments across the site.

---

## 9. Performance budget

The site must be fast and load well on every device type.

- **Core Web Vitals (mobile) in Google's "good" range:** largest contentful paint under 2.5 s, interaction delay (INP) under 200 ms, cumulative layout shift under 0.1.
- **JavaScript:** ship as little as possible. Astro pages are static HTML by default; hydrate only interactive islands. Do not add an animation library if CSS can do the job. Ask before adding any dependency larger than 20 KB gzipped.
- **Images:** AVIF or WebP, responsive `srcset` and `sizes`, lazy-load below the fold, always set `width` and `height`. The hero image or graph must not be lazy-loaded.
- **Fonts:** self-host one or two families, subset them, `font-display: swap`, preload only the primary weight.
- **Layout stability:** reserve space for images, embeds and skeletons.
- **Caching:** cache CMS responses and set cache headers; use Sanity's CDN endpoint (`useCdn: true`) for published content.
- **Rendering split:**
  - Prerender stable pages (Home, About, Services, individual service pages).
  - Server-render only what changes: Work filters, Insights, form handling, personalization.
  - Keep each server-rendered request well under the 10 ms CPU limit: no heavy parsing, no large loops, no big JSON transforms in request handlers.

**Device coverage:** design mobile first, then tablet and desktop. Test on iPhone Safari, Android Chrome, iPad, and desktop Chrome, Safari, Firefox and Edge. Run Lighthouse with a mid-range Android profile before every release.

Everything must work without animation, vibration or heavy JavaScript. They only enhance the experience.

---

## 10. Accessibility and SEO

- Semantic HTML: one `<h1>` per page, ordered headings, landmarks (`header`, `nav`, `main`, `footer`).
- All images need meaningful `alt` text (empty `alt=""` for decorative graphics). The hero graph is `role="img"` with an `aria-label`.
- Keyboard accessible: skip link, focus order, no focus traps. Modals and menus close with Escape.
- One primary keyword per page, used in title, first heading and URL. Unique `<title>` (under 60 characters) and meta description (under 160) per page.
- Add Open Graph tags, canonical URLs, `sitemap.xml`, `robots.txt` and JSON-LD (`Person` or `ProfessionalService`, `Article` for insights).

---

## 11. Analytics and conversions

Track exactly these events:
1. `book_call_click`
2. `contact_form_submit`
3. `lead_magnet_download`

Do not add trackers that need a cookie banner without asking first.

---

## 12. Coding conventions

- TypeScript strict; no `any` unless justified in a comment.
- Small, single-purpose components; props typed with interfaces.
- Name files in `kebab-case`, components in `PascalCase`, functions in `camelCase`.
- Put all GROQ queries in `src/lib/queries.ts` and type the results.
- Secrets live in environment variables (`SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, and a read token only if a dataset is private). Never commit secrets and never expose tokens to client code.
- Every component that animates must degrade gracefully with reduced motion and with JavaScript disabled.
- Write short comments that explain **why**, not what.
- Add a unit or component test for any logic in `src/lib` (haptics, query helpers, SEO helpers).

---

## 13. Definition of done (check before suggesting a change is complete)

- [ ] No real client or employer names appear anywhere.
- [ ] Uses theme tokens; works in light and dark mode.
- [ ] Respects `prefers-reduced-motion`.
- [ ] Animates only `transform` and `opacity`.
- [ ] No layout shift; images have dimensions.
- [ ] Interactive elements are keyboard accessible with visible focus.
- [ ] No new heavy dependency added without approval.
- [ ] One primary call to action on the screen.
- [ ] Lighthouse mobile performance and accessibility scores are green on the changed page.

---

## 14. Do not

- Do not invent metrics, testimonials, logos or client names.
- Do not add stock-photo hero images or autoplay video.
- Do not use `client:load` on Astro islands by default.
- Do not use inline hex colours, pixel-based layout hacks or `!important` (except the reduced-motion rule above).
- Do not add a cookie banner, chat widget or popup without asking.
- Do not use more than two typefaces or more than one accent colour.
- Do not trigger vibration on page load or on scroll.

---

## 15. Open decisions (update this file when resolved)

1. Astro as the only framework, or Astro plus Next.js for an app area? (Default above: Astro primary.)
2. Final site label (currently "AI, Data and Martech Consultant").
3. Pricing model to show on service pages (fixed audit, retainer, day rate).
4. Selling under a personal name or a business name; target markets (Toronto, Canada, US).
5. Whether Insights is a full blog or a few cornerstone articles.
6. Employer rules on outside client work and on describing past results, even when anonymised.

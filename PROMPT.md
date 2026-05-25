# SEO Improvement Prompt — CTL Website

Context: An admin contact at CTL reported the site does not appear in general
searches like "Lincoln County schools," "schools in my area," "elementary
schools," "Maine independent schools," "Maine private schools." A quick
assessment turned up an indexing-level problem (not a ranking problem) plus
several missing SEO fundamentals. The admin has authorized the work below.
Production site: https://c-t-l.org

Please work through the following tiers in order. Confirm with the user before
moving from one tier to the next, and surface anything ambiguous before
guessing. Do not push or open PRs unless asked.

---

## Tier 1 — Quick wins (highest impact, do first)

1. **Fix the broken `siteUrl`.** `gatsby-config.js` still has the Gatsby
   starter placeholder `https://www.yourdomain.tld`. As a result the live
   sitemap (`/sitemap-index.xml` and `/sitemap-0.xml`) lists every URL under
   `https://www.yourdomain.tld/...`, which doesn't exist — so Google's sitemap
   crawl is entirely dead. Change it to `https://c-t-l.org`. After deploy,
   verify the sitemap renders real URLs.

2. **Add a reusable SEO component.** `react-helmet` is already wired up
   (`gatsby-plugin-react-helmet` is in `gatsby-config.js`). Create
   `src/components/SEO.js` that accepts `title`, `description`, `image`, and
   `pathname` props and emits:
   - `<title>` (keyword-rich — see #3)
   - `<meta name="description">`
   - `<link rel="canonical">`
   - Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
   - Twitter card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
   - `<html lang="en">` (via Helmet's `htmlAttributes`)

   Wire it into every page template that currently renders a bare `<Helmet><title>` —
   list in `src/pages/index.js`, `src/pages/contact.js`, `src/pages/404.js`,
   and all the `{MarkdownRemark.frontmatter__path}.js` / `__slug.js` templates
   under `src/pages/**`. Source `description` from a new optional frontmatter
   field (`description`) on each markdown file, with a sensible fallback.

3. **Rewrite page titles to be keyword-rich.** Current titles read "CTL -
   Home", "CTL - About", etc. None mention Maine, the town, or "independent
   school." Switch to a pattern like:
   - Home: `Center for Teaching & Learning — Independent School in Edgecomb, Maine`
   - Subpages: `{Page Title} | Center for Teaching & Learning — Edgecomb, Maine`
   Confirm the town/wording with the user before applying broadly.

4. **Give the homepage real, indexable text.** Currently `src/markdown/pages/home/`
   renders essentially one Cloudinary `<img>` with no `alt`. Add:
   - A real `<h1>`-level intro paragraph describing the school (who, where, ages served, mission).
   - An `alt` attribute on the hero image.
   - 2–3 short paragraphs of crawlable text below it.
   Coordinate copy with the admin contact.

After Tier 1 ships, **resubmit the sitemap in Google Search Console** and
request re-indexing of the homepage. (User action — provide instructions.)

---

## Tier 2 — Local SEO (the queries the admin actually cares about)

5. **Add `School` JSON-LD structured data** to the site, ideally injected from
   the layout or a dedicated component so it appears on every page. Include:
   - `@type: "School"` (subtype of `EducationalOrganization`)
   - `name`, `url`, `logo`, `image`
   - `address` (PostalAddress with streetAddress, addressLocality, addressRegion: "ME", postalCode, addressCountry: "US")
   - `geo` (latitude/longitude)
   - `telephone`, `email`
   - `sameAs` (Facebook, Instagram, etc., if applicable)
   - Grades / age range served (use `audience` or description)

   Pull the address, phone, geo-coords from the user — do not invent them.

6. **Google Business Profile** (user action — write instructions, do not
   attempt programmatically). This is what wins "schools near me" map-pack
   results and is independent of the website. Steps to document:
   - Create / claim at https://business.google.com
   - Category: "Private school" or "Independent school" (pick the closest)
   - Address, hours, phone, website, photos
   - Verify (postcard / phone)

7. **Make NAP (Name / Address / Phone) crawlable in real text** on the Contact
   page and in the Footer. Search engines correlate the NAP on-site with the
   NAP in Google Business Profile and other directories — consistency matters.
   Check `src/components/Footer.js` and the Contact page markdown.

---

## Tier 3 — AI chatbot discoverability

8. **Revisit `static/robots.txt`.** It currently `Disallow: /`s every AI
   crawler — including ones that power *search/answers* (not just training).
   Confirm intent with the user, then split the policy:

   - **Keep blocked** (pure training crawlers): `GPTBot`, `CCBot`,
     `Google-Extended`, `anthropic-ai`, `Bytespider`, `Applebot-Extended`,
     `cohere-ai`, `Diffbot`, `FacebookBot`, `Amazonbot`, `PetalBot`.
   - **Allow** (so the site can appear in AI-generated answers):
     `ChatGPT-User`, `OAI-SearchBot`, `PerplexityBot`, `Claude-Web` (or
     whatever Anthropic's current search bot is named — verify), and any
     Bing/Copilot search bot.

   The distinction is "is this bot fetching the page to *answer a user's
   question right now*" (allow) vs "is it scraping for model training"
   (user's call). Present the choice; do not assume.

---

## Out-of-scope / user actions to document at the end

- Submit updated sitemap in Google Search Console.
- Submit to Bing Webmaster Tools.
- Create / claim Google Business Profile.
- Add the school to relevant Maine independent-school directories
  (Maine Association of Independent Schools, NAIS, niche.com, etc.) — these
  are high-value backlinks and citation sources.

---

## Notes for the next session

- The site is Gatsby 5 + react-helmet + styled-components. CMS is Decap,
  content lives in `src/markdown/`.
- Page templates that need SEO wiring are listed under `src/pages/`.
- `gatsby-plugin-sitemap` is already installed; no new plugins needed for
  Tier 1. For JSON-LD in Tier 2, plain Helmet `<script type="application/ld+json">`
  is fine — no extra plugin required.
- See `CLAUDE.md` for routing architecture details (especially the dual
  `{frontmatter__path}` / `{frontmatter__slug}` templates and the special
  `/contact` two-tier setup) before editing templates.

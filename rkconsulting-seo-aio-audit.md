# RK Consulting — SEO & AI Engine Optimisation (AIO/GEO) Audit and Growth Plan

**Site:** https://www.rkconsulting.co.nz · **Repo:** `rkconsultingnz/rkconsultingnz.github.io` · **Stack:** GitHub Pages, legacy Jekyll build (`github-pages` gem, `jekyll-sitemap`, `jekyll-redirect-from`)
**Audit date:** 8 October 2026 · **Baseline commit:** `daaabc0` (after the "Phase 1" refactor: clean URLs, static nav, canonical fix, robots.txt and sitemap)

> **How this audit was done.** Every source file in the repo was read: 8 pages, 5 includes, the layout, robots.txt, ai.txt, llms.txt, the CSS and the JS. Jekyll's output was worked out from the templates.
> The live domain could **not** be fetched from the audit sandbox, because its network proxy blocks outside hosts. So the live checks in §2.3 are a checklist for you to run with `bash verify.sh` and in Search Console / Bing Webmaster Tools.
> A web search for `site:rkconsulting.co.nz` and for the brand plus its services returned **no pages from your domain**. The results showed other "RK Consulting" businesses instead: a Dutch Power BI freelancer, a US firm and NZ engineering firms. That search engine is not Google, so treat this as a warning sign, not proof. Still, the most likely state is that **the brand is not yet a recognised entity in search indexes**, and the plan below is ordered with that in mind.

Placeholders in `{{DOUBLE_BRACES}}` mean you need to supply a real value. Never publish invented numbers, clients or reviews. AI engines and Google both penalise claims they cannot back up.

---

## 0. Executive summary

| Area | Status | Most important finding |
|---|---|---|
| Crawlability | 🟢 Good | Phase 1 fixed the big problems: navigation is in the server HTML, canonicals come from the permalink, robots.txt welcomes AI bots, and there is an llms.txt. |
| Entity / brand recognition | 🔴 Critical | The site **never names a person**. There is no About page, no `sameAs` links, no founder, no street address or Google Business Profile reference, and the brand name clashes with several other "RK Consulting" firms. LLMs cannot tell *which* RK Consulting you are, so they won't recommend you. |
| Local targeting | 🔴 Critical | "Auckland" appears **only** in a hero badge, the footer and the schema. **No title, meta description or H1 mentions Auckland or NZ.** The contact page even says "working with clients worldwide". |
| Proof / authority | 🔴 Critical | No case studies, no client names or metrics, no testimonials. There is an empty `<p>` under "Proven AI Experience", and a broken sentence on the homepage ("spanning multiple industries including —"). |
| Structured data | 🟠 Partial | One `ProfessionalService` block on the homepage only. No `@id`, `sameAs`, `founder`, `Service`, `BreadcrumbList`, `WebSite` or `FAQPage`. |
| Semantic HTML | 🟠 Partial | No `<main>` landmark. Headings jump from H2 to H4 on every service page. Homepage service names are `<div>`s, not headings. |
| Sitemap | 🟠 Bug | The front-matter key is `last_modified`, but `jekyll-sitemap` only reads `last_modified_at`, so **no `<lastmod>` is emitted**. |
| Performance / caching | 🟡 OK | Fonts load through a chained CSS `@import` (render-blocking). A 73 KB PNG logo is used as the nav logo, favicon *and* og:image. GitHub Pages fixes `Cache-Control: max-age=600`, so cache-busting has to happen through filenames. |
| Content depth | 🔴 Gap | 6 thin service pages of about 400–600 words each, mostly adjectives ("beautiful", "seamless", "captivating"). No pricing, timelines, process, FAQ, comparisons or long-tail articles. |

**What it comes down to:** the technical layer is about 70% done. What stops an AI engine from recommending you is (1) **entity clarity**: who you are, where you are, who vouches for you; (2) **verifiable proof**: case studies with numbers; and (3) **answer-shaped content** that matches the questions buyers ask LLMs. Fix those three and the schema work below amplifies them. Schema without them does almost nothing.

---

## 1. AI Engine Optimisation (AIO) & LLM Readability Audit

### 1.1 How AI engines actually choose who to recommend

| Engine | Where it retrieves from | What this means for you |
|---|---|---|
| ChatGPT Search | Mostly the **Bing** index, plus OAI-SearchBot | If you are not in Bing, ChatGPT can't cite you. **Bing Webmaster Tools + IndexNow are mandatory.** |
| Gemini / Google AI Overviews / AI Mode | The **Google** index, Knowledge Graph and **Google Business Profile** | You need GSC, a GBP listing, consistent NAP (name, address, phone) and entity schema. |
| Perplexity | Its own crawler (PerplexityBot) plus Bing/Google signals; leans heavily on third-party listings (Clutch, directories, Reddit) | Corroboration from other sites matters as much as your own. |
| Claude (web search) | A third-party search index plus Claude-SearchBot / Claude-User fetches | Clean HTML, fact-dense pages and llms.txt help. |
| Microsoft Copilot | The Bing index | Same as ChatGPT. |

For a prompt like *"best AI and Airtable automation consultant in Auckland"*, an engine runs a few searches ("Airtable consultant Auckland", "Airtable expert NZ", "AI automation consultancy Auckland"). It pulls the top 10–30 results and **cites the pages that state the answer most directly**, preferring entities it can see corroborated somewhere else. You therefore need: (a) to rank or appear for those sub-queries, (b) pages that literally contain "Airtable consultant in Auckland" as a fact-bearing statement, and (c) other sites that say the same thing.

### 1.2 Information architecture for LLMs: current state

**Good already:**
- Navigation and footer are plain `<a href>` in the server-rendered HTML (`_includes/nav.html`, `_includes/footer.html`), so no JS is needed.
- Clean, stable URLs (`/airtable/`, `/power-bi/` …) with redirects from the old `/pages/*.html`.
- `llms.txt` exists, follows the llmstxt.org shape (H1, blockquote summary, H2 link lists) and has dense, specific service lines.
- AI Automation page names the actual stack: Claude, GPT, Gemini, Zapier, Make, Apps Script.

**Problems for RAG chunking and extraction:**

1. **No `<main>` element** (`_layouts/default.html`). Readability-style extractors used by LLM fetchers (Mozilla Readability, Trafilatura and similar) look for `<main>`/`<article>`. Without one, the nav (about 30 links) and footer get mixed into every chunk, which dilutes the embeddings.
2. **Marketing adjectives instead of facts.** A RAG pipeline keeps chunks that answer a question. Lines like "Beautiful, interactive dashboards… tailored to your KPIs" carry no retrievable facts. Compare: "We build Power BI semantic models (star schema, DAX measures, incremental refresh) for NZ SMEs using Xero, MYOB and SQL Server data. Typical build: 3–6 weeks."
3. **No subject in key sentences.** Many paragraphs use "we" without ever saying who "we" is. A chunk that starts "We help businesses unlock…" loses the brand once it is separated from the page. **Rule: every H2 section should name "RK Consulting" and, where relevant, "Auckland" or "New Zealand" in its first sentence**, so each chunk stands on its own.
4. **Service names on the homepage are `<div class="sc-title">`, not headings.** Chunkers split on headings, so the homepage reads as one undivided block.
5. **Fact-bearing content is styled as `<div>`s.** Examples are the AI Automation "How It Works" steps (Trigger → AI Reasoning → Action) and the contact page's "Response Time / Where We Work". Use `<ol>`/`<dl>` so the structure survives HTML→Markdown conversion.
6. **Inconsistent facts across files.** `llms.txt` says you serve "SMEs, not-for-profits and public sector organisations", but no web page mentions NFP or public sector. The contact page says "clients worldwide" while the rest of the site says Auckland. Engines check facts against each other; when sources disagree, the engine trusts the entity less.
7. **Copy defects that an LLM will quote word for word:**
   - `index.html`: "Deep cross-sector experience spanning multiple industries including — bringing…" (the list of industries is missing).
   - `index.html` hero: two cards both titled "Airtable Systems". The first is subtitled "Power BI · Looker Studio" and should say "BI & Reporting".
   - `ai-consulting.html:44`: an empty orange `<p> </p>` (a credential placeholder never filled in).
   - `ai-consulting.html`: lists "GPT-4o", which is out of date in Oct 2026. Name model *families* (Claude, GPT, Gemini) instead, so the page doesn't age.
   - `contact.html` H1: "Let us Build Something Great Together" should be "Let's build something great together".
   - "Our team of Airtable specialists" and "As Google Cloud Certified Generative AI Leaders" (plural). If the business is one consultant, say so. "Founder-led" is a *selling point* for SMEs, and claims an engine can't verify cost you trust.

### 1.3 Concrete phrasing changes (answer-first, entity-dense)

**Homepage H1 + lead.** The current H1, "Turn Data Into Decisions. AI Into Advantage.", carries no entities.

```html
<h1>Data, Analytics &amp; AI Consultancy in Auckland, New Zealand</h1>
<p class="hero-tagline">Turn data into decisions. AI into advantage.</p>
<p>RK Consulting is an Auckland-based data, analytics and AI consultancy led by
{{FOUNDER_NAME}}. We help New Zealand SMEs and operations teams replace
spreadsheet-driven processes with <strong>Airtable</strong> operational systems,
<strong>Power BI</strong> and <strong>Looker Studio</strong> reporting, and
<strong>AI workflow automation</strong> built on the Claude, OpenAI and Gemini APIs.
Projects typically run {{2–8}} weeks, delivered on-site in Auckland or remotely
across New Zealand.</p>
```
Keep the slogan as the visual headline if you like by styling `.hero-tagline` large. Make the *H1 text* the entity statement.

**Airtable page intro.** Replace "Airtable is far more than a database…":
> RK Consulting is an Airtable consultant in Auckland, New Zealand. We design and build Airtable bases, Interface Designer apps, automations and scripts that replace spreadsheets for NZ SMEs. Typical builds include CRMs, job and project trackers, event and RSVP systems, and inventory or asset registers. We integrate Airtable with Xero, Microsoft 365/Outlook, Slack, Google Workspace and Salesforce through Make, Zapier, webhooks and the Airtable REST API.

**Add an "At a glance" fact block to every service page**, directly under the hero. This is the single most extractable element you can add:
```html
<section class="at-a-glance" aria-labelledby="glance-h">
  <h2 id="glance-h">Airtable consulting at a glance</h2>
  <dl>
    <dt>Who it's for</dt><dd>NZ SMEs, not-for-profits and operations teams outgrowing Excel or Google Sheets</dd>
    <dt>What we deliver</dt><dd>Base architecture, Interface Designer apps, automations, scripting, integrations, training</dd>
    <dt>Integrations</dt><dd>Xero, Outlook/Microsoft 365, Google Workspace, Slack, Salesforce, Make, Zapier, REST API</dd>
    <dt>Typical timeline</dt><dd>{{2–6 weeks}} for a first production base</dd>
    <dt>Pricing</dt><dd>Fixed-price projects from NZ${{X}}; hourly from NZ${{Y}} + GST</dd>
    <dt>Location</dt><dd>Auckland, New Zealand. On-site in Auckland, remote NZ-wide and Australia</dd>
  </dl>
</section>
```
Pricing ranges are the most-requested fact in buyer prompts ("how much does an Airtable consultant cost in NZ"). Pages that state a range get cited. Pages that don't get skipped.

### 1.4 The "Citations & Recommendations" strategy

To become *the* answer for "best AI and Airtable automation consultant in Auckland":

**A. On-site (you control it)**
1. **Exact-match entity statements** in the title, H1, first paragraph and schema: "Airtable consultant in Auckland", "AI automation consultant in Auckland", "Power BI consultant in Auckland". Use each phrase once or twice per page, naturally. Don't stuff them.
2. **A combined-offer page** for the intersection you uniquely own: `/airtable-ai-automation/` — "Airtable + AI automation consultant (Auckland, NZ)". It covers Airtable AI fields, LLM calls from Airtable scripts and automations, Claude/OpenAI via Make, and document extraction into Airtable. Few or no NZ competitors have a page like this, so it's the cheapest #1 position you can take.
3. **Named founder with credentials** on `/about/`: photo, bio, years of experience, the **Google Cloud Generative AI Leader** certification with a link to its Credly/Google verification URL, LinkedIn, and sectors (fill in the missing industries list). Mark it up as `Person`, linked to the organisation as `founder`.
4. **Case studies with numbers** (§3.2). "Reduced monthly reporting from 3 days to 2 hours" is the kind of sentence LLMs quote.
5. **FAQ blocks** on each service page, written as the literal questions buyers type into ChatGPT (see §3.3).

**B. Off-site corroboration (this often decides it)**
1. **Google Business Profile.** Set it up as a service-area business with Auckland and NZ regions, hiding the address if you work from home. Primary category *Business management consultant* or *Computer consultant*, with *Software company* or *Marketing consultant* as secondaries if they fit. List the services, link to each service URL, and **collect 5–10 genuine client reviews that mention the tool** ("built our Airtable CRM").
2. **Airtable Partner / Services directory listing** (Airtable's official partner programme), the **Airtable Community** profile and solutions, and the **Microsoft Fabric / Power BI Community** profile. Engines treat vendor directories as authoritative.
3. **B2B directories that Perplexity and ChatGPT cite often:** Clutch, GoodFirms, DesignRush, Sortlist. NZ: NZBN register (check the trading name is correct), Finda, Yellow NZ, Auckland Business Chamber. Use **identical NAP** everywhere: "RK Consulting Limited, Auckland, New Zealand, +64 21 026 59597, info@rkconsulting.co.nz".
4. **LinkedIn company page + founder profile.** Make the headline "Airtable, Power BI & AI Automation Consultant, Auckland", and post monthly with links to case studies.
5. **Community answers** on r/Airtable, the Airtable Community, the Power BI Community and r/PowerBI, with a profile link to the site. Reddit is heavily weighted in Perplexity and Google AI answers.
6. **YouTube**: 3–5 short screen-recorded walkthroughs, e.g. "Claude API in Google Sheets with Apps Script" and "Airtable to Power BI". Gemini and AI Overviews draw on YouTube. Embed them on the matching page with `VideoObject` schema.
7. **Disambiguation.** At least three other "RK Consulting" firms exist (NL, US, NZ engineering). Always use "RK Consulting **NZ**" or "RK Consulting Limited (Auckland)" in profiles, and add every profile URL to `sameAs`.

**C. Measuring AI visibility**
- In GA4, build a segment for session source matching `chatgpt.com|perplexity.ai|claude.ai|gemini.google.com|copilot.microsoft.com|bing.com/chat`. ChatGPT adds `utm_source=chatgpt.com`.
- Track a fixed panel of about 20 prompts monthly in each engine, e.g. "Airtable consultant Auckland", "who can build an Airtable CRM in NZ", "Power BI consultant Auckland small business", "AI automation consultant New Zealand", "Looker Studio GA4 dashboard consultant NZ", "Claude API Google Sheets consultant". Log whether you're mentioned, cited (linked) or absent.
- Fire a GA4 `generate_lead` event on a successful form submit in `js/contact.js` so you can attribute leads to AI referrals:
  ```js
  if (response.ok) {
    if (typeof gtag === 'function') gtag('event', 'generate_lead', { form_id: 'contact-form' });
    // …existing code
  }
  ```

### 1.5 LLM accessibility & AI crawling: robots.txt / ai.txt / llms.txt

**robots.txt: good, minor improvements.** You explicitly allow GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot(-Extended), CCBot, meta-externalagent, Amazonbot and cohere-ai. That's correct for a business that *wants* to be in model knowledge and live answers.

- The per-bot `Allow: /` blocks are redundant given `User-agent: * Allow: /`. They're harmless and act as explicit signalling, so keep them.
- Add these agents: `Meta-ExternalFetcher`, `DuckAssistBot`, `MistralAI-User`, `YouBot`, `Bytespider` (allow or deny as you prefer), and `GoogleOther`.
- **Data safety:** nothing sensitive is served. The contact form posts to Formspree, so there's no endpoint to protect. The only things to hide are dev artefacts that are currently **published**: `/verify.sh`, `/icons` (a stray 1-byte file) and `/Icons/*.png` (unused). Delete or exclude them rather than `Disallow` them, because a Disallow line advertises the path.
- Optionally declare usage preferences with the Content Signals line, which some CDNs and crawlers read:
  ```
  # Content-Signal: search=yes, ai-input=yes, ai-train=yes
  ```

Recommended final `robots.txt`:
```
# https://www.rkconsulting.co.nz/robots.txt
User-agent: *
Allow: /

# Search engines
User-agent: Googlebot
User-agent: Bingbot
User-agent: Applebot
User-agent: DuckDuckBot
Allow: /

# AI search / live retrieval (cited answers)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: DuckAssistBot
User-agent: MistralAI-User
User-agent: Meta-ExternalFetcher
User-agent: YouBot
Allow: /

# AI model training (keeps RK Consulting in base-model knowledge)
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: meta-externalagent
User-agent: Amazonbot
User-agent: cohere-ai
User-agent: GoogleOther
Allow: /

Sitemap: https://www.rkconsulting.co.nz/sitemap.xml
```
(Grouping several `User-agent` lines over one rule set is valid under RFC 9309.)

**ai.txt.** Your file contains `User-agent: * / Allow: * / Contact:`. No major AI vendor reads ai.txt today. It is harmless, so keep it but don't rely on it.

**llms.txt: upgrade it.** It's well-formed. Add:
1. A **Key facts** section (founder, location, year founded, NZBN, service area, pricing ranges, response time, certifications).
2. Links to the About, Case Studies, FAQ and Pricing pages once they exist.
3. An `## Optional` section linking `/llms-full.txt`: one hand-maintained Markdown file holding the full text of every service page plus the FAQs. Engines that read llms.txt can then take in the whole site in one fetch.

```markdown
# RK Consulting Limited

> RK Consulting is a founder-led data, analytics and AI consultancy in Auckland, New Zealand.
> It builds Airtable operational systems, Power BI and Looker Studio reporting, and AI workflow
> automation (Claude, OpenAI and Gemini APIs via Make, Zapier and Google Apps Script) for New Zealand
> SMEs, not-for-profits and public-sector teams.

## Key facts
- Legal name: RK Consulting Limited (NZBN {{NZBN}})
- Founder / principal consultant: {{FOUNDER_NAME}}, Google Cloud Certified Generative AI Leader, {{15}}+ years in data and analytics
- Based in: Auckland, New Zealand. Serves all of NZ remotely, on-site in Auckland, and Australia remotely
- Typical engagement: fixed-price projects from NZ${{X}} + GST; {{2–8}} weeks
- Contact: info@rkconsulting.co.nz · +64 21 026 59597 · https://www.rkconsulting.co.nz/contact/

## Services
- [Airtable consultant (Auckland)](https://www.rkconsulting.co.nz/airtable/): …
- [Airtable + AI automation](https://www.rkconsulting.co.nz/airtable-ai-automation/): …
…

## Proof
- [Case studies](https://www.rkconsulting.co.nz/case-studies/): …
- [About the founder](https://www.rkconsulting.co.nz/about/)

## Optional
- [Full site text](https://www.rkconsulting.co.nz/llms-full.txt)
```

---

## 2. Static-Site Technical SEO & Performance

### 2.1 Metadata & semantic HTML validation

#### Titles & meta descriptions: none of them mention a location

| Page | Current title (length) | Recommended title (≤60) | Recommended meta description (≤155) |
|---|---|---|---|
| `/` | RK Consulting \| Data, Analytics & AI Consultancy (48) | **Data, Analytics & AI Consultant Auckland \| RK Consulting** | Auckland data & AI consultancy for NZ SMEs: Airtable systems, Power BI & Looker Studio dashboards and AI workflow automation. Book a free scoping call. |
| `/airtable/` | Airtable Consulting \| RK Consulting — Data & Analytics (54) | **Airtable Consultant Auckland, NZ \| RK Consulting** | Auckland Airtable consultant. Bases, Interface Designer apps, automations, scripting and Xero/Microsoft 365 integrations that replace spreadsheets. NZ-wide. |
| `/power-bi/` | Power BI Consulting \| RK Consulting — Data & Analytics (54) | **Power BI Consultant Auckland, NZ \| RK Consulting** | Power BI consultant in Auckland: star-schema data models, DAX, Power Query, RLS and executive dashboards from Xero, MYOB, Excel & SQL. Fixed-price builds. |
| `/looker-studio/` | Looker Studio Consulting \| RK Consulting — Data & Analytics (59) | **Looker Studio Consultant NZ \| GA4 & BigQuery \| RK Consulting** | Looker Studio dashboards for NZ businesses: GA4, Google Ads, Search Console, BigQuery and Sheets, blended and automated with Apps Script. Auckland-based. |
| `/ai-automation/` | AI Automation \| RK Consulting — Intelligent Workflow Automation (63, truncated) | **AI Automation Consultant Auckland \| RK Consulting** | AI workflow automation for NZ SMEs: document extraction, email triage and reporting using Claude, OpenAI & Gemini APIs with Make, Zapier & Apps Script. |
| `/ai-consulting/` | AI Consulting \| RK Consulting — Data & AI Strategy (50) | **AI Consultant Auckland \| Strategy, PoC & Training \| RK** | Practical AI consulting in Auckland: use-case discovery, roadmaps, proof-of-concepts, NZ Privacy Act-aware governance and team training. Tool-agnostic. |
| `/spreadsheets/` | Spreadsheet Consulting \| RK Consulting — Data & Analytics (57) | **Excel & Google Sheets Consultant NZ \| RK Consulting** | Excel & Google Sheets consultant in NZ: forecasting models, dashboards, Apps Script & Office Scripts automation, and AI (Claude/GPT) inside Sheets. |
| `/contact/` | Contact Us \| RK Consulting — Data & AI Consultancy (50) | **Contact RK Consulting \| Auckland Data & AI Consultancy** | Talk to an Auckland data & AI consultant. Email info@rkconsulting.co.nz or call +64 21 026 59597. Replies within 1 business day. |

Also replace "We work with clients worldwide" on `/contact/` with "Based in Auckland. Working with clients across New Zealand and Australia."

#### Heading hierarchy

| Page | Problem | Fix |
|---|---|---|
| All service pages | H2 "…Consultancy Services" → card titles are **H4** (H3 skipped). The only H3 is a sidebar box. | Change card `<h4>` to `<h3>`. Update `.consultancy-card-body h4` / `.use-case-card h4` selectors in `css/style.css`. |
| `/` | 6 service names are `<div class="sc-title">`, the 4 "why" items are `<div class="why-title">`, the AI features are `<div class="ai-feature-title">`. Homepage has **1 H3 in total**. | Make them `<h3>`; keep the classes for styling. |
| `/` | H1 has no entity (see §1.3). | Entity H1. |
| Global footer | `<h4>Services</h4>`, `<h4>AI Services</h4>`, `<h4>Company</h4>` add 3 H4s to every page's outline. | Change to `<p class="footer-heading">` or `<h2 class="visually-hidden-like">`, or keep them and accept it (minor). |
| `/power-bi/`, `/looker-studio/` | The H1 is the product name ("Microsoft Power BI"), which reads like Microsoft's own page. | H1: "Power BI Consulting in Auckland". Keep the product name in the eyebrow label. |

#### Landmarks, images and accessibility (accessibility feeds extraction quality)
- Add `<main id="main">` around `{{ content }}` in `_layouts/default.html`, plus a skip link.
- The dropdown toggle is `<a href="#" role="button">`. Use `<button type="button">`.
- The hamburger is a `<div role="button">`. Use `<button>`.
- About 60 decorative inline `<svg>`s lack `aria-hidden="true" focusable="false"`. Add those attributes so screen readers and text extractors skip them.
- **Images:** the site has exactly one raster image (the logo). Alt text exists ("RK Consulting — Data, Analytics & AI"). The real gap is **no images of real work**: anonymised dashboard screenshots, Airtable interface screenshots, a founder headshot. Add them as WebP with descriptive filenames and alt text, e.g. `power-bi-financial-dashboard-nz-sme.webp` with alt "Power BI P&L and budget-vs-actual dashboard built for an Auckland wholesaler". They act as proof, help Google Images and give multimodal engines something to describe.
- Logo `<img>` has no `width`/`height` (risk of layout shift, CLS). Add them.

#### `head.html` additions
```liquid
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="author" content="{{FOUNDER_NAME}}">
  <meta property="og:type" content="{% if page.layout == 'post' %}article{% else %}website{% endif %}">
  <meta property="og:image" content="{{ page.og_image | default: '/images/og-default.png' | absolute_url }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{{ page.og_title | default: page.title }}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ page.og_title | default: page.title }}">
  <meta name="twitter:description" content="{{ page.og_description | default: page.description }}">
  <meta name="twitter:image" content="{{ page.og_image | default: '/images/og-default.png' | absolute_url }}">
  <meta name="geo.region" content="NZ-AUK">
  <meta name="geo.placename" content="Auckland">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/images/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
  <link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">
```
Create a 1200×630 `og-default.png` (logo + "Data, Analytics & AI Consultancy · Auckland"), and one per service page if you can. Today's og:image is a square logo, which LinkedIn and Slack crop badly.

### 2.2 Schema markup strategy (JSON-LD)

**Architecture:** one **site-wide entity graph** (Organization/ProfessionalService + Person + WebSite) on *every* page, all with stable `@id`s. Then a **page-level graph** (WebPage + Service + BreadcrumbList + FAQPage) generated from front matter. Every node points back to `https://www.rkconsulting.co.nz/#organization`, which tells Google's Knowledge Graph and LLM parsers that it's one entity.

> Note: Google limited FAQ *rich results* to government and health sites in 2023. Still add `FAQPage`. It remains valid structured data, Bing uses it, and LLM parsers read it as clean Q/A pairs. Just don't expect the visual SERP accordion.

#### 2.2.1 `_includes/schema-org.html`: site-wide (replace the current file; include it on **every** page)

In `_layouts/default.html`, change `{% if page.url == "/" %}{% include schema-org.html %}{% endif %}` to:
```liquid
{% include schema-org.html %}
{% include schema-page.html %}
```

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": "https://www.rkconsulting.co.nz/#organization",
      "name": "RK Consulting",
      "legalName": "RK Consulting Limited",
      "alternateName": ["RK Consulting NZ", "RK Consulting Auckland"],
      "description": "Auckland-based data, analytics and AI consultancy. RK Consulting builds Airtable operational systems, Power BI and Looker Studio reporting, and AI workflow automation (Claude, OpenAI and Gemini APIs with Make, Zapier and Google Apps Script) for New Zealand SMEs, not-for-profits and public-sector teams.",
      "slogan": "Turning data into decisions. AI into impact.",
      "url": "https://www.rkconsulting.co.nz/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.rkconsulting.co.nz/#logo",
        "url": "https://www.rkconsulting.co.nz/images/logo.png",
        "caption": "RK Consulting"
      },
      "image": "https://www.rkconsulting.co.nz/images/og-default.png",
      "email": "info@rkconsulting.co.nz",
      "telephone": "+64-21-026-59597",
      "priceRange": "$$",
      "currenciesAccepted": "NZD",
      "foundingDate": "{{YYYY}}",
      "founder": { "@id": "https://www.rkconsulting.co.nz/about/#person" },
      "identifier": { "@type": "PropertyValue", "propertyID": "NZBN", "value": "{{NZBN}}" },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Auckland",
        "addressRegion": "Auckland",
        "addressCountry": "NZ"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": -36.8485, "longitude": 174.7633 },
      "areaServed": [
        { "@type": "City", "name": "Auckland", "sameAs": "https://en.wikipedia.org/wiki/Auckland" },
        { "@type": "Country", "name": "New Zealand", "sameAs": "https://en.wikipedia.org/wiki/New_Zealand" },
        { "@type": "Country", "name": "Australia" }
      ],
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:30", "closes": "17:30"
      }],
      "contactPoint": [{
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "info@rkconsulting.co.nz",
        "telephone": "+64-21-026-59597",
        "areaServed": ["NZ", "AU"],
        "availableLanguage": ["en"]
      }],
      "knowsAbout": [
        { "@type": "Thing", "name": "Airtable", "sameAs": "https://en.wikipedia.org/wiki/Airtable" },
        { "@type": "Thing", "name": "Microsoft Power BI", "sameAs": "https://en.wikipedia.org/wiki/Microsoft_Power_BI" },
        { "@type": "Thing", "name": "Looker Studio", "sameAs": "https://en.wikipedia.org/wiki/Looker_Studio" },
        { "@type": "Thing", "name": "Google Apps Script", "sameAs": "https://en.wikipedia.org/wiki/Google_Apps_Script" },
        { "@type": "Thing", "name": "Large language models", "sameAs": "https://en.wikipedia.org/wiki/Large_language_model" },
        { "@type": "Thing", "name": "Business intelligence", "sameAs": "https://en.wikipedia.org/wiki/Business_intelligence" },
        "DAX", "Power Query", "BigQuery", "Google Analytics 4", "Workflow automation",
        "Make (Integromat)", "Zapier", "Claude API", "OpenAI API", "Gemini API",
        "Retrieval-augmented generation", "Microsoft Excel", "Google Sheets", "Xero"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Data, analytics and AI consulting services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@id": "https://www.rkconsulting.co.nz/airtable/#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.rkconsulting.co.nz/ai-automation/#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.rkconsulting.co.nz/ai-consulting/#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.rkconsulting.co.nz/power-bi/#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.rkconsulting.co.nz/looker-studio/#service" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.rkconsulting.co.nz/spreadsheets/#service" } }
        ]
      },
      "sameAs": [
        "{{GOOGLE_BUSINESS_PROFILE_URL}}",
        "{{LINKEDIN_COMPANY_URL}}",
        "{{AIRTABLE_PARTNER_DIRECTORY_URL}}",
        "{{CLUTCH_URL}}",
        "{{NZBN_REGISTER_URL}}"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.rkconsulting.co.nz/about/#person",
      "name": "{{FOUNDER_NAME}}",
      "jobTitle": "Founder & Principal Data and AI Consultant",
      "worksFor": { "@id": "https://www.rkconsulting.co.nz/#organization" },
      "url": "https://www.rkconsulting.co.nz/about/",
      "image": "https://www.rkconsulting.co.nz/images/{{founder-headshot}}.webp",
      "homeLocation": { "@type": "City", "name": "Auckland" },
      "hasCredential": [{
        "@type": "EducationalOccupationalCredential",
        "name": "Google Cloud Certified – Generative AI Leader",
        "credentialCategory": "certification",
        "recognizedBy": { "@type": "Organization", "name": "Google Cloud" },
        "url": "{{CREDLY_OR_GOOGLE_VERIFY_URL}}"
      }],
      "knowsAbout": ["Airtable", "Power BI", "DAX", "Looker Studio", "Google Apps Script", "AI automation", "Large language models"],
      "sameAs": ["{{FOUNDER_LINKEDIN_URL}}"]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.rkconsulting.co.nz/#website",
      "url": "https://www.rkconsulting.co.nz/",
      "name": "RK Consulting",
      "inLanguage": "en-NZ",
      "publisher": { "@id": "https://www.rkconsulting.co.nz/#organization" }
    }
  ]
}
</script>
```
Notes:
- `geo` is the Auckland CBD centroid, which is fine for a service-area business. Only add `streetAddress` if it matches your Google Business Profile exactly.
- **Remove any `sameAs` entry you don't have yet.** Empty or placeholder URLs make the JSON-LD invalid.
- `{{FOUNDER_NAME}}`: the repo's commit history suggests Rahul Khatri. Confirm how you want to be named publicly.

#### 2.2.2 `_includes/schema-page.html`: per-page graph, driven by front matter

```liquid
{% assign base = site.url %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "{{ page.schema_type | default: 'WebPage' }}",
      "@id": "{{ page.url | absolute_url }}#webpage",
      "url": "{{ page.url | absolute_url }}",
      "name": {{ page.title | jsonify }},
      "description": {{ page.description | jsonify }},
      "inLanguage": "en-NZ",
      "isPartOf": { "@id": "{{ base }}/#website" },
      "about": { "@id": "{{ base }}/#organization" }{% if page.last_modified_at %},
      "dateModified": "{{ page.last_modified_at | date_to_xmlschema }}"{% endif %}{% if page.service %},
      "mainEntity": { "@id": "{{ page.url | absolute_url }}#service" }{% endif %}
    }{% if page.url != "/" %},
    {
      "@type": "BreadcrumbList",
      "@id": "{{ page.url | absolute_url }}#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "{{ base }}/" },
        { "@type": "ListItem", "position": 2, "name": {{ page.breadcrumb | default: page.title | jsonify }}, "item": "{{ page.url | absolute_url }}" }
      ]
    }{% endif %}{% if page.service %},
    {
      "@type": "Service",
      "@id": "{{ page.url | absolute_url }}#service",
      "name": {{ page.service.name | jsonify }},
      "serviceType": {{ page.service.type | jsonify }},
      "description": {{ page.service.description | jsonify }},
      "url": "{{ page.url | absolute_url }}",
      "provider": { "@id": "{{ base }}/#organization" },
      "areaServed": [
        { "@type": "City", "name": "Auckland" },
        { "@type": "Country", "name": "New Zealand" }
      ],
      "audience": { "@type": "BusinessAudience", "audienceType": "Small and medium-sized enterprises, not-for-profits and operations teams" },
      "category": {{ page.service.category | jsonify }}{% if page.service.offers %},
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": {{ page.service.name | append: " services" | jsonify }},
        "itemListElement": [{% for o in page.service.offers %}
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": {{ o | jsonify }} } }{% unless forloop.last %},{% endunless %}{% endfor %}
        ]
      }{% endif %}{% if page.service.price_from %},
      "offers": {
        "@type": "Offer",
        "priceCurrency": "NZD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": {{ page.service.price_from }},
          "priceCurrency": "NZD",
          "valueAddedTaxIncluded": false
        }
      }{% endif %}
    }{% endif %}{% if page.faq %},
    {
      "@type": "FAQPage",
      "@id": "{{ page.url | absolute_url }}#faq",
      "mainEntity": [{% for f in page.faq %}
        { "@type": "Question", "name": {{ f.q | jsonify }},
          "acceptedAnswer": { "@type": "Answer", "text": {{ f.a | jsonify }} } }{% unless forloop.last %},{% endunless %}{% endfor %}
      ]
    }{% endif %}
  ]
}
</script>
```

Render the same `page.faq` entries **visibly** on the page, since schema must match visible content:
```liquid
{% if page.faq %}
<section class="faq" aria-labelledby="faq-h"><div class="section-inner">
  <h2 id="faq-h">{{ page.breadcrumb }} FAQs</h2>
  {% for f in page.faq %}<details><summary><h3>{{ f.q }}</h3></summary><p>{{ f.a }}</p></details>{% endfor %}
</div></section>
{% endif %}
```

#### 2.2.3 Front matter for each core service (copy-paste, then fill in placeholders)

**`airtable.html`**
```yaml
breadcrumb: Airtable Consulting
last_modified_at: 2026-10-08
service:
  name: Airtable Consulting & Development (Auckland, NZ)
  type: Airtable consulting
  category: Database and workflow automation consulting
  description: >-
    Airtable base architecture, Interface Designer apps, automations, JavaScript scripting
    and integrations (Xero, Microsoft 365, Google Workspace, Slack, Salesforce via Make,
    Zapier, webhooks and the Airtable REST API) that replace spreadsheets for New Zealand SMEs.
  price_from: {{X}}
  offers:
    - Airtable base and table architecture
    - Airtable Interface Designer apps
    - Airtable automations and scripting
    - Airtable AI field and LLM integration
    - Airtable integration with Xero, Microsoft 365 and Google Workspace
    - Spreadsheet to Airtable migration
    - Airtable training and handover
faq:
  - q: How much does an Airtable consultant cost in New Zealand?
    a: RK Consulting charges NZ${{Y}} per hour + GST, or fixed-price projects from NZ${{X}}. A typical first production base (CRM, job tracker or event system) takes {{2–6}} weeks.
  - q: Can Airtable replace our Excel spreadsheets?
    a: Yes, when several people edit the same data, records relate to each other (clients, jobs, invoices), or you need approvals and notifications. Excel or Google Sheets is still better for one-off modelling and heavy calculation.
  - q: Does Airtable integrate with Xero?
    a: Yes. RK Consulting connects Airtable to Xero through Make or Zapier, or through the Xero API with an Airtable script, to sync contacts, invoices and payment status.
  - q: Do you work with Airtable clients outside Auckland?
    a: Yes. RK Consulting is based in Auckland and works remotely with organisations across New Zealand and Australia.
```

**`power-bi.html`**
```yaml
breadcrumb: Power BI Consulting
last_modified_at: 2026-10-08
service:
  name: Power BI Consulting & Dashboard Development (Auckland, NZ)
  type: Power BI consulting
  category: Business intelligence consulting
  description: >-
    Microsoft Power BI semantic models (star schema), DAX measures, Power Query (M)
    transformations, row-level security, deployment pipelines and executive dashboards
    for New Zealand organisations, sourcing data from Xero, MYOB, Excel, SharePoint, SQL Server and Microsoft Fabric.
  price_from: {{X}}
  offers:
    - Power BI data modelling (star schema)
    - DAX measure development and optimisation
    - Power Query (M) data transformation
    - Power BI executive and financial dashboards
    - Row-level security and workspace governance
    - Excel, SSRS and Tableau to Power BI migration
    - Copilot and Azure OpenAI in Power BI
faq:
  - q: Power BI or Looker Studio — which should a NZ SME use?
    a: Use Power BI if you run on Microsoft 365, need complex DAX calculations or row-level security. Use Looker Studio if you run on Google Workspace, report mainly on GA4, Google Ads or Sheets data, and want no per-user licence cost.
  - q: Can Power BI connect to Xero?
    a: Yes, through the Xero connector, a third-party connector, or a staged dataset (SQL, Fabric or Dataflows). RK Consulting picks the option based on data volume and refresh needs.
  - q: How long does a Power BI dashboard project take?
    a: A single-subject dashboard on a clean source takes {{1–3}} weeks; a multi-source semantic model with RLS takes {{4–8}} weeks.
```

**`looker-studio.html`**
```yaml
breadcrumb: Looker Studio Consulting
last_modified_at: 2026-10-08
service:
  name: Looker Studio Dashboard Consulting (NZ)
  type: Looker Studio consulting
  category: Business intelligence consulting
  description: >-
    Google Looker Studio dashboards blending GA4, Google Ads, Search Console, BigQuery and
    Google Sheets data, with calculated fields, parameters and Google Apps Script pipelines
    for automated refresh. Built by RK Consulting in Auckland for NZ businesses.
  price_from: {{X}}
  offers:
    - Looker Studio dashboard design and build
    - GA4, Google Ads and Search Console reporting
    - BigQuery and Google Sheets data pipelines
    - Data blending and calculated fields
    - Google Apps Script automated data refresh
    - Reusable Looker Studio templates
faq:
  - q: Is Looker Studio free?
    a: Looker Studio is free to use; Looker Studio Pro adds team workspaces and admin controls for a per-project fee. Connectors from third parties such as Supermetrics may cost extra.
  - q: Can Looker Studio report on GA4 and Google Ads together?
    a: Yes. RK Consulting builds blended Looker Studio dashboards that combine GA4, Google Ads and Search Console, usually through BigQuery for performance at scale.
```

**`ai-automation.html`**
```yaml
breadcrumb: AI Automation
last_modified_at: 2026-10-08
service:
  name: AI Workflow Automation (Auckland, NZ)
  type: AI automation consulting
  category: Business process automation
  description: >-
    LLM-powered business workflows: document and invoice data extraction, email triage,
    review and survey classification and automated narrative reporting, built on the
    Claude, OpenAI and Gemini APIs with structured outputs, orchestrated through Make,
    Zapier, n8n, Power Automate and Google Apps Script, writing to Airtable, Google Sheets and CRMs.
  price_from: {{X}}
  offers:
    - AI document and invoice data extraction
    - AI email triage and response drafting
    - Customer review and survey analysis with LLMs
    - Automated AI narrative reporting
    - LLM integration with Airtable and Google Sheets
    - Human-in-the-loop AI workflow design
faq:
  - q: What business processes can AI automate for a small business?
    a: The best candidates are repetitive tasks that need judgement on unstructured text, such as reading invoices or forms, triaging email, classifying feedback and writing first-draft reports. RK Consulting scores candidates by hours saved and error risk before building.
  - q: Is it safe to send business data to ChatGPT or Claude?
    a: Through the business APIs (not consumer chat apps), OpenAI, Anthropic and Google do not train on your data by default. RK Consulting designs workflows that minimise personal information, in line with the NZ Privacy Act 2020, and keeps a human review step for high-impact outputs.
  - q: Which automation platform do you use — Make, Zapier or n8n?
    a: It depends on volume, budget and hosting needs. Zapier for simple, low-volume flows; Make for complex branching at lower cost; n8n when self-hosting or data control matters; Apps Script when the work lives in Google Workspace.
```

**`ai-consulting.html`** and **`spreadsheets.html`** follow the same pattern. For AI consulting the offers are discovery workshops, roadmap, PoC, responsible AI and NZ Privacy Act governance, training and retained advisory. For spreadsheets they are forecasting models, dashboards, Apps Script/Office Scripts, AI in Sheets and migration to Airtable/Power BI.

Validate every page at https://validator.schema.org and the Google Rich Results Test after deploying.

### 2.3 GitHub Pages optimisation

| Item | Status | Action |
|---|---|---|
| **XML sitemap** | `jekyll-sitemap` is active. 404 is excluded (`sitemap: false`). Redirect stubs are excluded automatically. | **Bug:** rename `last_modified:` to `last_modified_at:` in all 8 pages so `<lastmod>` is emitted, and update it whenever content changes. Exclude non-content files such as `verify.sh` (see below). |
| **Custom 404** | `404.html` with `permalink: /404.html`. GitHub Pages serves it with HTTP 404 ✔. It links to all services ✔. | Fine. Optionally add `<meta name="robots" content="noindex">` as a belt-and-braces measure. |
| **Canonicals** | `{{ page.url \| absolute_url }}` with trailing slash ✔. | Keep. Make sure internal links always use the trailing-slash form (they do). |
| **Legacy redirects** | `jekyll-redirect-from` creates meta-refresh stubs with canonicals (HTTP 200, not 301). Google and Bing treat a 0-second meta refresh as a redirect. | Fine. Check in GSC that `/pages/*.html` shows "Page with redirect". |
| **Apex → www** | Can't be checked from the sandbox. | Make sure the apex `rkconsulting.co.nz` has the 4 GitHub Pages `A` records (185.199.108–111.153) and `AAAA` records, so GitHub 301s apex → www. Tick **Enforce HTTPS** in repo Settings → Pages. Test: `curl -I http://rkconsulting.co.nz/`. |
| **Cache-Control** | GitHub Pages fixes `Cache-Control: max-age=600` for everything and you can't change it. | Use cache-busting filenames or query strings so you can ship changes safely: `href="{{ '/css/style.css' \| relative_url }}?v={{ site.time \| date: '%s' }}"`. For long-lived immutable caching plus Brotli and HTTP/3, put **Cloudflare (free)** in front with a Cache Rule `/css/*`, `/js/*`, `/images/*` → Edge & Browser TTL 1 year. Cloudflare also gives you AI-crawler analytics, but check its "AI Crawl Control / block AI bots" defaults are **off**, or it will undo your robots.txt. |
| **Render-blocking fonts** | `@import url(fonts.googleapis.com…)` inside `style.css` gives a 3-hop chain (HTML → CSS → font CSS → woff2), with 6 Sora + 4 DM Sans weights. | Move to `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap">` in `head.html`. Cut weights to the ones actually used, or self-host 2–3 woff2 files. |
| **Logo** | `images/logo.png` is 73 KB and is reused as the nav logo, favicon and og:image. | Export SVG (≈3–8 KB) or a 2× WebP for the nav, a 32 px `favicon.ico`, a 180 px apple-touch-icon and a 1200×630 OG image. |
| **Published junk** | `/verify.sh`, `/icons` (1-byte file), `/Icons/*.png` (unused since the refactor), `README.md` (excluded ✔ but out of date). | Delete `icons` and `Icons/`, and add `verify.sh` to `exclude:` in `_config.yml`. Update the README to describe the Jekyll setup. |
| **Footer year** | Hard-coded `© 2026`. | `{{ site.time \| date: '%Y' }}`. |
| **IndexNow** (Bing, Yandex, Seznam, Naver, and ChatGPT through Bing) | Missing. | See the workflow below. |
| **Search Console / Bing WMT** | Not detectable from the repo (it may be DNS-verified). | Verify both, submit the sitemap, then use "Request indexing" / "URL submission" for all 8 URLs. In Bing WMT, **import from GSC** to save time. |
| **Analytics** | GA4 `G-XZ52T6X54Q` ✔. No consent notice, no privacy page. | Add `/privacy/`. Under the NZ Privacy Act 2020 you should explain the GA4 and Formspree data collection, and the page is a trust signal too. |

**IndexNow via GitHub Actions** (runs after every Pages build):
1. Generate a key, e.g. `openssl rand -hex 16` → `a1b2…`. Commit a file `/a1b2….txt` containing exactly that key.
2. Add `.github/workflows/indexnow.yml`:
```yaml
name: IndexNow ping
on:
  page_build:
  workflow_dispatch:
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Wait for Pages CDN
        run: sleep 60
      - name: Submit sitemap URLs to IndexNow
        env:
          HOST: www.rkconsulting.co.nz
          KEY: ${{ secrets.INDEXNOW_KEY }}
        run: |
          urls=$(curl -s https://$HOST/sitemap.xml | grep -oP '(?<=<loc>)[^<]+' | jq -R . | jq -s .)
          curl -s -X POST https://api.indexnow.org/indexnow \
            -H 'Content-Type: application/json; charset=utf-8' \
            -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":$urls}" \
            -w '\nHTTP %{http_code}\n'
```
(Store the key as the repo secret `INDEXNOW_KEY`. The key file itself must be public. `.github/` is ignored by the Jekyll build.)

**Post-deploy verification** (run locally): `bash verify.sh`, then:
```bash
curl -sI https://www.rkconsulting.co.nz/ | grep -i cache-control
curl -sI http://rkconsulting.co.nz/ | grep -i location        # expect 301 → https://www.…
curl -s https://www.rkconsulting.co.nz/sitemap.xml | grep -c lastmod   # expect 8 after the fix
curl -s https://www.rkconsulting.co.nz/airtable/ | grep -c 'application/ld+json'  # expect 2
```

---

## 3. Content Gap & Entity-Based Search Analysis

### 3.1 Entity co-occurrence: what's present and what's missing

Search engines and LLMs judge expertise partly by whether a page mentions the **neighbouring entities** a real expert would mention. Current coverage:

| Service | Entities present ✔ | Missing entities to add (use them in real sentences, not tag lists) |
|---|---|---|
| **Airtable** | Linked records, lookups, Interface Designer, automations, JavaScript scripting, Zapier, Make, Outlook, Slack, Salesforce, Xero | Airtable **REST API** & webhooks, **Airtable AI** fields / AI assistant, scripting extension, **Sync** (cross-base), rollups, formula fields, record templates, **permissions & interface-only access**, plan limits (records per base, automation runs), **Softr / Stacker / Fillout** client portals and forms, Google Workspace, **Microsoft 365**, **MYOB**, data migration from Excel/Google Sheets/Access, **Smartsheet / Monday.com / Notion** as comparison entities |
| **Power BI** | DAX (meta only), star & snowflake schema, RLS, deployment pipelines, Azure OpenAI, Copilot, SSRS, Tableau | **Power Query (M)**, **Microsoft Fabric**, Dataflows Gen2, **Direct Lake / Import / DirectQuery**, **incremental refresh**, **on-premises data gateway**, calculation groups, field parameters, **Tabular Editor**, DAX Studio, Power BI **Pro / Premium Per User / Fabric capacity** licensing (NZD), **Xero / MYOB / Dynamics 365 / Business Central / SharePoint lists** as sources, paginated reports, **Power BI Embedded**, Power Automate |
| **Looker Studio** | BigQuery, GA4, Google Ads, Search Console, blended data, calculated fields, CASE, Apps Script | **Looker Studio Pro**, **community connectors**, **Supermetrics / Porter / Windsor.ai**, extracted data sources, **parameters**, data freshness and caching, **BigQuery scheduled queries**, **GA4 BigQuery export**, Shopify / Meta Ads / LinkedIn Ads, **Google Business Profile** insights, row-level filtering by email, **Looker (core) vs Looker Studio** disambiguation |
| **AI Automation** | Claude, GPT, Gemini, Zapier, Make, Apps Script, document extraction, classification, structured output schemas | **API integrations / REST / webhooks**, **function calling / tool use**, **JSON structured outputs**, **Model Context Protocol (MCP)**, **RAG** & embeddings / vector databases, **n8n**, **Power Automate**, **OCR**, prompt **evaluation** & error handling, **human-in-the-loop**, cost per document, rate limits, **NZ Privacy Act 2020** / Information Privacy Principles, data residency, **Microsoft Copilot Studio**, Google **Vertex AI** |
| **AI Consulting** | Responsible AI, governance, bias, PoC, roadmap, prompt engineering, Google Cloud GenAI Leader | **NZ Public Service AI Framework**, **Algorithm Charter for Aotearoa NZ**, **Privacy Commissioner AI guidance**, **Māori data sovereignty** (relevant to public sector and NFPs), AI acceptable-use policy, **Microsoft 365 Copilot / Gemini for Workspace** rollout & adoption, ROI / business case, build-vs-buy, vendor evaluation |
| **Spreadsheets** | Excel, Google Sheets, Apps Script, forecasting, Claude/GPT APIs | **Dynamic arrays, LAMBDA, LET, XLOOKUP**, **Power Query in Excel**, **Power Pivot**, **Office Scripts**, `QUERY` / `IMPORTRANGE` / `ARRAYFORMULA`, **Connected Sheets (BigQuery)**, Gemini in Sheets / Copilot in Excel, **GST / IRD** cashflow models (NZ-specific), "when to move from spreadsheets to Airtable / a database" |

**NZ locality entities** that should appear site-wide: Auckland (plus 1–2 mentions of the North Shore, CBD and Wellington/Christchurch clients served remotely, only if true), New Zealand, **NZ SMEs**, Xero (born in NZ, and very strongly associated with NZ SMEs), MYOB, GST, NZD pricing, the **NZ Privacy Act 2020**, and NZBN.

### 3.2 B2B content checklist: missing foundational pages

| Page | Why it matters (SEO + AIO) | Must contain |
|---|---|---|
| **`/about/`** 🔴 | E-E-A-T. It's the `Person` entity behind `founder`. "About" currently points to a homepage anchor. | Name, photo, career summary (the missing "industries" list), certifications with verification links, LinkedIn, how the company works (founder-led, partner network), NZBN, location. |
| **`/case-studies/` + 3–5 detail pages** 🔴 | Proof that LLMs quote. Turns "we've built" into checkable facts. | Each one: client (named or "Auckland not-for-profit, 40 staff"), problem, **stack used** (named entities), what was built, **quantified result**, timeline, client quote, screenshot. Mark up as `Article` with `about` → the Service `@id`. |
| **`/airtable-ai-automation/`** 🔴 | The intersection you can own (see §1.4). | Airtable + LLM patterns: AI fields, script → Claude/OpenAI API, Make scenarios, document → record extraction, guardrails. |
| **`/pricing/`** or "Engagement & pricing" 🟠 | Buyers ask LLMs "how much…". Pages with a stated range get cited. | Fixed-price packages (e.g. "Airtable Starter Build from NZ$X"), hourly rate, retainer / "Virtual Data partner" plans, what's included. |
| **`/how-we-work/`** 🟠 | Process content answers "what's it like working with a consultant". It also adds `HowTo`-style structure. | Discovery call → scoping doc → fixed quote → build in sprints → UAT → training & handover → support. Typical durations. |
| **`/faq/`** (plus per-page FAQs) 🟠 | Directly mirrors conversational queries. | 15–25 Q&As across services, pricing, privacy, location and process. |
| **`/industries/`** or sector sections 🟡 | `llms.txt` claims NFP and public sector, but no page backs it up. | Not-for-profit, public sector, professional services, healthcare (mentioned on the AI page), events. |
| **`/insights/` (blog via `_posts`)** 🟠 | Long-tail capture and freshness. Each post is a citation target. | See §3.3. Enable `jekyll-feed` (supported on GitHub Pages) for RSS. |
| **`/privacy/`** 🟡 | Trust, Privacy Act 2020 compliance (GA4 + Formspree). | What's collected, why, where it's stored (Formspree is US-based), and the contact for requests. |
| **Testimonials** 🟠 | Social proof. Also the source text for GBP reviews. | 3–6 named quotes on the homepage and relevant service pages. **Don't** self-mark-up `AggregateRating` on your own site, because Google ignores self-serving reviews for LocalBusiness. |

### 3.3 Long-tail content targets (high-intent + AI-discoverable)

Priority order is commercial intent × gap in NZ competition. Write each one answer-first: a direct 2–3 sentence answer, then detail, a comparison table and an FAQ.

**Commercial, local (convert directly)**
1. Airtable consultant Auckland / Airtable expert NZ → the `/airtable/` rewrite
2. Airtable + AI automation consultant → `/airtable-ai-automation/`
3. Power BI consultant Auckland small business → the `/power-bi/` rewrite + pricing
4. AI automation consultant Auckland / NZ → the `/ai-automation/` rewrite
5. Looker Studio GA4 dashboard consultant NZ → the `/looker-studio/` rewrite

**Comparison / decision (heavily cited by LLMs)**
6. "Airtable vs Excel vs Google Sheets for NZ small businesses (2026)"
7. "Power BI vs Looker Studio: which BI tool should a NZ SME choose?" (with NZD licence costs)
8. "Airtable vs Monday.com vs Smartsheet vs Notion for operations teams"
9. "Make vs Zapier vs n8n vs Power Automate for AI workflows"
10. "Power BI licensing in New Zealand: Pro vs PPU vs Fabric, explained in NZD"

**How-to / proof of expertise (citation magnets + YouTube pairs)**
11. "How to extract invoice data into Airtable with Claude (or GPT) and Make"
12. "How to call the Claude API from Google Sheets with Apps Script" (with code)
13. "Connecting Xero to Power BI: 4 options compared"
14. "Connecting Airtable to Power BI and Looker Studio"
15. "GA4 + Google Ads + Search Console in one Looker Studio dashboard (template)"
16. "Using AI with customer data under the NZ Privacy Act 2020: a practical SME checklist"
17. "Five signs your business has outgrown spreadsheets"

**Cadence:** 2 posts per month. Every post links to its service page with a descriptive anchor ("our Airtable consulting service in Auckland"), and every service page links to its 2–3 related posts. Add each post to `llms.txt`.

### 3.4 Internal linking
- Service pages currently link to other services only through the nav and footer. Add a **"Related services"** block per page: Airtable ↔ AI Automation ↔ Spreadsheets, and Power BI ↔ Looker Studio ↔ Spreadsheets. Use keyword-descriptive anchors, not "Learn more →". The homepage "Learn more →" links are 6 identical anchors; change them to "Airtable consulting →" and so on.
- Add visible **breadcrumbs** (Home › Airtable Consulting) to match the `BreadcrumbList` schema.

---

## 4. Prioritised Execution Roadmap

### Phase A: Quick wins (≈1 day; low effort, high impact on indexing)
- [ ] Verify the domain in **Google Search Console** and **Bing Webmaster Tools** (import from GSC), submit `sitemap.xml`, and request indexing for all 8 URLs.
- [ ] Check DNS: the apex has GitHub `A`/`AAAA` records, the apex 301s to `https://www.`, and **Enforce HTTPS** is ticked.
- [ ] Rewrite all 8 `title`/`description` values with Auckland/NZ (table in §2.1).
- [ ] Homepage H1 → entity statement. Add the answer-first lead paragraph (§1.3).
- [ ] Fix the copy defects: the "industries including —" sentence, the duplicate "Airtable Systems" hero card, the empty `<p>` on AI Consulting, "GPT-4o" → model families, "Let us Build" → "Let's build", "clients worldwide" → "across New Zealand and Australia", and singular vs plural "team" claims.
- [ ] Rename `last_modified` → `last_modified_at` in all pages (fixes sitemap `<lastmod>`).
- [ ] Wrap `{{ content }}` in `<main id="main">`. Change card `<h4>` → `<h3>` and homepage `sc-title`/`why-title`/`ai-feature-title` → `<h3>`.
- [ ] Delete `icons`, `Icons/`. Add `verify.sh` to `exclude:`. Make the footer year dynamic.
- [ ] Create a **Google Business Profile** (service-area, Auckland) and **LinkedIn company page** with identical NAP.
- [ ] Update `robots.txt` (§1.5) and check Cloudflare (if used) isn't blocking AI bots.

### Phase B: Technical foundations (≈2–4 days; schema + AIO configuration)
- [ ] Replace `_includes/schema-org.html` with the site-wide `@graph` (§2.2.1) and include it on **every** page.
- [ ] Add `_includes/schema-page.html` (§2.2.2) and the service/faq front matter for all 6 service pages (§2.2.3).
- [ ] Render the `faq` front matter visibly on each page, plus visible breadcrumbs.
- [ ] Add an "At a glance" `<dl>` block to each service page (§1.3).
- [ ] `head.html`: Twitter/OG image tags, `max-image-preview:large`, favicon set, `rel="alternate"` to llms.txt. Create a 1200×630 OG image.
- [ ] Fonts: `<link rel=preconnect>` + `<link>` in head instead of `@import`; cut weights. Logo → SVG/WebP with width/height.
- [ ] Cache-busting `?v=` on CSS/JS. Optional: Cloudflare in front for 1-year asset caching + Brotli.
- [ ] IndexNow key file + GitHub Action (§2.3).
- [ ] Upgrade `llms.txt` (Key facts, Proof, Optional) and publish a hand-maintained `llms-full.txt`.
- [ ] GA4: `generate_lead` event on form success. Build the AI-referral segment and the monthly prompt-tracking sheet (§1.4C).
- [ ] Add `aria-hidden="true" focusable="false"` to decorative SVGs. Change the nav toggles to `<button>`.
- [ ] Validate with schema.org validator + Rich Results Test, then re-run `verify.sh`.

### Phase C: Content expansion (weeks 2–12; long-tail + AI discovery)
- [ ] **`/about/`**: founder bio, headshot, credential verification link, LinkedIn → `Person` schema.
- [ ] **3 case studies** (minimum) with named stack + quantified outcomes; then grow to 5–8.
- [ ] **`/airtable-ai-automation/`**: the intersection page.
- [ ] **`/pricing/`** (or a pricing section per service) with NZD ranges.
- [ ] **`/how-we-work/`**, **`/faq/`**, **`/privacy/`**.
- [ ] Rewrite each service page body to 900–1,400 words: answer-first intro, at-a-glance, entities from §3.1, a real-world example, FAQs, related services. Remove adjective-only lines.
- [ ] Add a sector section or `/industries/` covering NFP and public sector (this also fixes the llms.txt mismatch).
- [ ] Launch `/insights/` (Jekyll `_posts` + `jekyll-feed`). Publish the 17 topics in §3.3 at 2 per month, comparisons first (6, 7, 9), then how-tos (11, 12, 13).
- [ ] Produce 3–5 YouTube walkthroughs paired with the how-to posts, and embed them with `VideoObject` schema.
- [ ] Get listed on: the Airtable partner directory, Clutch, GoodFirms, NZBN (check the trading name), Finda/Yellow NZ, and the Power BI & Airtable community profiles. Add each URL to `sameAs`.
- [ ] Ask every past client for a Google review that mentions the tool and outcome. Target 10 reviews within 90 days.
- [ ] Monthly: run the 20-prompt AI visibility panel, check GSC queries containing "auckland"/"nz", and refresh `last_modified_at` on pages you update.

### Success metrics (90 days)
| Metric | Baseline | Target |
|---|---|---|
| Indexed pages (GSC / Bing) | Unknown, likely low | 100% of sitemap URLs, including new pages |
| Branded query "RK Consulting Auckland" | No own-domain result seen | #1 with sitelinks + GBP knowledge panel |
| "Airtable consultant Auckland" (Google) | Not ranking | Top 5 |
| AI prompt panel (20 prompts × 4 engines) | 0 mentions observed | ≥15 mentions, ≥5 linked citations |
| Google reviews | 0 (no GBP seen) | 10+ |
| Leads attributed to AI referrals (GA4) | Not tracked | Tracked; >10% of form leads |

---

## Appendix: file-by-file change list

| File | Change |
|---|---|
| `_layouts/default.html` | Add `<main id="main">`. Include `schema-org.html` + `schema-page.html` on all pages. Add breadcrumb + FAQ includes. Cache-bust the JS. |
| `_includes/head.html` | Font preconnect/link, OG/Twitter image tags, robots meta, favicon set, llms.txt alternate, cache-bust the CSS. |
| `_includes/schema-org.html` | Replace with the §2.2.1 `@graph`. |
| `_includes/schema-page.html` | New (§2.2.2). |
| `_includes/nav.html` | `<button>` toggles, `aria-hidden` SVGs, `/about/` link (instead of `/#about`). |
| `_includes/footer.html` | Dynamic year. Footer headings off `<h4>`. Add links to About, Case Studies, Insights and Privacy. Add social links. |
| `index.html` | Entity H1 + lead. Fix copy defects. `<h3>` for card titles. Descriptive anchors. Testimonials + case-study teasers. |
| 6 service pages | New title/description, `last_modified_at`, `breadcrumb`, `service`, `faq` front matter. At-a-glance block. `<h4>`→`<h3>`. Entity-rich rewrite. Related services. |
| `contact.html` | "Let's build…", Auckland/NZ service area, `<dl>` for contact facts. |
| `css/style.css` | Remove `@import`. Update `h4` selectors → `h3`. Add styles for `.at-a-glance`, `.faq`, breadcrumbs. |
| `js/contact.js` | GA4 `generate_lead` event. |
| `robots.txt`, `llms.txt` | §1.5 versions. New `llms-full.txt`. |
| `_config.yml` | Exclude `verify.sh`. Optionally add the `jekyll-feed` plugin and a `collections`/`_posts` setup. |
| Delete | `icons`, `Icons/`. |
| New | `.github/workflows/indexnow.yml`, `<indexnow-key>.txt`, `about.html`, `case-studies/…`, `airtable-ai-automation.html`, `pricing.html`, `how-we-work.html`, `faq.html`, `privacy.html`, `images/og-default.png`, favicon set. |

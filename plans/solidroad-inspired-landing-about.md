# Solidroad-Inspired UI Plan for Landing + About

## Summary
Implement the landing page and About Us page using the same architectural pattern that works well in the `evlog` docs app:

- keep `nuxt.config.ts` as a Docus extension point, not a custom app rewrite
- use app-layer overrides and composition for header/footer/navigation
- special-case only the marketing routes
- keep the landing content authored in MDC so copy stays localized and editable
- build the actual UI with custom Vue components

The visual direction should borrow the structure and restraint of the Solidroad reference, while staying on-brand for a carbon handbook:

- dark carbon background
- deep forest green surfaces
- pale sage neutrals
- clean editorial sans typography
- rounded cards and compact CTA buttons
- minimal scroll motion only

This plan is UI-specific. It does not change the handbook content tree or article page information architecture.

## Product Boundaries
- Redesign only:
  - `/en`
  - `/vi`
  - `/en/about-us`
  - `/vi/about-us`
- Keep all handbook article URLs unchanged.
- Keep the docs article layout, left navigation, TOC, assistant panel, and search behavior intact unless a marketing route needs a route-aware override.
- Do not introduce a second design system for docs pages; add a marketing layer that applies only to landing/about.

## Architecture Pattern

### 1. Docus integration
Keep the current `extends docus` setup in `nuxt.config.ts` and continue treating the app layer as the place for marketing overrides.

Implementation decisions:

- `nuxt.config.ts`
  - keep the existing Docus-based architecture
  - do not add custom redirect rules for v1
  - do not add a new motion library for v1
- `app/app.config.ts`
  - add a small `marketing` config section for shared CTA labels, navigation labels, and route-aware behavior flags
  - keep existing `ui` overrides for docs pages
- `app/assets/css/main.css`
  - add a dedicated marketing token block and utility classes
  - do not replace the docs page body styles already in place

### 2. Special-case the localized homepages
Use the evlog pattern of a dedicated page component for the landing page rather than relying on the generic docs catch-all route.

Implementation decisions:

- create `app/pages/[lang]/index.vue`
  - this page handles `/en` and `/vi`
  - set `definePageMeta({ layout: false })`
  - fetch the localized content document at the current route path from the relevant docs collection
  - render the page through `ContentRenderer`
  - own SEO metadata for the marketing homepage
- keep `app/pages/[[lang]]/[...slug].vue` for all handbook article routes
- keep `app/pages/about-us.vue` as the special-case About page entry point

This preserves the current docs routing while giving the landing page its own rendering behavior.

### 3. Content-driven landing composition
Follow evlog’s MDC pattern: localized content files orchestrate the page, custom Vue components implement the UI.

Implementation decisions:

- convert `content/en/index.md` and `content/vi/index.md` into MDC composition pages
- the content files should mount custom sections such as:
  - `landing-hero`
  - `landing-trust-strip`
  - `landing-parts-grid`
  - `landing-readiness`
  - `landing-about-preview`
  - `landing-cta`
- keep all major copy localized in the MDC files
- keep handbook route links hardcoded in the localized MDC so editors can change copy and destination text without touching Vue logic

This keeps the landing page editable by content authors while moving layout complexity into reusable components.

## Visual System

### 1. Tone
Use a premium institutional tone, not startup neon and not plain academic white.

The page should feel:

- serious
- modern
- calm
- high-trust
- visually polished without being flashy

### 2. Tokens
Adopt a Solidroad-like token system, but keep green as the dominant accent instead of borrowing any off-brand highlight color.

Base token targets:

- background: near-black carbon
- surface: deep forest green / charcoal green
- elevated surface: slightly lighter sage-green black
- border: thin pale-sage translucent border
- text primary: soft off-white
- text secondary: desaturated sage-gray
- accent primary: clean fresh green
- accent soft: pale sage chip/background

Recommended implementation tokens:

- `--marketing-bg`
- `--marketing-surface`
- `--marketing-surface-2`
- `--marketing-border`
- `--marketing-text`
- `--marketing-muted`
- `--marketing-accent`
- `--marketing-accent-soft`
- `--marketing-glow`

### 3. Type system
The visual reference relies heavily on typography. The marketing pages should get their own font styling instead of inheriting the docs article rhythm.

Implementation decisions:

- load a Matter-like editorial sans via `@nuxt/fonts`
- use a practical production fallback if Matter is unavailable; default choice: `Manrope`
- marketing type scale:
  - hero title: `clamp(3rem, 7vw, 5rem)`
  - section title: `clamp(2rem, 4vw, 3rem)`
  - lead paragraph: `1.125rem` to `1.25rem`
  - body: `0.95rem` to `1rem`
  - eyebrow / meta labels: `0.75rem` uppercase with increased tracking
- use tighter letter-spacing for hero and section headlines than docs articles

### 4. Spacing, radius, and surfaces
Use a consistent marketing spacing rhythm distinct from the prose flow of docs pages.

Implementation decisions:

- spacing scale: 8px base rhythm
- button radius: 12px
- chip / pill radius: 9999px
- card and media radius: 24px
- section vertical spacing: large, with clear contrast between hero, content bands, and CTA sections
- shadows: restrained, mostly inset border + soft ambient lift, not floating glassmorphism

## Shared Chrome Plan

### 1. Header override
Create route-aware app-level header components, using evlog’s override/composition model rather than replacing Docus entirely.

Files to add:

- `app/components/app/AppHeader.vue`
- `app/components/app/AppHeaderCenter.vue`
- `app/components/app/AppHeaderCTA.vue`

Behavior:

- on marketing routes (`/en`, `/vi`, `/en/about-us`, `/vi/about-us`)
  - header is transparent or low-chrome on initial load
  - header becomes more solid after scroll
  - nav is short and marketing-oriented
  - CTA points into the handbook
- on docs routes
  - header stays closer to the current Docus behavior
  - preserve search and assistant access

Marketing-route nav items:

- Handbook
- What’s Inside
- About Us
- locale switch

CTA behavior:

- landing routes: prominent “Open the handbook” button
- about routes: smaller CTA back into the handbook
- docs routes: optional subtle CTA only if it does not clutter the header

### 2. Footer override
Create `app/components/app/AppFooter.vue`.

Behavior:

- hide the global footer on landing routes
- render the footer inline inside the final landing CTA band instead
- keep a compact global footer on About and docs routes

This mirrors the evlog pattern where landing feels like a standalone marketing surface.

## Landing Page UI Spec

### 1. Section model
The landing page should be a sequence of six sections:

1. Hero
2. Trust strip
3. Handbook parts grid
4. SME readiness / value section
5. About preview
6. Final CTA

### 2. Component plan
Files to add:

- `app/components/landing/LandingHero.vue`
- `app/components/landing/LandingTrustStrip.vue`
- `app/components/landing/LandingPartsGrid.vue`
- `app/components/landing/LandingReadiness.vue`
- `app/components/landing/LandingAboutPreview.vue`
- `app/components/landing/LandingCta.vue`
- `app/components/landing/LandingSection.vue`

`LandingSection.vue` should be the thin wrapper component equivalent to evlog’s `LandingFeatures.vue`: section spacing, container width, optional intro slot, and reveal behavior.

### 3. Hero spec
Goal: communicate authority, explain the handbook, and get users into the content quickly.

Layout:

- two-column desktop layout
- stacked mobile layout
- left: eyebrow, headline, lead, supporting sentence, primary CTA, secondary CTA
- right: layered visual panel using the handbook cover image and two or three compact info cards

Hero content blocks:

- eyebrow: “Carbon Market Handbook”
- title: localized handbook positioning for Vietnamese SMEs
- lead: one concise paragraph
- supporting line: practical scope of the guide
- primary CTA: first article / first handbook chapter
- secondary CTA: switch locale or About page

Hero visual panel:

- use `cover_en.webp` or `cover_vi.webp` depending on locale
- add one stat or benefit card overlay
- add one “what this guide covers” mini card
- do not use terminal metaphors or animated dashboards

### 4. Trust strip
Goal: show institutional legitimacy immediately after the hero.

Content:

- VinUniversity
- British Council
- editorial team / research framing

Style:

- slim band under hero
- low-contrast icons or logo marks
- short trust statements, not full paragraphs

### 5. Handbook parts grid
Goal: provide a clean marketing overview of the six handbook parts.

Layout:

- 2 columns on tablet
- 3 columns on desktop
- stacked on mobile

Card contents:

- part icon
- part title
- one-sentence summary
- link into the part root route

Interaction:

- hover lift
- border accent
- optional subtle icon tint shift

### 6. SME readiness section
Goal: translate the handbook from “content” into “outcome”.

Suggested three-card structure:

- understand carbon concepts and policy
- prepare measurement, MRV, and project pathways
- evaluate finance, governance, and market participation

Style:

- darker band than surrounding sections
- simple cards or split layout
- no dense statistics unless real numbers are available

### 7. About preview
Goal: bridge from the handbook to the people and institutions behind it.

Layout:

- one intro block
- 2–3 compact people cards
- one partner card or strip
- CTA to `/[lang]/about-us`

This should preview the About page, not duplicate it.

### 8. Final CTA
Goal: give a clear end-of-page action and close the marketing narrative.

Content:

- headline
- short supporting text
- primary button into the handbook
- secondary button to About or locale switch

Style:

- strongest green contrast section on the page
- integrated micro-footer content if the global footer is hidden

## About Us UI Spec

### 1. Refactor approach
The existing `AboutUsPage.vue` is already a custom page, but it is too monolithic to serve as the foundation for the new marketing system.

Implementation decisions:

- keep `app/pages/about-us.vue`
- keep `content/en/about-us.md` and `content/vi/about-us.md` as thin wrappers mounting `<AboutUsPage />`
- refactor `AboutUsPage.vue` into a page orchestrator
- move the current people, partner, and focus-area data out of the component into `app/data/about.ts`

Files to add:

- `app/data/about.ts`
- `app/components/about/AboutHero.vue`
- `app/components/about/AboutLeadershipGrid.vue`
- `app/components/about/AboutEditorsGrid.vue`
- `app/components/about/AboutFocusAreas.vue`
- `app/components/about/AboutPartners.vue`
- `app/components/about/AboutContactCta.vue`

### 2. Section model
The About page should use the same marketing tokens as landing, but with less dramatic hierarchy.

Sections:

1. About hero
2. Leadership grid
3. Editorial team grid
4. Focus areas / methodology
5. Partner institutions
6. Contact CTA

### 3. About hero
Layout:

- left-aligned copy
- optional right-side institution card or visual block
- direct CTA back to handbook
- locale switch as secondary action

Tone:

- institutional
- clear and concise
- more descriptive than the landing hero

### 4. Leadership and editor cards
Card behavior:

- consistent image/aspect ratio
- compact organization line
- no decorative over-animation
- subtle hover only

Grid behavior:

- leadership section visually prioritized
- editors section denser and more compact

### 5. Focus areas and partners
Focus area cards:

- icon
- short title
- one concise explanatory paragraph

Partner section:

- large logo lockups
- one supporting sentence per institution
- clear outbound link treatment

### 6. Contact CTA
This should mirror the landing CTA tone, but with lower intensity.

Content:

- clear contact heading
- partnership / inquiry description
- primary email CTA

## Motion and Interaction Plan

### 1. Motion system
Follow the evlog principle of intentional motion, but keep it much lighter.

Implementation decisions:

- do not add `motion-v` in v1
- use native `IntersectionObserver` plus CSS classes for reveal-on-scroll
- create one reusable reveal utility or composable
- respect `prefers-reduced-motion`

Allowed motion:

- fade + translate section reveals
- gentle background drift on hero ornaments
- subtle card hover lift
- header background transition on scroll

Explicitly avoid:

- autoplay dashboards
- terminal simulations
- tabbed code demos
- long chained animations

### 2. Scroll behavior
Marketing routes only:

- smooth reveal of sections as they enter viewport
- optional thin scroll-progress accent at the top edge
- no pinned scrollytelling panels

## File and Change Plan

Update existing files:

- `nuxt.config.ts`
  - keep Docus extension strategy
  - add only font/module changes required by the marketing design
- `app/app.config.ts`
  - add `marketing` config for labels and route-aware CTA copy
- `app/assets/css/main.css`
  - add marketing tokens, shared section utilities, reveal classes, and route-specific marketing styles
- `content/en/index.md`
  - replace current hero HTML + default feature list with MDC composition using custom landing components
- `content/vi/index.md`
  - same as English, localized
- `app/components/AboutUsPage.vue`
  - reduce to orchestration or replace with compositional version

Add new files:

- `app/pages/[lang]/index.vue`
- `app/components/app/AppHeader.vue`
- `app/components/app/AppHeaderCenter.vue`
- `app/components/app/AppHeaderCTA.vue`
- `app/components/app/AppFooter.vue`
- `app/components/landing/LandingSection.vue`
- `app/components/landing/LandingHero.vue`
- `app/components/landing/LandingTrustStrip.vue`
- `app/components/landing/LandingPartsGrid.vue`
- `app/components/landing/LandingReadiness.vue`
- `app/components/landing/LandingAboutPreview.vue`
- `app/components/landing/LandingCta.vue`
- `app/components/about/AboutHero.vue`
- `app/components/about/AboutLeadershipGrid.vue`
- `app/components/about/AboutEditorsGrid.vue`
- `app/components/about/AboutFocusAreas.vue`
- `app/components/about/AboutPartners.vue`
- `app/components/about/AboutContactCta.vue`
- `app/data/about.ts`

## Testing and Acceptance
- Landing pages at `/en` and `/vi` render through the dedicated marketing route, not the generic docs article page.
- Landing content remains editable through localized MDC files.
- Header and footer change behavior on marketing routes without regressing docs article pages.
- Landing pages visually reflect the Solidroad-inspired direction:
  - dark carbon background
  - forest green surfaces
  - pale sage contrast
  - restrained premium typography
  - minimal motion
- About page preserves all current team, partner, and contact information.
- Mobile layout is fully usable:
  - hero stacks cleanly
  - part cards remain readable
  - about grids collapse predictably
  - CTA buttons remain full-width or easily tappable
- Reduced motion disables reveal effects cleanly.
- Existing docs routes, side navigation, TOC, and assistant behavior still work.

## Non-Goals
- do not redesign article page typography or prose layout in this phase
- do not restructure the handbook content tree
- do not add complex animated demos in the style of evlog’s terminal sections
- do not introduce a second documentation site or a split marketing/docs app

## Assumptions
- The evlog repo is the structural reference for Docus composition and route-aware chrome.
- The Solidroad export is the visual reference for the landing UI system.
- The landing page will be built with custom Vue components mounted from localized MDC files.
- Green remains the brand accent; the final UI should not import non-brand accent colors from the reference site.

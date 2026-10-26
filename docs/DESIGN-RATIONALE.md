# Design rationale (Phase 1 homepage)

**Direction: Timeless Riverside Elegance**, as approved.

## The one memorable thing: the waterline

A hairline in bronze with a river-gauge scale hanging from it marks the join between the hero photograph and the page. It draws across once on load and appears again at the top of the footer. It is the only recurring decoration. The hotel stands on a quay, and gauges like this are what you find at a river's edge.

The hero text sits on a solid white panel that rises from the page into the photograph and ends on the waterline, so contrast never depends on the photograph.

## Type

Typography experiment 2 (the Newsreader / Hanken Grotesk direction is in git at `15a7fa7`):

- Headings: Montserrat Regular. Text and interface: Open Sans Regular. Both are open source (SIL OFL), self-hosted, and both were loaded by the original site.
- Fluid scale from `--step--1` to `--step-4` between 360 and 1280px wide. Body 16 to 17px; H3 19 to 23px, H2 24 to 32px, H1 28 to 46px; lines held to about 62 characters, line height 1.65 for text.
- Quiet by design: regular weights only, sentence case, no oversized display type. Details and the history are in `docs/TYPOGRAPHY.md`.
- Neither font covers Khmer; Noto Sans Khmer is the planned partner later.

## Colour

Pure white `#FFFFFF` for the page, header, hero panel and content sections, as on the existing Amanjaya website. The earlier beige/ivory background was dropped because it read as a generic template. Text is charcoal `#333333`. Teak `#5B3F2C` is the accent for headings, buttons and the darker dining band, and muted bronze `#8C6A3F` (deep `#6B4E2C` for links, light `#D2B686` on dark) is used for hairlines, the waterline and small accents. Secondary text is a neutral grey `#5C5C5C`; the footer is charcoal. No tinted or beige surfaces remain.

Contrast (WCAG AA): charcoal on white 12.6, teak on white 9.6, grey on white 6.7, deep bronze on white 7.6, bronze on white 4.9, white on teak 9.6, soft white on teak 7.0, light bronze on teak 4.9 and on charcoal 6.5.

## Choices against the defaults

- No centred headline over a photo; no numbered markers on the rooms (they are not a sequence); no caps eyebrows; no arrow glyphs; no identical rounded cards.
- Suites: a four-card photographic grid, as on the original site: photo, name, one-line description, starting price on a bronze hairline, and an Explore button. Four across from 72rem, two across below, one on phones. Prices come from `src/data/pricing.ts` and are labelled indicative.
- Dining sits on a teak band with a deliberate stagger between the two venues.
- Motion: one load moment (photo settles, waterline draws), plus responses to the visitor's own actions. All of it is off under `prefers-reduced-motion`.

## Performance and access

- Static HTML. JavaScript is only the mobile menu button (about 20 lines); the page works without it.
- Photographs are committed locally and processed to responsive WebP sets; the hero loads eagerly with high priority, everything else lazily, with fixed aspect ratios to avoid layout shift.
- Skip link, visible focus rings, landmarks, one `h1`, sensible heading order.
- `noindex` meta tag, `robots.txt` disallow-all and an `X-Robots-Tag` header file for Cloudflare Pages.

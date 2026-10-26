# Design rationale (Phase 1 homepage)

**Direction: Timeless Riverside Elegance**, as approved.

## The one memorable thing: the waterline

A hairline in bronze with a river-gauge scale hanging from it marks the join between the hero photograph and the page. It draws across once on load and appears again at the top of the footer. It is the only recurring decoration. The hotel stands on a quay, and gauges like this are what you find at a river's edge.

The hero text sits on a solid white panel that rises from the page into the photograph and ends on the waterline, so contrast never depends on the photograph.

## Type

Typography experiment 2 (the Newsreader / Hanken Grotesk direction is in git at `15a7fa7`):

- Headings and interface (nav, buttons): Montserrat Regular, open source (SIL OFL) and self-hosted. Body paragraphs: the original site's Helvetica, as a system stack (`Helvetica Neue`, Helvetica, Arial, sans-serif) with no font files bundled. Open Sans was dropped (typography experiment 3, see `docs/TYPOGRAPHY.md` section 6).
- Fluid scale from `--step--1` to `--step-4` between 360 and 1280px wide. Main paragraphs 17.6px (1.1rem), line height 1.7, letter spacing 0.4px; H3 19 to 23px, H2 24 to 32px, H1 28 to 46px; lines held to about 62 characters, line height 1.65 for text.
- Quiet by design: regular weights only, sentence case, no oversized display type. Details and the history are in `docs/TYPOGRAPHY.md`.
- Neither font covers Khmer; Noto Sans Khmer is the planned partner later.

## Colour

Pure white `#FFFFFF` for the page, header, hero panel and content sections, as on the existing Amanjaya website. The earlier beige/ivory background was dropped because it read as a generic template. Text is charcoal `#333333`. Teak `#5B3F2C` is the accent for headings and buttons, and muted bronze `#8C6A3F` (deep `#6B4E2C` for links, light `#D2B686` on dark) is used for hairlines, the waterline and small accents. Secondary text is a neutral grey `#5C5C5C`; the footer is charcoal. No tinted or beige surfaces remain.

Contrast (WCAG AA): charcoal on white 12.6, teak on white 9.6, grey on white 6.7, deep bronze on white 7.6, bronze on white 4.9, white on teak 9.6, soft white on teak 7.0, light bronze on teak 4.9 and on charcoal 6.5.

## Choices against the defaults

- No centred headline over a photo; no numbered markers on the rooms (they are not a sequence); no caps eyebrows; no arrow glyphs; no identical rounded cards.
- Suites: a full-width photographic mosaic modelled on the existing homepage. Two rows, panels 58/42 then 40/60, 5px gutters, 350 to 400px high. Each photograph fills its panel, with the room name, tagline, starting price and a thin outlined Explore button in white over a black gradient rising from the bottom (the gradient follows the text height; overlay text measures at least 5.3:1 against the brightest pixels behind it). One discreet note says the prices are indicative. On phones the four panels stack. Prices come from `src/data/pricing.ts`.
- Rooftop & Dining: two alternating editorial rows on white. Le Moon has its photograph on the left, Sombok on the right, each photograph 57% of the content width, with a name, a short descriptor, a 20 to 30 word description and a plain "Discover" link. No coloured band, cards or decoration. Phones stack photo above text. Images are temporary; see `docs/DINING-PHOTOS.md`.
- Motion: one load moment (photo settles, waterline draws), a gentle fade-in-up as sections scroll into view (selective, once only, staggered by 100ms; see `docs/MOTION.md`), plus responses to the visitor's own actions. All of it is off under `prefers-reduced-motion`.

## Performance and access

- Static HTML. JavaScript is the mobile menu button (about 20 lines) and the scroll-reveal observer (about 40 lines, no library); the page works fully without either, and content is never hidden unless the script has run.
- Photographs are committed locally and processed to responsive WebP sets; the hero loads eagerly with high priority, everything else lazily, with fixed aspect ratios to avoid layout shift.
- Skip link, visible focus rings, landmarks, one `h1`, sensible heading order.
- `noindex` meta tag, `robots.txt` disallow-all and an `X-Robots-Tag` header file for Cloudflare Pages.

# Design rationale (Phase 1 homepage)

**Direction: Timeless Riverside Elegance**, as approved.

## The one memorable thing: the waterline

A hairline in bronze with a river-gauge scale hanging from it marks the join between the hero photograph and the page. It draws across once on load and appears again at the top of the footer. It is the only recurring decoration. The hotel stands on a quay, and gauges like this are what you find at a river's edge.

## The hero

A full-width, immersive photograph with the text set directly on it in white Montserrat. It replaced the earlier white text panel.

- **Photograph.** A couple taking a selfie in front of the Royal Palace (`src/assets/photos/amanajaya-hero.webp`, 2048px, uploaded by the hotel team; its source and licence are still to be confirmed). The previous hero, the couple in front of the hotel, is kept as option E in `src/content/home.ts` with its exact crops (`PUBLIC_HERO_OPTION=E npm run dev`).
- **Words.** Headline: "Your Phnom Penh story begins here." (Medium 500, up to 40px). Beneath it, in the same block and on the same left edge: "Discover Phnom Penh from Amanjaya Pancam, your riverside retreat." (Regular 400, 15 to 17px, so clearly quieter). Both wrap to two balanced lines at every width, and "Phnom Penh" and "Amanjaya Pancam" never split across lines.
- **Placement.** From 72rem (1152px) the block sits at the upper right, over the open sky and clear of the couple and the palace spire. Below that, including tablets and phones, it sits at the foot of the photograph, below both faces. (On narrower desktops the block cannot avoid the spire and the couple.)
- **Crops.** Focal points are set per photograph in `home.ts`: `position` for desktop (50% 20%, so the raised phone stays in frame even when the hero height is capped on very wide screens) and `positionMobile` for phones (50% 35%, a narrow window centred on the two faces, which span about 35% to 55% across the photograph). Both faces are fully visible at every width tested, from 360 to 1920px.
- **No colour treatment.** The only overlay is neutral black: on wide screens a soft shade rising from the top-right corner, strongest behind the text and gone before the couple, so it reads as light falloff rather than a patch; below 72rem a gradient rising from the bottom. No golden, brown or blend-mode filter.
- **Readability, measured** against the brightest pixels behind the text, from 360 to 1920px: headline 4.0:1 or better at the worst point; supporting line 4.2:1 or better at the worst point, with the typical pixel at 4.6:1 or better. AA asks 3:1 for large text and 4.5:1 for small.
- The waterline still marks the join between photograph and page and draws once on load; the photograph settles once on load (off under reduced motion). Responsive WebP sizes are generated up to the original 2048px (not enlarged); loaded eagerly with high priority.
- `docs/screenshots/hero-text-left-comparison.jpg` shows a left-hand text block, made with the previous hotel photograph.

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

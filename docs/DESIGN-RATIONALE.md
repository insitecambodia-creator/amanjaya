# Design rationale (Phase 1 homepage)

**Direction: Timeless Riverside Elegance**, as approved.

## The waterline

A hairline in bronze with a river-gauge scale hanging from it. It no longer sits under the hero, which now runs straight into the first white section; the only remaining instance is the top edge of the footer (`.waterline--light`). If the homepage should be free of it entirely, delete that one `<span>` in `SiteFooter.astro` and the `.waterline` rules in `global.css`.

## The hero

A full-width, immersive photograph with the text set directly on it in white Montserrat. It replaced the earlier white text panel, and nothing sits beneath it: the second booking button, the address strip and the hero waterline were removed so the photograph does the work. Booking stays in the header (and the footer); the address is in the Riverside section and the footer.

- **Photograph.** A couple taking a selfie in front of the Royal Palace (`src/assets/photos/amanajaya-hero.webp`, 2048px, uploaded by the hotel team; its source and licence are still to be confirmed). The previous hero, the couple in front of the hotel, is kept as option E in `src/content/home.ts` (`PUBLIC_HERO_OPTION=E npm run dev`).
- **Words.** Headline: "Your Phnom Penh story begins here." (Medium 500, up to 40px). Beneath it, in the same block and on the same left edge: "Discover Phnom Penh from Amanjaya Pancam, your riverside retreat." (Regular 400, 15 to 17px, so clearly quieter). Both wrap to two balanced lines at every width, and "Phnom Penh" and "Amanjaya Pancam" never split across lines. Both are left-aligned.
- **Placement.** From 72rem (1152px) the block sits on the right, vertically centred (measured at 50% of the hero's height at every width), aligned with the right edge of the page content. Its left edge stays clear of the woman's hat. Below 72rem, including tablets and phones, the block sits at the foot of the photograph, under both faces.
- **Crops.** Focal points are set per photograph in `home.ts`: `position` for desktop (50% 20%) and `positionMobile` for phones (50% 35%, a narrow window on the two faces). Both faces are fully visible at every width tested, 360 to 1920px.
- **No colour treatment.** The only overlay is neutral black. From 72rem the text sits on a flat panel (65% black, 4px corners, no blur) on the right, clear of the couple, and the sky and palace stay as photographed (an earlier radial vignette read as a dark smudge on the sky and was removed). Below 72rem, including phones, there is no panel: the text sits at the foot of the photograph on a gradient rising from the bottom. No golden, brown or blend-mode filter. The hotel's name in the supporting line is set in a light bronze (`#dfc392`, semi-bold). The lightest 5% of the backdrop behind every line gives at least 4.8:1 for it and 6.4:1 for the white text, at every width tested from 360 to 1920px.
- **Readability, measured** against the brightest pixels behind the text, 360 to 1920px: headline 3.9:1 or better at the worst point (typically 4.7 to 11:1); supporting line 4.3:1 or better at the worst point. AA asks 3:1 for large text and 4.5:1 for small.
- The photograph settles once on load (off under reduced motion). Responsive WebP sizes are generated up to the original 2048px (not enlarged); loaded eagerly with high priority.
- Under 360px wide the header has no room for the Book Your Stay button, so the link moves into the menu panel.
- Layout history: a centred, upper-third version existed briefly and was replaced by this one. `docs/screenshots/hero-text-left-comparison.jpg` is an earlier experiment with a left-hand block on the previous photograph.

## Type

Typography experiment 2 (the Newsreader / Hanken Grotesk direction is in git at `15a7fa7`):

- **Current: headings and interface in Montserrat (section headings and room titles Light 300 at 30 to 34px and 36 to 40px, sub-headings Regular 400), body Helvetica 14px with character spacing 20 (0.02em), line height 28px, dark grey `#5F5F5F` (the design file's values); see `docs/TYPOGRAPHY.md` section 7.** A serif heading trial was dropped. Montserrat is open source (SIL OFL) and self-hosted.
- Fluid scale between 360 and 1280px wide: body 14px, section headings 30 to 34px, room titles 36 to 40px, sub-headings 19 to 23px; paragraphs held to about 52 characters of the font's width, line height 28px.
- Quiet by design: large headings in Light, small ones in Regular, sentence case, no oversized display type. Details and the history are in `docs/TYPOGRAPHY.md`.
- Neither font covers Khmer; Noto Sans Khmer is the planned partner later.

## Colour

Pure white `#FFFFFF` for the page, header, hero panel and content sections, as on the existing Amanjaya website. The earlier beige/ivory background was dropped because it read as a generic template. Text is charcoal `#333333`. Teak `#5B3F2C` is the accent for headings and buttons, and muted bronze `#8C6A3F` (deep `#6B4E2C` for links, light `#D2B686` on dark) is used for hairlines, the waterline and small accents. Secondary text is a neutral grey `#5C5C5C`; the footer is charcoal. No tinted or beige surfaces remain.

Contrast (WCAG AA): charcoal on white 12.6, teak on white 9.6, grey on white 6.7, deep bronze on white 7.6, bronze on white 4.9, white on teak 9.6, soft white on teak 7.0, light bronze on teak 4.9 and on charcoal 6.5.

## Choices against the defaults

- No centred headline over a photo; no numbered markers on the rooms (they are not a sequence); no caps eyebrows; no arrow glyphs; no identical rounded cards.
- Suites: a full-width photographic mosaic modelled on the existing homepage. Two rows, panels 58/42 then 40/60, 5px gutters, 350 to 400px high. Each photograph fills its panel, with the room name, tagline, starting price and a thin outlined Explore button in white over a black gradient rising from the bottom (the gradient follows the text height; overlay text measures at least 5.3:1 against the brightest pixels behind it). One discreet note says the prices are indicative. On phones the four panels stack. Prices come from `src/data/pricing.ts`.
- Rooftop & Dining: two alternating editorial rows on white. Le Moon has its photograph on the left, Sombok on the right, each photograph 57% of the content width, with a name, a short descriptor, a 20 to 30 word description and a plain "Discover" link. No coloured band, cards or decoration. Phones stack photo above text. Images are temporary; see `docs/DINING-PHOTOS.md`.
- Motion: one load moment (the photograph settles), a gentle fade-in-up as sections scroll into view (selective, once only, staggered by 100ms; see `docs/MOTION.md`), plus responses to the visitor's own actions. All of it is off under `prefers-reduced-motion`.

## Accommodation pages

The Junior Suite page (`/4-types-of-rooms/junior-suite-phnom-penh/`) is the master template for the four room pages; see `docs/ROOM-TEMPLATE.md`. It keeps the homepage identity: white, Montserrat headings, Helvetica copy, one teak button, hairlines instead of cards. The photographs lead, as a large image with three stacked beside it (reproducing the approved mockup), then the facts and description (65%) beside the price and one booking button (35%), then the amenities as quiet grey line icons with centred labels. The gallery is interactive (choose a thumbnail to swap it with the large photograph, 200ms crossfade, keyboard accessible). Everything shown comes from the hotel's own page.

## Performance and access

- Static HTML. JavaScript is the mobile menu button (about 20 lines) and the scroll-reveal observer (about 40 lines, no library); the page works fully without either, and content is never hidden unless the script has run.
- Photographs are committed locally and processed to responsive WebP sets; the hero loads eagerly with high priority, everything else lazily, with fixed aspect ratios to avoid layout shift.
- Skip link, visible focus rings, landmarks, one `h1`, sensible heading order.
- `noindex` meta tag, `robots.txt` disallow-all and an `X-Robots-Tag` header file for Cloudflare Pages.

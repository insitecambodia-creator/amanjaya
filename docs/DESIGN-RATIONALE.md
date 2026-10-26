# Design rationale (Phase 1 homepage)

**Direction: Timeless Riverside Elegance**, as approved.

## The one memorable thing: the waterline

A hairline in bronze with a river-gauge scale hanging from it marks the join between the hero photograph and the page. It draws across once on load and appears again at the top of the footer. It is the only recurring decoration. The hotel stands on a quay, and gauges like this are what you find at a river's edge.

The hero text sits on a solid ivory panel that rises from the page into the photograph and ends on the waterline, so contrast never depends on the photograph.

## Type

- Headings: Newsreader (variable, light weights, optical sizes), self-hosted.
- Interface and body: Hanken Grotesk (variable), self-hosted.
- Fluid scale from `--step--1` to `--step-4`; lines held to about 62 characters.
- Both are open-source (SIL OFL). Noto Serif/Sans Khmer are the planned pair for Khmer later.

## Colour

Ivory `#EFEADD`, teak `#5B3F2C`, charcoal `#34332F`, bronze `#8C6A3F`, plus a deep bronze (`#6B4E2C`) and a light bronze (`#D2B686`) for text, and a sage-grey (`#55625B`) for secondary text. The mid bronze is only 4.1:1 on ivory, so it is used for lines and large type only. Text pairs used: charcoal on ivory 10.5, teak on ivory 8.0, deep bronze on ivory 6.3, sage on ivory 5.3, soft ivory on teak 6.1, light bronze on teak 4.9 (all WCAG AA).

## Choices against the defaults

- No centred headline over a photo; no numbered markers on the rooms (they are not a sequence); no caps eyebrows; no arrow glyphs; no identical rounded cards.
- Suites: a list of four names that opens one description and swaps one photograph, built with plain CSS radio inputs (no JavaScript, keyboard accessible). The fades run only while the visitor is using the list. On small screens each suite is listed with its photograph.
- Dining sits on a teak band with a deliberate stagger between the two venues.
- Motion: one load moment (photo settles, waterline draws), plus responses to the visitor's own actions. All of it is off under `prefers-reduced-motion`.

## Performance and access

- Static HTML. JavaScript is only the mobile menu button (about 20 lines); the page works without it.
- Photographs are committed locally and processed to responsive WebP sets; the hero loads eagerly with high priority, everything else lazily, with fixed aspect ratios to avoid layout shift.
- Skip link, visible focus rings, landmarks, one `h1`, sensible heading order.
- `noindex` meta tag, `robots.txt` disallow-all and an `X-Robots-Tag` header file for Cloudflare Pages.

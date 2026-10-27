# Amanjaya Pancam: new website

Phase 1: a homepage design prototype (static Astro). It is not connected to the live WordPress site, and it is hidden from search engines.

Project rules are in [`CLAUDE.md`](CLAUDE.md). The HTML and sitemap files in the repository root are exports of the existing site, kept as reference only.

## Preview locally

Requires Node 22.22 or newer (Astro 7).

```sh
npm install
npm run dev            # http://localhost:4321
```

To check the production build:

```sh
npm run build && npm run preview
npm run check          # type and template checks
npm run fetch:candidates   # review room-photo candidates (needs internet access to the live site)
npm run apply:room-photos   # after fetch:candidates: use the hotel's own category photos in the room mosaic
npm run extract:card-images -- post-333.css   # find the original room-card photos in the old homepage CSS
npm run audit:fonts    # report the fonts a page really renders (needs Playwright; see docs/TYPOGRAPHY.md)
PUBLIC_HERO_OPTION=B npm run dev   # preview an alternative hero (B, C or D)
```

## Photographs

The hotel's own photographs are committed in `src/assets/photos/` (never hotlinked) and processed to responsive WebP at build time. If a file is missing, its slot shows a labelled placeholder. `src/data/image-manifest.json` lists each photo's original URL and where it is used; `npm run fetch:images` re-downloads them from the existing site if ever needed. Composition notes and the hero recommendation are in `docs/PHOTO-REVIEW.md`.

## Where things live

| What | Where |
|---|---|
| Hotel facts, booking link, contact, nav | `src/config/site.ts` |
| Homepage copy and photo choices | `src/content/home.ts` |
| Room starting prices (edit here only) | `src/data/pricing.ts` |
| Colours (white, charcoal, teak, bronze), type scale (Montserrat headings and interface, Helvetica text) | `src/styles/global.css` |
| Page sections | `src/components/` |
| Sources, placeholders, questions for the hotel | `docs/CONTENT-SOURCES.md` |
| Design rationale | `docs/DESIGN-RATIONALE.md` |
| Scroll-reveal motion (how it works, how to use `data-reveal`) | `docs/MOTION.md`, `src/scripts/reveal.ts` |
| Photo review, hero options, QA notes | `docs/PHOTO-REVIEW.md` |
| Accommodation page template and the Junior Suite page (content, sources, pending photos) | `docs/ROOM-TEMPLATE.md`, `src/content/rooms.ts`, `src/components/rooms/` |
| Gallery page: photographs, groups, viewer, what is still missing | `docs/GALLERY.md`, `src/content/gallery.ts`, `src/components/gallery/` |
| Room photo shortlist | `docs/ROOM-PHOTO-CANDIDATES.md` |
| Rooftop & Dining photos: what we have and need | `docs/DINING-PHOTOS.md` |
| Type scale, original-site typography, the current heading and body-text settings | `docs/TYPOGRAPHY.md` |
| Screenshots | `docs/screenshots/` |

The booking button reads one setting (`booking.url`). It currently points at the engine's undated property page, flagged as unverified.

## Not yet done

The Deluxe, Executive and Panoramic pages (the Junior Suite page is the template), other pages, French and other languages, structured data, deployment, and the redirect map. Each waits for review.

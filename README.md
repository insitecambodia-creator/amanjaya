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
```

## Photographs

The hotel's own photographs are committed in `src/assets/photos/` (never hotlinked) and processed to responsive WebP at build time. If a file is missing, its slot shows a labelled placeholder. `src/data/image-manifest.json` lists each photo's original URL and where it is used; `npm run fetch:images` re-downloads them from the existing site if ever needed. Composition notes and the hero recommendation are in `docs/PHOTO-REVIEW.md`.

## Where things live

| What | Where |
|---|---|
| Hotel facts, booking link, contact, nav | `src/config/site.ts` |
| Homepage copy and photo choices | `src/content/home.ts` |
| Colours, type scale, waterline motif | `src/styles/global.css` |
| Page sections | `src/components/` |
| Sources, placeholders, questions for the hotel | `docs/CONTENT-SOURCES.md` |
| Design rationale | `docs/DESIGN-RATIONALE.md` |
| Photo review and hero recommendation | `docs/PHOTO-REVIEW.md` |
| Screenshots | `docs/screenshots/` |

The booking button reads one setting (`booking.url`). It currently points at the engine's undated property page, flagged as unverified.

## Not yet done

Room pages, other pages, French and other languages, structured data, deployment, and the redirect map. Each waits for review.

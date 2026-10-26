# Amanjaya Pancam: new website

Phase 1: a homepage design prototype (static Astro). It is not connected to the live WordPress site, and it is hidden from search engines.

Project rules are in [`CLAUDE.md`](CLAUDE.md). The HTML and sitemap files in the repository root are exports of the existing site, kept as reference only.

## Preview locally

Requires Node 22.22 or newer (Astro 7).

```sh
npm install
npm run fetch:images   # downloads the hotel's original photos; see below
npm run dev            # http://localhost:4321
```

To check the production build:

```sh
npm run build && npm run preview
npm run check          # type and template checks
```

## Photographs

The prototype uses the hotel's own images, saved locally in `src/assets/photos/` and never hotlinked. Until a file exists, its slot shows a labelled placeholder. `npm run fetch:images` downloads them from the existing site (it needs normal internet access to that site). The list is `src/data/image-manifest.json`. One image, Le Moon Rooftop, is missing from the export and must be supplied.

## Where things live

| What | Where |
|---|---|
| Hotel facts, booking link, contact, nav | `src/config/site.ts` |
| Homepage copy and photo choices | `src/content/home.ts` |
| Colours, type scale, waterline motif | `src/styles/global.css` |
| Page sections | `src/components/` |
| Sources, placeholders, questions for the hotel | `docs/CONTENT-SOURCES.md` |
| Design rationale | `docs/DESIGN-RATIONALE.md` |

The booking button reads one setting (`booking.url`). It currently points at the engine's undated property page, flagged as unverified.

## Not yet done

Room pages, other pages, French and other languages, structured data, deployment, and the redirect map. Each waits for review.

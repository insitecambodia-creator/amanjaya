# Room photo candidates

Question: do the existing room-page exports reference better wide-angle photographs for the Junior, Deluxe and Executive categories?

**Status: shortlisted from the exports, not yet viewed.** The build environment cannot reach the live site, so these images could not be downloaded or seen, and no stock photography has been substituted. Everything below is evidence from the exported HTML: the order of each room page's gallery, the thumbnail sizes (which give each photo's proportions), and which photos also appear on the main gallery page.

## What the exports show

- **The photos currently on the homepage were not the hotel's own lead images.** Earlier notes called them "the first image of each gallery"; that was wrong (they were picked from an alphabetical list). The room pages lead with:

  | Category | Lead slide on the room page | Used on the homepage now |
  |---|---|---|
  | Junior | `junior14` | `junior12` (2nd) |
  | Deluxe | `deluxe3` | `deluxe1` (4th, only 674x449) |
  | Executive | `executive3` | `executive12` (5th) |
  | Panoramic | `panoramic3` | `panoramic2` (2nd) |

- **16:9 images (about 1360 px wide) come from the 2020 room shoot; the 3:2 ones from the same shoot are likely smaller.** The one 3:2 file we have (`deluxe1`) is only 674 px wide. Deluxe has no 16:9 image in the exports at all, so its best option may need a new or larger photo from the hotel.
- Proportion is only a hint. 16:9 does not guarantee a wide-angle shot (the current Executive photo is 16:9 and is a headboard detail).

## Shortlist (by category)

| Category | Candidates, best bets first |
|---|---|
| Junior | `junior14` (page lead, 16:9), `junior5` (16:9), `junior6` (16:9), `junior8`, `junior13` and `junior1` (3:2) |
| Deluxe | `deluxe3` (page lead, 3:2), `deluxe5`, `deluxe2` (3:2), `deluxe4` |
| Executive | `executive3` (page lead), `executive11`, `executive9`, `executive7`, `executive10` (all 16:9 in the gallery), `executive4` |
| Panoramic (for comparison) | `panoramic3` (page lead), `panoramic7`, `panoramic8` (16:9). The current `panoramic2` is already a strong full-room shot. |
| Unplaced, 2560 px | 2024 shoot files `P1220402` (4:3), `P1220476`, `P1220487` (portrait). Subject unknown; may include interiors. |

Full file paths are in `src/data/image-manifest.json` under `candidates`.

## To finish the review (about a minute, on any machine with internet)

```sh
npm run fetch:candidates
```

This downloads the candidates to `src/assets/candidates/` (git-ignored, never used by the site) and writes a labelled contact sheet to `docs/room-photo-candidates.jpg` with each photo shown whole, with its pixel size. Pick the best per category, then add it to `images` in the manifest and point `suite-*` in `src/content/home.ts` at it.

For Deluxe in particular, if no candidate is larger than about 1,200 px, ask the hotel for the original-resolution photos rather than upscaling.

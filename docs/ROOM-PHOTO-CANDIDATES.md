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

## Update: can the original homepage card photographs be recovered?

**Short answer: not from the exports we have, but the route to them is now precise.**

What was checked, and found:

- **The exported homepage HTML contains no image reference for the four room cards.** The cards are Elementor containers (Junior `45c4fbf`, Deluxe `2737823`, Executive `661050b`, Panoramic `1789dd1`, inside outer containers `6547f68` and `4af4033`). The HTML has no inline `background-image`, and no background setting in any `data-settings`.
- **Elementor writes those backgrounds into the page's own stylesheet,** `wp-content/uploads/elementor/css/post-333.css` (333 is the homepage's page id, from the export's `<body>` class). That file was not exported, and the live site is not reachable from the build environment, so it could not be read.
- **The image sitemap does not help for the cards:** for the homepage it lists only the cover, the Sombok photo and a review image.
- **It does show which images the hotel uses as category pictures elsewhere.** The thumbnails on its offers pages are `panoramic2`, `executive7`, `junior14` (Summer Deal), and `deluxe5`, `junior2` (Pchum Ben). These are the best available hint about the hotel's own category images, and are now flagged in the manifest. Only `panoramic2` is on the page today.

Nothing was substituted: the cards use the best images we already have, and they will switch as soon as better ones are confirmed.

### To recover the originals (two minutes)

1. Save `https://www.amanjaya-suites-phnom-penh.com/wp-content/uploads/elementor/css/post-333.css` from a browser that can reach the live site, or ask the site's developer for it. It is a public file; nothing needs to be logged into.
2. Run `npm run extract:card-images -- path/to/post-333.css`. It prints each card's background image, including any tablet or mobile variants. (The extractor was tested on a synthetic sample in Elementor's format, not on the real file.)
3. Add the chosen files to `images` in `src/data/image-manifest.json`, run `npm run fetch:images`, and change `photo` for the room in `src/content/home.ts`.

If the CSS shows nothing for a card, that image was set another way (for example in a template), and `npm run fetch:candidates` plus a visual check of the shortlist above is the fallback.

## Status for the room mosaic (latest)

The "Four ways to stay" mosaic wants wide photographs of the complete rooms. **The original photographs used by the existing homepage cards could not be recovered**: they are not in the exported HTML, they were set in `post-333.css` (not exported), and the live site is unreachable from the build environment. No stock photography was used.

| Panel | Photo in the mosaic now | The hotel's own category picture (best evidence) | Status |
|---|---|---|---|
| Junior Suite | `junior12`: a cabinet and armchair corner | `junior14` | **Missing.** Not downloaded. |
| Deluxe Room | `deluxe1`: bed with a timber headboard, only 674x449 | `deluxe5` | **Missing.** Not downloaded. The current file is also low resolution. |
| Executive Suite | `executive12`: pillows and a lit headboard | `executive7` | **Missing.** Not downloaded. |
| Panoramic Suite | `panoramic2`: the whole suite with windows, bed and desk | `panoramic2` | Present. It is the hotel's own Panoramic picture and a true wide shot. |

"The hotel's own category picture" is inferred from the offers pages' thumbnails (see above), not confirmed as the exact homepage image. Whether they are wide-angle has not been checked, because they have not been seen.

**To fill the three gaps:** on a machine that can reach the live site, run `npm run fetch:candidates`, then `npm run apply:room-photos`. The second command copies `junior14`, `deluxe5` and `executive7` over the three suite photos and updates the manifest; nothing else needs to change, because the mosaic reads those files by name. Check the result with `npm run dev`. If post-333.css is available, `npm run extract:card-images -- post-333.css` will show the exact images the cards used.

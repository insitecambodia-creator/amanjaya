# Content sources, placeholders and open questions

Phase 1 homepage prototype. Primary reference: the HTML exports of the existing WordPress site that are committed in the repository root. Nothing was fetched from, or changed on, the live site.

## Where each piece of content came from

| On the page | Source in the export |
|---|---|
| Hotel name "Amanjaya Pancam", "Phnom Penh" | Header of every page; homepage title |
| "Built in 2002", corner of Sisowath Quay and Street 154 | Homepage meta description |
| Tonle Sap and Mekong location, short walk to attractions | Homepage welcome text |
| Junior Suite: 45 sqm, king bed, lounge, rosewood floor, raw silk curtains, National Museum replicas | `Junior Suite` page |
| Deluxe Room: canopy bed, bath and shower, armchairs, balcony with city views | `Deluxe Room` page |
| Panoramic Suite: 50 sqm, both rivers and the pagoda, lounge, king bed | `Panoramic Suite` page |
| Executive Suite: three suites, 90 sqm, sofa and three armchairs, desk, cherrywood | `Executive Suite` page |
| Amenities (balcony, air conditioning, desk, room service) | Amenity list, identical on all four room pages |
| Le Moon Rooftop, opened 2010, sundowners then dinner and drinks | Homepage rooftop bar block |
| Sombok, Khmer fine dining, Kimsan Twins, sister of Embassy (Siem Reap) | Homepage restaurant block |
| Address "1, Street 154", phone 081 559 748 | `Contact Us` page |
| Maps, Facebook, Instagram, TikTok, Le Moon and Sombok links | Homepage and footer links |
| Booking engine | `book-directonline.com/properties/AMANJAYAPANCAMSUITEDIRECT` (see below) |

Copy is rewritten in a quieter voice; facts are not extended.

## Images

None could be downloaded: this build environment's network policy blocks `www.amanjaya-suites-phnom-penh.com` (all 17 requests failed). No substitute stock photography was used. Every photo slot renders a labelled placeholder until the file exists.

To fill them: on a machine that can reach the live site, run `npm run fetch:images`. Files are saved to `src/assets/photos/` named by role (for example `hero.png`), and the page picks them up automatically. The full list, with original URLs, is `src/data/image-manifest.json`.

Choices were made from file names only, because the images could not be seen. Please review them once downloaded; swap any file in the manifest for a better one.

| Key | Original file | Note |
|---|---|---|
| hero | `2024/08/amh-homepage-cover.png` | The site's `og:image` (1920x1080). The live hero may be a different image; the real one is set in Elementor styles that were not exported. |
| welcome-facade, riverside, gallery-3 | `Amanjaya-facade1/2/3.jpg` | |
| welcome-lobby, gallery-2 | `Amanjaya-lobby1/2.jpg` | |
| suite-junior / deluxe / executive / panoramic | `Amanjaya-junior12`, `deluxe1`, `executive12`, `panoramic2` | First image of each room gallery |
| dining-sombok | `2021/04/sombok.jpeg` | Only 768x512 is referenced; ask for a larger original |
| gallery-1, 4 to 8 | corridor1, 2024 shoot (3 files), `IMG_3372`, `IMG_3918` | Chosen blind |

**Missing:** no Le Moon Rooftop image appears anywhere in the export. The hotel needs to supply one (`dining-le-moon`).

Alt text is written from file names and room names, not from the photographs. Revise it once the photos are in.

## Booking

One button, "Book Your Stay", set in `src/config/site.ts`. It points at the undated base URL, which appears unchanged on eight exported pages. The date-specific links (2020, 2021, 2023, 2026) and the older `thebookingbutton.com` link were not reused. `verified: false` stays until the hotel confirms the engine and URL.

## Please confirm before launch

1. Booking URL and engine (above).
2. Phone: written as "081 559 748" in the export. The prototype links it as +855 81 559 748; confirm that is correct and is the front desk.
3. Email: hidden by Cloudflare protection in the export, so omitted. Needs supplying.
4. Legal and display name. The export uses "Amanjaya Pancam", "Amanjaya Pancam Suites Hotel", "Riverside Suites Hotel" and "Amanjaya Suites" (site name).
5. "Built in 2002" is used as the hotel's own statement. The homepage also says Le Moon opened in 2010, "nearly a decade after" construction, which does not add up to 2002 (eight years). Confirm both dates.
6. Is Sombok inside the hotel? The export links to it from the homepage without saying so. The prototype lists it under dining without claiming it is on site.
7. Floor wood: Junior Suite says rosewood, Executive says cherrywood. Each is attributed to its own room.
8. Deluxe Room size is not stated anywhere in the export.

## Deliberately left out

- Room prices ("from $76.50 to $112.50"): date-sensitive, and the brief says not to show unverified prices.
- Guest reviews on the homepage: no permission or attribution check has been done.
- "4-star", spa, meeting facilities and "state-of-the-art" claims from the long homepage paragraph: not supported elsewhere in the export.
- The flash-sale countdown, last-minute offer banner and airport/visa news items.
- Deluxe Room's "15% discount on the rooftop lounge" offer.
- French language switcher: the live site offers English and French (WPML). Phase 1 is English only.
- Pages not in Phase 1: individual rooms, gallery, green hotel, blog, contact. The header links are in-page anchors.

## For the later migration (not started)

The export also includes five XML sitemaps and the pages above. These will be needed for the URL inventory and 301 redirect map, but no data extraction was done in this phase.

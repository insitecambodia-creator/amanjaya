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

The 17 original photographs are committed in `src/assets/photos/` (they could not be downloaded from the build environment, so the hotel uploaded them). `src/data/image-manifest.json` records each file's original URL on the existing site and where it is used. Files are named by role. Two are kept in `src/assets/photos/unused/`.

| Key | Original file | Shows | Used for |
|---|---|---|---|
| hero | `2024/08/022_A74240503_1929-scaled` | A couple in front of the hotel at golden hour (2560x1707) | Hero. The site's own 16:9 cover is a crop of this scene, kept as `unused/social-cover.png` for the future og:image. |
| welcome-lobby | `Amanjaya-lobby1` | Hallway with a Khmer mural and a polished wood floor | Welcome |
| welcome-balcony | `001_A74240503_037-scaled` | A couple having coffee on a private balcony | Welcome inset |
| suite-junior | `Amanjaya-junior12` | Lattice cabinet, armchair, flowers | Junior Suite |
| suite-deluxe | `Amanjaya-deluxe1` | Bed with timber headboard (**only 674x449**) | Deluxe Room |
| suite-executive | `Amanjaya-executive12` | Headboard, linen and sheer curtains | Executive Suite |
| suite-panoramic | `Amanjaya-panoramic2` | Full suite with tall windows, king bed, desk | Panoramic Suite |
| dining-le-moon | `Amanjaya-facade3` | The hotel at night with the Le Moon sign | Le Moon Rooftop (not a photograph of the bar itself) |
| dining-sombok | `sombok.jpeg` | Two chefs at the Sombok entrance (960x640) | Sombok |
| riverside | `Amanjaya-facade2` | The quay and river from a balcony (1200px wide) | Riverside |
| gallery-pagoda | `Amanjaya-facade1` | Golden stupa and pagoda roofs beside the street | Gallery |
| gallery-mural | `Amanjaya-corridor1` | Bright Khmer mural above a terracotta floor | Gallery |
| gallery-reception | `Amanjaya-lobby2` | Reception desk with the "Amanjaya Pancam Suites Hotel" sign | Gallery |
| gallery-breakfast | `010_A74240503_637-scaled` | Breakfast in bed in a suite | Gallery |
| gallery-work | `IMG_3372-scaled` | A working breakfast in a suite | Gallery |
| unused/yoga | `IMG_3918-scaled` | Two guests meditating | Left out: it would imply a wellness offer that is not confirmed |

Alt text now describes what each photograph shows. The room photographs were taken from each room page's gallery, so please confirm each one is the right lead image for its category. Several look like details rather than the whole room.

Rights: the hero, welcome, gallery and some room photographs show identifiable models. Please confirm the hotel holds usage releases for them, and for the licence plate visible in the hero.

See `docs/PHOTO-REVIEW.md` for the composition review and the hero recommendation.

## Booking

One button, "Book Your Stay", set in `src/config/site.ts`. It points at the undated base URL, which appears unchanged on eight exported pages. The date-specific links (2020, 2021, 2023, 2026) and the older `thebookingbutton.com` link were not reused. `verified: false` stays until the hotel confirms the engine and URL.

## Please confirm before launch

1. Booking URL and engine (above).
2. Phone: written as "081 559 748" in the export. The prototype links it as +855 81 559 748; confirm that is correct and is the front desk.
3. Email: hidden by Cloudflare protection in the export, so omitted. Needs supplying.
4. Legal and display name. The export uses "Amanjaya Pancam", "Amanjaya Pancam Suites Hotel", "Riverside Suites Hotel" and "Amanjaya Suites" (site name). The reception sign in the photographs reads "Amanjaya Pancam Suites Hotel".
5. "Built in 2002" is used as the hotel's own statement. The homepage also says Le Moon opened in 2010, "nearly a decade after" construction, which does not add up to 2002 (eight years). Confirm both dates.
6. Is Sombok inside the hotel? The export links to it from the homepage without saying so. The prototype lists it under dining without claiming it is on site.
7. Floor wood: Junior Suite says rosewood, Executive says cherrywood. Each is attributed to its own room.
8. Deluxe Room size is not stated anywhere in the export.

## Room prices (included on instruction)

The four starting rates are shown on the room cards: Junior Suite from $81, Deluxe Room from $76.50, Executive Suite from $112.50, Panoramic Suite from $94.50. They match the "FROM $…" figures on the exported homepage, and were confirmed by the client. They are published under the responsibility of **Avy, the marketing manager**, who should confirm them before launch.

- They live in one file, `src/data/pricing.ts`. Edit them only there.
- The page presents them as indicative starting rates with one short line under the room mosaic: "Starting rates are indicative. Availability and current rates are shown when you book." (`pricing.disclaimer`).
- The export does not say "per night" or name a currency beyond the "$" sign, so the page does not add either.
- "Explore" links to the hotel's existing room pages (the same URLs as in the homepage export), until the new room pages exist.

## Deliberately left out

- Guest reviews on the homepage: no permission or attribution check has been done.
- "4-star", spa, meeting facilities and "state-of-the-art" claims from the long homepage paragraph: not supported elsewhere in the export.
- The flash-sale countdown, last-minute offer banner and airport/visa news items.
- Deluxe Room's "15% discount on the rooftop lounge" offer.
- French language switcher: the live site offers English and French (WPML). Phase 1 is English only.
- Pages not in Phase 1: individual rooms, gallery, green hotel, blog, contact. The header links are in-page anchors.

## For the later migration (not started)

The export also includes five XML sitemaps and the pages above. These will be needed for the URL inventory and 301 redirect map, but no data extraction was done in this phase.

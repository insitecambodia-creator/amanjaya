# Accommodation page template (Phase 2)

The Junior Suite is the master template. The other three suites reuse it by adding an entry to `src/content/rooms.ts`.

## How it fits together

| Piece | Where |
|---|---|
| Route (one page per published room) | `src/pages/4-types-of-rooms/[slug]/index.astro` |
| Structured content (facts, copy, amenities, photographs) | `src/content/rooms.ts` |
| Components | `src/components/rooms/`: `RoomHero`, `RoomOverview`, `RoomAmenities`, `RoomGallery` |
| Price (one place to edit) | `src/data/pricing.ts`, keyed by the room's `id` |
| Booking link (the external boundary) | `booking` in `src/config/site.ts` |
| Photographs | `src/assets/photos/<key>.*`, registered in `src/data/image-manifest.json` |
| Shared header, footer, type, colour, `data-reveal` fade-in | as on the homepage |

The page is built at the same path the existing WordPress site uses, so URLs carry over: `/4-types-of-rooms/junior-suite-phnom-penh/`.

To add a room: add an object to `rooms` (copy the Junior entry), fill in only what the hotel's own page for that room says, set `published: true`. Nothing else changes. The slugs on the existing site are `deluxe-suite`, `executive` and `panoramic` (taken from the homepage links; confirm against each room's own export).

## Where each fact on the Junior page comes from

All from the existing page, `Junior Suite - Amanjaya Suites.html` in the repository root (canonical `https://www.amanjaya-suites-phnom-penh.com/4-types-of-rooms/junior-suite-phnom-penh/`).

- **45 sqm, king size bed, lounge area, rosewood floor, black-out curtains of Cambodian raw silk, reproductions of National Museum artefacts:** the description paragraph ("With 45 sqm of living space..."). Lightly edited for grammar ("they are expansive and relaying" became "the suite is expansive, and it gives"), and "famous" was dropped from "famous Cambodian raw silk". The facts are unchanged.
- **Amenities (11):** the "Luxurious amenities" block: private balcony, high-speed Wi-Fi ("hi speed wifi"), Malongo espresso, air conditioning, electronic safe, working desk, mini bar, slippers & robe, flat-screen TV, hair dryer, room service. The page says every suite has these standard items, so the other three pages will likely share the list, but check each export.
- **From $81:** `src/data/pricing.ts` (the figure published on the homepage; owner Avy, marketing manager). Shown as "From $81" with the same "indicative" note as the homepage. No "per night" or other wording was added.
- **Booking:** `booking.url` in `site.ts`, flagged `verified: false` there until the hotel confirms the engine and URL.

Nothing else is stated: no occupancy, view, bathroom, floor or bed-size detail was added because the export does not give them.

## Photographs

All four photographs from the existing page's carousel are in `src/assets/photos/` (supplied by the hotel team), so the page has no placeholders. The order on the new page is the team's choice; on the existing page the order is junior14, junior12, junior6, junior8.

| Page position | Key | Original (under `https://www.amanjaya-suites-phnom-penh.com/wp-content/uploads/`) | Shows | Crop |
|---|---|---|---|---|
| Main photograph | `junior-8` | `2020/09/Amanjaya-junior8.jpg` | The bed against a warm wood headboard wall with lattice panels, a square textile panel, brass reading lights; sheer curtain, small sofa, framed prints | 16:9 as is; on phones 4:3 at 75% 50%, which keeps the headboard and bed and trims the prints |
| Gallery 1 | `junior-14` | `2020/09/Amanjaya-junior14.jpg` | The work corner: desk, lamp, chair, plants, bench, tall windows onto the balcony | 3:2 at 42% 50% |
| Gallery 2 | `suite-junior` | `2020/09/Amanjaya-junior12.jpg` | A lounge corner: armchairs, lattice-fronted cabinet, marble table with flowers, framed prints | 3:2 at 60% 50% |
| Gallery 3 | `junior-6` | `2020/09/Amanjaya-junior6.jpg` | The bathroom: wooden vanity, round wall lights, wood lattice door, bathtub | 3:2 at 52% 50% |

The large photograph is the first entry in the room's `photos` list whose file exists; the rest form the gallery. To change the lead, reorder the list in `rooms.ts`. If a file is missing, its tile shows a labelled placeholder (nothing is hotlinked); run `npm run fetch:images` where the existing site is reachable to download any that are registered in the manifest.

The descriptions (alt text) say only what each photograph shows. The bathroom photograph shows a bathtub, but the amenities list is taken only from the hotel's amenities block, so no bathroom features are listed or claimed.

More Junior photographs exist on the existing site (`junior1`, `junior2`, `junior5`, `junior13`; see `candidates.rooms.junior` in the manifest) but are not on the Junior page's own carousel, so they are not used.

Photograph quality: the three photographs are 1325 to 1368px wide, so the large photograph sits within the page margins (at most 1344px) rather than running edge to edge, to avoid enlarging it.

## Design

- White page; Montserrat headings; Helvetica body copy (the `.copy` style, 17.6px, line height 1.7, 0.4px tracking).
- A large 16:9 photograph (4:3 on phones) within the page margins; then the title, facts (size, bed, starting price) and a hairline; the description beside it; and one prominent Book Your Stay button with the same "indicative rates" note as the homepage.
- A discreet "All accommodation" text link above the title returns to the room categories on the homepage (`/#suites`). The header's section links also lead back to the homepage.
- Amenities as a hairline-separated list; photographs in a row of three on wide screens, two on tablets, one on phones.
- Fade-in-up (`data-reveal`) on the same terms as the homepage: once only, off for reduced motion, content visible without JavaScript. The large photograph settles once on load, as on the homepage.

## Not done yet (for the migration)

- The other three rooms.
- The parent page `/4-types-of-rooms/` (the existing site has one; the back link goes to the homepage categories for now).
- The French page (`/fr/4-types-de-suites/suite-junior/` on the existing site), hreflang, canonical tags and structured data (the existing page has a breadcrumb: Home, 4 types of suites, Junior Suite). All wait for the multilingual and SEO phase; the preview stays `noindex`.
- A 301 map for the old URLs (the Junior path is unchanged, so it needs none).

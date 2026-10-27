# Accommodation page template (Phase 2)

The Junior Suite is the master template. The other three suites reuse it by adding an entry to `src/content/rooms.ts`.

## How it fits together

| Piece | Where |
|---|---|
| Route (one page per published room) | `src/pages/4-types-of-rooms/[slug]/index.astro` |
| Structured content (facts, copy, amenities, photographs) | `src/content/rooms.ts` |
| Components | `src/components/rooms/`: `RoomGallery`, `RoomOverview` (with `RoomBookingPanel`), `RoomAmenities` (icons chosen in `amenity-icons.ts`) |
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

All four photographs from the existing page's carousel are in `src/assets/photos/` (supplied by the hotel team), so the page has no placeholders. The order follows the approved gallery mockup (the first is the large photograph, the next three stack beside it, top to bottom); on the existing page the order is junior14, junior12, junior6, junior8.

| Position | Key | Original (under `https://www.amanjaya-suites-phnom-penh.com/wp-content/uploads/`) | Shows | Crop |
|---|---|---|---|---|
| Large photograph | `junior-8` | `2020/09/Amanjaya-junior8.jpg` | The bed against a warm wood headboard wall with lattice panels, a square textile panel, brass reading lights; sheer curtain, small sofa, framed prints | 16:9 as is; on phones 4:3 at 75% 50%, which keeps the headboard and bed and trims the prints |
| Stack, top | `junior-6` | `2020/09/Amanjaya-junior6.jpg` | The bathroom: wooden vanity, round wall lights, wood lattice door, bathtub | Fills its slot (about 1.7:1), 52% 50% |
| Stack, middle | `suite-junior` | `2020/09/Amanjaya-junior12.jpg` | A lounge corner: armchairs, lattice-fronted cabinet, marble table with flowers, framed prints | 60% 50% |
| Stack, bottom | `junior-14` | `2020/09/Amanjaya-junior14.jpg` | The work corner: desk, lamp, chair, plants, bench, tall windows onto the balcony | 42% 50% |

The gallery uses the first four entries of a room's `photos` list; reorder the list in `rooms.ts` to change which is large. If a file is missing, its tile shows a labelled placeholder (nothing is hotlinked); run `npm run fetch:images` where the existing site is reachable to download any that are registered in the manifest.

The descriptions (alt text) say only what each photograph shows. The bathroom photograph shows a bathtub, but the amenities list is taken only from the hotel's amenities block, so no bathroom features are listed or claimed.

More Junior photographs exist on the existing site (`junior1`, `junior2`, `junior5`, `junior13`; see `candidates.rooms.junior` in the manifest) but are not on the Junior page's own carousel, so they are not used.

Photograph quality: the photographs are 1325 to 1368px wide, and the gallery stays within the page margins (the large photograph is about 934px wide on a 1440px screen and 1030px at most), so none is enlarged.

## Design

- White page; Montserrat headings; Helvetica body copy (the `.copy` style, 17.6px, line height 1.7, 0.4px tracking).
- **Gallery (reproduces the approved mockup).** The large photograph on the left takes about 76% of the gallery width and is 16:9; three photographs stack on the right (about 23%). The stack takes the large photograph's height exactly, so top and bottom edges align, and one gap size (about 19px at 1440px, scaling down) is used across and down. Plain rectangles: no borders, rounded corners or shadows. Phones: the large photograph (4:3) edge to edge, then a flush row of three small ones. The photographs are interactive; see "Gallery interaction" below.
- **Information below the gallery.** On desktop, about 65% for the title, the spec line (45 sqm, king size bed, private balcony) and the description, and 35% for the starting price and the single teak Book Your Stay button with the "indicative rates" note. No cards, boxes or vertical dividers. On phones they stack in that order.
- A discreet "All accommodation" text link above the title returns to the room categories on the homepage (`/#suites`). The header's section links also lead back to the homepage.
- **Amenities.** Heading and a one-line introduction, then small line icons (28px, the text grey) with a 14px centred label beneath each: six across on desktop (11 amenities make 6 + 5), four on tablets, two on phones, with a short last row centred. No cards, shadows, circles or boxes; the page stays white. The icons are decorative (hidden from screen readers; each item reads out as its label). There is no booking button in this section: the room page has one above, and the footer has another.
- Fade-in-up (`data-reveal`) on the same terms as the homepage: once only, off for reduced motion, content visible without JavaScript. The large photograph is not faded in; it settles once on load, as on the homepage.

## Gallery interaction

Built into the shared `RoomGallery` component (`src/components/rooms/RoomGallery.astro`, with `src/scripts/room-gallery.ts`), so every room page has it. No library: about 100 lines of script, inlined by Astro.

- **Behaviour.** Choosing a thumbnail swaps it with the large photograph; the previous large photograph takes the clicked thumbnail's place. Desktop and phones behave the same: one large photograph, the thumbnails beside it or beneath it. The frames never change size, so nothing shifts (measured: identical frame boxes before and after, layout shift 0.0002).
- **Crossfade.** About 200ms, using the browser's View Transitions API. Where that is unavailable, or the visitor prefers reduced motion, the swap is instant.
- **How the swap works.** Each photograph is one responsive `<img>` with Astro's full set of widths. Position decides the role (the first item in the list is large), so swapping reorders the list and the layout does the rest. A thumbnail starts with a small `sizes` hint. When a visitor hovers, focuses or touches it, the larger image is fetched in advance and the swap waits for it (up to 0.9s), so the large photograph is never blurry. A photograph that has been large keeps the large hint, so it is not fetched again.
- **Indication.** A small square "+" mark in each thumbnail's corner (also shown on touch screens, where there is no hover), a pointer cursor and a slightly darker mark on hover.
- **Keyboard and screen readers.** Each thumbnail is a real button, labelled "Show larger: Bathroom" (the names come from each photograph's `label` in `rooms.ts`), reachable with Tab in visual order and activated with Enter or Space. Focus shows as a white band inside a teak line and stays in the same slot after a swap. A hidden live region announces "Showing: ...". The large photograph carries the full description; thumbnails are named by their buttons, so their images are decorative.
- **Without JavaScript** the gallery is the static layout; no buttons are shown.
- **Adding a room** needs nothing for this: give each photograph a `label` in `rooms.ts`. The component uses up to four photographs; with fewer it adapts (the thumbnails share the height; a single photograph fills the width).

## Amenity icons

The icons are Lucide line artwork (ISC licence), copied as plain SVG paths into `src/components/rooms/amenity-icons.ts`: only the dozen used, no icon library, no JavaScript. The shared `RoomAmenities` component draws each amenity's icon by matching its name, so every room page uses the same system.

| Amenity | Icon (Lucide) |
|---|---|
| Private balcony | `door-open` |
| High-speed Wi-Fi | `wifi` |
| Malongo espresso | `coffee` |
| Air conditioning | `air-vent` |
| Electronic safe | `vault` |
| Working desk | `lamp-desk` |
| Mini bar | `wine` |
| Slippers & robe | `shirt` (the closest Lucide has to a robe) |
| Flat-screen TV | `tv` |
| Hair dryer | `wind` (Lucide has no hair dryer) |
| Room service | `concierge-bell` |

To add an amenity that another room lists: copy its icon's shapes from lucide.dev/icons into `icons`, and add the amenity's name (lower case) to `byAmenity`. An amenity with no mapping shows a quiet tick, so a page never breaks. Check each room's own export before listing an amenity: do not add any the hotel's page does not show.

## Not done yet (for the migration)

- The other three rooms.
- The parent page `/4-types-of-rooms/` (the existing site has one; the back link goes to the homepage categories for now).
- The French page (`/fr/4-types-de-suites/suite-junior/` on the existing site), hreflang, canonical tags and structured data (the existing page has a breadcrumb: Home, 4 types of suites, Junior Suite). All wait for the multilingual and SEO phase; the preview stays `noindex`.
- A 301 map for the old URLs (the Junior path is unchanged, so it needs none).

/**
 * Accommodation pages: the structured content the shared room template renders.
 *
 * Every fact here comes from the hotel's own page export (see docs/ROOM-TEMPLATE.md for the source of each item).
 * Do not add amenities, sizes or photographs that the export does not show. To add a room, add an entry below,
 * set `published: true`, and the page appears at /4-types-of-rooms/<slug>/ with no other code.
 *
 * Prices are NOT stored here: they come from src/data/pricing.ts (one place to edit), keyed by `id`.
 * The booking link comes from src/config/site.ts.
 */
import type { RoomId } from '../data/pricing';

/** Where the original WordPress pages live, so the new paths match the existing URLs. */
export const roomsBasePath = '/4-types-of-rooms/';

export interface RoomPhoto {
  /** Key of the file in src/assets/photos/ (file name without extension). */
  key: string;
  /** Describes what is in the photograph. Only written for photographs someone has actually looked at. */
  alt: string;
  /** Two or three words naming what it shows. Used by the gallery for button labels and announcements. */
  label: string;
  /** Focal point for cropping, as CSS object-position. */
  position?: string;
  /** Where the original lives on the existing site (relative to /wp-content/uploads/), for re-downloading. */
  source: string;
}

export interface Room {
  id: RoomId;
  /** Only published rooms get a page. */
  published: boolean;
  /** Last segment of the URL, as on the existing site. */
  slug: string;
  name: string;
  /** Page title and meta description. */
  seoTitle: string;
  seoDescription: string;
  /** Room size in square metres, as published. Left out where the hotel's page gives none (the Deluxe Room). */
  sizeSqm?: number;
  /** The short spec line under the title, as published (size, bed, balcony). */
  features: string[];
  /** Description, one string per paragraph. */
  description: string[];
  amenitiesIntro: string;
  amenities: string[];
  /** In the order the existing page shows them. The first one that is available becomes the large photograph. */
  photos: RoomPhoto[];
}

export const rooms: Room[] = [
  {
    id: 'junior',
    published: true,
    slug: 'junior-suite-phnom-penh',
    name: 'Junior Suite',
    seoTitle: 'Junior Suite | Amanjaya Pancam, Phnom Penh',
    seoDescription:
      'The Junior Suite at Amanjaya Pancam in Phnom Penh: 45 sqm of living space with a king size bed, a lounge area, a private balcony and a floor fitted from local rosewood.',
    sizeSqm: 45,
    // Size and bed from the description; the balcony from the amenities block of the existing page.
    features: ['45 sqm', 'King size bed', 'Private balcony'],
    // Source: "With 45 sqm of living space..." on the existing Junior Suite page. Lightly edited for grammar
    // ("they are expansive and relaying" read as a slip) and "famous" dropped; the facts are unchanged.
    description: [
      'With 45 sqm of living space, the suite is expansive, and it gives a deep feeling of comfort with its king size bed and lounge area.',
      'To make your stay a real Cambodian experience, we have handpicked details: the floor is fitted from local rosewood, and the black-out curtains are made from Cambodian raw silk. Each suite is decorated with modern reproductions of artefacts from the neighbouring National Museum.',
    ],
    // Source: the "Luxurious amenities" block of the existing page. It says every suite has the same standard items.
    amenitiesIntro:
      'Every suite has a wide range of standard amenities, whichever room you choose: the items we feel make a stay a little more comfortable.',
    amenities: [
      'Private balcony',
      'High-speed Wi-Fi',
      'Malongo espresso',
      'Air conditioning',
      'Electronic safe',
      'Working desk',
      'Mini bar',
      'Slippers & robe',
      'Flat-screen TV',
      'Hair dryer',
      'Room service',
    ],
    // The four photographs on the existing page's carousel (originals under /wp-content/uploads/), in the order of
    // the approved gallery mockup: the first is the large photograph, the next three stack beside it, top to bottom.
    // (On the existing page the order is junior14, junior12, junior6, junior8.) Each description says only what
    // the photograph shows. Only the first four are used.
    photos: [
      {
        key: 'junior-8',
        label: 'Bed and headboard',
        alt: 'The bed in the Junior Suite against a headboard wall of warm wood with lattice panels, a square textile panel and brass reading lights, with a sheer curtain, a small sofa with patterned cushions and framed prints to the left',
        // On phones the 4:3 crop keeps the whole headboard and bed and trims the framed prints on the left.
        position: '75% 50%',
        source: '2020/09/Amanjaya-junior8.jpg',
      },
      {
        key: 'junior-6',
        label: 'Bathroom',
        alt: 'The bathroom of the Junior Suite: a wooden vanity with a basin and round wall lights, a wood lattice door, and a bathtub with pale tiled walls',
        position: '52% 50%',
        source: '2020/09/Amanjaya-junior6.jpg',
      },
      {
        key: 'suite-junior',
        label: 'Lounge corner',
        alt: 'A corner of the Junior Suite: two armchairs and a dark wood cabinet with a lattice front around a round marble table with white flowers, framed prints on the wall and the edge of the bed',
        position: '60% 50%',
        source: '2020/09/Amanjaya-junior12.jpg',
      },
      {
        key: 'junior-14',
        label: 'Work corner',
        alt: 'The work corner of the Junior Suite: a wooden desk with a brass and white lamp and an upholstered chair, large plants, a bench at the foot of the bed, and tall windows with sheer curtains onto the balcony',
        position: '42% 50%',
        source: '2020/09/Amanjaya-junior14.jpg',
      },
    ],
  },
  {
    id: 'deluxe',
    published: true,
    slug: 'deluxe-suite',
    name: 'Deluxe Room',
    seoTitle: 'Deluxe Room | Amanjaya Pancam, Phnom Penh',
    seoDescription:
      'The Deluxe Room at Amanjaya Pancam in Phnom Penh: a king-size canopy bed, a bathroom with bathtub and shower, a living area and a private balcony over the city.',
    // The existing page gives no size for this room, so none is shown.
    features: ['King size canopy bed', 'Bathtub and shower', 'Private balcony'],
    // Source: the single paragraph on the existing Deluxe Room page, split in two and with the sales language
    // ("luxurious", "stunning", "unforgettable experience") taken out. Its sentence about a 15% rooftop lounge
    // discount for Deluxe guests is NOT used: it is an offer, and needs the hotel's confirmation that it still stands.
    description: [
      'The Deluxe Room is a spacious and elegantly designed living space. It has a comfortable king-size canopy bed with premium linens, and an en-suite bathroom with a bathtub, a shower and high-end toiletries.',
      'The living area has plush armchairs, a coffee table and a flat-screen TV, with high-speed Wi-Fi. The private balcony looks over the city: a place to unwind with a cocktail or a book.',
    ],
    amenitiesIntro:
      'Every suite has a wide range of standard amenities, whichever room you choose: the items we feel make a stay a little more comfortable.',
    // The existing Deluxe page lists ten: it does not list Malongo espresso, so it is not shown here.
    amenities: [
      'Private balcony',
      'High-speed Wi-Fi',
      'Air conditioning',
      'Electronic safe',
      'Working desk',
      'Mini bar',
      'Slippers & robe',
      'Flat-screen TV',
      'Hair dryer',
      'Room service',
    ],
    // The existing page's carousel runs deluxe3, deluxe5, deluxe4, deluxe1, deluxe2 (deluxe3 is its lead). Only
    // deluxe1 is in the repository so far (and only 674px wide), so it leads here; the other three are placeholders
    // until the hotel supplies them (file names in docs/ROOM-TEMPLATE.md). Reorder this list to change which is large.
    photos: [
      {
        key: 'suite-deluxe',
        label: 'Bed and headboard',
        alt: 'The bed in the Deluxe Room against a headboard wall of warm wood with a framed textile panel and brass reading lights, with white pillows, sheer curtains, and an armchair and small round table in the background',
        position: '60% 50%',
        source: '2020/09/Amanjaya-deluxe1.jpg',
      },
      { key: 'deluxe-3', label: 'Photograph 2', alt: 'The Deluxe Room', source: '2020/09/Amanjaya-deluxe3.jpg' },
      { key: 'deluxe-5', label: 'Photograph 3', alt: 'The Deluxe Room', source: '2020/09/Amanjaya-deluxe5.jpg' },
      { key: 'deluxe-4', label: 'Photograph 4', alt: 'The Deluxe Room', source: '2020/09/Amanjaya-deluxe4.jpg' },
    ],
  },
  {
    id: 'executive',
    published: true,
    slug: 'executive',
    name: 'Executive Suite',
    seoTitle: 'Executive Suite | Amanjaya Pancam, Phnom Penh',
    seoDescription:
      'The Executive Suite at Amanjaya Pancam in Phnom Penh: 90 sqm with a living area, a lounge corner with a sofa and three armchairs, a working desk and made-to-order cherrywood furniture.',
    sizeSqm: 90,
    // Size, lounge and desk from the description (it does not state the bed, so none is shown).
    features: ['90 sqm', 'Lounge corner', 'Working desk'],
    // Source: the paragraph on the existing Executive Suite page, split in two and lightly edited ("Gratify yourself"
    // and "ultimate" taken out). The page says the hotel has three Executive suites of this size.
    description: [
      'The hotel has three Executive suites, stretched over 90 sqm. More than a guest room, each has a genuine living area, with a spacious lounge corner with a sofa and three armchairs, and a comfortable working desk.',
      'They are decorated with Cambodian raw silk and handmade replicas of artefacts, over a well-polished local cherrywood floor, and all the furniture was made to order in the same wood. For business or leisure, it is your base in the capital.',
    ],
    amenitiesIntro:
      'Every suite has a wide range of standard amenities, whichever room you choose: the items we feel make a stay a little more comfortable.',
    amenities: [
      'Private balcony',
      'High-speed Wi-Fi',
      'Malongo espresso',
      'Air conditioning',
      'Electronic safe',
      'Working desk',
      'Mini bar',
      'Slippers & robe',
      'Flat-screen TV',
      'Hair dryer',
      'Room service',
    ],
    // Carousel on the existing page: executive3 (lead), executive2, executive4, executive5, executive12. Only
    // executive12 is in the repository so far (it leads here); the other three are placeholders.
    photos: [
      {
        key: 'suite-executive',
        label: 'Bed and headboard',
        alt: 'The bed in the Executive Suite against a headboard wall of warm wood with a framed textile panel and a lattice panel lit by a bright reading light, with white pillows, a woven cushion and sheer curtains',
        position: '55% 50%',
        source: '2020/09/Amanjaya-executive12.jpg',
      },
      { key: 'executive-3', label: 'Photograph 2', alt: 'The Executive Suite', source: '2020/09/Amanjaya-executive3.jpg' },
      { key: 'executive-2', label: 'Photograph 3', alt: 'The Executive Suite', source: '2020/09/Amanjaya-executive2.jpg' },
      { key: 'executive-4', label: 'Photograph 4', alt: 'The Executive Suite', source: '2020/09/Amanjaya-executive4.jpg' },
    ],
  },
  {
    id: 'panoramic',
    published: true,
    slug: 'panoramic',
    name: 'Panoramic Suite',
    seoTitle: 'Panoramic Suite | Amanjaya Pancam, Phnom Penh',
    seoDescription:
      'The Panoramic Suite at Amanjaya Pancam in Phnom Penh: 50 sqm with a wide view of both rivers and the pagoda, a king size bed, a lounge area and a desk.',
    sizeSqm: 50,
    features: ['50 sqm', 'King size bed', 'River and pagoda views'],
    // Source: the paragraph on the existing Panoramic Suite page. Its last sentence says "the flooring and furniture
    // are made from Cambodian raw silk and rosewood", which cannot be right for a floor (silk), so it is worded here
    // as "the finishes use Cambodian raw silk and rosewood". Please have the hotel confirm what is made of what.
    description: [
      'The Panoramic Suite is a special one: 50 sqm with a wide view of both rivers and the pagoda. It has a lounge area, a king size bed and a desk.',
      'The windows let in plenty of sunlight, and the finishes use Cambodian raw silk and rosewood.',
    ],
    amenitiesIntro:
      'Every suite has a wide range of standard amenities, whichever room you choose: the items we feel make a stay a little more comfortable.',
    amenities: [
      'Private balcony',
      'High-speed Wi-Fi',
      'Malongo espresso',
      'Air conditioning',
      'Electronic safe',
      'Working desk',
      'Mini bar',
      'Slippers & robe',
      'Flat-screen TV',
      'Hair dryer',
      'Room service',
    ],
    // Carousel on the existing page: panoramic3 (lead), panoramic2, panoramic6, panoramic4, panoramic7. Only
    // panoramic2 is in the repository so far (it leads here); the other three are placeholders.
    photos: [
      {
        key: 'suite-panoramic',
        label: 'Bed and lounge',
        alt: 'The Panoramic Suite: a king bed with a bench at its foot and sheer curtains, a writing desk with a lamp and chair and a large plant in front of tall windows full of light, a ceiling fan, and a round marble table with fruit in the foreground',
        position: '60% 50%',
        source: '2020/09/Amanjaya-panoramic2.jpg',
      },
      { key: 'panoramic-3', label: 'Photograph 2', alt: 'The Panoramic Suite', source: '2020/09/Amanjaya-panoramic3.jpg' },
      { key: 'panoramic-6', label: 'Photograph 3', alt: 'The Panoramic Suite', source: '2020/09/Amanjaya-panoramic6.jpg' },
      { key: 'panoramic-4', label: 'Photograph 4', alt: 'The Panoramic Suite', source: '2020/09/Amanjaya-panoramic4.jpg' },
    ],
  },
];

export const publishedRooms = rooms.filter((r) => r.published);

/** Path of a room page, e.g. "/4-types-of-rooms/junior-suite-phnom-penh/". */
export const roomPath = (r: Pick<Room, 'slug'>) => `${roomsBasePath}${r.slug}/`;

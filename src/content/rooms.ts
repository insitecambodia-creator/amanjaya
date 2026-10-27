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
    // Hotel photographs, all supplied by the hotel team. The existing page's carousel runs deluxe3, 5, 4, 1, 2; this
    // uses 3, 5, 2 and 4 and leaves out deluxe-1, which is only 674px wide and shows the same bed as deluxe-5.
    // The large photograph is the first; reorder the list to change it.
    photos: [
      {
        key: 'deluxe-3',
        label: 'Corner with cabinet',
        alt: 'A corner of the Deluxe Room: a dark wood cabinet with a carved lattice front, an armchair with patterned cushions beside a round marble table with a brass base, framed botanical prints on the wall, and part of the bed at the right',
        position: '50% 60%',
        source: '2020/09/Amanjaya-deluxe3.jpg',
      },
      {
        key: 'deluxe-5',
        label: 'Bed and windows',
        alt: 'The king-size bed in the Deluxe Room against a wood headboard wall with a framed textile panel and lattice, with white linens, brass reading lights and sheer curtains over tall windows',
        position: '50% 65%',
        source: '2020/09/Amanjaya-deluxe5.jpg',
      },
      {
        key: 'deluxe-2',
        label: 'Living area',
        alt: 'The Deluxe Room seen from the living area: armchairs and a round marble table on a woven rug, the bed beyond, a desk and chair by tall sheer-curtained windows, and a ceiling fan',
        position: '60% 55%',
        source: '2020/09/Amanjaya-deluxe2.jpg',
      },
      {
        key: 'deluxe-4',
        label: 'Armchair and bed',
        alt: 'An armchair and a large plant in a basket beside the bed in the Deluxe Room, with framed prints on the white wall and a wood headboard with lattice panels',
        position: '70% 50%',
        source: '2020/09/Amanjaya-deluxe4.jpg',
      },
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
    // Hotel photographs, supplied by the hotel team. The existing page's carousel runs executive3, 2, 4, 5, 12; this
    // leads with executive7 (the living area, which the description is about; the hotel also uses it as this
    // room's picture on its offers pages), then 3, 9 and 4. Also in the repository and available: executive-2 (sofa),
    // executive-10 (bathroom vanity), executive-11 (wide view of bed and lounge), executive-12 (bed detail).
    photos: [
      {
        key: 'executive-7',
        label: 'Living area',
        alt: 'The living area of the Executive Suite: a sofa and armchairs around a round table on a woven rug, a plant and floor lamp, and a wooden desk and chair at the right, on a polished dark wood floor under warm lighting',
        position: '40% 50%',
        source: '2020/09/Amanjaya-executive7.jpg',
      },
      {
        key: 'executive-3',
        label: 'Bed and headboard',
        alt: 'The bed in the Executive Suite against a wood headboard wall with a framed textile panel and carved lattice panels, with sheer curtains either side and a ceiling fan above',
        position: '50% 55%',
        source: '2020/09/Amanjaya-executive3.jpg',
      },
      {
        key: 'executive-9',
        label: 'Balcony view',
        alt: 'The bed in the Executive Suite beside open balcony doors, with a table and chairs on the balcony and a view over rooftops to ornate pagoda spires',
        position: '60% 50%',
        source: '2020/09/Amanjaya-executive9.jpg',
      },
      {
        key: 'executive-4',
        label: 'Bed and lounge',
        alt: 'The Executive Suite bed with a bench at its foot, seen through the leaves of a large plant, with the lounge area and windows beyond',
        position: '40% 55%',
        source: '2020/09/Amanjaya-executive4.jpg',
      },
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
    // Hotel photographs, supplied by the hotel team. The existing page's carousel runs panoramic3, 2, 6, 4, 7. This
    // leads with panoramic2 (the whole room) rather than panoramic3 (a close view of louvred shutters). Also in the
    // repository and available: panoramic-3, panoramic-8 (the bed and a sofa with flowers).
    photos: [
      {
        key: 'panoramic-2',
        label: 'Bed and lounge',
        alt: 'The Panoramic Suite: a king bed with a bench at its foot and sheer curtains, a writing desk with a lamp and chair and a large plant in front of tall windows full of light, a ceiling fan, and a round marble table with fruit in the foreground',
        position: '60% 50%',
        source: '2020/09/Amanjaya-panoramic2.jpg',
      },
      {
        key: 'panoramic-6',
        label: 'Bed and desk',
        alt: 'The Panoramic Suite: the bed with a cushioned bench at its foot, a desk and chair by a balcony door, and wide windows with sheer curtains opening onto sky and rooftops',
        position: '50% 60%',
        source: '2020/09/Amanjaya-panoramic6.jpg',
      },
      {
        key: 'panoramic-4',
        label: 'Balcony doors',
        alt: 'The Panoramic Suite: the bed and a wooden desk with a large plant beside tall glass doors that open onto a balcony, with grey curtains and a view of trees and sky',
        position: '55% 50%',
        source: '2020/09/Amanjaya-panoramic4.jpg',
      },
      {
        key: 'panoramic-7',
        label: 'Window view',
        alt: 'The Panoramic Suite in the evening: a bed with a bench at its foot, a desk and chair by a window, and tall windows and a balcony door looking out over the city',
        position: '45% 50%',
        source: '2020/09/Amanjaya-panoramic7.jpg',
      },
    ],
  },
];

export const publishedRooms = rooms.filter((r) => r.published);

/** Path of a room page, e.g. "/4-types-of-rooms/junior-suite-phnom-penh/". */
export const roomPath = (r: Pick<Room, 'slug'>) => `${roomsBasePath}${r.slug}/`;

/**
 * Homepage copy. Plain data so it can be edited without touching components.
 * Wording is rewritten in a quieter voice, but every factual statement traces back to the existing site
 * (room pages, homepage, contact page). Sources are listed in docs/CONTENT-SOURCES.md.
 * `photo` values are keys in src/data/image-manifest.json; `alt` text needs a human check once photos are in.
 */

export const hero = {
  photo: 'hero',
  /** Focal point so the crop keeps the smiling guest and the hotel balconies on every screen shape. */
  position: '60% 18%',
  alt: 'A couple walks hand in hand at sunset in front of the Amanjaya Pancam hotel',
  title: 'Phnom Penh, at the water’s edge.',
  intro:
    'A boutique hotel at the corner of Sisowath Quay and Street 154, looking over the Tonle Sap and the Mekong.',
} as const;

export const welcome = {
  title: 'On the riverside since 2002.',
  paragraphs: [
    'Amanjaya Pancam stands on the corner of Sisowath Quay and Street 154, close to the National Museum. Every room has a private balcony, and Cambodian details run through the suites: local woods underfoot and raw silk at the windows.',
    'Stay for the river, and for a city that begins at the front door.',
  ],
  photos: [
    {
      photo: 'welcome-lobby',
      position: '38% 50%',
      alt: 'A hotel hallway with a Khmer line-drawing mural and a polished timber floor',
    },
    {
      photo: 'welcome-balcony',
      position: '66% 50%',
      alt: 'Two guests having coffee at a table on a private balcony, with the city behind them',
    },
  ],
} as const;

export const suites = {
  title: 'Four ways to stay',
  intro: 'Every category has a private balcony, air conditioning, a working desk and room service.',
  items: [
    {
      id: 'junior',
      name: 'Junior Suite',
      size: '45 sqm',
      note: 'The hotel’s bestseller',
      text: 'A king bed and a lounge area. Local rosewood floors, black-out curtains in Cambodian raw silk, and reproductions of artefacts from the neighbouring National Museum.',
      photo: 'suite-junior',
      position: '62% 50%',
      alt: 'A Junior Suite corner with a carved lattice cabinet, an armchair and fresh flowers',
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      size: null,
      note: 'Canopy bed and bathtub',
      text: 'A king-size canopy bed, a bathroom with both bath and shower, and a living area with armchairs. The balcony looks over the city.',
      photo: 'suite-deluxe',
      position: '50% 50%',
      alt: 'A Deluxe Room bed with a timber headboard and sheer curtains',
    },
    {
      id: 'executive',
      name: 'Executive Suite',
      size: '90 sqm',
      note: 'Three suites, river views',
      text: 'A genuine living area with a sofa, three armchairs and a desk. Cambodian raw silk, replica artefacts and polished local cherrywood, with furniture made to order. For business or leisure.',
      photo: 'suite-executive',
      position: '62% 50%',
      alt: 'An Executive Suite bed with a carved timber headboard, linen and sheer curtains',
    },
    {
      id: 'panoramic',
      name: 'Panoramic Suite',
      size: '50 sqm',
      note: 'Both rivers and the pagoda',
      text: 'A wide view over the two rivers and the pagoda, a lounge area, a king bed, and windows that let the light in.',
      photo: 'suite-panoramic',
      position: '50% 55%',
      alt: 'A Panoramic Suite with a king bed, a writing desk and tall windows full of light',
    },
  ],
} as const;

export const dining = {
  title: 'Dining and the rooftop',
  venues: [
    {
      id: 'le-moon',
      name: 'Le Moon Rooftop',
      kind: 'Rooftop bar',
      text: 'Part of the hotel since 2010. Early evening is for a sundowner before dinner; later it belongs to friends and couples, for dinner or just a drink.',
      photo: 'dining-le-moon',
      position: '50% 50%',
      alt: 'The hotel at night with the Le Moon sign lit on the roof',
      link: { label: 'Visit Le Moon Rooftop', url: 'https://www.le-moon-rooftop.com/' },
    },
    {
      id: 'sombok',
      name: 'Sombok',
      kind: 'Khmer fine dining',
      text: 'Khmer fine dining led by the Kimsan Twins, and sister restaurant to Embassy in Siem Reap.',
      photo: 'dining-sombok',
      position: '50% 30%',
      alt: 'Two chefs in white jackets beside the Sombok sign at the restaurant entrance',
      link: { label: 'Visit Sombok', url: 'https://sombok.asia/' },
    },
  ],
} as const;

export const riverside = {
  title: 'Where the two rivers meet',
  text: 'The hotel looks over the Tonle Sap and the Mekong from Sisowath Quay, a short stroll from the city’s main attractions.',
  photo: 'riverside',
  position: '50% 55%',
  alt: 'The riverside promenade and the wide river seen from a hotel balcony',
} as const;

export const gallery = {
  title: 'Inside and out',
  /** Photographs are laid out in justified rows at their own proportions, so nothing is cropped. */
  rows: [
    [
      { photo: 'gallery-pagoda', alt: 'A golden stupa and orange pagoda roofs beside the street' },
      { photo: 'gallery-mural', alt: 'A bright Khmer mural on a hotel wall above a terracotta floor' },
    ],
    [
      { photo: 'gallery-reception', alt: 'The reception desk with the Amanjaya Pancam Suites Hotel sign' },
      { photo: 'gallery-breakfast', alt: 'A couple sharing breakfast in bed in a suite' },
      { photo: 'gallery-work', alt: 'Two guests working over breakfast in a suite' },
    ],
  ],
} as const;

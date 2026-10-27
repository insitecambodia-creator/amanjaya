/**
 * Homepage copy. Plain data so it can be edited without touching components.
 * Wording is rewritten in a quieter voice, but every factual statement traces back to the existing site
 * (room pages, homepage, contact page). Sources are listed in docs/CONTENT-SOURCES.md.
 * `photo` values are keys in src/data/image-manifest.json; `alt` text needs a human check once photos are in.
 */

/**
 * Hero photograph options. A is the approved hero; B to E are kept for review
 * (comparison in docs/screenshots/hero-options.jpg and docs/PHOTO-REVIEW.md). E is the previous hero.
 * `position` is the desktop focal point and `positionMobile` the phone one (CSS object-position).
 * To preview another option locally:  PUBLIC_HERO_OPTION=B npm run dev
 * Builds use A unless that variable is set.
 */
export const heroOptions = [
  {
    id: 'A',
    photo: 'amanajaya-hero',
    /** Desktop: both faces sit left of centre, so the right stays open for the text. */
    position: '50% 20%',
    /** Phones: a narrow window centred on the two faces (they span about 35% to 55% across the photograph). */
    positionMobile: '50% 35%',
    alt: 'A smiling couple takes a selfie in front of the Royal Palace in Phnom Penh, the man holding his phone at arm’s length and the woman in a sun hat leaning in beside him',
    note: 'Couple taking a selfie in front of the Royal Palace (2048 px, uploaded by the hotel team). Current.',
  },
  {
    id: 'E',
    photo: 'hero',
    position: '60% 14%',
    positionMobile: '66% 30%',
    alt: 'A couple walks hand in hand at sunset in front of the Amanjaya Pancam hotel',
    note: 'Couple in front of the hotel at golden hour (2560 px). The previous hero.',
  },
  {
    id: 'B',
    photo: 'dining-le-moon',
    position: '50% 58%',
    alt: 'The hotel at night with the Le Moon sign lit on the roof',
    note: 'The hotel at night. Dramatic and architectural, but dark and busy; 1319 px wide.',
  },
  {
    id: 'C',
    photo: 'riverside',
    position: '50% 55%',
    alt: 'The riverside promenade and the wide river seen from a hotel balcony',
    note: 'Quay and river from a balcony. Right in concept, flat in light; 1200 px wide.',
  },
  {
    id: 'D',
    photo: 'gallery-pagoda',
    position: '72% 50%',
    alt: 'A golden stupa and orange pagoda roofs beside the street',
    note: 'Golden pagoda beside the hotel. Very characterful, but not the hotel; 1353 px wide.',
  },
] as const;

const chosenHero = heroOptions.find((o) => o.id === import.meta.env.PUBLIC_HERO_OPTION) ?? heroOptions[0];

export const hero = {
  photo: chosenHero.photo,
  position: chosenHero.position,
  positionMobile: 'positionMobile' in chosenHero ? chosenHero.positionMobile : chosenHero.position,
  alt: chosenHero.alt,
  title: 'Your Phnom Penh story begins here.',
  support: 'Discover Phnom Penh from Amanjaya Pancam, your riverside retreat.',
};

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
  /**
   * Layout: a full-width mosaic of two rows. `width` is each panel's share of its row (junior 58 / deluxe 42,
   * executive 40 / panoramic 60). Panels show photo, name, tagline (`note`), price and Explore only;
   * `summary` and `description` are kept for the future room pages.
   * Starting prices are NOT here: they live in src/data/pricing.ts so there is one place to edit them.
   * `exploreUrl` points at the hotel's existing room pages (verified in the homepage export) until the new
   * room pages are built; then switch these to internal links.
   * `summary` is the short card text; `description` is the longer wording kept for the future room pages.
   * Photographs are the best available at the moment; better wide-angle ones are being sourced (docs/ROOM-PHOTO-CANDIDATES.md).
   */
  items: [
    {
      id: 'junior',
      width: 58,
      name: 'Junior Suite',
      note: 'Our bestselling rooms',
      summary: '45 sqm with a king bed, a lounge area and a private balcony.',
      description:
        'A king bed and a lounge area. Local rosewood floors, black-out curtains in Cambodian raw silk, and reproductions of artefacts from the neighbouring National Museum.',
      exploreUrl: '/4-types-of-rooms/junior-suite-phnom-penh/', // the new page, at the same path as the existing one
      photo: 'suite-junior',
      position: '62% 50%',
      alt: 'A Junior Suite corner with a carved lattice cabinet, an armchair and fresh flowers',
    },
    {
      id: 'deluxe',
      width: 42,
      name: 'Deluxe Room',
      note: 'The comfort of living',
      summary: 'A king canopy bed, bath and shower, and a balcony over the city.',
      description:
        'A king-size canopy bed, a bathroom with both bath and shower, and a living area with armchairs. The balcony looks over the city.',
      exploreUrl: 'https://www.amanjaya-suites-phnom-penh.com/4-types-of-rooms/deluxe-suite/',
      photo: 'suite-deluxe',
      position: '50% 50%',
      alt: 'A Deluxe Room bed with a timber headboard and sheer curtains',
    },
    {
      id: 'executive',
      width: 40,
      name: 'Executive Suite',
      note: 'Breath-taking view over the river',
      summary: '90 sqm with a living area, a sofa, three armchairs and a desk.',
      description:
        'A genuine living area with a sofa, three armchairs and a desk. Cambodian raw silk, replica artefacts and polished local cherrywood, with furniture made to order. For business or leisure.',
      exploreUrl: 'https://www.amanjaya-suites-phnom-penh.com/4-types-of-rooms/executive/',
      photo: 'suite-executive',
      position: '62% 50%',
      alt: 'An Executive Suite bed with a carved timber headboard, linen and sheer curtains',
    },
    {
      id: 'panoramic',
      width: 60,
      name: 'Panoramic Suite',
      note: 'It’s all about space',
      summary: '50 sqm with wide views over both rivers and the pagoda.',
      description:
        'A wide view over the two rivers and the pagoda, a lounge area, a king bed, and windows that let the light in.',
      exploreUrl: 'https://www.amanjaya-suites-phnom-penh.com/4-types-of-rooms/panoramic/',
      photo: 'suite-panoramic',
      position: '50% 55%',
      alt: 'A Panoramic Suite with a king bed, a writing desk and tall windows full of light',
    },
  ],
} as const;

export const dining = {
  title: 'Rooftop & Dining',
  /**
   * Two editorial rows: Le Moon (photo left) then Sombok (photo right). Each description is about 20 to 30 words.
   * Sombok is listed as a restaurant in Phnom Penh. The existing homepage does not say it is inside the hotel,
   * so nothing here claims that. Photographs are the best currently available; better ones are being sourced
   * (docs/DINING-PHOTOS.md).
   */
  venues: [
    {
      id: 'le-moon',
      name: 'Le Moon Rooftop',
      kind: 'Rooftop bar',
      text: 'Our rooftop bar since 2010. Early evening is for a sundowner before dinner; later it belongs to friends and couples, for dinner or just a drink.',
      photo: 'dining-le-moon',
      position: '50% 55%',
      alt: 'The hotel at night with the Le Moon sign lit on the roof',
      link: { label: 'Discover Le Moon', url: 'https://www.le-moon-rooftop.com/' },
    },
    {
      id: 'sombok',
      name: 'Sombok',
      kind: 'Khmer fine dining',
      text: 'A fine dining restaurant for Khmer gastronomy in Phnom Penh, headed by the Kimsan Twins and sister restaurant to Embassy in Siem Reap.',
      photo: 'dining-sombok',
      position: '50% 30%',
      alt: 'Two chefs in white jackets beside the Sombok sign at the restaurant entrance',
      link: { label: 'Discover Sombok', url: 'https://sombok.asia/' },
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

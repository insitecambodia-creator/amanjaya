/**
 * Site-wide facts and the one external boundary: the booking engine.
 * Every value here comes from the hotel's existing WordPress export unless noted.
 * Anything marked `verify` must be confirmed by the hotel before launch (see docs/CONTENT-SOURCES.md).
 */
export const site = {
  name: 'Amanjaya Pancam',
  descriptor: 'Phnom Penh',
  title: 'Amanjaya Pancam | Boutique hotel on the Phnom Penh riverside',
  description:
    'A boutique hotel at the corner of Sisowath Quay and Street 154, looking over the Tonle Sap and the Mekong in Phnom Penh.',
  language: 'en',
} as const;

/**
 * Booking engine boundary.
 * The existing site links to this property page on book-directonline.com. The undated base URL is used here;
 * the date-specific links found in the export (2020, 2021, 2023, 2026) are deliberately NOT reused.
 * `verified: false` until the hotel confirms the engine and URL. The label is the single call to action on the page.
 */
export const booking = {
  label: 'Book Your Stay',
  url: 'https://book-directonline.com/properties/AMANJAYAPANCAMSUITEDIRECT',
  verified: false,
} as const;

export const contact = {
  addressLines: ['1, Street 154', 'Phnom Penh, Cambodia'],
  crossStreets: 'Corner of Sisowath Quay and Street 154',
  mapUrl: 'https://maps.app.goo.gl/sRyy9dE4pWAoMCVM7',
  /** Shown as written on the existing Contact page. verify: international format and whether this is the front desk line. */
  phoneDisplay: '081 559 748',
  phoneHref: '+85581559748',
  /** The export hides the address behind Cloudflare email protection, so it could not be read. Hotel to supply. */
  email: null as string | null,
} as const;

export const social = [
  { label: 'Facebook', url: 'https://www.facebook.com/AmanjayaPancamHotelPhnomPenh/' },
  { label: 'Instagram', url: 'https://www.instagram.com/amanjayasuite/' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@amanjayapancamhotel' },
] as const;

/** Sections the header links to. Phase 1 is a single page, so these are in-page anchors. */
export const nav = [
  { label: 'Suites', href: '#suites' },
  { label: 'Dining', href: '#dining' },
  { label: 'Riverside', href: '#riverside' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const;

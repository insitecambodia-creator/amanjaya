/**
 * Starting room rates shown on the homepage. This is the ONE place to edit them: components read from here.
 *
 * Source: the "FROM $…" figures published on the current Amanjaya homepage (HTML export dated 30 Sep 2026).
 * Owner: Avy, marketing manager, who is responsible for the published prices. Please have Avy confirm
 * these before launch, and update them here (and only here) when they change.
 *
 * They are INDICATIVE STARTING RATES, not live availability or a quote. The page says so (see `disclaimer`),
 * and the booking engine remains the only source of current rates and availability.
 */

/** Starting rate per room category, in the currency below. Keys match `id` in src/content/home.ts. */
export const startingRates = {
  junior: 81,
  deluxe: 76.5,
  executive: 112.5,
  panoramic: 94.5,
} as const satisfies Record<string, number>;

export const pricing = {
  /** Shown before the amount, as on the original site ("From $81"). */
  label: 'From',
  currencySymbol: '$',
  /** Note printed under the room grid. Keep it plain: these figures are not an offer. */
  disclaimer:
    'Indicative starting rates, as published on our current website. They are not live availability. Current rates and availability are shown when you book.',
} as const;

export type RoomId = keyof typeof startingRates;

/** "$81" or "$76.50": whole amounts without decimals, others with two, matching the original site. */
export function formatAmount(amount: number): string {
  const text = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return `${pricing.currencySymbol}${text}`;
}

/** Starting price text for a category, or null if no rate is set (the card then hides its price). */
export function startingPrice(id: string): { label: string; amount: string } | null {
  const value = (startingRates as Record<string, number>)[id];
  return typeof value === 'number' ? { label: pricing.label, amount: formatAmount(value) } : null;
}

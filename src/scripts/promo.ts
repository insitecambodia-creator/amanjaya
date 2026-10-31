/**
 * The promotion popup (data and rules: src/content/promotions.ts and docs/PROMOTIONS.md).
 *
 *  - Picks the promotion that is running today (Cambodia time dates, built into the page); if several, the one that
 *    started last. Nothing is requested from a server.
 *  - Shown once per visitor per promotion (remembered in the browser; closing it or using its button counts).
 *  - Waits a few seconds after the page loads, and does not open if another dialog (the photo viewer) is already open.
 *  - Desktop and tablets: a centred card with the page dimmed. Phones: a card along the foot of the screen, the page
 *    still usable behind it.
 *  - On a local or preview address (localhost, *.pages.dev), adding ?promo-preview=<id> to the address shows that
 *    promotion at once, whatever its dates and whether or not it was dismissed, so it can be checked before it runs.
 */
interface Prepared {
  id: string;
  start: number;
  end: number;
  showOn: 'home' | 'all';
  title: string;
  text: string;
  terms: string;
  buttonLabel: string;
  buttonUrl: string;
  image?: { src: string; srcset: string; width: number; height: number; alt: string };
}

const DELAY_MS = 5000;
const dialog = document.querySelector<HTMLDialogElement>('[data-promo-dialog]');
const dataEl = document.getElementById('promo-data');

function read(): { promotions: Prepared[]; home: boolean } | null {
  try {
    return dataEl ? JSON.parse(dataEl.textContent ?? '') : null;
  } catch {
    return null;
  }
}

const key = (id: string) => `amanjaya:promo:${id}`;
const seen = (id: string) => {
  try {
    return localStorage.getItem(key(id)) !== null;
  } catch {
    return false;
  }
};
const remember = (id: string) => {
  try {
    localStorage.setItem(key(id), String(Date.now()));
  } catch {
    /* private mode: it may show again, which is fine */
  }
};

const data = read();
if (dialog && data) {
  const previewId = new URLSearchParams(location.search).get('promo-preview');
  const previewAllowed = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname.endsWith('.pages.dev');
  const now = Date.now();

  let chosen: Prepared | undefined;
  let preview = false;
  if (previewId && previewAllowed) {
    chosen = data.promotions.find((p) => p.id === previewId);
    preview = Boolean(chosen);
  }
  if (!chosen) {
    chosen = data.promotions
      .filter((p) => now >= p.start && now <= p.end && (p.showOn === 'all' || data.home) && !seen(p.id))
      .sort((a, b) => b.start - a.start)[0];
  }

  if (chosen) {
    const promo = chosen;
    const q = <T extends HTMLElement>(s: string) => dialog.querySelector<T>(s)!;
    q('[data-promo-title]').textContent = promo.title;
    q('[data-promo-text]').textContent = promo.text;
    const button = q<HTMLAnchorElement>('[data-promo-button]');
    button.textContent = promo.buttonLabel;
    button.href = promo.buttonUrl;
    const terms = q('[data-promo-terms]');
    terms.textContent = promo.terms;
    terms.hidden = !promo.terms;
    const img = q<HTMLImageElement>('[data-promo-img]');
    if (promo.image) {
      img.src = promo.image.src;
      img.srcset = promo.image.srcset;
      img.width = promo.image.width;
      img.height = promo.image.height;
      img.alt = promo.image.alt;
      img.hidden = false;
    }

    const open = () => {
      if (document.querySelector('dialog[open]')) return; // never on top of the photo viewer or another dialog
      if (window.matchMedia('(min-width: 40rem)').matches) dialog.showModal();
      else dialog.show();
      if (!preview) remember(promo.id);
    };

    const close = () => dialog.close();
    dialog.querySelector('[data-promo-close]')!.addEventListener('click', close);
    button.addEventListener('click', () => {
      if (!preview) remember(promo.id);
    });
    // Phones use a non-modal dialog, which the browser does not close on Escape.
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
    // A click on the dimmed area around the card closes it.
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) close();
    });

    if (preview) open();
    else window.setTimeout(open, DELAY_MS);
  }
}

export {};

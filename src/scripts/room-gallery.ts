/**
 * Room gallery: choosing a thumbnail swaps it with the large photograph. No library.
 *
 * The page works without this script (a static gallery). With it, each thumbnail is a button; activating one swaps
 * the two photographs' places in the list, and the styles in RoomGallery.astro lay out the first item as the large
 * photograph and the rest as thumbnails, so the gallery never changes size. The crossfade is the browser's view
 * transition (about 200ms); where that is missing, or under reduced motion, the swap is instant.
 *
 * Images: a thumbnail starts with a small size hint. The first time it is about to become the large photograph, the
 * larger image is fetched in advance (on hover, focus or touch) and the swap waits for it, so no blurry frame is
 * shown. A photograph that has been large keeps the large hint, so it is never fetched twice.
 */
export {}; // a module, so its names stay local

type Transition = { finished: Promise<unknown> };
type WithTransition = Document & { startViewTransition?: (update: () => void) => Transition };

const root = document.querySelector<HTMLElement>('[data-gallery]');
const list = root?.querySelector<HTMLUListElement>('.gallery__grid');
const liveRegion = root?.querySelector<HTMLElement>('[data-gallery-status]');
const sizesMain = root?.dataset.sizesMain ?? '100vw';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const MAX_WAIT_MS = 900;

if (root && list && list.children.length > 1) {
  const items = () => Array.from(list.children) as HTMLElement[];
  const imageOf = (li: HTMLElement) => li.querySelector('img');
  const ready = new WeakMap<HTMLElement, Promise<unknown>>();

  /** Fetch (once) the image a photograph will need as the large photograph. */
  function prepare(li: HTMLElement): Promise<unknown> {
    let p = ready.get(li);
    if (!p) {
      const img = imageOf(li);
      if (!img || img.sizes === sizesMain) {
        p = Promise.resolve();
      } else {
        const probe = new Image();
        probe.sizes = sizesMain;
        probe.srcset = img.srcset;
        probe.src = img.getAttribute('src') ?? '';
        p = probe.decode().catch(() => undefined);
      }
      ready.set(li, p);
    }
    return p;
  }

  /** Large photograph: described, not a button. Thumbnails: named by their button, so their image is decorative. */
  function applyRoles() {
    items().forEach((li, i) => {
      const large = i === 0;
      const img = imageOf(li);
      if (img) {
        img.alt = large ? (li.dataset.alt ?? '') : '';
        if (large && img.sizes !== sizesMain) img.sizes = sizesMain;
      }
      const button = li.querySelector('button');
      if (button) button.hidden = large;
    });
  }

  async function swap(index: number) {
    if (root!.dataset.busy) return;
    root!.dataset.busy = 'true';
    const order = items();
    const chosen = order[index];
    const previous = order[0];

    // Cancel the load-time settle so it cannot replay when the photographs move.
    order.forEach((li) => li.classList.remove('gallery__item--settle'));
    await Promise.race([prepare(chosen), new Promise((r) => setTimeout(r, MAX_WAIT_MS))]);

    const apply = () => {
      order[0] = chosen;
      order[index] = previous;
      list!.replaceChildren(...order);
      applyRoles();
      // Keep focus where it was: the previous large photograph now sits in the slot that was chosen.
      previous.querySelector('button')?.focus({ preventScroll: true });
      if (liveRegion) liveRegion.textContent = `Showing: ${chosen.dataset.label ?? ''}`;
    };

    const doc = document as WithTransition;
    if (doc.startViewTransition && !reduceMotion.matches) {
      document.documentElement.classList.add('gallery-swapping');
      const transition = doc.startViewTransition(apply);
      transition.finished.finally(() => {
        document.documentElement.classList.remove('gallery-swapping');
        delete root!.dataset.busy;
      });
    } else {
      apply();
      delete root!.dataset.busy;
    }
  }

  applyRoles();

  list.addEventListener('click', (e) => {
    const li = (e.target as HTMLElement).closest<HTMLElement>('.gallery__item');
    if (li && (e.target as HTMLElement).closest('button')) swap(items().indexOf(li));
  });

  // Start fetching the larger image as soon as a visitor shows interest in a thumbnail.
  const warm = (e: Event) => {
    const li = (e.target as HTMLElement).closest<HTMLElement>('.gallery__item');
    if (li && li !== items()[0]) prepare(li);
  };
  list.addEventListener('pointerover', warm);
  list.addEventListener('pointerdown', warm);
  list.addEventListener('focusin', warm);
}

/**
 * Fade-in-up on scroll. No library: one IntersectionObserver, about 40 lines.
 *
 * Elements marked `data-reveal` start slightly lower and transparent, and ease into place once, the first time they
 * scroll into view. The hidden state (see global.css) only exists after this script has run and confirmed the
 * browser can do it, so with JavaScript off, with reduced motion, or if anything fails, everything stays visible.
 *
 *  - Already in view at load, or already scrolled past: shown at once, never animated, so nothing flashes.
 *  - Elements that enter together are staggered by 100ms (up to three steps), in reading order.
 *  - A large batch (a jump to an anchor, a very tall viewport, a full-page capture) is revealed instantly instead of
 *    animating twenty things at once.
 *  - Each element is revealed once and then no longer observed.
 */
const STAGGER_MS = 100;
const MAX_STEPS = 3;
const BIG_BATCH = 6;

const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function show(el: HTMLElement, delayMs: number, animate: boolean) {
  if (!animate) {
    // Snap to the visible state without a transition (no half-faded frames).
    el.style.transition = 'none';
    el.classList.add('is-revealed');
    void el.offsetWidth;
    el.style.transition = '';
    return;
  }
  el.style.transitionDelay = `${delayMs}ms`;
  el.classList.add('is-revealed');
  el.addEventListener('transitionend', () => (el.style.transitionDelay = ''), { once: true });
}

if (targets.length && 'IntersectionObserver' in window && !reduceMotion) {
  const viewport = window.innerHeight;
  // In view (or above) right now: reveal before anything is hidden, so there is no flash.
  const pending = targets.filter((el) => {
    if (el.getBoundingClientRect().top < viewport * 0.92) {
      el.classList.add('is-revealed');
      return false;
    }
    return true;
  });

  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      // Scrolled past without being seen (a jump): show it, so scrolling back never finds a blank area.
      for (const e of entries) {
        if (!e.isIntersecting && e.boundingClientRect.top < 0) {
          show(e.target as HTMLElement, 0, false);
          obs.unobserve(e.target);
        }
      }
      const animate = entering.length <= BIG_BATCH;
      entering.forEach((e, i) => {
        show(e.target as HTMLElement, Math.min(i, MAX_STEPS) * STAGGER_MS, animate);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  pending.forEach((el) => observer.observe(el));
}

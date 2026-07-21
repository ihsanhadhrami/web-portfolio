import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion tokens. Keeping easing and duration in one place keeps
 * every animation feeling like it belongs to the same product.
 */
export const EASE_OUT: Transition['ease'] = [0.22, 1, 0.36, 1];

export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

/** Fade-and-rise, the workhorse entrance used across sections. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Parent container that staggers its children's entrances. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Default viewport config: animate once, when comfortably in view. */
export const viewportOnce = { once: true, margin: '-80px' } as const;

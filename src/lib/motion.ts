import type { Transition } from 'framer-motion'

/** Spring senza rimbalzo: arrivano morbide e si fermano senza oscillare. */
export const spring: Transition = { type: 'spring', duration: 1.1, bounce: 0 }
export const springSoft: Transition = { type: 'spring', duration: 1.6, bounce: 0 }
export const springSnappy: Transition = { type: 'spring', duration: 0.5, bounce: 0 }

/** Smorzamento per i valori legati allo scroll. */
export const scrollSmooth = { stiffness: 90, damping: 28, mass: 0.6 }

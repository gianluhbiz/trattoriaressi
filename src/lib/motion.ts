import type { Transition } from 'framer-motion'

export const spring: Transition = { type: 'spring', stiffness: 140, damping: 22, mass: 0.9 }
export const springSoft: Transition = { type: 'spring', stiffness: 90, damping: 20 }
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32 }

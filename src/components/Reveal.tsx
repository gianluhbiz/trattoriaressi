import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { spring } from '../lib/motion'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  /** Messa a fuoco (blur) solo per i titoli: è l'unico momento che la merita. */
  focus?: boolean
  className?: string
  as?: 'div' | 'li' | 'section' | 'ul'
}

/** Entrata su scroll morbida: sale e appare, nessun rimbalzo. */
export function Reveal({ children, delay = 0, y = 16, focus = false, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, ...(focus ? { filter: 'blur(6px)' } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(focus ? { filter: 'blur(0px)' } : {}) }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </Comp>
  )
}

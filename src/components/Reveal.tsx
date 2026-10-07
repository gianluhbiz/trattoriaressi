import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { spring } from '../lib/motion'

type Props = { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'section' }

/** Entrata su scroll: il contenuto è sempre visibile senza JS e con motion ridotto. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </Comp>
  )
}

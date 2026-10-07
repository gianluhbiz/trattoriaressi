import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { spring } from '../lib/motion'

type Props = { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'section' }

/** Entrata su scroll morbida: sale, si mette a fuoco, nessun rimbalzo. */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </Comp>
  )
}

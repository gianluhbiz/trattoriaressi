import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BookingComposer } from '../components/BookingComposer'
import { Reveal } from '../components/Reveal'
import { useLang, type L } from '../lib/i18n'
import { COURSES, TICINUM } from '../lib/menu'
import { spring, springSnappy } from '../lib/motion'

const SECTIONS: { id: string; title: L }[] = [
  ...COURSES.map((c) => ({ id: c.id, title: c.title })),
  { id: 'ticinum', title: { it: 'Ticinum', en: 'Ticinum' } },
  { id: 'vini', title: { it: 'Vini', en: 'Wine' } },
]

/** Evidenzia la sezione visibile e porta in vista la sua linguetta. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-140px 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const IDS = SECTIONS.map((s) => s.id)

function Tabs({ active }: { active: string }) {
  const { t } = useLang()
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = bar.current
    const el = container?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (container && el) container.scrollTo({ left: el.offsetLeft - container.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <div className="sticky top-[68px] z-20 -mx-4 bg-[var(--ground)]/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
      <div ref={bar} className="no-scrollbar flex gap-1 overflow-x-auto" role="navigation" aria-label={t({ it: 'Sezioni del menu', en: 'Menu sections' })}>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            data-id={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              history.replaceState(null, '', `#${s.id}`)
            }}
            aria-current={active === s.id ? 'true' : undefined}
            className={`relative shrink-0 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
              active === s.id ? 'text-brick-900' : 'text-mortar/80 hover:text-mortar'
            }`}
          >
            {active === s.id && <motion.span layoutId="menu-tab" transition={springSnappy} className="absolute inset-0 rounded-full bg-mortar" />}
            <span className="relative">{t(s.title)}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

const euro = (n: number) => `€${n}`

export default function Menu() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const active = useActiveSection(IDS)

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-28 sm:px-6 lg:px-10 lg:pt-36">
      <header className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:items-end">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="font-display text-[clamp(3.6rem,9vw,6rem)] leading-[0.95] font-medium tracking-[-0.03em] md:col-span-7"
        >
          {t({ it: 'Il menu', en: 'The menu' })}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="max-w-[46ch] text-lg leading-relaxed text-mortar/85 md:col-span-5"
        >
          {t({
            it: 'La carta cambia con le stagioni. Qui trovate i piatti e i prezzi pubblicati più di recente: chiedete in sala quelli del giorno.',
            en: 'The menu changes with the seasons. These are the most recently published dishes and prices: ask in the room for today’s.',
          })}
        </motion.p>
      </header>

      <Tabs active={active} />

      <div className="pb-24">
        {COURSES.map((c) => (
          <section key={c.id} id={c.id} className="grid grid-cols-1 gap-6 border-t border-mortar/15 py-14 md:grid-cols-12 md:gap-10 md:py-20">
            <div className="md:col-span-4">
              <Reveal>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.02em]">{t(c.title)}</h2>
                {c.note && <p className="mt-3 text-mortar-dim">{t(c.note)}</p>}
              </Reveal>
            </div>
            <ul className="md:col-span-8">
              {c.dishes.map((d, i) => (
                <Reveal as="li" key={d.name} delay={i * 0.05} y={18} className="group py-5 first:pt-0">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-tight">{d.name}</h3>
                    <span aria-hidden className="mb-1.5 min-w-6 flex-1 border-b border-dotted border-mortar/30 transition-colors group-hover:border-mortar/60" />
                    <span className="shrink-0 font-display text-[clamp(1.25rem,2vw,1.6rem)] tabular">
                      {d.price ? euro(d.price) : <span className="font-sans text-sm text-mortar-dim">{t({ it: 'di stagione', en: 'seasonal' })}</span>}
                    </span>
                  </div>
                  {d.desc && <p className="mt-1.5 max-w-[56ch] text-mortar/80">{t(d.desc)}</p>}
                </Reveal>
              ))}
            </ul>
          </section>
        ))}

        <section id="ticinum" className="relative -mx-4 overflow-hidden bg-[var(--band)] px-4 py-16 sm:-mx-6 sm:px-6 md:py-24 lg:mx-0 lg:rounded-t-[999px] lg:px-10 lg:pt-40">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-none font-medium tracking-[-0.02em]">
                {t({ it: 'Menu Ticinum', en: 'Ticinum menu' })}
              </h2>
              <p className="mt-4 text-mortar-dim">
                {t({ it: 'Quattro portate, anche in versione vegetariana', en: 'Four courses, also in a vegetarian version' })}
              </p>
            </Reveal>
            <ol className="mx-auto mt-12 flex max-w-[620px] flex-col text-left">
              {TICINUM.courses.map((c, i) => (
                <Reveal
                  as="li"
                  key={c.name}
                  delay={i * 0.08}
                  className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-mortar/15 py-5 sm:grid-cols-[7rem_1fr]"
                >
                  <span className="text-sm font-semibold text-mortar-dim">{t(c.course)}</span>
                  <span className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-snug">{c.name}</span>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-12">
              <p className="font-display text-6xl font-medium tabular">{euro(TICINUM.price)}</p>
              <p className="mt-3 text-mortar-dim">
                {t({
                  it: 'A persona. Per tutto il tavolo, non cumulabile con altre offerte.',
                  en: 'Per person. For the whole table, not combinable with other offers.',
                })}
              </p>
            </Reveal>
          </div>
        </section>

        <section id="vini" className="grid grid-cols-1 gap-6 py-16 md:grid-cols-12 md:gap-10 md:py-24">
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.02em]">{t({ it: 'Vini', en: 'Wine' })}</h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-8">
            <p className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.2] text-balance">
              {t({
                it: 'Più di cento etichette, scelte soprattutto tra le cantine dell’Oltrepò Pavese.',
                en: 'Over a hundred labels, chosen mostly from the wineries of the Oltrepò Pavese.',
              })}
            </p>
            <p className="mt-4 max-w-[56ch] text-mortar/80">
              {t({
                it: 'La carta dei vini è in sala: chiedete un consiglio per l’abbinamento.',
                en: 'The wine list is in the room: ask us for a pairing.',
              })}
            </p>
          </Reveal>
        </section>

        <aside className="grid grid-cols-1 gap-4 border-t border-mortar/15 pt-8 text-sm text-mortar-dim md:grid-cols-2">
          <p>
            {t({
              it: 'Opzioni vegetariane e senza glutine: segnalatele al momento della prenotazione.',
              en: 'Vegetarian and gluten-free options: let us know when you book.',
            })}
          </p>
          <p>
            {t({
              it: 'Allergeni: chiedete al personale, che vi indicherà gli ingredienti di ogni piatto.',
              en: 'Allergens: ask our staff for the ingredients of every dish.',
            })}
          </p>
        </aside>
      </div>

      <section id="prenota" className="grid grid-cols-1 gap-10 border-t border-mortar/15 py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.02em]">
            {t({ it: 'Vi teniamo un tavolo?', en: 'Shall we keep you a table?' })}
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg text-mortar/85">
            {t({
              it: 'Scegliete giorno, orario e persone: il messaggio parte già scritto.',
              en: 'Pick day, time and guests: the message is written for you.',
            })}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.08}>
          <BookingComposer compact />
        </Reveal>
      </section>
    </div>
  )
}

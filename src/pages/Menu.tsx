import { Leaf } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BookingComposer } from '../components/BookingComposer'
import { Reveal } from '../components/Reveal'
import { useLang, type L } from '../lib/i18n'
import { COVER_CHARGE } from '../lib/legal'
import { ALLERGENS, COURSES, VEGETABLES, type Diet } from '../lib/menu'
import { spring, springSnappy } from '../lib/motion'

const SECTIONS: { id: string; title: L }[] = [
  ...COURSES.map((c) => ({ id: c.id, title: c.title })),
  { id: 'orto', title: { it: 'L’orto', en: 'The garden' } },
  { id: 'vini', title: { it: 'Vini', en: 'Wine' } },
  { id: 'allergeni', title: { it: 'Allergeni', en: 'Allergens' } },
]

const DIET: Record<Diet, L> = {
  veg: { it: 'Vegetariano', en: 'Vegetarian' },
  vegan: { it: 'Vegano', en: 'Vegan' },
}

function DietTag({ diet }: { diet: Diet }) {
  const { t } = useLang()
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-sans text-xs font-medium tracking-normal ${
        diet === 'vegan' ? 'bg-leaf/15 text-leaf' : 'text-leaf ring-1 ring-leaf/40'
      }`}
    >
      <Leaf aria-hidden size="1.05em" weight={diet === 'vegan' ? 'fill' : 'regular'} />
      {t(DIET[diet])}
    </span>
  )
}

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
    if (container && el)
      container.scrollTo({ left: el.offsetLeft - container.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <div className="sticky top-[68px] z-20 -mx-4 bg-[var(--ground)]/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
      <motion.div
        layoutScroll
        ref={bar}
        className="no-scrollbar flex gap-1 overflow-x-auto"
        role="navigation"
        aria-label={t({ it: 'Sezioni del menu', en: 'Menu sections' })}
      >
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
            className={`relative isolate shrink-0 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
              active === s.id ? 'text-ink' : 'text-cream/80 hover:text-cream'
            }`}
          >
            {active === s.id && (
              <motion.span layoutId="menu-tab" transition={springSnappy} className="absolute inset-0 -z-10 rounded-full bg-cream" />
            )}
            {t(s.title)}
          </a>
        ))}
      </motion.div>
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
          className="font-display text-[clamp(3.6rem,9vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] md:col-span-7"
        >
          {t({ it: 'Il menu', en: 'The menu' })}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="max-w-[46ch] text-lg leading-relaxed text-cream/85 md:col-span-5"
        >
          {t({
            it: 'La carta di novembre. Cambia con le stagioni e segue i tempi della cucina: ogni piatto è preparato con calma, per ogni ospite.',
            en: 'The November menu. It changes with the seasons and keeps the kitchen’s own pace: every dish is cooked with care, for every guest.',
          })}
        </motion.p>
      </header>

      <Tabs active={active} />

      <div className="pb-24">
        {COURSES.map((c) => (
          <section key={c.id} id={c.id} className="grid grid-cols-1 gap-6 border-t border-cream/15 py-14 md:grid-cols-12 md:gap-10 md:py-20">
            <div className="md:col-span-4">
              <Reveal focus>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">{t(c.title)}</h2>
                {c.note && <p className="mt-3 text-muted">{t(c.note)}</p>}
              </Reveal>
            </div>
            <Reveal as="ul" delay={0.06} className="md:col-span-8">
              {c.dishes.map((d) => (
                <li key={d.name} className="group py-5 first:pt-0">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-display text-[clamp(1.3rem,2.1vw,1.75rem)] leading-tight font-medium tracking-[-0.02em]">{d.name}</h3>
                    <span
                      aria-hidden
                      className="mb-1.5 min-w-6 flex-1 border-b border-dotted border-cream/30 transition-colors group-hover:border-cream/50"
                    />
                    <span className="shrink-0 font-display text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium tabular">
                      {d.price ? euro(d.price) : <span className="font-sans text-sm text-muted">{t({ it: 'di stagione', en: 'seasonal' })}</span>}
                    </span>
                  </div>
                  {d.desc && <p className="mt-1.5 max-w-[56ch] text-cream/80">{t(d.desc)}</p>}
                  {(d.diet || d.allergens) && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      {d.diet && <DietTag diet={d.diet} />}
                      {d.allergens && (
                        <a
                          href="#allergeni"
                          className="text-xs text-muted tabular no-underline hover:text-cream"
                          aria-label={`${t({ it: 'Allergeni', en: 'Allergens' })}: ${d.allergens
                            .map((n) => t(ALLERGENS.find((a) => a.n === n)!.name))
                            .join(', ')}`}
                        >
                          {t({ it: 'Allergeni', en: 'Allergens' })} {d.allergens.join(' · ')}
                        </a>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </Reveal>
          </section>
        ))}

        <section id="orto" className="relative left-1/2 w-screen -translate-x-1/2 bg-[var(--band)]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-16 sm:px-6 md:grid-cols-12 md:gap-x-10 md:py-24 lg:px-10">
            <Reveal focus className="md:col-span-4">
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">
                {t({ it: 'Le verdure di stagione', en: 'Seasonal vegetables' })}
              </h2>
              <p className="mt-3 text-muted">{t({ it: 'Il manifesto dell’orto', en: 'The garden manifesto' })}</p>
            </Reveal>
            <div className="md:col-span-8">
              <Reveal>
                <p className="max-w-[60ch] text-lg leading-relaxed text-cream/85">
                  {t({
                    it: 'La terra detta il nostro ritmo. Le verdure dei piatti vengono raccolte e cucinate seguendo solo la reale disponibilità del mercato e dei nostri produttori locali. Ecco quelle di questa stagione.',
                    en: 'The land sets our pace. The vegetables in our dishes are picked and cooked only as the market and our local growers have them. These are this season’s.',
                  })}
                </p>
              </Reveal>
              <Reveal delay={0.08} className="mt-10">
                <dl>
                  {VEGETABLES.map((v) => (
                    <div
                      key={v.group.it}
                      className="grid grid-cols-1 gap-1 border-b border-cream/10 py-4 first:pt-0 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6"
                    >
                      <dt className="text-sm text-muted">{t(v.group)}</dt>
                      <dd className="font-display text-[clamp(1.15rem,1.7vw,1.4rem)] leading-snug font-medium tracking-[-0.015em]">{t(v.items)}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <p className="mt-6 text-sm text-muted">
                {t({
                  it: 'L’elenco cambia con i cicli naturali della terra.',
                  en: 'The list changes with the natural cycles of the land.',
                })}
              </p>
            </div>
          </div>
        </section>

        <section id="vini" className="grid grid-cols-1 gap-6 py-16 md:grid-cols-12 md:gap-10 md:py-24">
          <div className="md:col-span-4">
            <Reveal focus>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">
                {t({ it: 'Vini', en: 'Wine' })}
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-8">
            <p className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.18] font-medium tracking-[-0.03em] text-balance">
              {t({
                it: 'Più di cento etichette, scelte soprattutto tra le cantine dell’Oltrepò Pavese.',
                en: 'Over a hundred labels, chosen mostly from the wineries of the Oltrepò Pavese.',
              })}
            </p>
            <p className="mt-4 max-w-[56ch] text-cream/80">
              {t({
                it: 'La carta dei vini è in sala: chiedete un consiglio per l’abbinamento.',
                en: 'The wine list is in the room: ask us for a pairing.',
              })}
            </p>
          </Reveal>
        </section>

        <section id="allergeni" className="grid grid-cols-1 gap-6 border-t border-cream/15 py-16 md:grid-cols-12 md:gap-10 md:py-24">
          <div className="md:col-span-4">
            <Reveal focus>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">
                {t({ it: 'Allergeni', en: 'Allergens' })}
              </h2>
              <p className="mt-3 text-muted">{t({ it: 'Reg. UE 1169/2011', en: 'EU Reg. 1169/2011' })}</p>
            </Reveal>
          </div>
          <Reveal className="md:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{t({ it: 'Tabella allergeni del menu attuale', en: 'Allergens in the current menu' })}</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">{t({ it: 'Allergene', en: 'Allergen' })}</th>
                  <th scope="col">{t({ it: 'Presenza nel menu', en: 'Where in the menu' })}</th>
                </tr>
              </thead>
              <tbody>
                {ALLERGENS.map((a) => (
                  <tr key={a.n} className="border-b border-cream/10 align-baseline">
                    <td className="w-10 py-3 pr-3 text-sm text-muted tabular">{a.n}</td>
                    <th scope="row" className={`py-3 pr-4 font-medium ${a.where ? '' : 'text-muted'}`}>
                      {t(a.name)}
                    </th>
                    <td className="py-3 text-sm text-cream/80">
                      {a.where ? t(a.where) : <span className="text-muted">{t({ it: 'Assente', en: 'None' })}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 max-w-[60ch] text-sm text-muted">
              {t({
                it: 'Per qualsiasi allergia o intolleranza, informate il personale di sala prima di ordinare.',
                en: 'For any allergy or intolerance, please tell our staff before ordering.',
              })}
            </p>
          </Reveal>
        </section>

        <aside className="grid grid-cols-1 gap-4 border-t border-cream/15 pt-8 text-sm text-muted md:grid-cols-3">
          <p>
            {t({
              it: 'Prezzi in euro, IVA inclusa.',
              en: 'Prices in euro, VAT included.',
            })}{' '}
            {t({ it: 'Coperto:', en: 'Cover charge:' })} {t(COVER_CHARGE)}
          </p>
          <p>
            {t({
              it: 'Vegetariano e vegano sono segnati accanto a ogni piatto. Per esigenze senza glutine, segnalatelo alla prenotazione.',
              en: 'Vegetarian and vegan dishes are marked. For gluten-free needs, let us know when you book.',
            })}
          </p>
          <p>
            {t({
              it: 'I numeri accanto ai piatti rimandano alla tabella allergeni. Le verdure variano con il mercato: in caso di dubbi chiedete al personale.',
              en: 'The numbers by each dish refer to the allergen table. Vegetables vary with the market: if in doubt, ask our staff.',
            })}
          </p>
        </aside>
      </div>

      <section id="prenota" className="grid grid-cols-1 gap-10 border-t border-cream/15 py-20 md:py-28 lg:grid-cols-12">
        <Reveal focus className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            {t({ it: 'Vi teniamo un tavolo?', en: 'Shall we keep you a table?' })}
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg text-cream/85">
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

import { ArrowRight, ArrowUpRight, Clock, MapPin } from '@phosphor-icons/react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { BookingComposer } from '../components/BookingComposer'
import { Reveal } from '../components/Reveal'
import { useLang } from '../lib/i18n'
import {
  ADDRESS,
  currentStatus,
  EMAIL,
  MAPS_EMBED,
  MAPS_URL,
  romeNow,
  SERVICES,
  servicesOn,
  statusText,
  TRIPADVISOR_URL,
  WEEKDAYS,
} from '../lib/info'
import { PLATES, TICINUM } from '../lib/menu'
import { spring, springSnappy, springSoft } from '../lib/motion'

function useStatus() {
  const [status, setStatus] = useState(() => currentStatus())
  useEffect(() => {
    const id = window.setInterval(() => setStatus(currentStatus()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return status
}

function StatusLine() {
  const { lang } = useLang()
  const status = useStatus()
  return (
    <p className="flex items-center gap-2 text-[0.95rem] text-mortar-dim" aria-live="polite">
      <Clock aria-hidden size="1.25em" className={`text-lg ${status.open ? 'text-mortar' : ''}`} />
      <span>{statusText(status, lang)}</span>
    </p>
  )
}

function Hero() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  return (
    <section className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 gap-10 px-4 pt-[84px] pb-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-[104px] lg:pb-10">
      <div id="prenota" className="flex flex-col justify-center lg:col-span-6">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className="font-display text-[clamp(2.75rem,4.9vw,4.6rem)] leading-[1.02] font-medium tracking-[-0.025em] text-balance"
        >
          {t({ it: 'Sotto la volta, da oltre ottant’anni.', en: 'Under the brick vault for over eighty years.' })}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mortar/85"
        >
          {t({
            it: 'Trattoria pavese a due passi da San Michele. Risotti di Carnaroli, pasta fatta in casa, vini dell’Oltrepò.',
            en: 'A Pavese trattoria steps from San Michele. Carnaroli risotto, house-made pasta, Oltrepò wines.',
          })}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.25 }}
          className="mt-8 flex flex-col gap-3"
        >
          <StatusLine />
          <BookingComposer />
        </motion.div>
      </div>

      <div className="relative hidden lg:col-span-6 lg:block">
        <motion.div
          initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)' }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.1 }}
          className="absolute inset-y-0 right-0 left-[14%] overflow-hidden rounded-t-full xl:left-[22%]"
        >
          <motion.img
            src="/img/ingresso.webp"
            alt={t({ it: 'L’ingresso ad arco della trattoria in via Ressi', en: 'The arched entrance of the trattoria on via Ressi' })}
            initial={reduce ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 40, damping: 20, delay: 0.1 }}
            className="h-full w-full object-cover object-[50%_60%]"
            fetchPriority="high"
          />
        </motion.div>
      </div>

      <div className="arch relative -order-1 mx-auto h-[34svh] w-[min(100%,26rem)] overflow-hidden lg:hidden">
        <img
          src="/img/ingresso.webp"
          alt={t({ it: 'L’ingresso ad arco della trattoria in via Ressi', en: 'The arched entrance of the trattoria on via Ressi' })}
          className="h-full w-full object-cover object-[50%_65%]"
        />
      </div>
    </section>
  )
}

/** Interazione firma: l'arco dell'ingresso si apre fino a diventare la sala. */
function VaultOpening() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const side = useTransform(scrollYProgress, [0, 0.64], [22, 0])
  const top = useTransform(scrollYProgress, [0, 0.64], [12, 0])
  // Il raggio resta metà della larghezza (un vero arco) e si appiattisce solo alla fine.
  const flatten = useTransform(scrollYProgress, [0, 0.48, 0.64], [1, 1, 0])
  const radius = useTransform([side, flatten], ([s, f]: number[]) => ((100 - 2 * s) / 2) * f)
  const clipPath = useMotionTemplate`inset(${top}% ${side}% 0% ${side}% round ${radius}vw ${radius}vw 0 0)`
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.22, 1])
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.78], [0, 1])
  const textY = useTransform(scrollYProgress, [0.5, 0.78], [40, 0])

  const copy = (
    <>
      <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] font-medium tracking-[-0.02em]">
        {t({ it: 'Entrate dall’arco.', en: 'Come in through the arch.' })}
      </h2>
      <p className="mt-4 max-w-[46ch] text-lg text-mortar/90">
        {t({
          it: 'Una sala sola, quaranta coperti, tovaglie bianche e luce calda.',
          en: 'One room, forty seats, white tablecloths and warm light.',
        })}
      </p>
    </>
  )

  if (reduce) {
    return (
      <section className="relative h-[90dvh] overflow-hidden">
        <img src="/img/sala.webp" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-brick-950/90 via-brick-950/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-4 pb-14 sm:px-6 lg:px-10">{copy}</div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[240vh]" aria-label={t({ it: 'La sala', en: 'The room' })}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0 will-change-[clip-path]">
          <motion.img
            src="/img/sala.webp"
            alt={t({ it: 'La sala della trattoria apparecchiata', en: 'The dining room, tables laid' })}
            style={{ scale }}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brick-950/90 via-brick-950/25 to-transparent" />
        </motion.div>
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-4 pb-14 sm:px-6 lg:px-10 lg:pb-20"
        >
          {copy}
        </motion.div>
      </div>
    </section>
  )
}

function Story() {
  const { t } = useLang()
  const facts = [
    { it: 'Il riso è Carnaroli della Cascina Alberona, coltivato in provincia.', en: 'The rice is Carnaroli from Cascina Alberona, grown in the province.' },
    { it: 'Pane, focaccia, pasta e dolci si fanno ogni giorno in casa.', en: 'Bread, focaccia, pasta and desserts are made in house every day.' },
    { it: 'Più di cento etichette in cantina, quasi tutte dell’Oltrepò Pavese.', en: 'Over a hundred wines in the cellar, mostly from the Oltrepò Pavese.' },
  ]
  return (
    <section id="storia" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-36 lg:px-10">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7 lg:col-span-8">
          <Reveal>
            <p className="font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.16] tracking-[-0.015em] text-balance">
              {t({
                it: 'Una trattoria pavese a conduzione familiare, con una tradizione di oltre ottant’anni. ',
                en: 'A family-run Pavese trattoria with a tradition of over eighty years. ',
              })}
              <span className="text-mortar-dim italic">
                {t({
                  it: 'In via Adeodato Ressi, la via che costeggia le antiche mura, a pochi passi dal Comune.',
                  en: 'On via Adeodato Ressi, the lane along the old walls, a few steps from the town hall.',
                })}
              </span>
            </p>
          </Reveal>
          <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {facts.map((f, i) => (
              <Reveal as="li" key={f.it} delay={i * 0.08} className="border-t border-mortar/25 pt-5 text-[1.05rem] leading-relaxed text-mortar/90">
                {t(f)}
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="md:col-span-5 md:mt-24 lg:col-span-4" y={60}>
          <figure>
            <div className="arch aspect-[3/4] overflow-hidden">
              <img
                src="/img/via-ressi.webp"
                alt={t({ it: 'Via Adeodato Ressi e le mura in mattoni', en: 'Via Adeodato Ressi and its brick walls' })}
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo hover:scale-105"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-sm text-mortar-dim">{t({ it: 'Via Adeodato Ressi, 8', en: '8 Via Adeodato Ressi' })}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

function Kitchen() {
  const { t } = useLang()
  const heights = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[4/5]']
  return (
    <section id="cucina" className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 md:pb-36 lg:px-10">
      <Reveal>
        <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.02em]">
          {t({ it: 'La cucina segue le stagioni.', en: 'The kitchen follows the seasons.' })}
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-mortar/85">
          {t({
            it: 'Piatti della tradizione lombarda con ingredienti di produttori del territorio. La carta cambia spesso; questi sono alcuni piatti passati dalla nostra cucina.',
            en: 'Lombard classics with ingredients from local producers. The menu changes often; these are a few plates from our kitchen.',
          })}
        </p>
      </Reveal>

      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {PLATES.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 0.08} y={48} className="break-inside-avoid">
            <motion.figure whileHover="hover" initial="rest" animate="rest" className="group">
              <div className={`arch overflow-hidden bg-brick-800 ${heights[i]}`}>
                <motion.img
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                  transition={springSoft}
                  src={p.src}
                  alt={t(p.name)}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="font-display text-xl">{t(p.name)}</span>
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <MenuLink />
      </Reveal>
    </section>
  )
}

function MenuLink() {
  const { t } = useLang()
  return (
    <motion.div whileHover={{ x: 4 }} transition={springSnappy} className="inline-block">
      <Link to="/menu" className="inline-flex items-center gap-2 rounded-full border border-mortar/35 px-6 py-3 font-semibold transition-colors hover:border-saffron hover:text-saffron">
        {t({ it: 'Vedi il menu', en: 'See the menu' })}
        <ArrowRight aria-hidden size="1.15em" weight="regular" />
      </Link>
    </motion.div>
  )
}

function Ticinum() {
  const { t } = useLang()
  return (
    <section className="bg-[var(--band)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-24 sm:px-6 md:grid-cols-12 md:py-32 lg:px-10">
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="font-display text-[clamp(2.6rem,5.5vw,4.75rem)] leading-[1.02] font-medium tracking-[-0.02em]">
              {t({ it: 'Menu Ticinum', en: 'The Ticinum menu' })}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-mortar/85">
              {t({
                it: 'Ticinum era il nome romano di Pavia. Quattro portate della tradizione, anche in versione vegetariana.',
                en: 'Ticinum was the Roman name of Pavia. Four traditional courses, also in a vegetarian version.',
              })}
            </p>
            <p className="mt-8 font-display text-6xl font-medium tabular">
              €{TICINUM.price}
              <span className="ml-3 align-middle font-sans text-base font-normal text-mortar-dim">
                {t({ it: 'a persona', en: 'per person' })}
              </span>
            </p>
            <p className="mt-3 text-sm text-mortar-dim">
              {t({ it: 'Per tutto il tavolo, non cumulabile con altre offerte.', en: 'For the whole table, not combinable with other offers.' })}
            </p>
          </Reveal>
        </div>
        <ol className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          {TICINUM.courses.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 0.09} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-mortar/15 py-6 first:pt-0 sm:grid-cols-[8rem_1fr]">
              <span className="text-sm font-semibold text-mortar-dim">{t(c.course)}</span>
              <span className="font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug">{c.name}</span>
            </Reveal>
          ))}
          <Reveal className="mt-10">
            <MenuLink />
          </Reveal>
        </ol>
      </div>
    </section>
  )
}

const ROOMS = [
  { src: '/img/sala-arco.webp', alt: { it: 'La finestra ad arco e la credenza dei bicchieri', en: 'The arched window and the glass dresser' } },
  { src: '/img/sala-luce.webp', alt: { it: 'La sala con la luce del giorno', en: 'The room in daylight' } },
  { src: '/img/cena-tavola.webp', alt: { it: 'Un tavolo apparecchiato per la cena', en: 'A table laid for dinner' } },
  { src: '/img/sala-finestre.webp', alt: { it: 'I tavoli vicino alle finestre', en: 'Tables by the windows' } },
  { src: '/img/sala-scrivania.webp', alt: { it: 'L’angolo d’ingresso con la lavagna del menu', en: 'The entrance corner with the menu board' } },
]

function Room() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  return (
    <section id="sala" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-36 lg:px-10">
      <Reveal>
        <h2 className="max-w-[18ch] font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.02em]">
          {t({ it: 'Quaranta coperti, una sala sola.', en: 'Forty seats, a single room.' })}
        </h2>
      </Reveal>

      {/* Desktop: fisarmonica di immagini */}
      <div className="mt-14 hidden h-[68vh] min-h-[460px] gap-3 md:flex">
        {ROOMS.map((r, i) => (
          <motion.button
            key={r.src}
            type="button"
            layout
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={t(r.alt)}
            aria-pressed={active === i}
            transition={spring}
            style={{ flexGrow: active === i ? 5 : 1, flexBasis: 0 }}
            className="arch relative overflow-hidden"
          >
            <motion.img layout transition={spring} src={r.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </motion.button>
        ))}
      </div>
      <p className="mt-4 hidden text-sm text-mortar-dim md:block" aria-live="polite">
        {t(ROOMS[active].alt)}
      </p>

      {/* Mobile: scorrimento orizzontale */}
      <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:hidden">
        {ROOMS.map((r) => (
          <figure key={r.src} className="w-[78%] shrink-0 snap-center">
            <div className="arch aspect-[3/4] overflow-hidden">
              <img src={r.src} alt={t(r.alt)} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-2 text-sm text-mortar-dim">{t(r.alt)}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-[1100px] px-4 pb-24 text-center sm:px-6 md:pb-36">
      <Reveal>
        <h2 className="font-display text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.02em] italic">
          {t({ it: 'Il risotto, prima di tutto.', en: 'The risotto, first of all.' })}
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mx-auto mt-6 max-w-[58ch] text-lg leading-relaxed text-mortar/85">
          {t({
            it: 'È il piatto che gli ospiti citano più spesso nelle circa 340 recensioni su TripAdvisor, dove la trattoria ha 4,2 su 5. Poi il pane e i dolci fatti in casa, la sala sotto la volta, il servizio cortese.',
            en: 'It is the dish guests mention most in around 340 TripAdvisor reviews, where the trattoria holds 4.2 out of 5. Then the house bread and desserts, the vaulted room, the courteous service.',
          })}
        </p>
      </Reveal>
      <Reveal delay={0.14} className="mt-8">
        <a
          href={TRIPADVISOR_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-semibold underline decoration-mortar/40 hover:text-saffron hover:decoration-saffron"
        >
          {t({ it: 'Leggi le recensioni su TripAdvisor', en: 'Read the reviews on TripAdvisor' })}
          <ArrowUpRight aria-hidden size="1.15em" weight="regular" />
        </a>
      </Reveal>
    </section>
  )
}

function Hours() {
  const { t } = useLang()
  const today = romeNow().day
  const order = [1, 2, 3, 4, 5, 6, 0]
  return (
    <section id="orari" className="bg-[var(--band)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-32">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.02em]">
              {t({ it: 'Orari e dove trovarci', en: 'Hours and how to find us' })}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-6">
            <StatusLine />
          </Reveal>
          <Reveal delay={0.1}>
            <table className="mt-8 w-full text-[1.02rem]">
              <caption className="sr-only">{t({ it: 'Orari di apertura', en: 'Opening hours' })}</caption>
              <tbody>
                {order.map((d) => {
                  const svcs = servicesOn(d)
                  const isToday = d === today
                  return (
                    <tr key={d} className={`border-b border-mortar/12 ${isToday ? 'font-semibold text-mortar' : 'text-mortar/85'}`}>
                      <th scope="row" className="py-3 pr-4 text-left font-medium">
                        {t(WEEKDAYS[d])}
                        {isToday && <span className="ml-2 text-xs font-semibold">{t({ it: 'oggi', en: 'today' })}</span>}
                      </th>
                      <td className="py-3 text-right tabular">
                        {svcs.length === 0 ? (
                          <span className={isToday ? '' : 'text-mortar-dim'}>{t({ it: 'Chiuso', en: 'Closed' })}</span>
                        ) : (
                          svcs.map((s) => `${SERVICES[s].from}-${SERVICES[s].to}`).join('  ·  ')
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={0.14} className="mt-10 flex flex-col gap-1 text-lg">
            <span>{ADDRESS}</span>
            <a href={`mailto:${EMAIL}`} className="text-mortar-dim hover:text-saffron">{EMAIL}</a>
          </Reveal>
          <Reveal delay={0.18} className="mt-8">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-mortar/35 px-6 py-3 font-semibold transition-colors hover:border-saffron hover:text-saffron"
            >
              <MapPin aria-hidden size="1.15em" weight="regular" />
              {t({ it: 'Indicazioni stradali', en: 'Get directions' })}
            </a>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" y={50}>
          <div className="arch relative aspect-[4/5] overflow-hidden bg-brick-800 sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <iframe
              title={t({ it: 'Mappa: Trattoria Ressi, via Adeodato Ressi 8, Pavia', en: 'Map: Trattoria Ressi, 8 via Adeodato Ressi, Pavia' })}
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.35)_saturate(0.9)_contrast(1.02)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <VaultOpening />
      <Story />
      <Kitchen />
      <Ticinum />
      <Room />
      <Reviews />
      <Hours />
    </>
  )
}

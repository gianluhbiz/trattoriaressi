import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, MapPin } from '@phosphor-icons/react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
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
import { scrollSmooth, spring, springSlide, springSnappy, springSoft } from '../lib/motion'

const H2 = 'font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance'

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
    <p className="flex items-center gap-2 text-[0.95rem] text-cream/80" aria-live="polite">
      <Clock aria-hidden size="1.2em" />
      <span>{statusText(status, lang)}</span>
    </p>
  )
}

function Hero() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, scrollSmooth)
  const imgY = useTransform(progress, [0, 1], ['0%', '18%'])
  const imgScale = useTransform(progress, [0, 1], [1.04, 1.14])

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative h-[60svh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
        <motion.img
          src="/img/sala-luce.webp"
          alt={t({ it: 'La sala della trattoria con la luce del giorno', en: 'The trattoria dining room in daylight' })}
          style={reduce ? undefined : { y: imgY, scale: imgScale }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={springSoft}
          className="h-full w-full object-cover object-[50%_45%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/45 to-coal/10 lg:bg-gradient-to-r lg:from-coal/95 lg:via-coal/60 lg:to-coal/15" />
        <div className="absolute inset-x-0 bottom-0 hidden h-48 bg-gradient-to-t from-coal to-transparent lg:block" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-coal/80 to-transparent" />
      </div>

      <div className="relative mx-auto -mt-[26svh] grid max-w-[1400px] grid-cols-1 gap-10 px-4 pb-14 sm:px-6 lg:mt-0 lg:min-h-[100dvh] lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-10 lg:pt-28 lg:pb-14">
        <div id="prenota" className="lg:col-span-7 lg:pb-4">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ ...spring, delay: 0.15 }}
            className="max-w-[13ch] font-display text-[clamp(2.9rem,6.2vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.03em]"
          >
            {t({ it: 'Cucina pavese, da oltre ottant’anni.', en: 'Pavese cooking for over eighty years.' })}
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            className="mt-6 max-w-[44ch] text-lg leading-relaxed text-cream/85"
          >
            {t({
              it: 'Trattoria di famiglia a due passi da San Michele. Risotti di Carnaroli, pasta fatta in casa, vini dell’Oltrepò.',
              en: 'A family trattoria steps from San Michele. Carnaroli risotto, house-made pasta, Oltrepò wines.',
            })}
          </motion.p>
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...spring, delay: 0.45 }} className="mt-6">
            <StatusLine />
          </motion.div>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.4 }}
          className="lg:col-span-5"
        >
          <BookingComposer />
        </motion.div>
      </div>
    </section>
  )
}

/** Interazione firma: la sala si apre da riquadro a tutto schermo mentre si scorre. */
function RoomReveal() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, scrollSmooth)
  const side = useTransform(p, [0, 0.6], [16, 0])
  const top = useTransform(p, [0, 0.6], [14, 0])
  const radius = useTransform(p, [0, 0.6], [10, 0])
  const clipPath = useMotionTemplate`inset(${top}% ${side}% ${top}% ${side}% round ${radius}px)`
  const scale = useTransform(p, [0, 0.75], [1.25, 1])
  const textOpacity = useTransform(p, [0.45, 0.75], [0, 1])
  const textY = useTransform(p, [0.45, 0.75], [36, 0])

  const copy = (
    <>
      <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[1] font-semibold tracking-[-0.035em]">
        {t({ it: 'Accomodatevi.', en: 'Take a seat.' })}
      </h2>
      <p className="mt-4 max-w-[46ch] text-lg text-cream/90">
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-4 pb-28 sm:px-6 lg:px-10 lg:pb-20">{copy}</div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[230vh]" aria-label={t({ it: 'La sala', en: 'The room' })}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0 will-change-[clip-path]">
          <motion.img
            src="/img/sala.webp"
            alt={t({ it: 'La sala della trattoria apparecchiata', en: 'The dining room, tables laid' })}
            style={{ scale }}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
        </motion.div>
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-4 pb-28 sm:px-6 lg:px-10 lg:pb-20"
        >
          {copy}
        </motion.div>
      </div>
    </section>
  )
}

function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, scrollSmooth)
  const y = useTransform(p, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className={`overflow-hidden rounded-md bg-char ${className}`}>
      <motion.img src={src} alt={alt} loading="lazy" style={reduce ? undefined : { y, scale: 1.18 }} className="h-full w-full object-cover" />
    </div>
  )
}

function Story() {
  const { t } = useLang()
  const facts = [
    {
      it: 'Il riso è Carnaroli della Cascina Alberona, coltivato in provincia.',
      en: 'The rice is Carnaroli from Cascina Alberona, grown in the province.',
    },
    { it: 'Pane, focaccia, pasta e dolci si fanno ogni giorno in casa.', en: 'Bread, focaccia, pasta and desserts are made in house every day.' },
    {
      it: 'Più di cento etichette in cantina, quasi tutte dell’Oltrepò Pavese.',
      en: 'Over a hundred wines in the cellar, mostly from the Oltrepò Pavese.',
    },
  ]
  return (
    <section id="storia" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-36 lg:px-10">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7 md:flex md:flex-col md:justify-between">
          <Reveal focus>
            <p className="font-display text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.14] font-medium tracking-[-0.03em] text-balance">
              {t({
                it: 'Una trattoria pavese di famiglia, nel centro storico. ',
                en: 'A family-run Pavese trattoria in the old town. ',
              })}
              <span className="text-muted">
                {t({
                  it: 'In via Adeodato Ressi, la via che costeggia le antiche mura, a pochi passi dal Comune.',
                  en: 'On via Adeodato Ressi, the lane along the old walls, a few steps from the town hall.',
                })}
              </span>
            </p>
          </Reveal>
          <Reveal as="ul" delay={0.1} className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:mb-10">
            {facts.map((f) => (
              <li key={f.it} className="border-t border-cream/15 pt-5 leading-relaxed text-cream/85">
                {t(f)}
              </li>
            ))}
          </Reveal>
        </div>
        <Reveal className="md:col-span-5 md:col-start-8" y={40}>
          <figure>
            <ParallaxImage
              src="/img/via-ressi.webp"
              alt={t({ it: 'Via Adeodato Ressi e le mura in mattoni', en: 'Via Adeodato Ressi and its brick walls' })}
              className="aspect-[4/5]"
            />
            <figcaption className="mt-3 text-sm text-muted">{t({ it: 'Via Adeodato Ressi, 8', en: '8 Via Adeodato Ressi' })}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

function Kitchen() {
  const { t } = useLang()
  const track = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('figure')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: 'smooth' })
  }

  return (
    <section id="cucina" className="pt-24 pb-24 md:pt-36 md:pb-36">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10">
        <div>
          <Reveal focus>
            <h2 className={`max-w-[16ch] ${H2}`}>{t({ it: 'La cucina segue le stagioni.', en: 'The kitchen follows the seasons.' })}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-cream/80">
              {t({
                it: 'Piatti della tradizione lombarda con ingredienti di produttori del territorio. Alcuni piatti passati dalla nostra cucina.',
                en: 'Lombard classics with ingredients from local producers. A few plates from our kitchen.',
              })}
            </p>
          </Reveal>
        </div>
        <div className="hidden gap-2 md:flex">
          {([-1, 1] as const).map((d) => (
            <motion.button
              key={d}
              type="button"
              onClick={() => scrollBy(d)}
              whileTap={{ scale: 0.95 }}
              transition={springSnappy}
              aria-label={d < 0 ? t({ it: 'Piatti precedenti', en: 'Previous dishes' }) : t({ it: 'Piatti successivi', en: 'Next dishes' })}
              className="grid h-12 w-12 place-items-center rounded-full border border-cream/20 transition-colors duration-300 hover:border-cream/60 hover:bg-cream/5"
            >
              {d < 0 ? <ArrowLeft aria-hidden size="1.15em" /> : <ArrowRight aria-hidden size="1.15em" />}
            </motion.button>
          ))}
        </div>
      </div>

      <Reveal y={24}>
        <div
          ref={track}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 sm:px-6 lg:px-10 scroll-px-4 sm:scroll-px-6 lg:scroll-px-10 xl:px-[max(2.5rem,calc((100vw_-_1400px)/2_+_2.5rem))] xl:scroll-px-[max(2.5rem,calc((100vw_-_1400px)/2_+_2.5rem))]"
        >
          {PLATES.map((p) => (
            <figure key={p.src} className="group w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw] xl:w-[400px]">
              <div className="aspect-[4/5] overflow-hidden rounded-md bg-char">
                <img
                  src={p.src}
                  alt={t(p.name)}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.05]"
                />
              </div>
              <figcaption className="mt-4 font-display text-xl font-medium tracking-[-0.02em]">{t(p.name)}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-10 max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <MenuLink />
      </div>
    </section>
  )
}

function MenuLink() {
  const { t } = useLang()
  return (
    <Link
      to="/menu"
      className="group inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 font-medium transition-colors duration-500 ease-out-expo hover:border-cream hover:bg-cream hover:text-ink"
    >
      {t({ it: 'Vedi il menu', en: 'See the menu' })}
      <ArrowRight aria-hidden size="1.1em" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
    </Link>
  )
}

function Ticinum() {
  const { t } = useLang()
  return (
    <section className="bg-[var(--band)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-24 sm:px-6 md:grid-cols-12 md:py-32 lg:px-10">
        <div className="md:col-span-5">
          <Reveal focus>
            <h2 className={H2}>{t({ it: 'Menu Ticinum', en: 'The Ticinum menu' })}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-cream/80">
              {t({
                it: 'Ticinum era il nome romano di Pavia. Quattro portate della tradizione, anche in versione vegetariana.',
                en: 'Ticinum was the Roman name of Pavia. Four traditional courses, also in a vegetarian version.',
              })}
            </p>
            <p className="mt-10 font-display text-6xl font-semibold tracking-[-0.035em] tabular">
              €{TICINUM.price}
              <span className="ml-3 align-middle font-sans text-base font-normal tracking-normal text-muted">
                {t({ it: 'a persona', en: 'per person' })}
              </span>
            </p>
            <p className="mt-3 text-sm text-muted">
              {t({ it: 'Per tutto il tavolo, non cumulabile con altre offerte.', en: 'For the whole table, not combinable with other offers.' })}
            </p>
          </Reveal>
        </div>
        <Reveal className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <ol>
            {TICINUM.courses.map((c) => (
              <li
                key={c.name}
                className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-cream/10 py-6 first:pt-0 sm:grid-cols-[8rem_1fr]"
              >
                <span className="text-sm text-muted">{t(c.course)}</span>
                <span className="font-display text-[clamp(1.35rem,2.3vw,1.9rem)] leading-snug font-medium tracking-[-0.02em]">{c.name}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <MenuLink />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const ROOMS = [
  { src: '/img/sala-arco.webp', alt: { it: 'La finestra ad arco e la credenza dei bicchieri', en: 'The arched window and the glass dresser' } },
  { src: '/img/cena-tavola.webp', alt: { it: 'Un tavolo apparecchiato per la cena', en: 'A table laid for dinner' } },
  { src: '/img/sala-finestre.webp', alt: { it: 'I tavoli vicino alle finestre', en: 'Tables by the windows' } },
  { src: '/img/ingresso.webp', alt: { it: 'L’ingresso in via Ressi', en: 'The entrance on via Ressi' } },
  { src: '/img/sala-scrivania.webp', alt: { it: 'L’angolo d’ingresso con la lavagna del menu', en: 'The entrance corner with the menu board' } },
]

function Room() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const hoverTimer = useRef<number | undefined>(undefined)
  // Cambia foto solo se il puntatore si ferma: passarci sopra non fa scattare tutto.
  const intent = (i: number) => {
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setActive(i), 140)
  }
  useEffect(() => () => window.clearTimeout(hoverTimer.current), [])
  return (
    <section id="sala" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-36 lg:px-10">
      <Reveal focus>
        <h2 className={`max-w-[18ch] ${H2}`}>{t({ it: 'Di giorno e di sera.', en: 'By day and by night.' })}</h2>
      </Reveal>

      <div className="mt-14 hidden h-[64vh] min-h-[440px] gap-3 md:flex">
        {ROOMS.map((r, i) => (
          <motion.button
            key={r.src}
            type="button"
            layout
            onPointerEnter={() => intent(i)}
            onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={t(r.alt)}
            aria-pressed={active === i}
            transition={springSlide}
            style={{ flexGrow: active === i ? 5 : 1, flexBasis: 0, borderRadius: 6 }}
            className="relative overflow-hidden"
          >
            <motion.img
              layout
              transition={springSlide}
              src={r.src}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out-expo ${active === i ? '' : 'brightness-[0.55] saturate-[0.8]'}`}
            />
          </motion.button>
        ))}
      </div>
      <p className="mt-4 hidden text-sm text-muted md:block" aria-live="polite">
        {t(ROOMS[active].alt)}
      </p>

      <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:hidden">
        {ROOMS.map((r) => (
          <figure key={r.src} className="w-[78%] shrink-0 snap-center">
            <div className="aspect-[3/4] overflow-hidden rounded-md">
              <img src={r.src} alt={t(r.alt)} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-2 text-sm text-muted">{t(r.alt)}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  const { t } = useLang()
  return (
    <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 pb-24 sm:px-6 md:grid-cols-12 md:items-center md:gap-10 md:pb-36 lg:px-10">
      <Reveal className="md:col-span-5" y={32}>
        <ParallaxImage
          src="/img/risotto-zafferano.webp"
          alt={t({ it: 'Risotto con cernia, zafferano e arancia', en: 'Risotto with grouper, saffron and orange' })}
          className="aspect-[4/5]"
        />
      </Reveal>
      <div className="md:col-span-6 md:col-start-7">
        <Reveal focus>
          <h2 className={H2}>{t({ it: 'Il risotto, prima di tutto.', en: 'The risotto, first of all.' })}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-cream/80">
            {t({
              it: 'Nelle circa 340 recensioni su TripAdvisor, dove la trattoria ha 4,2 su 5, molti ospiti citano il risotto. E poi il pane e i dolci fatti in casa, la sala, il servizio cortese.',
              en: 'In around 340 TripAdvisor reviews, where the trattoria holds 4.2 out of 5, many guests mention the risotto. Then the house bread and desserts, the room, the courteous service.',
            })}
          </p>
        </Reveal>
        <Reveal as="ul" delay={0.12} className="mt-10 flex gap-12">
          {[
            { score: '4,2', label: 'TripAdvisor', count: { it: '~340 recensioni', en: '~340 reviews' } },
            { score: '4,2', label: 'Google', count: { it: '473 recensioni', en: '473 reviews' } },
          ].map((r) => (
            <li key={r.label}>
              <p className="font-display text-5xl font-semibold tracking-[-0.035em] tabular">{r.score}</p>
              <p className="mt-2 text-sm text-muted">
                {r.label} · {t(r.count)}
              </p>
            </li>
          ))}
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium underline decoration-cream/40 transition-colors duration-300 hover:decoration-cream"
          >
            {t({ it: 'Leggi le recensioni su TripAdvisor', en: 'Read the reviews on TripAdvisor' })}
            <ArrowUpRight aria-hidden size="1.1em" />
          </a>
        </Reveal>
      </div>
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
          <Reveal focus>
            <h2 className={H2}>{t({ it: 'Orari e dove trovarci', en: 'Hours and how to find us' })}</h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-6">
            <StatusLine />
          </Reveal>
          <Reveal delay={0.1}>
            <table className="mt-8 w-full">
              <caption className="sr-only">{t({ it: 'Orari di apertura', en: 'Opening hours' })}</caption>
              <tbody>
                {order.map((d) => {
                  const svcs = servicesOn(d)
                  const isToday = d === today
                  return (
                    <tr key={d} className={`border-b border-cream/10 ${isToday ? 'font-semibold text-cream' : 'text-cream/80'}`}>
                      <th scope="row" className="py-3 pr-4 text-left font-[inherit]">
                        {t(WEEKDAYS[d])}
                        {isToday && <span className="ml-2 rounded-full bg-cream/10 px-2 py-0.5 text-xs">{t({ it: 'oggi', en: 'today' })}</span>}
                      </th>
                      <td className="py-3 text-right tabular">
                        {svcs.length === 0 ? (
                          <span className="text-muted">{t({ it: 'Chiuso', en: 'Closed' })}</span>
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
            <a href={`mailto:${EMAIL}`} className="text-muted transition-colors hover:text-cream">
              {EMAIL}
            </a>
          </Reveal>
          <Reveal delay={0.18} className="mt-8">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 font-medium transition-colors duration-500 ease-out-expo hover:border-cream hover:bg-cream hover:text-ink"
            >
              <MapPin aria-hidden size="1.1em" />
              {t({ it: 'Indicazioni stradali', en: 'Get directions' })}
            </a>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" y={40}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-ember sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <iframe
              title={t({ it: 'Mappa: Trattoria Ressi, via Adeodato Ressi 8, Pavia', en: 'Map: Trattoria Ressi, 8 via Adeodato Ressi, Pavia' })}
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.55)_brightness(0.95)_sepia(0.15)]"
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
      <Story />
      <RoomReveal />
      <Kitchen />
      <Ticinum />
      <Room />
      <Reviews />
      <Hours />
    </>
  )
}

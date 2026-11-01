import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, MapPin } from '@phosphor-icons/react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { BookingComposer } from '../components/BookingComposer'
import { MapEmbed } from '../components/MapEmbed'
import { Reveal } from '../components/Reveal'
import { useLang } from '../lib/i18n'
import {
  ADDRESS,
  currentStatus,
  EMAIL,
  MAPS_URL,
  REVIEWS_CHECKED,
  romeNow,
  SERVICES,
  servicesOn,
  statusText,
  TRIPADVISOR_URL,
  WEEKDAYS,
} from '../lib/info'
import { PLATES } from '../lib/menu'
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
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-4 pb-14 sm:px-6 lg:px-10">{copy}</div>
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
          className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-4 pb-14 sm:px-6 lg:px-10 lg:pb-20"
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
  return (
    <section id="storia" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-36 lg:px-10">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7 lg:col-span-7">
          <Reveal focus>
            <p className="text-sm font-medium tracking-[0.12em] text-leaf uppercase">{t({ it: 'Post-trattoria sostenibile', en: 'A sustainable post-trattoria' })}</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.14] font-medium tracking-[-0.03em] text-balance">
              {t({
                it: 'Ogni scelta a tavola ha un impatto sul mondo. ',
                en: 'Every choice at the table has an impact on the world. ',
              })}
              <span className="text-muted">
                {t({
                  it: 'Così la tradizione della nostra trattoria è diventata una dichiarazione d’intenti etica, d’avanguardia e inclusiva.',
                  en: 'So we turned our trattoria’s tradition into a statement of intent: ethical, forward-looking and inclusive.',
                })}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 max-w-[58ch] space-y-5 text-lg leading-relaxed text-cream/85">
            <p>
              {t({
                it: 'Per noi cucinare significa unire la responsabilità ambientale alla concretezza della grande qualità.',
                en: 'To us, cooking means pairing environmental responsibility with the substance of real quality.',
              })}
            </p>
            <p>
              {t({
                it: 'Per questo abbracciamo il valore del tempo: la cucina non corre dietro alle urgenze, rispetta i ritmi di preparazione che servono a dare a ogni ospite, senza distinzioni, la massima cura. Vi accogliamo per un’esperienza consapevole.',
                en: 'That is why we embrace the value of time: the kitchen does not chase urgency, it keeps the preparation times needed to give every guest, without distinction, our full care. We welcome you to a mindful meal.',
              })}
            </p>
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
    <section id="cucina" className="pb-24 md:pb-36">
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
          tabIndex={0}
          role="region"
          aria-label={t({ it: 'Foto dei piatti, scorrevoli', en: 'Dish photos, scrollable' })}
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

const PILLARS = [
  {
    title: { it: 'Identità artigianale e genuinità', en: 'Craft and honesty' },
    text: {
      it: 'Crediamo nella manualità. Scegliamo materie prime eccellenti e produciamo in casa i nostri panificati a lievitazione naturale. Quando usiamo ingredienti o semilavorati esterni, scegliamo solo partner con standard altissimi di sostenibilità e purezza.',
      en: 'We believe in handwork. We choose excellent produce and bake our own naturally leavened bread. When we buy ingredients or prepared items, we choose only partners with the highest standards of sustainability and purity.',
    },
  },
  {
    title: { it: 'Filiere consapevoli, locali e globali', en: 'Mindful supply chains, local and global' },
    text: {
      it: 'Lavoriamo con piccoli artigiani del territorio e con realtà più strutturate. L’unico criterio è la loro visione: scegliamo solo chi investe davvero nella riduzione dell’impatto ambientale e nella tracciabilità.',
      en: 'We work with small local artisans and larger producers alike. Our only criterion is their vision: we choose only those who truly invest in lower environmental impact and traceability.',
    },
  },
  {
    title: { it: 'La salvaguardia animale', en: 'Animal welfare' },
    text: {
      it: 'Abbiamo eliminato qualsiasi prodotto da allevamenti intensivi. Sosteniamo solo filiere trasparenti che mettono al primo posto il benessere animale e la rigenerazione della terra.',
      en: 'We have removed every product from intensive farming. We support only transparent supply chains that put animal welfare and land regeneration first.',
    },
  },
  {
    title: { it: 'Inclusività e stagionalità vegetale', en: 'Inclusive, seasonal plant cooking' },
    text: {
      it: 'La cucina vegetale e vegana non è un’alternativa né una sottrazione: è il cuore del menu. Segue il ritmo delle stagioni, valorizza la biodiversità e accoglie tutti attorno alla stessa tavola.',
      en: 'Plant-based and vegan cooking is neither an alternative nor a subtraction: it is the heart of the menu. It follows the seasons, celebrates biodiversity and brings everyone to the same table.',
    },
  },
]

const PARTNERS = [
  'GranVarzi',
  'Fratelli Daturi',
  'Caseificio Brusati',
  'Caseificio Vailati',
  'Lo Psicologo delle Api',
  'Altromercato',
  'METRO (filiere certificate)',
  'MSC (pesca sostenibile)',
  'Cascina Alberona',
  'Pastificio Amadio',
  'Cascina Speziana',
  'Caffè del Caravaggio',
  'Acqua Valverde',
]

function Pillars() {
  const { t } = useLang()
  return (
    <section id="filosofia" className="bg-[var(--band)]">
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
        <Reveal focus>
          <h2 className={`max-w-[18ch] ${H2}`}>{t({ it: 'I nostri quattro pilastri.', en: 'Our four pillars.' })}</h2>
        </Reveal>
        <Reveal as="ul" delay={0.08} className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <li key={p.title.it} className="border-t border-cream/15 pt-6">
              <p className="font-display text-sm font-medium text-leaf tabular">0{i + 1}</p>
              <h3 className="mt-3 font-display text-[clamp(1.4rem,2.2vw,1.85rem)] leading-tight font-medium tracking-[-0.02em]">{t(p.title)}</h3>
              <p className="mt-3 max-w-[54ch] leading-relaxed text-cream/80">{t(p.text)}</p>
            </li>
          ))}
        </Reveal>
        <Reveal delay={0.12} className="mt-16 border-t border-cream/15 pt-8">
          <h3 className="text-sm text-muted">{t({ it: 'Filiere sostenibili e partner etici', en: 'Sustainable supply chains and ethical partners' })}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {PARTNERS.map((name) => (
              <li key={name} className="rounded-full border border-cream/15 px-3.5 py-1.5 text-sm text-cream/85">
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="mt-12">
          <MenuLink />
        </div>
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

      <div
        tabIndex={0}
        role="region"
        aria-label={t({ it: 'Foto della sala, scorrevoli', en: 'Room photos, scrollable' })}
        className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:hidden"
      >
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
        <Reveal delay={0.14} className="mt-8">
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium underline decoration-cream/40 transition-colors duration-300 hover:decoration-cream"
          >
            {t({ it: 'Leggi le recensioni su TripAdvisor', en: 'Read the reviews on TripAdvisor' })}
            <ArrowUpRight aria-hidden size="1.1em" />
          </a>
          <p className="mt-5 max-w-[52ch] text-sm text-muted">
            {t({
              it: `Voto e numero di recensioni rilevati su TripAdvisor a ${REVIEWS_CHECKED.it}. Le recensioni sono raccolte, pubblicate e moderate da TripAdvisor secondo le sue regole: la trattoria non le seleziona e non ne verifica la provenienza.`,
              en: `Rating and number of reviews as shown on TripAdvisor in ${REVIEWS_CHECKED.en}. Reviews are collected, published and moderated by TripAdvisor under its own rules: the trattoria does not select them or verify where they come from.`,
            })}
          </p>
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
          <div className="relative aspect-[4/5] min-h-[460px] overflow-hidden rounded-md bg-ember sm:aspect-[5/4] sm:min-h-0 lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <MapEmbed />
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
      <Pillars />
      <Room />
      <Reviews />
      <Hours />
    </>
  )
}

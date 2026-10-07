import { Minus, Phone, Plus, WhatsappLogo } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useLang } from '../lib/i18n'
import { PHONE_DISPLAY, PHONE_TEL, romeNow, SERVICES, servicesOn, WEEKDAYS, WHATSAPP, type Service } from '../lib/info'
import { springSnappy } from '../lib/motion'

type Day = { date: Date; weekday: number; label: string; num: string; services: Service[] }

function nextDays(lang: 'it' | 'en', count = 10): Day[] {
  const today = new Date()
  const { day: romeDay } = romeNow(today)
  const fmt = new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'Europe/Rome' })
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today.getTime() + i * 86_400_000)
    const weekday = (romeDay + i) % 7
    return {
      date,
      weekday,
      label: i === 0 ? (lang === 'it' ? 'Oggi' : 'Today') : i === 1 ? (lang === 'it' ? 'Domani' : 'Tomorrow') : WEEKDAYS[weekday][lang].slice(0, 3),
      num: fmt.format(date),
      services: servicesOn(weekday),
    }
  })
}

const pill =
  'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35'

/**
 * Prenotazione reale: compone un messaggio WhatsApp con giorno, servizio, orario e coperti
 * per il numero ufficiale. Mercoledì e domenica sera non sono selezionabili.
 */
export function BookingComposer({ compact = false }: { compact?: boolean }) {
  const { lang, t } = useLang()
  const days = useMemo(() => nextDays(lang), [lang])
  const firstOpen = days.findIndex((d) => d.services.length > 0)
  const [dayIdx, setDayIdx] = useState(firstOpen)
  const [wantedService, setService] = useState<Service>('cena')
  const [wantedTime, setTime] = useState('20:00')
  const [people, setPeople] = useState(2)

  // Servizio e orario si adattano al giorno scelto (domenica solo pranzo).
  const day = days[dayIdx]
  const service: Service = day.services.includes(wantedService) ? wantedService : day.services[0]
  const time = SERVICES[service].slots.includes(wantedTime) ? wantedTime : SERVICES[service].slots[0]

  const dateLong = new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Rome',
  }).format(day.date)

  const message =
    lang === 'it'
      ? `Buongiorno, vorrei prenotare un tavolo per ${people} ${people === 1 ? 'persona' : 'persone'} ${dateLong}, ${SERVICES[service].label.it.toLowerCase()} alle ${time}. Grazie!`
      : `Hello, I would like to book a table for ${people} ${people === 1 ? 'person' : 'people'} on ${dateLong}, ${SERVICES[service].label.en.toLowerCase()} at ${time}. Thank you!`
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`

  return (
    <form
      id="prenota-form"
      onSubmit={(e) => {
        e.preventDefault()
        window.open(waHref, '_blank', 'noopener')
      }}
      className={`rounded-2xl border border-cream/10 bg-char/95 p-4 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)] sm:p-5 ${compact ? '' : 'max-w-[560px]'}`}
      aria-label={t({ it: 'Prenota un tavolo', en: 'Book a table' })}
    >
      <fieldset className="min-w-0">
        <legend className="mb-2 text-xs font-semibold text-muted">{t({ it: 'Giorno', en: 'Day' })}</legend>
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {days.map((d, i) => {
            const closed = d.services.length === 0
            const active = i === dayIdx
            return (
              <button
                key={d.date.toISOString()}
                type="button"
                disabled={closed}
                onClick={() => setDayIdx(i)}
                aria-pressed={active}
                title={closed ? t({ it: 'Mercoledì chiuso', en: 'Closed on Wednesdays' }) : undefined}
                className={`relative flex min-w-[64px] shrink-0 flex-col items-center rounded-2xl px-2.5 py-2 transition-colors disabled:cursor-not-allowed ${
                  active ? 'text-ink' : closed ? 'text-cream/35' : 'text-cream hover:bg-cream/10'
                }`}
              >
                {active && <motion.span layoutId="day-pill" transition={springSnappy} className="absolute inset-0 rounded-2xl bg-cream" />}
                <span className="relative text-[0.7rem] font-semibold uppercase">{d.label}</span>
                <span className={`relative text-sm tabular ${closed ? 'line-through' : ''}`}>{d.num}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3">
        <fieldset className="min-w-0">
          <legend className="mb-2 text-xs font-semibold text-muted">{t({ it: 'Servizio', en: 'Service' })}</legend>
          <div className="flex rounded-full bg-ink/60 p-1">
            {(['pranzo', 'cena'] as const).map((s) => {
              const enabled = day.services.includes(s)
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!enabled}
                  onClick={() => setService(s)}
                  aria-pressed={service === s}
                  className={`${pill} ${service === s ? 'text-ink' : 'text-cream hover:text-cream'}`}
                >
                  {service === s && <motion.span layoutId="svc-pill" transition={springSnappy} className="absolute inset-0 rounded-full bg-cream" />}
                  <span className="relative">{t(SERVICES[s].label)}</span>
                </button>
              )
            })}
          </div>
        </fieldset>


        <fieldset className="min-w-0">
          <legend className="mb-2 text-xs font-semibold text-muted">{t({ it: 'Persone', en: 'Guests' })}</legend>
          <div className="flex items-center gap-1 rounded-full bg-ink/60 p-1">
            <button
              type="button"
              onClick={() => setPeople((p) => Math.max(1, p - 1))}
              disabled={people <= 1}
              aria-label={t({ it: 'Una persona in meno', en: 'One guest less' })}
              className="grid h-9 w-9 place-items-center rounded-full text-lg hover:bg-cream/10 disabled:opacity-35"
            >
              <Minus aria-hidden size="1.15em" weight="regular" />
            </button>
            <output aria-live="polite" className="w-7 text-center font-display text-xl font-semibold tabular">
              {people}
            </output>
            <button
              type="button"
              onClick={() => setPeople((p) => Math.min(40, p + 1))}
              aria-label={t({ it: 'Una persona in più', en: 'One more guest' })}
              className="grid h-9 w-9 place-items-center rounded-full text-lg hover:bg-cream/10"
            >
              <Plus aria-hidden size="1.15em" weight="regular" />
            </button>
          </div>
        </fieldset>
      </div>

      <div className="mt-3">
      <fieldset className="min-w-0">
          <legend className="mb-2 text-xs font-semibold text-muted">{t({ it: 'Orario', en: 'Time' })}</legend>
          <div className="flex flex-wrap gap-1.5">
            <AnimatePresence mode="popLayout" initial={false}>
              {SERVICES[service].slots.map((s) => (
                <motion.button
                  layout
                  key={service + s}
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={springSnappy}
                  onClick={() => setTime(s)}
                  aria-pressed={time === s}
                  className={`shrink-0 rounded-full border px-3 py-2 text-sm tabular transition-colors ${
                    time === s ? 'border-cream bg-cream text-ink' : 'border-cream/20 text-cream hover:border-cream/50'
                  }`}
                >
                  {s}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </fieldset>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={springSnappy}
          className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-saffron px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-cream"
        >
          <WhatsappLogo aria-hidden size="1.15em" weight="regular" className="text-lg" />
          {t({ it: 'Prenota su WhatsApp', en: 'Book on WhatsApp' })}
        </motion.button>
        <motion.a
          href={`tel:${PHONE_TEL}`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={springSnappy}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-cream/30 px-5 py-3.5 font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
        >
          <Phone aria-hidden size="1.15em" weight="regular" className="text-lg" />
          <span className="tabular">{PHONE_DISPLAY}</span>
        </motion.a>
      </div>
    </form>
  )
}

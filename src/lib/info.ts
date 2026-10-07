import type { L } from './i18n'

export const PHONE_DISPLAY = '320 188 3636'
export const PHONE_TEL = '+393201883636'
export const WHATSAPP = '393201883636'
export const EMAIL = 'trattoria.ressi@gmail.com'
export const ADDRESS = 'Via Adeodato Ressi 8, 27100 Pavia'
export const MAPS_URL =
  'https://www.google.com/maps/place/Trattoria+Ressi/@45.1841169,9.1573545,17z/data=!3m1!4b1!4m6!3m5!1s0x47872647b27ce20b:0xe3c9dc5a995cda4c!8m2!3d45.1841131!4d9.1599294'
export const MAPS_EMBED = 'https://www.google.com/maps?q=Trattoria+Ressi,+Via+Adeodato+Ressi+8,+Pavia&z=16&output=embed'
export const TRIPADVISOR_URL =
  'https://www.tripadvisor.it/Restaurant_Review-g187850-d2084689-Reviews-Trattoria_Ressi-Pavia_Province_of_Pavia_Lombardy.html'

export type Service = 'pranzo' | 'cena'

/** Orari dalla pagina Contatti ufficiale. 0 = domenica. */
export const SERVICES: Record<Service, { from: string; to: string; label: L; slots: string[] }> = {
  pranzo: {
    from: '12:30',
    to: '14:00',
    label: { it: 'Pranzo', en: 'Lunch' },
    slots: ['12:30', '12:45', '13:00', '13:15', '13:30'],
  },
  cena: {
    from: '19:30',
    to: '21:30',
    label: { it: 'Cena', en: 'Dinner' },
    slots: ['19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00'],
  },
}

export function servicesOn(day: number): Service[] {
  if (day === 3) return [] // mercoledì chiuso
  if (day === 0) return ['pranzo'] // domenica sera chiuso
  return ['pranzo', 'cena']
}

export const WEEKDAYS: L[] = [
  { it: 'Domenica', en: 'Sunday' },
  { it: 'Lunedì', en: 'Monday' },
  { it: 'Martedì', en: 'Tuesday' },
  { it: 'Mercoledì', en: 'Wednesday' },
  { it: 'Giovedì', en: 'Thursday' },
  { it: 'Venerdì', en: 'Friday' },
  { it: 'Sabato', en: 'Saturday' },
]

/** Ora corrente a Pavia, indipendente dal fuso del visitatore. */
export function romeNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export type Status =
  | { open: true; service: Service; until: string }
  | { open: false; nextDay: number; nextService: Service; at: string; sameDay: boolean; tomorrow: boolean }

export function currentStatus(date = new Date()): Status {
  const { day, minutes } = romeNow(date)
  for (const s of servicesOn(day)) {
    if (minutes >= toMin(SERVICES[s].from) && minutes < toMin(SERVICES[s].to)) {
      return { open: true, service: s, until: SERVICES[s].to }
    }
  }
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7
    for (const s of servicesOn(d)) {
      if (offset === 0 && toMin(SERVICES[s].from) <= minutes) continue
      return { open: false, nextDay: d, nextService: s, at: SERVICES[s].from, sameDay: offset === 0, tomorrow: offset === 1 }
    }
  }
  return { open: false, nextDay: 4, nextService: 'pranzo', at: '12:30', sameDay: false, tomorrow: false }
}

export function statusText(s: Status, lang: 'it' | 'en') {
  if (s.open) {
    const svc = SERVICES[s.service].label[lang].toLowerCase()
    return lang === 'it' ? `Aperto ora, ${svc} fino alle ${s.until}` : `Open now, ${svc} until ${s.until}`
  }
  const svc = SERVICES[s.nextService].label[lang].toLowerCase()
  if (s.sameDay) return lang === 'it' ? `Chiuso ora, si riapre per ${svc} alle ${s.at}` : `Closed now, reopening for ${svc} at ${s.at}`
  if (s.tomorrow) return lang === 'it' ? `Chiuso ora, domani ${svc} dalle ${s.at}` : `Closed now, ${svc} tomorrow from ${s.at}`
  const day = WEEKDAYS[s.nextDay][lang]
  return lang === 'it' ? `Chiuso ora, riapre ${day.toLowerCase()} alle ${s.at}` : `Closed now, reopening ${day} at ${s.at}`
}

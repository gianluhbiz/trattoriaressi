import type { L } from './i18n'

/**
 * Segnaposto per i dati che solo il cliente può fornire. Finché uno di questi resta nel codice,
 * `npm run check:legal` fallisce: il sito non va pubblicato con dati legali mancanti.
 */
const todo = (what: string): L => ({ it: `[DA COMPLETARE: ${what}]`, en: `[TO BE COMPLETED: ${what}]` })

/** Data dell'ultima revisione di informativa privacy e cookie policy. */
export const POLICY_UPDATED: L = { it: '11 ottobre 2026', en: '11 October 2026' }

/** Titolare del sito e del trattamento (art. 7 D.Lgs. 70/2003, art. 35 DPR 633/1972, art. 13 GDPR). */
export const OWNER = {
  /** Ragione sociale o ditta individuale, con la forma giuridica (es. "Rossi Mario" o "Ressi S.n.c. di ..."). */
  name: todo('ragione sociale e forma giuridica'),
  /** Sede legale: può essere diversa dall'indirizzo del locale. */
  office: todo('sede legale'),
  vat: todo('partita IVA'),
  /** Numero REA presso la Camera di Commercio di Pavia. */
  rea: todo('numero REA'),
}

/** Coperto ed eventuale servizio: vanno indicati se applicati. */
export const COVER_CHARGE = todo('coperto per persona, oppure "nessun coperto"')

/** Tempi di conservazione da stabilire con il cliente (art. 13.2.a GDPR). */
export const RETENTION = {
  bookings: todo('per quanto tempo si conservano messaggi, chiamate ed email delle prenotazioni'),
  logs: todo('periodo di conservazione dei log del fornitore di hosting'),
}

import type { L } from './i18n'

/**
 * Segnaposto per i dati che solo il cliente può fornire. Finché uno di questi resta nel codice,
 * `npm run check:legal` fallisce: il sito non va pubblicato con dati legali mancanti.
 */
const todo = (what: string): L => ({ it: `[DA COMPLETARE: ${what}]`, en: `[TO BE COMPLETED: ${what}]` })

/** Vero se il dato è ancora un segnaposto: serve a non mostrarlo sul sito. */
export const isTodo = (l: L) => l.it.startsWith('[DA COMPLETARE')

const same = (v: string): L => ({ it: v, en: v })

/** Data dell'ultima revisione di informativa privacy e cookie policy. */
export const POLICY_UPDATED: L = { it: '11 ottobre 2026', en: '11 October 2026' }

/** Titolare del sito e del trattamento (art. 7 D.Lgs. 70/2003, art. 35 DPR 633/1972, art. 13 GDPR). */
export const OWNER = {
  /** Ragione sociale o ditta individuale, con la forma giuridica (es. "Rossi Mario" o "Ressi S.n.c. di ..."). */
  name: same('Old inns sas di Scarparo Gabriele & C.'),
  /** Sede legale: può essere diversa dall'indirizzo del locale. */
  office: same('Via Ressi 8/10, 27100 Pavia'),
  vat: same('01931010183'),
  /** Numero REA presso la Camera di Commercio di Pavia. */
  rea: todo('numero REA'),
}

/** Coperto ed eventuale servizio: vanno indicati se applicati. */
export const COVER_CHARGE = todo('coperto per persona, oppure "nessun coperto"')

/** Tempi di conservazione da stabilire con il cliente (art. 13.2.a GDPR). */
export const RETENTION = {
  bookings: todo('per quanto tempo si conservano messaggi, chiamate ed email delle prenotazioni'),
  /** Vercel piano Hobby: log di runtime consultabili per 1 ora (vercel.com/docs/logs/runtime, verificato nov. 2026). */
  logs: {
    it: 'i log sono gestiti da Vercel e cancellati automaticamente. Quelli che possiamo consultare restano disponibili per 1 ora; Vercel conserva i dati per il tempo minimo necessario a erogare il servizio e a garantirne la sicurezza, poi li cancella o li rende anonimi.',
    en: 'logs are managed by Vercel and deleted automatically. Those we can access remain available for 1 hour; Vercel keeps data for the minimum period needed to provide and secure the service, then deletes or anonymises it.',
  },
}

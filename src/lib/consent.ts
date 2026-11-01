import { useCallback, useSyncExternalStore } from 'react'

/**
 * Consenso per i contenuti di terze parti (art. 122 Codice privacy, Linee guida cookie del Garante 2021).
 * Unico servizio oggi: la mappa di Google. Finché non c'è consenso, l'iframe non esiste nella pagina
 * e il browser non contatta Google. La scelta resta in localStorage (strumento tecnico, solo su questo dispositivo).
 */
export type ConsentService = 'maps'

type Stored = { v: 1; services: Partial<Record<ConsentService, { granted: boolean; at: string }>> }

const KEY = 'ressi-consent'
const EVENT = 'ressi-consent-change'

function read(): Stored {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Stored
      if (parsed?.v === 1 && parsed.services) return parsed
    }
  } catch {
    /* storage non disponibile o dato corrotto: nessun consenso */
  }
  return { v: 1, services: {} }
}

export function hasConsent(service: ConsentService) {
  return read().services[service]?.granted === true
}

export function setConsent(service: ConsentService, granted: boolean) {
  const data = read()
  data.services[service] = { granted, at: new Date().toISOString() }
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* senza storage la scelta vale solo per questa pagina */
    memory[service] = granted
  }
  window.dispatchEvent(new Event(EVENT))
}

/** Ripiego se localStorage non è scrivibile (navigazione privata su alcuni browser). */
const memory: Partial<Record<ConsentService, boolean>> = {}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

export function useConsent(service: ConsentService) {
  const granted = useSyncExternalStore(
    subscribe,
    () => memory[service] ?? hasConsent(service),
    () => false,
  )
  const set = useCallback((v: boolean) => setConsent(service, v), [service])
  return [granted, set] as const
}

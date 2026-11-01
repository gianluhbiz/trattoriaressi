import { MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { useConsent } from '../lib/consent'
import { useLang } from '../lib/i18n'
import { MAPS_EMBED, MAPS_URL } from '../lib/info'

/**
 * Mappa di Google caricata solo dopo un clic esplicito: prima del consenso
 * nessuna richiesta parte verso Google. Il consenso si revoca da qui o dalla cookie policy.
 */
export function MapEmbed() {
  const { t } = useLang()
  const [granted, setGranted] = useConsent('maps')

  if (granted) {
    return (
      <>
        <iframe
          title={t({ it: 'Mappa: Trattoria Ressi, via Adeodato Ressi 8, Pavia', en: 'Map: Trattoria Ressi, 8 via Adeodato Ressi, Pavia' })}
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.55)_brightness(0.95)_sepia(0.15)]"
        />
        <button
          type="button"
          onClick={() => setGranted(false)}
          className="absolute right-3 bottom-3 rounded-full bg-ink/85 px-4 py-2 text-sm font-medium text-cream backdrop-blur-sm transition-colors hover:bg-ink"
        >
          {t({ it: 'Nascondi la mappa e revoca il consenso', en: 'Hide the map and withdraw consent' })}
        </button>
      </>
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 overflow-y-auto bg-[radial-gradient(circle_at_30%_20%,var(--color-ember),var(--color-char)_70%)] p-5 sm:gap-5 sm:p-10">
      <MapPin aria-hidden size="2.5rem" className="hidden shrink-0 text-muted sm:block" />
      <div className="max-w-[48ch]">
        <p className="font-display text-2xl font-semibold tracking-[-0.02em]">{t({ it: 'Mappa di Google', en: 'Google map' })}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/85 sm:text-base">
          {t({
            it: 'Per mostrare la mappa il tuo browser si collega ai server di Google, che riceve il tuo indirizzo IP e può usare cookie e altri strumenti di tracciamento, anche con trasferimento dei dati negli Stati Uniti. La carichiamo solo se lo chiedi tu. La scelta viene ricordata su questo dispositivo e puoi revocarla in qualsiasi momento.',
            en: 'To show the map your browser connects to Google’s servers, which receive your IP address and may use cookies and other tracking tools, including transfers of data to the United States. We only load it if you ask. Your choice is remembered on this device and you can withdraw it at any time.',
          })}{' '}
          <Link to="/cookie" className="underline decoration-cream/40 hover:decoration-cream">
            {t({ it: 'Cookie policy', en: 'Cookie policy' })}
          </Link>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGranted(true)}
          className="rounded-full bg-cream px-5 py-3 font-semibold text-ink transition-colors hover:bg-cream/85"
        >
          {t({ it: 'Carica la mappa', en: 'Load the map' })}
        </button>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-cream/30 px-5 py-3 font-semibold transition-colors hover:border-cream hover:bg-cream/10"
        >
          {t({ it: 'Apri in Google Maps', en: 'Open in Google Maps' })}
        </a>
      </div>
    </div>
  )
}

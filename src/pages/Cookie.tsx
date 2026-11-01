import { Link } from 'react-router'
import { LegalLayout, LegalSection } from '../components/LegalLayout'
import { useConsent } from '../lib/consent'
import { useLang } from '../lib/i18n'
import { OwnerDetails } from './Privacy'

function MapPreference() {
  const { t } = useLang()
  const [granted, setGranted] = useConsent('maps')
  return (
    <div className="rounded-2xl border border-cream/15 bg-char p-5">
      <p className="font-semibold text-cream">{t({ it: 'Mappa di Google', en: 'Google map' })}</p>
      <p className="mt-1 text-sm" aria-live="polite">
        {granted
          ? t({ it: 'Stato: consenso dato. La mappa si carica nella home.', en: 'Status: consent given. The map loads on the home page.' })
          : t({ it: 'Stato: nessun consenso. La mappa non viene caricata.', en: 'Status: no consent. The map is not loaded.' })}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGranted(true)}
          aria-pressed={granted}
          className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${granted ? 'border-cream bg-cream text-ink' : 'border-cream/30 hover:border-cream'}`}
        >
          {t({ it: 'Consento', en: 'Allow' })}
        </button>
        <button
          type="button"
          onClick={() => setGranted(false)}
          aria-pressed={!granted}
          className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${!granted ? 'border-cream bg-cream text-ink' : 'border-cream/30 hover:border-cream'}`}
        >
          {t({ it: 'Non consento', en: 'Do not allow' })}
        </button>
      </div>
    </div>
  )
}

export default function Cookie() {
  const { lang } = useLang()
  const it = lang === 'it'

  return (
    <LegalLayout
      title={{ it: 'Cookie policy', en: 'Cookie policy' }}
      intro={{
        it: 'Quali informazioni il sito salva o legge sul tuo dispositivo, perché, e come puoi scegliere. Ai sensi dell’art. 122 del Codice privacy (D.Lgs. 196/2003) e delle Linee guida cookie del Garante del 10 giugno 2021.',
        en: 'What information the website stores on or reads from your device, why, and how you can choose. Under Art. 122 of the Italian Privacy Code (Legislative Decree 196/2003) and the Italian Data Protection Authority’s cookie guidelines of 10 June 2021.',
      }}
    >
      <LegalSection title={it ? 'In breve' : 'In short'}>
        <p>
          {it
            ? 'Il sito non usa cookie di profilazione, pubblicità o statistiche. Salva nel browser solo due preferenze tecniche. L’unico servizio di terze parti che può installare cookie è la mappa di Google, che resta bloccata finché non la carichi tu. Per questo non vedi un banner all’apertura del sito.'
            : 'The website uses no profiling, advertising or analytics cookies. It only saves two technical preferences in your browser. The only third-party service that may set cookies is the Google map, which stays blocked until you load it yourself. That is why no banner appears when you open the website.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? 'Strumenti tecnici (senza consenso)' : 'Technical tools (no consent needed)'}>
        <p>
          {it
            ? 'Servono a fornire funzioni che hai chiesto tu. Sono dati del sito stesso (prima parte), salvati con la tecnologia localStorage del browser, non inviati a nessun server.'
            : 'They provide features you asked for. They belong to the website itself (first party), are saved with the browser’s localStorage and are not sent to any server.'}
        </p>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={it ? 'Tabella degli strumenti tecnici' : 'Table of technical tools'}>
          <table>
            <thead>
              <tr>
                <th scope="col">{it ? 'Nome' : 'Name'}</th>
                <th scope="col">{it ? 'Scopo' : 'Purpose'}</th>
                <th scope="col">{it ? 'Durata' : 'Duration'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>ressi-lang</code>
                </td>
                <td>{it ? 'Ricorda la lingua scelta (italiano o inglese).' : 'Remembers the language you chose (Italian or English).'}</td>
                <td>{it ? 'Finché non cancelli i dati del sito dal browser.' : 'Until you clear the site data in your browser.'}</td>
              </tr>
              <tr>
                <td>
                  <code>ressi-consent</code>
                </td>
                <td>
                  {it
                    ? 'Ricorda se hai consentito o no il caricamento della mappa di Google, con data e ora della scelta.'
                    : 'Remembers whether you allowed the Google map to load, with the date and time of your choice.'}
                </td>
                <td>{it ? 'Finché non cambi scelta o cancelli i dati del sito.' : 'Until you change your choice or clear the site data.'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title={it ? 'Servizi di terze parti (solo con consenso)' : 'Third-party services (consent only)'}>
        <p>
          <strong>Google Maps</strong> —{' '}
          {it
            ? 'Google Ireland Ltd. / Google LLC. La mappa nella home si carica solo dopo che premi “Carica la mappa”. Da quel momento Google riceve il tuo indirizzo IP e può leggere o installare cookie sul tuo dispositivo, anche per proprie finalità, come titolare autonomo. I dati possono essere trasferiti negli Stati Uniti. Informative di Google: '
            : 'Google Ireland Ltd. / Google LLC. The map on the home page only loads after you press “Load the map”. From then on Google receives your IP address and may read or set cookies on your device, including for its own purposes, as an independent controller. Data may be transferred to the United States. Google’s notices: '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            {it ? 'privacy' : 'privacy'}
          </a>
          {', '}
          <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer">
            {it ? 'cookie' : 'cookies'}
          </a>
          .
        </p>
        <p>
          {it
            ? 'In alternativa puoi aprire l’indirizzo direttamente su Google Maps con il pulsante “Indicazioni stradali”: in quel caso vai sul sito di Google e si applicano le sue regole.'
            : 'Alternatively you can open the address directly on Google Maps with the “Get directions” button: you then go to Google’s website and its rules apply.'}
        </p>
      </LegalSection>

      <LegalSection id="preferenze" title={it ? 'Le tue preferenze' : 'Your preferences'}>
        <p>
          {it
            ? 'Puoi dare o revocare il consenso in qualsiasi momento. La revoca ha effetto subito: la mappa sparisce e non viene più caricata. I cookie che Google avesse già installato restano nel browser finché non li cancelli dalle impostazioni del browser.'
            : 'You can give or withdraw consent at any time. Withdrawal takes effect immediately: the map disappears and is no longer loaded. Cookies Google may already have set stay in your browser until you clear them in your browser settings.'}
        </p>
        <MapPreference />
        <p>
          {it
            ? 'Puoi anche bloccare o cancellare cookie e dati dei siti dalle impostazioni del tuo browser.'
            : 'You can also block or delete cookies and site data from your browser settings.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? 'Titolare e diritti' : 'Controller and rights'}>
        <OwnerDetails />
        <p>
          {it ? 'Per il resto dei trattamenti e per i tuoi diritti leggi l’' : 'For all other processing and your rights, read the '}
          <Link to="/privacy">{it ? 'informativa privacy' : 'privacy notice'}</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

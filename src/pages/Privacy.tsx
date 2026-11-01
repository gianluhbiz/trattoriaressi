import { Link } from 'react-router'
import { LegalLayout, LegalSection } from '../components/LegalLayout'
import { useLang } from '../lib/i18n'
import { ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_TEL } from '../lib/info'
import { OWNER, RETENTION } from '../lib/legal'

export function OwnerDetails() {
  const { t } = useLang()
  return (
    <ul>
      <li>{t(OWNER.name)}</li>
      <li>
        {t({ it: 'Sede legale:', en: 'Registered office:' })} {t(OWNER.office)}
      </li>
      <li>
        {t({ it: 'Sede operativa:', en: 'Restaurant:' })} Trattoria Ressi, {ADDRESS}
      </li>
      <li>
        {t({ it: 'Partita IVA:', en: 'VAT number:' })} {t(OWNER.vat)} · REA {t(OWNER.rea)}
      </li>
      <li>
        Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · {t({ it: 'Telefono', en: 'Phone' })}: <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
      </li>
    </ul>
  )
}

export default function Privacy() {
  const { lang } = useLang()
  const it = lang === 'it'
  const r = (l: { it: string; en: string }) => l[lang]

  return (
    <LegalLayout
      title={{ it: 'Informativa privacy', en: 'Privacy notice' }}
      intro={{
        it: 'Come vengono trattati i dati personali di chi visita questo sito e di chi ci contatta per prenotare, ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR).',
        en: 'How we process the personal data of visitors to this website and of people who contact us to book, under Articles 13 and 14 of Regulation (EU) 2016/679 (GDPR).',
      }}
    >
      <LegalSection title={it ? '1. Titolare del trattamento' : '1. Data controller'}>
        <OwnerDetails />
        <p>
          {it
            ? 'Per qualsiasi domanda su questa informativa o sui tuoi dati puoi scriverci all’indirizzo email indicato sopra.'
            : 'For any question about this notice or your data, write to us at the email address above.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '2. Cosa fa e cosa non fa questo sito' : '2. What this website does and does not do'}>
        <p>
          {it
            ? 'Il sito è una vetrina: non ha moduli che inviano dati a un nostro server, non ha account, newsletter, pagamenti, statistiche di visita, pixel pubblicitari o pulsanti social incorporati.'
            : 'This website is a showcase: it has no forms that send data to a server of ours, no accounts, newsletter, payments, visitor analytics, advertising pixels or embedded social buttons.'}
        </p>
        <p>
          {it
            ? 'Lo strumento “Prenota” compone soltanto, all’interno del tuo browser, il testo di un messaggio (giorno, servizio, orario, numero di persone). Nulla viene registrato dal sito: il messaggio parte solo se sei tu a inviarlo da WhatsApp.'
            : 'The “Book” tool only composes, inside your browser, the text of a message (day, service, time, number of guests). The website records nothing: the message is only sent if you send it yourself from WhatsApp.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '3. Dati trattati, finalità e basi giuridiche' : '3. Data processed, purposes and legal bases'}>
        <h3>{it ? 'a) Dati di navigazione' : 'a) Browsing data'}</h3>
        <p>
          {it
            ? 'Quando apri il sito, il fornitore di hosting riceve e registra automaticamente nei propri log dati tecnici necessari a consegnare le pagine: indirizzo IP, data e ora della richiesta, pagina richiesta, tipo di browser e sistema operativo, sito di provenienza.'
            : 'When you open the website, the hosting provider automatically receives and logs the technical data needed to deliver the pages: IP address, date and time of the request, page requested, browser and operating system, referring site.'}
        </p>
        <ul>
          <li>{it ? 'Finalità: far funzionare il sito, garantirne la sicurezza, prevenire abusi.' : 'Purpose: running the website, keeping it secure, preventing abuse.'}</li>
          <li>
            {it
              ? 'Base giuridica: legittimo interesse del titolare a offrire un sito funzionante e sicuro (art. 6.1.f GDPR).'
              : 'Legal basis: the controller’s legitimate interest in a working and secure website (Art. 6(1)(f) GDPR).'}
          </li>
          <li>
            {it ? 'Conservazione:' : 'Retention:'} {r(RETENTION.logs)}
          </li>
        </ul>

        <h3>{it ? 'b) Prenotazioni e richieste di contatto' : 'b) Bookings and enquiries'}</h3>
        <p>
          {it
            ? 'Se ci scrivi su WhatsApp, ci telefoni o ci mandi un’email, riceviamo i dati che ci comunichi: nome, numero di telefono o indirizzo email, giorno, orario e numero di persone, eventuali note. Su WhatsApp vediamo anche il nome e l’immagine del profilo che hai impostato.'
            : 'If you message us on WhatsApp, call us or email us, we receive the data you give us: name, phone number or email address, day, time and number of guests, any notes. On WhatsApp we also see the profile name and picture you have set.'}
        </p>
        <ul>
          <li>{it ? 'Finalità: gestire la prenotazione e rispondere alle richieste.' : 'Purpose: handling the booking and answering your enquiry.'}</li>
          <li>
            {it
              ? 'Base giuridica: esecuzione di misure precontrattuali e contrattuali richieste da te (art. 6.1.b GDPR).'
              : 'Legal basis: steps taken at your request before and under a contract (Art. 6(1)(b) GDPR).'}
          </li>
          <li>
            {it
              ? 'Conferimento: facoltativo, ma senza questi dati non possiamo prenotare il tavolo.'
              : 'Providing the data is optional, but without it we cannot book your table.'}
          </li>
          <li>
            {it ? 'Conservazione:' : 'Retention:'} {r(RETENTION.bookings)}
          </li>
        </ul>
        <p>
          {it
            ? 'Allergie, intolleranze ed esigenze alimentari: se scegli di comunicarcele, possono rivelare informazioni sulla salute (art. 9 GDPR). Le usiamo solo per preparare il tuo pasto in sicurezza, sulla base del tuo consenso esplicito (art. 9.2.a GDPR), e non le conserviamo oltre il necessario.Comunicaci solo quanto serve in cucina: puoi anche dircelo a voce, al tavolo.'
            : 'Allergies, intolerances and dietary needs: if you choose to tell us, they may reveal health information (Art. 9 GDPR). We use them only to prepare your meal safely, based on your explicit consent (Art. 9(2)(a) GDPR), and keep them no longer than needed.Only tell us what the kitchen needs: you can also tell us in person, at the table.'}
        </p>

        <h3>{it ? 'c) Mappa di Google (solo con il tuo consenso)' : 'c) Google map (only with your consent)'}</h3>
        <p>
          {it
            ? 'La mappa nella sezione “Orari e dove trovarci” si carica solo se premi “Carica la mappa”. Da quel momento il tuo browser si collega a Google, che riceve il tuo indirizzo IP e può usare cookie e strumenti simili come titolare autonomo, secondo la propria informativa. Base giuridica: consenso (art. 6.1.a GDPR e art. 122 del Codice privacy), revocabile in qualsiasi momento senza conseguenze. I dettagli sono nella '
            : 'The map in the “Hours and how to find us” section only loads if you press “Load the map”. From then on your browser connects to Google, which receives your IP address and may use cookies and similar tools as an independent controller, under its own privacy policy. Legal basis: consent (Art. 6(1)(a) GDPR and Art. 122 of the Italian Privacy Code), which you can withdraw at any time without consequences. Details are in the '}
          <Link to="/cookie">cookie policy</Link>.
        </p>

        <h3>{it ? 'd) Preferenze salvate nel browser' : 'd) Preferences saved in your browser'}</h3>
        <p>
          {it
            ? 'Il sito ricorda nel tuo browser la lingua scelta e la tua scelta sulla mappa. Questi dati restano sul tuo dispositivo e non ci vengono inviati.'
            : 'The website remembers in your browser the language you chose and your choice about the map. This data stays on your device and is not sent to us.'}
        </p>

        <h3>{it ? 'e) Link ad altri siti' : 'e) Links to other websites'}</h3>
        <p>
          {it
            ? 'I collegamenti a WhatsApp, Google Maps, TripAdvisor, Facebook e al sito dello sviluppatore non trasmettono dati finché non li apri. Una volta aperti, si applicano le informative di quei servizi.'
            : 'Links to WhatsApp, Google Maps, TripAdvisor, Facebook and the developer’s website send no data until you open them. Once opened, those services’ own privacy notices apply.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '4. Chi riceve i dati' : '4. Who receives the data'}>
        <ul>
          <li>{it ? 'Il personale della trattoria autorizzato a gestire le prenotazioni.' : 'Trattoria staff authorised to handle bookings.'}</li>
          <li>
            {it
              ? 'Vercel Inc. (Stati Uniti), fornitore di hosting del sito, che tratta i dati di navigazione per nostro conto come responsabile del trattamento (art. 28 GDPR).'
              : 'Vercel Inc. (United States), the website hosting provider, which processes browsing data on our behalf as a processor (Art. 28 GDPR).'}
          </li>
          <li>
            {it
              ? 'I fornitori dei servizi di comunicazione che usi per contattarci: WhatsApp (WhatsApp Ireland Ltd., gruppo Meta), il nostro servizio email (Gmail, di Google) e l’operatore telefonico.'
              : 'Providers of the communication services you use to reach us: WhatsApp (WhatsApp Ireland Ltd., Meta group), our email service (Gmail, by Google) and the phone carrier.'}
          </li>
          <li>{it ? 'Google, solo se scegli di caricare la mappa.' : 'Google, only if you choose to load the map.'}</li>
        </ul>
        <p>
          {it
            ? 'Non vendiamo i dati, non li diffondiamo e non li usiamo per pubblicità. Non prendiamo decisioni automatizzate e non facciamo profilazione.'
            : 'We do not sell or publish the data and do not use it for advertising. We make no automated decisions and do no profiling.'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '5. Trasferimenti fuori dallo Spazio economico europeo' : '5. Transfers outside the European Economic Area'}>
        <p>
          {it
            ? 'Vercel, Google e Meta possono trattare dati negli Stati Uniti. Questi trasferimenti avvengono sulla base della decisione di adeguatezza della Commissione europea sul EU-U.S. Data Privacy Framework, per le società certificate, oppure delle clausole contrattuali tipo approvate dalla Commissione (artt. 45 e 46 GDPR).'
            : 'Vercel, Google and Meta may process data in the United States. These transfers rely on the European Commission’s adequacy decision on the EU-U.S. Data Privacy Framework, for certified companies, or on the standard contractual clauses approved by the Commission (Arts. 45 and 46 GDPR).'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '6. I tuoi diritti' : '6. Your rights'}>
        <p>
          {it
            ? 'Puoi chiederci in qualsiasi momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento, riceverli in un formato leggibile (portabilità) e opporti al trattamento basato sul legittimo interesse (artt. 15-22 GDPR). Puoi revocare un consenso dato senza che questo tocchi la liceità di quanto fatto prima (art. 7.3 GDPR).'
            : 'You can ask us at any time to access, correct or delete your data, restrict its processing, receive it in a readable format (portability) and object to processing based on legitimate interest (Arts. 15-22 GDPR). You can withdraw any consent given, without affecting the lawfulness of processing carried out before (Art. 7(3) GDPR).'}
        </p>
        <p>
          {it ? 'Per esercitarli scrivi a ' : 'To exercise them, write to '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          {it
            ? '. Rispondiamo senza ritardo e comunque entro un mese (art. 12 GDPR).'
            : '. We reply without delay and in any case within one month (Art. 12 GDPR).'}
        </p>
        <p>
          {it
            ? 'Se ritieni che il trattamento violi il GDPR puoi presentare reclamo al Garante per la protezione dei dati personali ('
            : 'If you believe the processing breaches the GDPR you can lodge a complaint with the Italian Data Protection Authority, Garante per la protezione dei dati personali ('}
          <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">
            www.garanteprivacy.it
          </a>
          {it ? ') o all’autorità del paese in cui vivi o lavori (art. 77 GDPR).' : ') or the authority of the country where you live or work (Art. 77 GDPR).'}
        </p>
      </LegalSection>

      <LegalSection title={it ? '7. Modifiche' : '7. Changes'}>
        <p>
          {it
            ? 'Aggiorniamo questa informativa quando cambiano i trattamenti o i servizi usati dal sito. La data dell’ultimo aggiornamento è indicata in alto.'
            : 'We update this notice when the processing or the services used by the website change. The date of the last update is shown at the top.'}
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

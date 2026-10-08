import { Link } from 'react-router'
import { useLang } from '../lib/i18n'
import { ADDRESS, EMAIL, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, TRIPADVISOR_URL, WHATSAPP } from '../lib/info'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="relative mt-0 bg-[var(--band)] pb-28 lg:pb-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 pt-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Logo />
          <p className="mt-5 max-w-[38ch] text-muted">
            {t({
              it: 'Trattoria pavese a conduzione familiare, a due passi dal Comune e dalla Basilica di San Michele.',
              en: 'Family-run Pavese trattoria, a short walk from the town hall and the Basilica of San Michele.',
            })}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[0.95rem] text-cream/80">
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-cream hover:underline">{ADDRESS}</a>
          <a href={`tel:${PHONE_TEL}`} className="tabular hover:text-cream hover:underline">Tel. {PHONE_DISPLAY}</a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="hover:text-cream hover:underline">WhatsApp</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-cream hover:underline">{EMAIL}</a>
        </div>
        <div className="flex flex-col gap-2 text-[0.95rem] text-cream/80">
          <Link to="/menu" className="hover:text-cream hover:underline">Menu</Link>
          <Link to="/#orari" className="hover:text-cream hover:underline">{t({ it: 'Orari', en: 'Opening hours' })}</Link>
          <a href={TRIPADVISOR_URL} target="_blank" rel="noreferrer" className="hover:text-cream hover:underline">TripAdvisor</a>
          <a href="https://www.facebook.com/TrattoriaRessi/" target="_blank" rel="noreferrer" className="hover:text-cream hover:underline">Facebook</a>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1400px] flex-col gap-2 border-t border-cream/12 px-4 pt-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-10">
        <span>© {new Date().getFullYear()} Trattoria Ressi, Pavia</span>
        <span><a href="https://gianluh.dev" target="_blank" rel="noreferrer">Developed and Designed by Gianluca De Maio</a></span>
        <span>{t({ it: 'Mercoledì chiuso. Domenica solo pranzo.', en: 'Closed Wednesdays. Sunday lunch only.' })}</span>
      </div>
    </footer>
  )
}

import { Link } from 'react-router'
import { useLang } from '../lib/i18n'
import { ADDRESS, EMAIL, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, TRIPADVISOR_URL, WHATSAPP } from '../lib/info'
import { isTodo, OWNER } from '../lib/legal'
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
        <span>
          <a href="https://gianluh.dev" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 hover:text-cream">
            Developed and Designed by <strong className="font-semibold text-cream/90 group-hover:text-cream">Gianluca De Maio</strong>
            {/* Remix Icon: external-link-line (Apache 2.0) */}
            <svg aria-hidden viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" className="shrink-0">
              <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z" />
            </svg>
          </a>
        </span>
        <span>{t({ it: 'Mercoledì chiuso. Domenica solo pranzo.', en: 'Closed Wednesdays. Sunday lunch only.' })}</span>
      </div>
      <div className="mx-auto mt-4 flex max-w-[1400px] flex-col gap-3 px-4 text-sm text-muted sm:px-6 lg:flex-row lg:justify-between lg:px-10">
        <p>
          {t(OWNER.name)} · {t({ it: 'Sede legale', en: 'Registered office' })} {t(OWNER.office)} · {t({ it: 'P.IVA', en: 'VAT' })} {t(OWNER.vat)}
          {!isTodo(OWNER.rea) && <> · REA {t(OWNER.rea)}</>}
        </p>
        <nav aria-label={t({ it: 'Note legali', en: 'Legal' })} className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/privacy" className="hover:text-cream hover:underline">{t({ it: 'Privacy', en: 'Privacy' })}</Link>
          <Link to="/cookie" className="hover:text-cream hover:underline">Cookie policy</Link>
          <Link to="/cookie#preferenze" className="hover:text-cream hover:underline">{t({ it: 'Preferenze cookie', en: 'Cookie preferences' })}</Link>
        </nav>
      </div>
    </footer>
  )
}

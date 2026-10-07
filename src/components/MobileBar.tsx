import { Phone } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router'
import { useLang } from '../lib/i18n'
import { PHONE_TEL } from '../lib/info'

/** Su telefono la prenotazione resta sempre a un tocco. */
export function MobileBar() {
  const { t } = useLang()
  const onMenu = useLocation().pathname === '/menu'
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-mortar/12 bg-brick-900/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
      <div className="flex gap-2">
        <Link to="#prenota" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-saffron py-3 font-semibold text-brick-900 active:scale-[0.98]">
          {t({ it: 'Prenota', en: 'Book' })}
        </Link>
        <a href={`tel:${PHONE_TEL}`} aria-label={t({ it: 'Chiama la trattoria', en: 'Call the trattoria' })} className="grid w-14 place-items-center rounded-full border border-mortar/30 text-xl">
          <Phone aria-hidden size="1.15em" weight="regular" />
        </a>
        {!onMenu && (
          <Link to="/menu" className="grid place-items-center rounded-full border border-mortar/30 px-5 font-semibold">
            Menu
          </Link>
        )}
      </div>
    </div>
  )
}

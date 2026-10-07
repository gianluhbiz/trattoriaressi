import { ArrowUpRight, List, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useLang, type L } from '../lib/i18n'
import { spring, springSnappy } from '../lib/motion'
import { Logo } from './Logo'

const LINKS: { to: string; label: L }[] = [
  { to: '/#storia', label: { it: 'La trattoria', en: 'Our story' } },
  { to: '/#cucina', label: { it: 'Cucina', en: 'Kitchen' } },
  { to: '/#sala', label: { it: 'La sala', en: 'The room' } },
  { to: '/#orari', label: { it: 'Orari e dove', en: 'Hours & map' } },
]

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  return (
    <div role="group" aria-label="Lingua / Language" className={`relative flex rounded-full border border-cream/25 p-0.5 text-xs font-semibold ${className}`}>
      {(['it', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? 'text-ink' : 'text-muted hover:text-cream'}`}
        >
          {lang === l && (
            <motion.span layoutId="lang-pill" transition={springSnappy} className="absolute inset-0 -z-10 rounded-full bg-cream" />
          )}
          {l}
        </button>
      ))}
    </div>
  )
}

export function Nav() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 24))
  const [navKey, setNavKey] = useState(location.key)
  if (navKey !== location.key) {
    setNavKey(location.key)
    setOpen(false)
  }
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-expo ${
          solid || open ? 'bg-coal/85 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10" aria-label="Principale">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="rounded-full px-3.5 py-2 text-[0.95rem] text-cream/85 transition-colors hover:bg-cream/10 hover:text-cream">
                  {t(l.label)}
                </Link>
              </li>
            ))}
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[0.95rem] transition-colors hover:bg-cream/10 ${isActive ? 'text-cream underline decoration-cream/60' : 'text-cream/85 hover:text-cream'}`
                }
              >
                Menu
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center gap-3">
            <LangSwitch className="hidden sm:flex" />
            <Link
              to="#prenota"
              className="hidden rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-ink transition-[transform,background-color] duration-300 ease-out-expo hover:bg-cream active:scale-[0.97] sm:inline-flex"
            >
              {t({ it: 'Prenota', en: 'Book' })}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? t({ it: 'Chiudi menu', en: 'Close menu' }) : t({ it: 'Apri menu', en: 'Open menu' })}
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-xl lg:hidden"
            >
              {open ? <X aria-hidden size="1.2em" /> : <List aria-hidden size="1.2em" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={spring}
            className="fixed inset-x-0 top-[68px] bottom-0 overflow-y-auto bg-char px-4 pt-6 pb-28 sm:px-6 lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col"
            >
              {[...LINKS, { to: '/menu', label: { it: 'Menu', en: 'Menu' } }].map((l) => (
                <motion.li
                  key={l.to}
                  variants={{ hidden: { opacity: 0, x: reduce ? 0 : -18 }, show: { opacity: 1, x: 0, transition: spring } }}
                  className="border-b border-cream/12"
                >
                  <Link to={l.to} className="flex items-center justify-between py-4 font-display text-3xl font-semibold tracking-[-0.03em]">
                    {t(l.label)}
                    <ArrowUpRight aria-hidden size="1.15em" weight="regular" className="text-xl text-muted" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <LangSwitch className="mt-8 w-fit" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

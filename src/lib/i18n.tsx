import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'it' | 'en'
export type L = { it: string; en: string }

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (l: L) => string }

const LangContext = createContext<Ctx | null>(null)
const KEY = 'ressi-lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'it' || saved === 'en') return saved
  } catch {
    /* storage non disponibile */
  }
  if (typeof navigator !== 'undefined' && !navigator.language.toLowerCase().startsWith('it')) return 'en'
  return 'it'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* storage non disponibile */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (l: L) => l[lang] }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang fuori da LangProvider')
  return ctx
}

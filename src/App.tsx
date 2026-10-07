import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/Footer'
import { MobileBar } from './components/MobileBar'
import { Nav } from './components/Nav'
import { spring } from './lib/motion'
import Home from './pages/Home'
import Menu from './pages/Menu'

/** Ancore (#prenota, #orari...) anche tra una pagina e l'altra; in cima al cambio pagina. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    let tries = 0
    const go = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (tries++ < 20) window.setTimeout(go, 50)
    }
    go()
  }, [pathname, hash, key])
  return null
}

export default function App() {
  const location = useLocation()
  const reduce = useReducedMotion()
  useEffect(() => {
    document.title = location.pathname === '/menu' ? 'Menu · Trattoria Ressi, Pavia' : 'Trattoria Ressi · Pavia'
  }, [location.pathname])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only z-50 rounded-full bg-saffron px-4 py-2 font-semibold text-brick-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Salta al contenuto
      </a>
      <ScrollManager />
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
          transition={spring}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileBar />
    </MotionConfig>
  )
}

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import { trackPageView } from './lib/analytics'

const Planes = lazy(() => import('./pages/Planes'))
const IndoorCycling = lazy(() => import('./pages/IndoorCycling'))
const ClasesGrupales = lazy(() => import('./pages/ClasesGrupales'))
const FitBar = lazy(() => import('./pages/FitBar'))
const Horarios = lazy(() => import('./pages/Horarios'))
const Entrenadores = lazy(() => import('./pages/Entrenadores'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const FAQ = lazy(() => import('./pages/FAQ'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // La ruta puede estar en un chunk lazy-loaded que todavía no montó el nodo del ancla:
      // reintenta unos frames antes de rendirse.
      const id = hash.slice(1)
      let attempts = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView()
        } else if (attempts++ < 30) {
          requestAnimationFrame(tryScroll)
        }
      }
      requestAnimationFrame(tryScroll)
    } else {
      window.scrollTo(0, 0)
    }
    trackPageView(pathname, document.title)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/indoor-cycling" element={<IndoorCycling />} />
          <Route path="/clases-grupales" element={<ClasesGrupales />} />
          <Route path="/fit-bar" element={<FitBar />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/entrenadores" element={<Entrenadores />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/preguntas-frecuentes" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

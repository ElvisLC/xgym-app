import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
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
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    trackPageView(pathname, document.title)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
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
    </LazyMotion>
  )
}

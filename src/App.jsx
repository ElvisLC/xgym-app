import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Planes from './pages/Planes'
import IndoorCycling from './pages/IndoorCycling'
import ClasesGrupales from './pages/ClasesGrupales'
import FitBar from './pages/FitBar'
import Horarios from './pages/Horarios'
import Entrenadores from './pages/Entrenadores'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import FAQ from './pages/FAQ'
import { trackPageView } from './lib/analytics'

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
    <div className="min-h-screen bg-[var(--canvas)]">
      <ScrollToTop />
      <Navbar />
      <main>
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
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

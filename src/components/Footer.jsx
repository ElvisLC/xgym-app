import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import Instagram from './icons/InstagramIcon'
import { BRAND, waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

export default function Footer() {
  return (
    <footer className="bg-[var(--canvas-soft)] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-1 mb-4">
            <span className="display text-3xl text-[var(--accent)] leading-none">X</span>
            <span className="display text-3xl text-white leading-none">GYM</span>
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed max-w-xs">
            El hábito forja héroes. El gimnasio de Catia para quienes eligen la disciplina cada día.
          </p>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Navegación</h3>
          <ul className="space-y-2.5 text-sm text-neutral-300">
            <li><Link to="/planes" className="hover:text-white">Planes</Link></li>
            <li><Link to="/clases-grupales" className="hover:text-white">Clases grupales</Link></li>
            <li><Link to="/indoor-cycling" className="hover:text-white">Indoor Cycling</Link></li>
            <li><Link to="/fit-bar" className="hover:text-white">Fit Bar</Link></li>
            <li><Link to="/entrenadores" className="hover:text-white">Entrenadores</Link></li>
            <li><Link to="/horarios" className="hover:text-white">Horarios</Link></li>
            <li><Link to="/nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link to="/preguntas-frecuentes" className="hover:text-white">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
              {BRAND.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[var(--accent)] shrink-0" />
              {BRAND.phoneDisplay}
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} className="text-[var(--accent)] shrink-0" />
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {BRAND.instagramHandle}
              </a>
            </li>
          </ul>
          <p className="text-xs text-[var(--subtle)] font-mono mt-4">
            L-V {BRAND.hours.weekdays}
            <br />
            Sáb/feriados {BRAND.hours.weekend}
          </p>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Tu historia empieza aquí</h3>
          <p className="text-sm text-neutral-300 mb-4">
            Preinscríbete online, sin costo de inscripción por tiempo limitado.
          </p>
          <a
            href={waLink('Hola, quiero hacer mi preinscripción en XGYM')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('footer')}
            className="inline-block bg-[var(--accent)] text-black text-sm font-semibold px-5 py-2.5 x-cut"
          >
            Escríbenos
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--subtle)] font-mono">
          <span>© {new Date().getFullYear()} XGYM. Todos los derechos reservados.</span>
          <span>XGYM. El hábito forja héroes.</span>
        </div>
      </div>
    </footer>
  )
}

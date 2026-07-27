import { Link } from 'react-router-dom'
import { MapPin, MessageCircle } from 'lucide-react'
import Instagram from './icons/InstagramIcon'
import { BRAND, waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

// Enlace de columna: <Link> si hay ruta, texto plano (sin apariencia clicable) si no.
function FooterItem({ to, children }) {
  if (!to) {
    return <span className="text-[var(--subtle)]">{children}</span>
  }
  return (
    <Link to={to} className="hover:text-white">
      {children}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[var(--canvas-soft)] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14">
        <div className="flex items-center gap-1 mb-10">
          <span className="display text-3xl text-[var(--accent)] leading-none">X</span>
          <span className="display text-3xl text-white leading-none">GYM</span>
          <span className="text-sm text-[var(--muted)] ml-3">El hábito forja héroes.</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 pb-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="eyebrow mb-4">XGYM</h3>
          <ul className="space-y-2.5 text-sm text-neutral-300">
            <li><FooterItem to="/nosotros">Sobre nosotros</FooterItem></li>
            <li><FooterItem>Nuestra historia</FooterItem></li>
            <li><FooterItem to="/nosotros#mision-vision">Misión y visión</FooterItem></li>
            <li><FooterItem>Instalaciones</FooterItem></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Ayuda</h3>
          <ul className="space-y-2.5 text-sm text-neutral-300">
            <li><FooterItem to="/preguntas-frecuentes">FAQ</FooterItem></li>
            <li><FooterItem>Reglamento</FooterItem></li>
            <li><FooterItem to="/horarios">Horarios</FooterItem></li>
            <li><FooterItem to="/contacto">Contacto</FooterItem></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm text-neutral-300 mb-4">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
              {BRAND.address}
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={16} className="text-[var(--accent)] shrink-0" />
              <a
                href={waLink('Hola, tengo una duda sobre XGYM')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('footer_whatsapp')}
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} className="text-[var(--accent)] shrink-0" />
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {BRAND.instagramHandle}
              </a>
            </li>
          </ul>
          <div className="border border-white/10 aspect-square overflow-hidden">
            <iframe
              title="Ubicación de XGYM — CC La Laguna, Recta de Los Magallanes, Catia"
              src="https://www.google.com/maps?q=XGYM+Catia+Caracas&z=17&output=embed"
              className="w-full h-full grayscale invert-[92%] contrast-[1.1]"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Redes</h3>
          <ul className="space-y-2.5 text-sm text-neutral-300 mb-6">
            <li className="flex items-center gap-2">
              <Instagram size={16} className="text-[var(--accent)] shrink-0" />
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="XGYM en Instagram"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={16} className="text-[var(--accent)] shrink-0" />
              <a
                href={waLink('Hola, quiero hacer mi preinscripción en XGYM')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escríbenos por WhatsApp"
                onClick={() => trackWhatsAppClick('footer_redes')}
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
          <p className="text-xs text-[var(--subtle)] font-mono">
            L-V {BRAND.hours.weekdays}
            <br />
            Sáb/feriados {BRAND.hours.weekend}
          </p>
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

import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react'
import { BRAND, waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

const PRIMARY_LINKS = [
  { to: '/planes', label: 'Planes' },
  { to: '/clases-grupales', label: 'Clases' },
  { to: '/indoor-cycling', label: 'Indoor Cycling' },
  { to: '/horarios', label: 'Horarios' },
  { to: '/entrenadores', label: 'Entrenadores' },
]

const SECONDARY_LINKS = [
  { to: '/fit-bar', label: 'Fit Bar' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[var(--canvas-soft)]/95 backdrop-blur border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        <NavLink to="/" className="flex items-center gap-1 shrink-0" onClick={() => setOpen(false)}>
          <span className="display text-3xl text-[var(--accent)] leading-none">X</span>
          <span className="display text-3xl text-white leading-none">GYM</span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-7">
          {PRIMARY_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                  isActive ? 'text-[var(--accent)]' : 'text-neutral-300 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-neutral-300 hover:text-white" aria-label="Más opciones de navegación" aria-expanded={moreOpen}>
              Más <ChevronDown size={14} />
            </button>
            {moreOpen && (
              <div className="absolute top-full right-0 pt-3">
                <div className="bg-[var(--canvas-soft)] border border-white/10 min-w-[200px] py-2">
                  {SECONDARY_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm ${
                          isActive ? 'text-[var(--accent)]' : 'text-neutral-300 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <a
          href={waLink('Hola, quiero hacer mi preinscripción en XGYM')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('navbar_desktop')}
          className="hidden lg:inline-flex items-center gap-2 bg-[var(--accent)] text-black font-semibold text-sm px-5 py-2.5 x-cut hover:bg-[var(--accent-dim)] transition-colors"
        >
          <MessageCircle size={16} strokeWidth={2.5} />
          Quiero empezar
        </a>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[var(--canvas-soft)] border-t border-white/10 px-5 pb-6 pt-2 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 border-b border-white/5 text-base ${
                    isActive ? 'text-[var(--accent)]' : 'text-neutral-200'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={waLink('Hola, quiero hacer mi preinscripción en XGYM')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('navbar_mobile')}
            className="mt-4 flex items-center justify-center gap-2 bg-[var(--accent)] text-black font-semibold text-sm px-5 py-3 x-cut"
          >
            <MessageCircle size={16} strokeWidth={2.5} />
            Quiero empezar
          </a>
        </div>
      )}
    </header>
  )
}

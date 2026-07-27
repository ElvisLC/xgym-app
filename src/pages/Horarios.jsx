import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { useInView } from '../lib/useInView'
import { BRAND, waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

// Tarjeta de horario/enlace: fade + escala sutil, con cascada por posición.
function InfoCard({ index, className = '', children }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
      className={`transition-[opacity,scale] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function Horarios() {
  const [titleRef, titleInView] = useInView()

  return (
    <>
      <SEO
        title="Horarios"
        description="Horario del gimnasio, clases de salón e Indoor Cycling en XGYM, Catia."
        path="/horarios"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Agenda</p>
          <h1
            ref={titleRef}
            className={`transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } display text-4xl md:text-6xl text-white mb-14`}
          >
            Horarios
          </h1>

          {/* Horario general del gimnasio */}
          <h2 className="display text-3xl text-white mb-6">Horario general del gimnasio</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-20 max-w-2xl">
            <InfoCard index={0} className="border border-white/10 bg-[var(--surface)] p-6">
              <p className="eyebrow mb-2">Lunes a viernes</p>
              <p className="font-mono text-white text-lg">{BRAND.hours.weekdays}</p>
            </InfoCard>
            <InfoCard index={1} className="border border-white/10 bg-[var(--surface)] p-6">
              <p className="eyebrow mb-2">Sábados y feriados</p>
              <p className="font-mono text-white text-lg">{BRAND.hours.weekend}</p>
            </InfoCard>
          </div>

          {/* Enlaces a horarios detallados */}
          <h2 className="display text-3xl text-white mb-6">Clases de salón e Indoor Cycling</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            <InfoCard index={0}>
              <Link
                to="/clases-grupales"
                className="border border-white/10 bg-[var(--surface)] p-6 flex items-center justify-between hover:border-[var(--accent)]/50 transition-colors"
              >
                <div>
                  <p className="text-white font-semibold text-lg mb-1">Clases Grupales (Salón)</p>
                  <p className="text-[var(--subtle)] text-sm">Ver programación completa de la semana</p>
                </div>
                <ArrowRight className="text-[var(--muted)] shrink-0" size={20} />
              </Link>
            </InfoCard>
            <InfoCard index={1}>
              <Link
                to="/indoor-cycling"
                className="border border-white/10 bg-[var(--surface)] p-6 flex items-center justify-between hover:border-[var(--accent)]/50 transition-colors"
              >
                <div>
                  <p className="text-white font-semibold text-lg mb-1">Indoor Cycling</p>
                  <p className="text-[var(--subtle)] text-sm">Ver horario e instructores por nivel</p>
                </div>
                <ArrowRight className="text-[var(--muted)] shrink-0" size={20} />
              </Link>
            </InfoCard>
          </div>

          <p className="text-[var(--muted)] text-sm">
            ¿Tienes dudas sobre el horario?{' '}
            <a
              href={waLink('Hola, tengo dudas sobre los horarios de XGYM')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('horarios_page')}
              className="text-[var(--accent)] underline underline-offset-4"
            >
              Escríbenos
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}

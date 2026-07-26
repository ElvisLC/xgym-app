import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { BRAND, waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const stagger = {
  whileInView: { transition: { staggerChildren: 0.06 } },
  viewport: { once: true, margin: '-60px' },
}

export default function Horarios() {
  return (
    <>
      <SEO
        title="Horarios | XGYM"
        description="Horario del gimnasio, clases de salón e Indoor Cycling en XGYM, Catia."
        path="/horarios"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Agenda</p>
          <motion.h1 {...fadeUp} className="display text-4xl md:text-6xl text-white mb-14">Horarios</motion.h1>

          {/* Horario general del gimnasio */}
          <h2 className="display text-3xl text-white mb-6">Horario general del gimnasio</h2>
          <motion.div {...stagger} className="grid sm:grid-cols-2 gap-4 mb-20 max-w-2xl">
            <motion.div {...fadeUp} className="border border-white/10 bg-[var(--surface)] p-6">
              <p className="eyebrow mb-2">Lunes a viernes</p>
              <p className="font-mono text-white text-lg">{BRAND.hours.weekdays}</p>
            </motion.div>
            <motion.div {...fadeUp} className="border border-white/10 bg-[var(--surface)] p-6">
              <p className="eyebrow mb-2">Sábados y feriados</p>
              <p className="font-mono text-white text-lg">{BRAND.hours.weekend}</p>
            </motion.div>
          </motion.div>

          {/* Enlaces a horarios detallados */}
          <h2 className="display text-3xl text-white mb-6">Clases de salón e Indoor Cycling</h2>
          <motion.div {...stagger} className="grid sm:grid-cols-2 gap-4 mb-16">
            <motion.div {...fadeUp}>
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
            </motion.div>
            <motion.div {...fadeUp}>
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
            </motion.div>
          </motion.div>

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

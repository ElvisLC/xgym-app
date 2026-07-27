import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SEO from '../components/SEO'
import { waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const FAQS = [
  { q: '¿Dónde queda XGYM?', a: 'En Catia, Recta de Los Magallanes, CC La Laguna, piso 1.' },
  { q: '¿Cuál es el horario del gimnasio?', a: 'Lunes a viernes de 6:00am a 10:00pm; sábados y feriados de 9:00am a 4:00pm.' },
  { q: '¿Cuánto cuesta la inscripción?', a: '$5, pago único, a tasa BCV del día.' },
  {
    q: '¿Cuáles son los planes disponibles?',
    a: 'Planes Gym (Gen X, Teen Titans, The Eternals), Gen X + Spinning, Planes de Disciplina (Despertar, Transformación, Legado), y opciones sueltas de Solo Spinning/Solo Salón. Ver Planes para precios y detalle.',
  },
  {
    q: '¿Cómo reservo una clase de Indoor Cycling?',
    a: 'Desde nuestra app de reservas; los cupos están sujetos a la política de quórum.',
  },
  {
    q: '¿Qué pasa si no se completa el quórum de una clase?',
    a: (
      <>
        Se necesita un mínimo de 5 personas para que la clase se dicte. Si no se alcanza, la clase puede cancelarse o reprogramarse — te avisamos por nuestro{' '}
        <a
          href="https://www.whatsapp.com/channel/0029VbDJNyuKgsNnQG1QXg3o"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] underline underline-offset-4"
        >
          canal oficial
        </a>.
      </>
    ),
  },
  {
    q: '¿Las clases de salón tienen costo aparte?',
    a: 'Están incluidas en la mensualidad de los planes Gen X; la clase suelta cuesta $2.',
  },
]

// Pendiente por definir con XGYM (no se publica hasta tener respuesta oficial):
// estacionamiento, duchas/vestidores, métodos de pago, proceso de inscripción, edades mínimas.

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 bg-[var(--surface)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="text-white font-medium">{q}</span>
        <ChevronDown
          size={18}
          className={`text-[var(--accent)] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[var(--muted)] text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <>
      <SEO
        title="Preguntas Frecuentes | XGYM"
        description="Resolvemos las dudas más comunes sobre XGYM: ubicación, horarios, precios, planes e Indoor Cycling."
        path="/preguntas-frecuentes"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="eyebrow mb-3">Dudas comunes</p>
          <motion.h1 {...fadeUp} className="display text-4xl md:text-6xl text-white mb-14">Preguntas frecuentes</motion.h1>

          <div className="space-y-3 mb-16">
            {FAQS.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>

          {/* PENDIENTE (no visible en el sitio): estas preguntas no se publican hasta tener
              respuesta oficial de XGYM — estacionamiento, duchas/vestidores, métodos de pago,
              proceso de inscripción paso a paso, edades mínimas fuera de Teen Titans/The Eternals. */}

          <p className="text-center text-[var(--muted)] text-sm">
            ¿No encontraste tu respuesta?{' '}
            <a
              href={waLink('Hola, tengo una duda que no está en el FAQ de XGYM')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('faq_page')}
              className="text-[var(--accent)] underline underline-offset-4"
            >
              Escríbenos por WhatsApp
            </a>
          </p>
        </div>
      </section>
    </>
  )
}

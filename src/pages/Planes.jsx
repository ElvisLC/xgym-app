import { Check, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { waLink } from '../config'
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

const BASE = [
  { concept: 'Inscripción', price: '$5', detail: 'Pago único al inscribirse' },
  { concept: 'Cupo diario', price: '$3', detail: 'Acceso de un día, sin plan' },
  { concept: 'Pase semanal', price: '$15', detail: '7 días de acceso' },
]

const GYM_PLANS = [
  { name: 'Gen X', price: '$30', period: '/mes', text: 'Sala de musculación + clases de salón. Para quien quiere entrenar a su ritmo, todos los días.' },
  { name: 'Teen Titans', price: '$25', period: '/mes', text: '13 a 17 años · 9:00am–4:00pm. El primer paso hacia la disciplina empieza joven.' },
  { name: 'The Eternals', price: '$20', period: '/mes', text: '60+ años · 9:00am–2:00pm. La fuerza no tiene fecha de vencimiento.' },
]

const SPINNING_PLANS = [
  { name: 'Gen X + Spinning 5', price: '$40', period: '/mes', featured: true, text: 'Sala + salón + 5 clases de spinning.' },
  { name: 'Gen X + Spinning 10', price: '$50', period: '/mes', featured: false, text: 'Sala + salón + 10 clases de spinning. Para quien no se conforma con poco.' },
]

const DISCIPLINE_PLANS = [
  { name: 'Despertar', price: '$85', period: '3 meses', text: 'El punto de partida. 3 meses para instalar el hábito.' },
  { name: 'Transformación', price: '$165', period: '6 meses', text: '6 meses para ver el cambio que buscabas.' },
  { name: 'Legado', price: '$300', period: '12 meses', text: 'Un año completo. Porque un héroe no se construye en una semana.' },
]

const LOOSE_OPTIONS = [
  { category: 'Solo Spinning', option: 'Clase individual', price: '$4' },
  { category: 'Solo Spinning', option: '5 clases', price: '$15' },
  { category: 'Solo Spinning', option: '10 clases', price: '$30' },
  { category: 'Solo Salón', option: 'Clase individual', price: '$2' },
  { category: 'Solo Salón', option: '10 clases', price: '$15' },
  { category: 'Combos de clases', option: 'Spinning + salón 5/10', price: '$25' },
  { category: 'Combos de clases', option: 'Spinning + salón 10/10', price: '$35' },
]

function PlanCard({ name, price, period, text, featured }) {
  return (
    <div
      className={`relative p-7 flex flex-col ${
        featured ? 'bg-[var(--surface)] border-2 border-[var(--accent)]' : 'bg-[var(--surface)] border border-white/10'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 bg-[var(--accent)] text-black text-xs font-mono font-semibold px-3 py-1">
          RECOMENDADO
        </span>
      )}
      <h3 className="display text-2xl text-white mb-1">{name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-[var(--subtle)] text-sm">{period}</span>
      </div>
      <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 flex-1">{text}</p>
      <a
        href={waLink(`Hola, quiero inscribirme en el plan ${name} de XGYM`)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(`plan_${name}`)}
        className={`inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 x-cut transition-colors ${
          featured
            ? 'bg-[var(--accent)] text-black hover:bg-[var(--accent-dim)]'
            : 'border border-white/25 text-white hover:border-[var(--accent)] hover:text-[var(--accent)]'
        }`}
      >
        Inscribirme
        <ArrowRight size={16} />
      </a>
    </div>
  )
}

export default function Planes() {
  return (
    <>
      <SEO
        title="Planes y Precios | XGYM Catia"
        description="Conoce los planes de membresía de XGYM en Catia: precios, beneficios e inscripción directa."
        path="/planes"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Membresías</p>
          <motion.h1 {...fadeUp} className="display text-4xl md:text-6xl text-white mb-4">Elige cómo entrenas.</motion.h1>
          <p className="text-[var(--muted)] text-base md:text-lg max-w-2xl mb-2">
            Nosotros ponemos la disciplina contigo. Precios en USD, cobrados a tasa BCV del día de pago.
          </p>
          <p className="text-[var(--muted)] text-base max-w-2xl mb-14">
            ¿Quieres probar antes de comprometerte? Así de simple.
          </p>

          {/* Precios base */}
          <motion.div {...stagger} className="grid sm:grid-cols-3 gap-4 mb-20">
            {BASE.map((b) => (
              <motion.div {...fadeUp} key={b.concept} className="border border-white/10 bg-[var(--surface)] p-6">
                <p className="text-white font-semibold mb-1">{b.concept}</p>
                <p className="text-2xl font-bold text-[var(--accent)] mb-1">{b.price}</p>
                <p className="text-[var(--subtle)] text-sm">{b.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Planes Gym */}
          <h2 className="display text-3xl text-white mb-6">Planes Gym</h2>
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-6 mb-20">
            {GYM_PLANS.map((p) => (
              <motion.div {...fadeUp} key={p.name}>
                <PlanCard {...p} />
              </motion.div>
            ))}
          </motion.div>

          {/* Gen X + Spinning */}
          <h2 className="display text-3xl text-white mb-6">Gen X + Spinning</h2>
          <motion.div {...stagger} className="grid md:grid-cols-2 gap-6 mb-20">
            {SPINNING_PLANS.map((p) => (
              <motion.div {...fadeUp} key={p.name}>
                <PlanCard {...p} />
              </motion.div>
            ))}
          </motion.div>

          {/* Planes de Disciplina */}
          <h2 className="display text-3xl text-white mb-6">Planes de Disciplina</h2>
          <p className="text-[var(--subtle)] text-sm mb-6">Planes de permanencia — el compromiso más largo, el mejor precio por mes.</p>
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-6 mb-20">
            {DISCIPLINE_PLANS.map((p) => (
              <motion.div {...fadeUp} key={p.name}>
                <PlanCard {...p} />
              </motion.div>
            ))}
          </motion.div>

          {/* Solo Spinning / Solo Salón / Combos */}
          <h2 className="display text-3xl text-white mb-6">Solo Spinning · Solo Salón · Combos</h2>
          <div className="overflow-x-auto border border-white/10">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--surface)]">
                  <th className="text-left text-[var(--subtle)] font-medium px-4 py-3 border-b border-white/10">Categoría</th>
                  <th className="text-left text-[var(--subtle)] font-medium px-4 py-3 border-b border-white/10">Opción</th>
                  <th className="text-left text-[var(--subtle)] font-medium px-4 py-3 border-b border-white/10">Precio</th>
                </tr>
              </thead>
              <tbody>
                {LOOSE_OPTIONS.map((row, i) => (
                  <tr key={i} className="odd:bg-[var(--canvas-soft)]">
                    <td className="px-4 py-3 text-neutral-300 border-b border-white/5">{row.category}</td>
                    <td className="px-4 py-3 text-white border-b border-white/5">{row.option}</td>
                    <td className="px-4 py-3 text-[var(--accent)] font-mono border-b border-white/5">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-[var(--subtle)] text-sm mt-14">
            ¿Dudas sobre qué plan te conviene?{' '}
            <a
              href={waLink('Hola, tengo dudas sobre los planes de XGYM')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('planes_page_dudas')}
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

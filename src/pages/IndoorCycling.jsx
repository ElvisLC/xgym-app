import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { useInView } from '../lib/useInView'
import { waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

const PRICES = [
  { option: 'Clase individual', price: '$4' },
  { option: '5 clases', price: '$15' },
  { option: '10 clases', price: '$30' },
]

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const SCHEDULE = [
  { time: '7:00am', slots: ['Andrés (1XB)', 'Larry (Master)', 'Andrés (1XB)', 'Larry (Master)', 'Andrés (1XB)', '—'] },
  { time: '8:00am', slots: ['Andrés (1XB)', 'Estty (1XB)', 'Estty (1XB)', 'Estty (1XB)', 'Andrés (1XB)', '—'] },
  { time: '9:00am', slots: ['—', '—', '—', '—', '—', 'Estty (1XB)'] },
  { time: '10:00am', slots: ['—', '—', '—', '—', '—', 'Rotativos'] },
  { time: '5:30pm', slots: ['Simón (1XB)', 'Estty (1XB)', 'Estty (1XB)', 'Estty (1XB)', 'Estty (1XB)', '—'] },
  { time: '6:30pm', slots: ['Estty (1XB)', 'Simón (1XB)', 'Lisset (PRO)', 'Lisset (PRO)', 'Estty (1XB)', '—'] },
]

const LEVELS = [
  { level: '1XB', meaning: 'Primera certificación en la modalidad' },
  { level: 'PRO', meaning: 'Bastante tiempo dando la modalidad' },
  { level: 'Master', meaning: 'Mayor tiempo/experiencia dando la modalidad' },
]

// Tarjeta de precio/nivel: fade + escala sutil, con cascada por posición.
function InfoCard({ index, children }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
      className={`transition-[opacity,scale] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } border border-white/10 bg-[var(--surface)] p-6`}
    >
      {children}
    </div>
  )
}

export default function IndoorCycling() {
  const [titleRef, titleInView] = useInView()

  return (
    <>
      <SEO
        title="Indoor Cycling (Xtreme Bike)"
        description="Clases de Indoor Cycling en Catia. Horarios, niveles y reserva en línea en XGYM."
        path="/indoor-cycling"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Modalidad Xtreme Bike</p>
          <h1
            ref={titleRef}
            className={`transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } display text-4xl md:text-6xl text-white mb-4`}
          >
            Indoor Cycling
          </h1>
          <p className="text-[var(--muted)] text-base md:text-lg max-w-2xl mb-3">
            Cardio, resistencia y ritmo sobre una bicicleta, guiado por instructores que llevan la modalidad en la sangre.
          </p>
          <p className="display text-2xl text-[var(--accent)] mb-10">Los héroes se entrenan.</p>

          <a
            href={waLink('Hola, quiero reservar mi cupo de Indoor Cycling en XGYM')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('indoor_cycling_top')}
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-black font-semibold px-7 py-3.5 x-cut hover:bg-[var(--accent-dim)] transition-colors mb-16"
          >
            Elige tu clase. Pedalea tu mejor versión.
            <ArrowRight size={16} />
          </a>

          {/* Precios */}
          <h2 className="display text-3xl text-white mb-6">Precios</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {PRICES.map((p, i) => (
              <InfoCard key={p.option} index={i}>
                <p className="text-white font-semibold mb-1">{p.option}</p>
                <p className="text-2xl font-bold text-[var(--accent)]">{p.price}</p>
              </InfoCard>
            ))}
          </div>

          {/* Niveles de instructores */}
          <h2 className="display text-3xl text-white mb-3">Instructores por nivel de experiencia</h2>
          <p className="text-[var(--subtle)] text-sm mb-6 max-w-2xl">
            1XB / PRO / Master identifican la experiencia del instructor en la modalidad — se muestran como credencial junto a su nombre.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {LEVELS.map((l, i) => (
              <InfoCard key={l.level} index={i}>
                <p className="font-mono text-[var(--accent)] font-bold mb-2">{l.level}</p>
                <p className="text-[var(--muted)] text-sm">{l.meaning}</p>
              </InfoCard>
            ))}
          </div>

          {/* Horario */}
          <h2 className="display text-3xl text-white mb-6">Horario</h2>
          <div className="overflow-x-auto border border-white/10 mb-8">
            <table aria-label="Horario de clases de Indoor Cycling" className="w-full min-w-[720px] border-collapse font-mono text-sm">
              <caption className="sr-only">Horario semanal de Indoor Cycling por hora y día de la semana</caption>
              <thead>
                <tr className="bg-[var(--surface)]">
                  <th scope="col" className="text-left text-[var(--subtle)] font-medium px-4 py-3 border-b border-white/10">Hora</th>
                  {DAYS.map((d) => (
                    <th scope="col" key={d} className="text-left text-[var(--subtle)] font-medium px-4 py-3 border-b border-white/10">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row) => (
                  <tr key={row.time} className="odd:bg-[var(--canvas-soft)]">
                    <td className="px-4 py-3 text-white border-b border-white/5">{row.time}</td>
                    {row.slots.map((s, i) => (
                      <td
                        key={`${row.time}-${DAYS[i]}`}
                        className={`px-4 py-3 border-b border-white/5 ${
                          s === '—' ? 'text-[var(--subtle)]' : 'text-[var(--accent)]'
                        }`}
                      >
                        {s}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quórum */}
          <div className="border border-white/10 bg-[var(--surface)] p-6 mb-14 max-w-2xl">
            <p className="text-sm text-neutral-300">
              Las clases pueden estar sujetas a cambios por quórum (mínimo 5 personas). Consulta actualizaciones en nuestro{' '}
              <a
                href="https://www.whatsapp.com/channel/0029VbDJNyuKgsNnQG1QXg3o"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline underline-offset-4"
              >
                canal oficial
              </a>.
            </p>
          </div>

          <a
            href={waLink('Hola, quiero reservar mi cupo de Indoor Cycling en XGYM')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('indoor_cycling_bottom')}
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-black font-semibold px-7 py-3.5 x-cut hover:bg-[var(--accent-dim)] transition-colors"
          >
            Reserva tu cupo aquí
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}

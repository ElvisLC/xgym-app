import SEO from '../components/SEO'
import { useInView } from '../lib/useInView'

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const SCHEDULE = [
  {
    time: '8:00am',
    slots: ['Alex — Cardiodance', 'Reimer — Fitcombat', 'Brayan — Baile', 'Elvis — Aeróbicos', 'Johan — Funcionales', '—'],
  },
  {
    time: '9:00am',
    slots: ['—', '—', '—', '—', '—', 'Elvis — Aeróbicos'],
  },
  {
    time: '5:30pm',
    slots: ['Elvis — Aeróbicos', 'Miguel Ángel — Funcionales', 'Reimer — Fitcombat', 'Miguel Ángel — Funcionales', 'Alex — Cardiodance', '—'],
  },
  {
    time: '6:30pm',
    slots: ['—', 'Johan — Baile', '—', '—', '—', '—'],
  },
]

export default function ClasesGrupales() {
  const [titleRef, titleInView] = useInView()
  const [tableRef, tableInView] = useInView()
  const [closingRef, closingInView] = useInView()

  return (
    <>
      <SEO
        title="Clases Grupales"
        description="Programación semanal de clases grupales en XGYM: cardiodance, fitcombat, baile, aeróbicos y funcionales."
        path="/clases-grupales"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Salón</p>
          <h1
            ref={titleRef}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              titleInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            } display text-4xl md:text-6xl text-white mb-6`}
          >
            Programación de la semana
          </h1>
          <p className="text-[var(--muted)] text-base md:text-lg max-w-2xl mb-2">
            Héroe, aquí tienes tu ruta semanal. Cada clase es una oportunidad de entrenar tu cuerpo, tu mente y tu carácter.
            Elige tu hora, aparece, y haz que cuente.
          </p>
          <p className="text-[var(--subtle)] text-sm mb-14">
            Incluidas en tu mensualidad · Clase individual $2
          </p>

          <div
            ref={tableRef}
            className={`transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              tableInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } overflow-x-auto border border-white/10 mb-4`}
          >
            <table aria-label="Horario de clases grupales" className="w-full min-w-[760px] border-collapse font-mono text-sm">
              <caption className="sr-only">Horario semanal de clases grupales por hora y día de la semana</caption>
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

          <p
            ref={closingRef}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              closingInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            } display text-3xl text-white`}
          >
            Elige tu hora. <span className="text-[var(--accent)]">Aparece.</span>
          </p>
        </div>
      </section>
    </>
  )
}

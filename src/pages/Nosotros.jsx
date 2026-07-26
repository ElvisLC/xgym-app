import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const PILLARS = [
  { num: '01', title: 'Disciplina antes que motivación', text: 'La motivación inspira; la disciplina transforma.' },
  { num: '02', title: 'El héroe es real', text: 'Nuestros referentes son las personas comunes que hacen cosas extraordinarias cada día.' },
  { num: '03', title: 'La comunidad fortalece', text: 'Nadie crece completamente solo; entrenamos juntos y celebramos el progreso de todos.' },
  { num: '04', title: 'La excelencia está en los detalles', text: 'Desde la limpieza hasta la atención y el contenido, cada interacción debe sentirse premium.' },
  { num: '05', title: 'El progreso es para toda la vida', text: 'No buscamos cambios de treinta días; buscamos personas que construyan hábitos capaces de acompañarlas durante años.' },
]

export default function Nosotros() {
  const [activePillar, setActivePillar] = useState(0)
  const pillarsRef = useRef(null)

  useEffect(() => {
    const section = pillarsRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalHeight = rect.bottom - rect.top

      if (totalHeight <= 0) return

      const scrolled = windowHeight - rect.top
      const totalScrollable = totalHeight + windowHeight

      if (scrolled <= 0) {
        setActivePillar(0)
        return
      }

      if (scrolled >= totalScrollable - windowHeight) {
        setActivePillar(4)
        return
      }

      const rawProgress = scrolled / totalScrollable
      const index = Math.min(4, Math.floor(rawProgress * 5))
      setActivePillar(index)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <SEO
        title="Nosotros | XGYM"
        description="Misión, visión y filosofía de XGYM: disciplina, comunidad y el hábito que forja héroes, en Catia, Caracas."
        path="/nosotros"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Nuestra filosofía</p>
          <h1 className="display text-4xl md:text-6xl text-white mb-16">
            En un mundo que admira lo extraordinario, nosotros admiramos lo constante.
          </h1>

          {/* Misión / Visión / Propósito */}
          <div className="grid md:grid-cols-3 gap-px bg-white/10 mb-20">
            <div className="bg-[var(--canvas)] p-8">
              <p className="eyebrow mb-3">Misión</p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Despertar el héroe que existe en cada persona a través de la disciplina, el entrenamiento y una comunidad
                que cree en el esfuerzo real. En XGYM no vendemos cuerpos perfectos ni promesas rápidas: creamos un
                espacio donde cada entrenamiento fortalece el carácter, donde cada pequeño progreso importa y donde las
                personas descubren que el verdadero poder nace de la constancia.
              </p>
            </div>
            <div className="bg-[var(--canvas)] p-8">
              <p className="eyebrow mb-3">Visión</p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Convertirnos en la comunidad fitness más inspiradora de Venezuela y un referente latinoamericano de cómo
                una marca puede transformar vidas a través de la disciplina. Queremos demostrar que un gimnasio puede ser
                mucho más que un lugar para hacer ejercicio.
              </p>
            </div>
            <div className="bg-[var(--canvas)] p-8">
              <p className="eyebrow mb-3">Propósito</p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Recordarle a las personas que los héroes sí existen. No aparecen en películas. No llevan capa. Llevan
                uniforme de trabajo, llegan cansados después de una jornada difícil, cuidan a su familia, superan
                pérdidas, empiezan de nuevo — y aun así deciden entrenar.
              </p>
            </div>
          </div>

          {/* Filosofía */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-5 text-neutral-300 leading-relaxed">
              <p>
                En un mundo que admira lo extraordinario, nosotros admiramos lo constante: a quien se levanta temprano, a
                quien cumple su palabra, a quien sigue adelante cuando nadie está mirando, a quien vuelve después de haber
                caído.
              </p>
              <p>
                El entrenamiento no cambia únicamente un cuerpo — cambia la forma en la que una persona enfrenta la vida.
                Por eso cada repetición importa, cada gota de sudor importa, cada pequeño avance importa. Porque el héroe
                no aparece el día que alcanza su meta: empieza a existir el día que decide no rendirse.
              </p>
            </div>
            <div className="border border-white/10 bg-[var(--surface)] p-10 flex flex-col justify-center">
              <p className="display text-3xl md:text-4xl text-white leading-tight mb-6">
                "XGYM. El <span className="text-[var(--accent)]">hábito</span> forja héroes."
              </p>
              <p className="display text-xl text-white leading-tight">
                "XGYM no existe para fabricar atletas. Existe para formar{' '}
                <span className="text-[var(--accent)]">personas más fuertes para la vida</span>."
              </p>
            </div>
          </div>

          {/* Pilares */}
          <div ref={pillarsRef}>
            <h2 className="display text-3xl text-white mb-12">Los cinco pilares de XGYM</h2>

            {/* Desktop: horizontal */}
            <div className="hidden md:block relative mb-20">
              <div className="absolute top-[19px] left-0 right-0 h-0.5 bg-white/10" />
              <div className="absolute top-[19px] left-0 right-0 h-0.5 overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(activePillar / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="grid grid-cols-5 gap-4 relative z-10">
                {PILLARS.map((p, i) => {
                  const isActive = i <= activePillar
                  return (
                    <div key={p.num} className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className={`w-10 h-10 flex items-center justify-center border-2 font-mono text-xs font-bold transition-colors duration-300 ${isActive ? 'bg-[var(--canvas)] border-[var(--accent)] text-[var(--accent)]' : 'bg-[var(--surface)] border-white/10 text-[var(--subtle)]'}`}>
                          {p.num}
                        </div>
                      </div>
                      <div className={`flex-1 border p-5 transition-all duration-300 ${isActive ? 'border-[var(--accent)]/40 bg-[var(--surface)]' : 'border-white/10 bg-[var(--surface)]'}`}>
                        <h3 className={`font-semibold text-sm mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[var(--subtle)]'}`}>{p.title}</h3>
                        <p className="text-[var(--muted)] text-xs leading-relaxed">{p.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile: vertical */}
            <div className="md:hidden relative pl-10 mb-16">
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-white/10" />
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 overflow-hidden">
                <motion.div
                  className="w-full bg-[var(--accent)]"
                  initial={{ height: '0%' }}
                  animate={{ height: `${(activePillar / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="space-y-6">
                {PILLARS.map((p, i) => {
                  const isActive = i <= activePillar
                  return (
                    <div key={p.num} className="relative">
                      <div className={`absolute left-[-33px] top-3 w-8 h-8 flex items-center justify-center border-2 font-mono text-[10px] font-bold z-10 transition-colors duration-300 ${isActive ? 'bg-[var(--canvas)] border-[var(--accent)] text-[var(--accent)]' : 'bg-[var(--surface)] border-white/10 text-[var(--subtle)]'}`}>
                        {p.num}
                      </div>
                      <div className={`border p-5 transition-all duration-300 ${isActive ? 'border-[var(--accent)]/40 bg-[var(--surface)]' : 'border-white/10 bg-[var(--surface)]'}`}>
                        <h3 className={`font-semibold text-sm mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-[var(--subtle)]'}`}>{p.title}</h3>
                        <p className="text-[var(--muted)] text-xs leading-relaxed">{p.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* PENDIENTE (no visible en el sitio): insertar aquí, tal cual, el texto oficial de
              "El Origen de XGYM" y el juramento de marca cuando XGYM lo entregue. No reescribir ni resumir. */}
        </div>
      </section>
    </>
  )
}

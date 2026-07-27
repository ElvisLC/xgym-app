import SEO from '../components/SEO'
import FadeUp from '../components/FadeUp'

const PILLARS = [
  { num: '01', title: 'Disciplina antes que motivación', text: 'La motivación inspira; la disciplina transforma.' },
  { num: '02', title: 'El héroe es real', text: 'Nuestros referentes son las personas comunes que hacen cosas extraordinarias cada día.' },
  { num: '03', title: 'La comunidad fortalece', text: 'Nadie crece completamente solo; entrenamos juntos y celebramos el progreso de todos.' },
  { num: '04', title: 'La excelencia está en los detalles', text: 'Desde la limpieza hasta la atención y el contenido, cada interacción debe sentirse premium.' },
  { num: '05', title: 'El progreso es para toda la vida', text: 'No buscamos cambios de treinta días; buscamos personas que construyan hábitos capaces de acompañarlas durante años.' },
]

export default function Nosotros() {
  return (
    <>
      <SEO
        title="Nosotros"
        description="Misión, visión y filosofía de XGYM: disciplina, comunidad y el hábito que forja héroes, en Catia, Caracas."
        path="/nosotros"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Nuestra filosofía</p>
          <FadeUp as="h1" className="display text-4xl md:text-6xl text-white mb-16">
            En un mundo que admira lo extraordinario, nosotros admiramos lo constante.
          </FadeUp>

          {/* Misión / Visión / Propósito */}
          <div className="grid md:grid-cols-3 gap-px bg-white/10 mb-20">
            <FadeUp index={0} variant="scale-fade" className="bg-[var(--canvas)] p-8">
              <p className="eyebrow mb-3">Misión</p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Despertar el héroe que existe en cada persona a través de la disciplina, el entrenamiento y una comunidad
                que cree en el esfuerzo real. En XGYM no vendemos cuerpos perfectos ni promesas rápidas: creamos un
                espacio donde cada entrenamiento fortalece el carácter, donde cada pequeño progreso importa y donde las
                personas descubren que el verdadero poder nace de la constancia.
              </p>
            </FadeUp>
            <FadeUp index={1} variant="scale-fade" className="bg-[var(--canvas)] p-8">
              <p className="eyebrow mb-3">Visión</p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Convertirnos en la comunidad fitness más inspiradora de Venezuela y un referente latinoamericano de cómo
                una marca puede transformar vidas a través de la disciplina. Queremos demostrar que un gimnasio puede ser
                mucho más que un lugar para hacer ejercicio.
              </p>
            </FadeUp>
            <FadeUp index={2} variant="scale-fade" className="bg-[var(--canvas)] p-8">
              <p className="eyebrow mb-3">Propósito</p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Recordarle a las personas que los héroes sí existen. No aparecen en películas. No llevan capa. Llevan
                uniforme de trabajo, llegan cansados después de una jornada difícil, cuidan a su familia, superan
                pérdidas, empiezan de nuevo — y aun así deciden entrenar.
              </p>
            </FadeUp>
          </div>

          {/* Filosofía */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <FadeUp index={0} className="space-y-5 text-neutral-300 leading-relaxed">
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
            </FadeUp>
            <FadeUp index={1} variant="fade-only" className="border border-white/10 bg-[var(--surface)] p-10 flex flex-col justify-center">
              <p className="display text-3xl md:text-4xl text-white leading-tight mb-6">
                "XGYM. El <span className="text-[var(--accent)]">hábito</span> forja héroes."
              </p>
              <p className="display text-xl text-white leading-tight">
                "XGYM no existe para fabricar atletas. Existe para formar{' '}
                <span className="text-[var(--accent)]">personas más fuertes para la vida</span>."
              </p>
            </FadeUp>
          </div>

          {/* Pilares */}
          <FadeUp>
            <h2 className="display text-3xl text-white mb-8">Los cinco pilares de XGYM</h2>
            <div className="grid md:grid-cols-5 gap-px bg-white/10 mb-20">
              {PILLARS.map((p) => (
                <div key={p.num} className="bg-[var(--canvas)] p-6">
                  <span className="font-mono text-lg font-bold text-[var(--accent)]">
                    {p.num}
                  </span>
                  <h3 className="text-white font-semibold mt-3 mb-2 text-sm leading-snug">{p.title}</h3>
                  <p className="text-[var(--muted)] text-xs leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* PENDIENTE (no visible en el sitio): insertar aquí, tal cual, el texto oficial de
              "El Origen de XGYM" y el juramento de marca cuando XGYM lo entregue. No reescribir ni resumir. */}
        </div>
      </section>
    </>
  )
}

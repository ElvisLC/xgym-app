import SEO from '../components/SEO'
import FadeUp from '../components/FadeUp'

const JUICES = [
  { name: 'Loki', ingredients: 'Apio, piña, perejil, espinaca, pepino', tagline: 'Detox que despierta.' },
  { name: 'Asgard', ingredients: 'Lechosa, apio, chía', tagline: 'Nutre tu cuerpo. Alimenta tu misión.' },
  { name: 'Wolverine', ingredients: 'Mango, piña, espinaca, parchita, chía', tagline: 'Recuperas hoy. Avanzas mañana.' },
  { name: 'Magneto', ingredients: 'Remolacha, zanahoria, guayaba, fresa', tagline: 'Energía que te mueve.' },
  { name: 'Júbilo', ingredients: 'Mango, piña, parchita, chía', tagline: 'Disfruta el proceso. Celebra cada logro.' },
]

const SHAKES = [
  { name: 'Gamora', ingredients: 'Cambur, fresa, avena + proteína' },
  { name: 'Vibranium', ingredients: 'Cambur, mango, avena + proteína' },
  { name: 'Reactor', ingredients: 'Cambur, manzana, avena + proteína' },
]

export default function FitBar() {
  return (
    <>
      <SEO
        title="Fit Bar — Menú"
        description="Menú del Fit Bar de XGYM: jugos naturales, batidos con proteína y el Nivel Héroe con Whey Protein Gold Standard."
        path="/fit-bar"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Fit Bar</p>
          <FadeUp as="h1" className="display text-4xl md:text-6xl text-white mb-4">Menú</FadeUp>
          <p className="display text-2xl text-[var(--accent)] mb-6">Fuerza. Energía. Resultados.</p>
          <p className="text-[var(--muted)] text-base md:text-lg max-w-2xl mb-16">
            Mezclas frescas y nutritivas. Combina lo que te hace bien. Impulsa lo que te hace grande.
            100% natural, sin azúcar añadida, sin conservantes.
          </p>

          {/* Jugos */}
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="display text-3xl text-white">Jugos naturales</h2>
            <span className="font-mono text-[var(--accent)] text-lg">$1.80</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {JUICES.map((j, i) => (
              <FadeUp index={i} key={j.name} variant="scale-fade" className="border border-white/10 bg-[var(--surface)] p-6">
                <h3 className="text-white font-semibold text-lg mb-1">{j.name}</h3>
                <p className="text-[var(--subtle)] text-xs mb-3">{j.ingredients}</p>
                <p className="text-[var(--muted)] text-sm italic">{j.tagline}</p>
              </FadeUp>
            ))}
          </div>

          {/* Batidos */}
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="display text-3xl text-white">Batidos con proteína</h2>
            <span className="font-mono text-[var(--accent)] text-lg">$2.80</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {SHAKES.map((s, i) => (
              <FadeUp index={i} key={s.name} variant="scale-fade" className="border border-white/10 bg-[var(--surface)] p-6">
                <h3 className="text-white font-semibold text-lg mb-1">{s.name}</h3>
                <p className="text-[var(--subtle)] text-xs">{s.ingredients}</p>
              </FadeUp>
            ))}
          </div>

          {/* Nivel Héroe */}
          <div className="border-2 border-[var(--accent)] bg-[var(--surface)] p-8 mb-8">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="display text-3xl text-white">Nivel Héroe</h2>
              <span className="font-mono text-[var(--accent)] text-lg">$4.80</span>
            </div>
            <p className="text-[var(--muted)] text-sm">
              Cualquiera de los batidos anteriores + Whey Protein Gold Standard (24g proteína, 5.5g BCAAs, bajo en azúcar).
            </p>
          </div>

          <p className="display text-2xl text-white">No es solo lo que tomas. <span className="text-[var(--accent)]">Es lo que construyes.</span></p>
        </div>
      </section>
    </>
  )
}

import SEO from '../components/SEO'
import SectionHeading from '../components/SectionHeading'

const ZONES = [
  {
    name: 'Sala de pesas',
    desc: 'Carga libre, racks de sentadilla y plataformas de levantamiento.',
    img: 'https://images.pexels.com/photos/29224211/pexels-photo-29224211.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Zona cardio',
    desc: 'Caminadoras, elípticas y bicicletas con vista abierta al salón principal.',
    img: 'https://images.pexels.com/photos/17227607/pexels-photo-17227607.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Salón funcional',
    desc: 'Espacio abierto para HIIT, cuerdas y entrenamiento en grupo.',
    img: 'https://images.pexels.com/videos/6388405/pexels-photo-6388405.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    name: 'Zona de fuerza',
    desc: 'Máquinas guiadas para trabajo de fuerza controlado y seguro.',
    img: 'https://assets.mixkit.co/videos/14661/14661-thumb-720-0.jpg',
  },
]

export default function Instalaciones() {
  return (
    <>
      <SEO
        title="Instalaciones"
        description="Conoce las instalaciones de XGYM en C.C. La Laguna: sala de pesas, zona cardio, salón funcional y zona de fuerza."
        path="/instalaciones"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="El espacio"
            title="Cada zona, pensada para un objetivo"
            description="XGYM está distribuido en cuatro zonas para que entrenes sin cruzarte con quien hace otra rutina."
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {ZONES.map((zone) => (
              <div key={zone.name} className="group relative overflow-hidden border border-white/10">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={zone.img}
                    alt={`${zone.name} en XGYM`}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="display text-2xl text-white mb-1">{zone.name}</h3>
                  <p className="text-neutral-300 text-sm max-w-xs">{zone.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[var(--subtle)] text-xs font-mono mt-8 text-center">
            * Imágenes de referencia — se reemplazarán por fotos reales de XGYM tras la apertura.
          </p>
        </div>
      </section>
    </>
  )
}

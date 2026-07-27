import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { fadeUp, stagger } from '../lib/animations'

const TRAINERS = [
  { name: 'Alejandro ("Ale")', photo: '/entrenadores/alejandro.jpg', power: 'Levantar el ánimo antes que levantar el peso' },
  { name: 'Nelly', photo: '/entrenadores/nelly.jpg', power: 'Guardiana de la disciplina. En su zona no existen las medias repeticiones ni las excusas' },
  { name: 'Larling', photo: '/entrenadores/larling.jpg', power: 'Saber cuándo exigirte y cuándo protegerte' },
  { name: 'Johan', photo: '/entrenadores/johan-pt.jpg', power: 'Llevarte al límite... porque sabe que ahí empieza tu evolución' },
  { name: 'Henrry', photo: '/entrenadores/henrry.jpg', power: 'Hacer que entrenes tan bien... que todos quieran tus resultados' },
  { name: 'Kay', photo: '/entrenadores/kay.jpg', power: 'Hacer que cada persona se sienta bienvenida y capaz de dar un poco más' },
  { name: 'Will', photo: '/entrenadores/will.jpg', power: 'La disciplina de un guerrero, con la paciencia de un gran coach' },
  { name: 'Karin', photo: '/entrenadores/karin.jpg', power: 'Demostrar que la fuerza no se mide por el tamaño' },
]

// Instructores de Indoor Cycling y clases de salón — solo nombre y horario por ahora
const OTHER_INSTRUCTORS = {
  cycling: ['Andrés', 'Larry', 'Estty', 'Simón', 'Lisset'],
  salon: ['Alex', 'Reimer', 'Brayan', 'Elvis', 'Johan', 'Miguel Ángel'],
}

export default function Entrenadores() {
  return (
    <>
      <SEO
        title="El Equipo XGYM | Entrenadores"
        description="Conoce a los entrenadores de XGYM en Catia: personal trainers, instructores de Indoor Cycling y clases grupales."
        path="/entrenadores"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">El equipo</p>
          <motion.h1 {...fadeUp} className="display text-4xl md:text-6xl text-white mb-4">El equipo XGYM</motion.h1>
          <p className="text-[var(--muted)] text-base md:text-lg max-w-2xl mb-16">
            Detrás de cada entrenamiento hay alguien que ya eligió ser su propio héroe todos los días. Este es nuestro equipo.
          </p>

          <h2 className="display text-3xl text-white mb-8">Personal trainers / monitores de sala</h2>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {TRAINERS.map((t) => (
              <motion.div {...fadeUp} key={t.name} className="border border-white/10 bg-[var(--surface)] overflow-hidden group">
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={t.photo}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-2">{t.name}</h3>
                  <p className="eyebrow mb-1">Poder</p>
                  <p className="text-[var(--muted)] text-sm italic leading-snug">{t.power}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <h2 className="display text-3xl text-white mb-3">Indoor Cycling y clases de salón</h2>
          {/* <p className="text-[var(--subtle)] text-sm mb-8 max-w-2xl">
            Por ahora, solo con nombre y horario — sus fotos y "Poder" se agregan en una fase posterior.
          </p> */}
          <motion.div {...stagger} className="grid sm:grid-cols-2 gap-4">
            <motion.div {...fadeUp} className="border border-white/10 bg-[var(--surface)] p-6">
              <p className="eyebrow mb-3">Indoor Cycling</p>
              <p className="text-neutral-300 text-sm">{OTHER_INSTRUCTORS.cycling.join(' · ')}</p>
            </motion.div>
            <motion.div {...fadeUp} className="border border-white/10 bg-[var(--surface)] p-6">
              <p className="eyebrow mb-3">Clases de salón</p>
              <p className="text-neutral-300 text-sm">{OTHER_INSTRUCTORS.salon.join(' · ')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

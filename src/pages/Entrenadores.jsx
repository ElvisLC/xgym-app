import { useState } from 'react'
import SEO from '../components/SEO'
import { useInView } from '../lib/useInView'
import { useHoverCapable } from '../lib/useHoverCapable'
import { TRAINERS } from '../data/trainers'

// Instructores de Indoor Cycling y clases de salón — solo nombre y horario por ahora
const OTHER_INSTRUCTORS = {
  cycling: ['Andrés', 'Larry', 'Estty', 'Simón', 'Lisset'],
  salon: ['Alex', 'Reimer', 'Brayan', 'Elvis', 'Johan', 'Miguel Ángel'],
}

// Tarjeta de entrenador: slide desde abajo con bounce, con cascada por posición en la grilla.
// La foto hace crossfade a su versión cómic al pasar el cursor (o al tocar, en móvil).
function TrainerCard({ index, trainer }) {
  const [ref, inView] = useInView()
  const hoverCapable = useHoverCapable()
  const [showComic, setShowComic] = useState(false)
  const [comicFailed, setComicFailed] = useState(false)

  const effectActive = !comicFailed
  const hoverHandlers = hoverCapable
    ? {
        onMouseEnter: () => effectActive && setShowComic(true),
        onMouseLeave: () => effectActive && setShowComic(false),
      }
    : {
        onClick: () => effectActive && setShowComic((v) => !v),
      }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 80}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } border border-white/10 bg-[var(--surface)] overflow-hidden group`}
    >
      <div className="relative aspect-[2/3] overflow-hidden" {...hoverHandlers}>
        <img
          src={trainer.photo}
          alt={trainer.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={600}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[350ms]"
          style={{ opacity: effectActive && showComic ? 0 : 1 }}
        />
        <img
          src={trainer.comicPhoto}
          alt=""
          loading="lazy"
          decoding="async"
          width={400}
          height={600}
          onError={() => setComicFailed(true)}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-[350ms]"
          style={{ opacity: effectActive && showComic ? 1 : 0 }}
        />
      </div>
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg mb-2">{trainer.name}</h3>
        <p className="eyebrow mb-1">Poder</p>
        <p className="text-[var(--muted)] text-sm italic leading-snug">{trainer.power}</p>
      </div>
    </div>
  )
}

// Tarjeta de instructores (Indoor Cycling / salón): slide desde la izquierda.
function InstructorsCard({ index, className = '', children }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 80}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function Entrenadores() {
  const [titleRef, titleInView] = useInView()

  return (
    <>
      <SEO
        title="El Equipo | Entrenadores"
        description="Conoce a los entrenadores de XGYM en Catia: personal trainers, instructores de Indoor Cycling y clases grupales."
        path="/entrenadores"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">El equipo</p>
          <h1
            ref={titleRef}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              titleInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            } display text-4xl md:text-6xl text-white mb-4`}
          >
            El equipo XGYM
          </h1>
          <p className="text-[var(--muted)] text-base md:text-lg max-w-2xl mb-16">
            Detrás de cada entrenamiento hay alguien que ya eligió ser su propio héroe todos los días. Este es nuestro equipo.
          </p>

          <h2 className="display text-3xl text-white mb-8">Personal trainers / monitores de sala</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {TRAINERS.map((t, i) => (
              <TrainerCard key={t.name} index={i} trainer={t} />
            ))}
          </div>

          <h2 className="display text-3xl text-white mb-3">Indoor Cycling y clases de salón</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <InstructorsCard index={0} className="border border-white/10 bg-[var(--surface)] p-6">
              <p className="eyebrow mb-3">Indoor Cycling</p>
              <p className="text-neutral-300 text-sm">{OTHER_INSTRUCTORS.cycling.join(' · ')}</p>
            </InstructorsCard>
            <InstructorsCard index={1} className="border border-white/10 bg-[var(--surface)] p-6">
              <p className="eyebrow mb-3">Clases de salón</p>
              <p className="text-neutral-300 text-sm">{OTHER_INSTRUCTORS.salon.join(' · ')}</p>
            </InstructorsCard>
          </div>
        </div>
      </section>
    </>
  )
}

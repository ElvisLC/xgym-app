import { useState } from 'react'
import { useInView } from '../lib/useInView'

// Tarjeta de entrenador: la foto hace crossfade a su versión cómic al pasar el cursor
// (o al tocar, en móvil). variant='full' (Entrenadores) muestra el "poder"; variant='compact'
// (carrusel de Home) solo muestra nombre + etiqueta "COACH".
export default function TrainerCard({ index = 0, trainer, variant = 'full', className = '' }) {
  const [ref, inView] = useInView()
  const [comicFailed, setComicFailed] = useState(false)
  const compact = variant === 'compact'

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 80}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } border border-white/10 bg-[var(--surface)] overflow-hidden group ${compact ? 'w-[240px] sm:w-[260px] shrink-0' : ''} ${className}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={trainer.photo}
          alt={trainer.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={600}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[350ms] group-hover:opacity-0"
        />
        {!comicFailed && (
          <img
            src={trainer.comicPhoto}
            alt=""
            loading="lazy"
            decoding="async"
            width={400}
            height={600}
            onError={() => setComicFailed(true)}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-[350ms] opacity-0 group-hover:opacity-100"
          />
        )}
      </div>
      {compact ? (
        <div className="p-4">
          <h3 className="text-white font-semibold">{trainer.name}</h3>
          <span className="inline-block mt-2 border border-[var(--accent)]/30 text-[var(--accent)] text-[10px] font-mono font-semibold tracking-wide rounded-full px-2.5 py-0.5">
            COACH
          </span>
        </div>
      ) : (
        <div className="p-5">
          <h3 className="text-white font-semibold text-lg mb-2">{trainer.name}</h3>
          <p className="eyebrow mb-1">Poder</p>
          <p className="text-[var(--muted)] text-sm italic leading-snug">{trainer.power}</p>
        </div>
      )}
    </div>
  )
}

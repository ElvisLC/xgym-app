import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TrainerCard from './TrainerCard'

// El scroll puede quedar en valores fraccionarios y no alcanzar exactamente el máximo:
// se considera "llegó al borde" con 1px de holgura.
const EDGE = 1
// Píxeles que hay que arrastrar antes de tratar el gesto como scroll y no como click.
const DRAG_THRESHOLD = 5

export default function CoachesCarousel({ trainers }) {
  const trackRef = useRef(null)
  const rafRef = useRef(0)
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 })

  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef(null)
  const [progress, setProgress] = useState({ offset: 0, size: 1 })

  const sync = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const { scrollLeft, scrollWidth, clientWidth } = track
    const maxScroll = scrollWidth - clientWidth

    setCanLeft(scrollLeft > EDGE)
    setCanRight(scrollLeft < maxScroll - EDGE)

    // Ocultar degradados mientras se hace scroll
    setIsScrolling(true)
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 300)

    // Porción visible del track y su posición, para la barra de progreso.
    const size = scrollWidth > 0 ? clientWidth / scrollWidth : 1
    const offset = maxScroll > 0 ? (scrollLeft / maxScroll) * (1 - size) : 0
    setProgress({ offset, size })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    sync()
    track.addEventListener('scroll', sync, { passive: true })
    const observer = new ResizeObserver(sync)
    observer.observe(track)

    return () => {
      track.removeEventListener('scroll', sync)
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [sync])

  // Avanza exactamente una tarjeta, midiendo su ancho real en el breakpoint actual.
  // La animación va por rAF en vez de `behavior: 'smooth'`: el scroll suave programático
  // no está disponible en todos los navegadores/sistemas (con "reducir animaciones" del SO
  // activo Chrome lo ignora por completo, y el carrusel se quedaría inmóvil).
  const scrollByCard = (dir) => {
    const track = trackRef.current
    if (!track) return

    const card = track.firstElementChild
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth

    const max = track.scrollWidth - track.clientWidth
    const from = track.scrollLeft
    const to = Math.max(0, Math.min(max, from + dir * step))
    if (Math.abs(to - from) < 1) return

    cancelAnimationFrame(rafRef.current)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.scrollTo({ left: to, behavior: 'instant' })
      return
    }

    const DURATION = 480
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      track.scrollTo({ left: from + (to - from) * eased, behavior: 'instant' })
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByCard(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByCard(1)
    }
  }

  // Arrastre con el cursor (solo mouse). En táctil se deja el scroll nativo, que ya trae
  // inercia y rebote propios del sistema — interceptarlo lo empeoraría.
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    cancelAnimationFrame(rafRef.current)
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
    }
  }

  const onPointerMove = (e) => {
    const d = drag.current
    const track = trackRef.current
    if (!d.active || !track) return

    const dx = e.clientX - d.startX
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      d.moved = true
      setDragging(true)
      track.setPointerCapture(e.pointerId)
    }
    track.scrollTo({ left: d.startScroll - dx, behavior: 'instant' })
  }

  const endDrag = (e) => {
    const d = drag.current
    const track = trackRef.current
    if (!d.active) return
    d.active = false

    if (d.moved && track?.hasPointerCapture?.(e.pointerId)) {
      track.releasePointerCapture(e.pointerId)
    }
    setDragging(false)
  }

  // Tras arrastrar, anula el click para no disparar el toggle de la tarjeta.
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  const arrowBase =
    'absolute top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-[var(--canvas)]/85 backdrop-blur-sm text-white transition-[opacity,color,border-color] duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]'

  return (
    <div className="relative">
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Carrusel de entrenadores"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        style={{ scrollPaddingInline: 'calc(50% - 130px)' }}
        className={`flex gap-5 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory px-5 md:mx-0 md:px-0 md:cursor-grab ${
          dragging ? 'md:cursor-grabbing select-none' : ''
        }`}
      >
        {trainers.map((t, i) => (
          <TrainerCard key={t.name} index={i} trainer={t} variant="compact" className="snap-center" />
        ))}
      </div>

      {/* Degradados de borde: señalan que hay más contenido fuera de pantalla. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-12 md:-left-1 bg-gradient-to-r from-[var(--canvas-soft)] to-transparent transition-opacity duration-300 ${
          canLeft && !isScrolling ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-12 md:-right-1 bg-gradient-to-l from-[var(--canvas-soft)] to-transparent transition-opacity duration-300 ${
          canRight && !isScrolling ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        disabled={!canLeft}
        aria-label="Entrenadores anteriores"
        className={`${arrowBase} left-2 ${canLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        disabled={!canRight}
        aria-label="Entrenadores siguientes"
        className={`${arrowBase} right-2 ${canRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronRight size={20} />
      </button>

      {/* Barra de progreso: posición y porción visible del carrusel. */}
      <div aria-hidden="true" className="relative mt-6 h-px bg-white/10">
        <div
          className="absolute inset-y-0 bg-[var(--accent)] transition-[left,width] duration-150 ease-out"
          style={{ left: `${progress.offset * 100}%`, width: `${progress.size * 100}%` }}
        />
      </div>
    </div>
  )
}

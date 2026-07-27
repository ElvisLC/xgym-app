import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Dumbbell, Users, Play, Leaf, ShieldCheck, Flame, Star } from 'lucide-react'
import SEO from '../components/SEO'
import { useInView } from '../lib/useInView'
import { BRAND, waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'
import CoachesCarousel from '../components/CoachesCarousel'
import PlanCard from '../components/PlanCard'
import { TRAINERS } from '../data/trainers'
import { getClassesForDay } from '../data/schedules'

const VALUE_PROPS = [
  {
    icon: Dumbbell,
    title: 'ENTRENAMIENTO DE VERDAD',
    text: 'Equipos de calidad y entrenadores que te empujan a dar más.',
  },
  {
    icon: Users,
    title: 'COMUNIDAD QUE INSPIRA',
    text: 'Aquí no vienes solo, aquí creces con otros.',
  },
  {
    icon: ShieldCheck,
    title: 'DISCIPLINA QUE TRANSFORMA',
    text: 'No es motivación, es compromiso.',
  },
  {
    icon: Star,
    title: 'HÉROES REALES',
    text: 'Personas reales, luchas reales, resultados reales.',
  },
]

const HOME_PLANS = [
  { name: 'Gen X', price: '$30', period: '/mes', text: 'Sala de musculación + clases de salón. Para quien quiere entrenar a su ritmo, todos los días.' },
  { name: 'Gen X + Spinning 5', price: '$40', period: '/mes', featured: true, text: 'Sala + salón + 5 clases de spinning.' },
  { name: 'Transformación', price: '$165', period: '6 meses', text: '6 meses para ver el cambio que buscabas.' },
]

const GALLERY = [
  {
    src: 'https://images.pexels.com/photos/29224211/pexels-photo-29224211.jpeg?auto=compress&cs=tinysrgb&w=500',
    alt: 'Entrenamiento de fuerza con pesas en zona de musculación',
  },
  {
    src: 'https://images.pexels.com/photos/17227607/pexels-photo-17227607.jpeg?auto=compress&cs=tinysrgb&w=500',
    alt: 'Mujer practicando yoga en el gimnasio',
  },
  {
    src: 'https://images.pexels.com/videos/6388405/pexels-photo-6388405.jpeg?auto=compress&cs=tinysrgb&w=500',
    alt: 'Sesión de entrenamiento funcional en grupo',
  },
  {
    src: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=500',
    alt: 'Cardio intensivo en cinta de correr',
  },
]

const FIT_BAR_PRICES = [
  { name: 'Jugos naturales', price: 'desde $1.80' },
  { name: 'Batidos con proteína natural', price: 'desde $2.80' },
  { name: 'Nivel Héroe (+ Whey Gold Standard)', price: 'desde $4.80' },
]

const FIT_BAR_BADGES = [
  { icon: Leaf, title: 'Ingredientes reales', text: 'Sin azúcar añadida' },
  { icon: ShieldCheck, title: 'Proteína de calidad', text: 'Rinde más, recupérate mejor' },
  { icon: Flame, title: 'Energía natural', text: 'Siente la diferencia' },
]

// Tarjeta de propuesta de valor: slide desde la izquierda/derecha alternado, con cascada.
function ValueCard({ index, className = '', children }) {
  const [ref, inView] = useInView()
  const fromLeft = index % 2 === 0
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 80}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? 'opacity-100 translate-x-0' : `opacity-0 ${fromLeft ? '-translate-x-8' : 'translate-x-8'}`
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Foto de galería: zoom-out suave + rotación sutil, con cascada.
function GalleryImage({ index, img }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 120}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-2'
      } aspect-[3/4] overflow-hidden border border-white/10`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        width={400}
        height={533}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  )
}

// Envoltorio de reveal genérico: slide desde abajo con bounce, con cascada por posición.
function Reveal({ index, className = '', children }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Título de sección animado: eyebrow con fade + h2 con slide, patrón reutilizado en varias secciones.
function SectionTitle({ eyebrow, title, fromRight = false, accentBar = false }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref}>
      {accentBar && <div className="w-12 h-1 bg-[var(--accent)] mb-4" />}
      {eyebrow && <p className={`transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'} eyebrow mb-3`}>{eyebrow}</p>}
      <h2
        style={{ transitionDelay: inView ? '100ms' : '0ms' }}
        className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          inView ? 'opacity-100 translate-x-0' : `opacity-0 ${fromRight ? 'translate-x-12' : '-translate-x-12'}`
        } display text-4xl md:text-6xl text-white`}
      >
        {title}
      </h2>
    </div>
  )
}

export default function Home() {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const [testimonialsRef, testimonialsInView] = useInView()
  const [mapTitleRef, mapTitleInView] = useInView()
  const [mapRef, mapInView] = useInView()
  const [closingRef, closingInView] = useInView()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !videoLoaded) {
          setVideoLoaded(true)
        }
      },
      { threshold: 0.1 }
    )
    if (videoRef.current) observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [videoLoaded])

  // 0=Domingo...6=Sábado (JS) → 0=Lunes...5=Sábado (getClassesForDay). Domingo cae fuera de rango.
  const jsDay = new Date().getDay()
  const isSunday = jsDay === 0
  const todaysClasses = isSunday ? [] : getClassesForDay((jsDay + 6) % 7)

  return (
    <>
      <SEO
        title="XGYM — Gimnasio en Catia, Caracas"
        description="Entrena en XGYM, el gimnasio de Catia para quienes eligen la disciplina cada día. Sala, clases grupales e Indoor Cycling."
        path="/"
      />

      {/* 1. HERO */}
      <section ref={videoRef} className="relative min-h-[100svh] flex items-end overflow-hidden bg-black">
        {videoLoaded && (
          /* Video placeholder: cuando se ponga el video real, debe ser:
             - Horizontal (1920x1080), H.264, bitrate razonable
             - Duración 8-10s en loop, sin audio
             - Peso menor a 3-4MB, preferiblemente comprimido a 720p */
          <video
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-55"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            <source
              src="https://videos.pexels.com/video-files/18941351/18941351-hd_1080_1920_50fps.mp4"
              type="video/mp4"
            />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--canvas)] via-[var(--canvas)]/45 to-[var(--canvas)]/70" />

        <div className="pointer-events-none absolute inset-5 md:inset-10 border border-white/15 hidden sm:block">
          <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-[var(--accent)]" />
          <div className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]" />
          <div className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]" />
          <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-[var(--accent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-5 md:px-8 pb-16 md:pb-24 pt-32">
          <p
            style={{ animationDelay: '0s' }}
            className="animate-fade-up eyebrow mb-5"
          >
            {BRAND.addressShort}
          </p>

          <h1
            style={{ animationDelay: '0.15s' }}
            className="animate-fade-up display text-white text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] mb-6"
          >
            Todos llevamos
            <br />
            un <span className="text-[var(--accent)]">héroe</span> dentro.
          </h1>

          <p
            style={{ animationDelay: '0.3s' }}
            className="animate-fade-up text-neutral-300 text-base md:text-lg max-w-lg mb-9"
          >
            El gimnasio de Catia para quienes eligen la disciplina cada día.
          </p>

          <div
            style={{ animationDelay: '0.45s' }}
            className="animate-fade-up flex flex-col sm:flex-row gap-4"
          >
            <a
              href={waLink('Hola, quiero empezar en XGYM')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('home_hero')}
              className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-black font-semibold px-7 py-4 x-cut hover:bg-[var(--accent-dim)] transition-colors"
            >
              Quiero empezar
              <ArrowRight size={18} />
            </a>
            <Link
              to="/nosotros"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-7 py-4 x-cut hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <Play size={16} />
              Conoce XGYM
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PROPUESTA DE VALOR */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="sr-only">Propuesta de valor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {VALUE_PROPS.map((v, i) => (
              <ValueCard key={v.title} index={i} className="p-6 md:p-8 flex gap-4 items-start">
                <v.icon className="text-[var(--accent)] shrink-0 mt-0.5" size={28} strokeWidth={1.5} />
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base uppercase tracking-wide mb-1">{v.title}</h3>
                  <p className="text-[var(--muted)] text-xs md:text-sm leading-relaxed">{v.text}</p>
                </div>
              </ValueCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PLANES */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
            <div>
              <SectionTitle title="Planes" accentBar />
              <p className="text-[var(--muted)] text-base mt-5 mb-8 max-w-xs">
                Encuentra el plan que se adapta a tu estilo de vida.
              </p>
              <Link
                to="/planes"
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-6 py-3 x-cut hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                Ver todos los planes
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 items-stretch">
              {HOME_PLANS.map((p, i) => (
                <Reveal key={p.name} index={i} className="h-full">
                  <PlanCard {...p} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONOCE A TUS COACHES */}
      <section className="bg-[var(--canvas-soft)] py-24 md:py-32 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <SectionTitle eyebrow="El equipo" title="Conoce a tus coaches" />
              <p className="text-[var(--muted)] text-base mt-5 max-w-md">
                Entrenadores. Mentores. Héroes reales.
              </p>
            </div>
            <Link
              to="/entrenadores"
              className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-6 py-3 x-cut hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shrink-0 w-fit"
            >
              Ver todos
              <ArrowRight size={16} />
            </Link>
          </div>

          <CoachesCarousel trainers={TRAINERS} />
        </div>
      </section>

      {/* 6. CLASES DE HOY */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionTitle eyebrow="Programación" title="Clases de hoy" />
          <p className="text-[var(--muted)] text-base mt-5 mb-10 max-w-xl">
            Consulta la programación completa y reserva tu cupo.
          </p>

          {todaysClasses.length > 0 ? (
            <div className="border border-white/10 bg-[var(--surface)] mb-8 max-w-2xl">
              {todaysClasses.map((c, i) => (
                <div
                  key={`${c.time}-${c.instructor}-${i}`}
                  className="flex items-center gap-4 px-5 py-3.5 border-b border-white/5 last:border-b-0 font-mono text-sm"
                >
                  <span className="text-[var(--accent)] w-20 shrink-0">{c.time}</span>
                  <span className="text-white flex-1">{c.instructor}</span>
                  <span className="text-[var(--subtle)] text-xs">{c.tipo}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 bg-[var(--surface)] p-8 mb-8 max-w-2xl">
              <p className="text-white font-medium">
                {isSunday ? 'Hoy descansamos, nos vemos mañana.' : 'Hoy no hay clases programadas.'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10">
            <p className="text-[var(--subtle)] text-sm max-w-md">
              Todas las clases están sujetas a quorum. Reserva tu cupo por WhatsApp.
            </p>
            <Link
              to="/horarios"
              className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-6 py-3 x-cut hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shrink-0 w-fit"
            >
              Ver horarios
              <ArrowRight size={16} />
            </Link>
          </div>

          <p className="font-mono text-white text-sm md:text-base">
            Abrimos L-V {BRAND.hours.weekdays} · Sáb y feriados {BRAND.hours.weekend}
          </p>
        </div>
      </section>

      {/* 7. GALERÍA DEL GIMNASIO */}
      <section className="bg-[var(--canvas-soft)] py-24 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionTitle eyebrow="El espacio" title="Así se entrena en XGYM" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {GALLERY.map((img, i) => (
              <GalleryImage key={img.src} index={i} img={img} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. FIT BAR */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionTitle eyebrow="XMOTHIES" title="Fit Bar" />
          <p className="text-[var(--muted)] text-base md:text-lg mt-5 mb-10 max-w-2xl">
            Alimenta tu transformación. Batidos naturales, deliciosos y hechos para tu rendimiento.
          </p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-12">
            <div className="border border-white/10 bg-[var(--surface)] p-7 divide-y divide-white/5">
              {FIT_BAR_PRICES.map((item) => (
                <div key={item.name} className="flex items-baseline justify-between py-3 first:pt-0 last:pb-0">
                  <span className="text-white text-sm">{item.name}</span>
                  <span className="font-mono text-[var(--accent)] text-sm shrink-0 ml-4">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              {FIT_BAR_BADGES.map((b, i) => (
                <Reveal key={b.title} index={i} className="border border-white/10 bg-[var(--surface)] p-5 flex items-start gap-4">
                  <b.icon className="text-[var(--accent)] shrink-0" size={22} strokeWidth={1.5} />
                  <p className="text-white text-sm">
                    <span className="font-semibold">{b.title}</span>
                    <span className="text-[var(--muted)]"> · {b.text}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Link
            to="/fit-bar"
            className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-6 py-3 x-cut hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Ver menú
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 9. TESTIMONIOS */}
      <section className="bg-[var(--canvas-soft)] py-24 md:py-32 border-y border-white/5">
        <div
          ref={testimonialsRef}
          className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            testimonialsInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } mx-auto max-w-3xl px-5 md:px-8 text-center`}
        >
          <p className="eyebrow mb-3">Comunidad</p>
          <h2 className="display text-3xl md:text-5xl text-white mb-4">
            Los primeros Héroes Fundadores ya están escribiendo su historia.
          </h2>
          <p className="text-[var(--muted)]">Muy pronto la contamos aquí.</p>
        </div>
      </section>

      {/* 10. MAPA */}
      <section className="bg-[var(--canvas)] py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p
            ref={mapTitleRef}
            className={`transition-opacity duration-500 ${
              mapTitleInView ? 'opacity-100' : 'opacity-0'
            } eyebrow mb-3`}
          >
            Ubicación
          </p>
          <h2
            style={{ transitionDelay: mapTitleInView ? '100ms' : '0ms' }}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              mapTitleInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            } display text-3xl md:text-5xl text-white mb-8`}
          >
            Encuéntranos en Catia
          </h2>
          <div
            ref={mapRef}
            className={`transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              mapInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } border border-white/10 aspect-video overflow-hidden`}
          >
            <iframe
              title="Ubicación de XGYM — CC La Laguna, Recta de Los Magallanes, Catia"
              src="https://www.google.com/maps?q=XGYM+Catia+Caracas&z=17&output=embed"
              className="w-full h-full grayscale invert-[92%] contrast-[1.1]"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 11. CIERRE FINAL */}
      <section className="bg-[var(--canvas)] py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
          <h2
            ref={closingRef}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              closingInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } display text-4xl md:text-6xl text-white mb-9`}
          >
            Tu historia de <span className="text-[var(--accent)]">héroe</span> empieza aquí.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink('Hola, quiero empezar en XGYM')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('home_final_cta')}
              className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-black font-semibold px-8 py-4 x-cut hover:bg-[var(--accent-dim)] transition-colors"
            >
              Quiero empezar
              <ArrowRight size={18} />
            </a>
            <a
              href={waLink('Hola, tengo una duda sobre XGYM')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('home_final_cta_dudas')}
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-8 py-4 x-cut hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

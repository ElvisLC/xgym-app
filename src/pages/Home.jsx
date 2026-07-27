import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Dumbbell, Users, TrendingUp, Play } from 'lucide-react'
import SEO from '../components/SEO'
import { useInView } from '../lib/useInView'
import { BRAND, waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

const VALUE_PROPS = [
  {
    title: 'Más energía es un superpoder.',
    text: 'El ejercicio constante te devuelve la energía para tu día a día — y esa energía es el superpoder más real que existe.',
  },
  {
    title: 'No entrenamos cuerpos. Entrenamos disciplina.',
    text: 'El resultado físico es la consecuencia, no el objetivo. Aquí se construye hábito, constancia y carácter.',
  },
  {
    title: 'Todo en un mismo lugar.',
    text: 'Sala de musculación, Indoor Cycling y clases grupales — sin combinar membresías en distintos sitios.',
  },
  {
    title: 'Una comunidad, no una membresía.',
    text: 'No vienes a hacer una rutina solo. Vienes a formar parte de algo.',
  },
  {
    title: 'En el corazón de Catia.',
    text: `${BRAND.address} — cerca de donde vives, trabajas y entrenas.`,
  },
]

const BENEFITS = [
  { icon: Dumbbell, category: 'Físico', text: 'Más fuerte cada semana' },
  { icon: TrendingUp, category: 'Mental', text: 'Disciplina que se nota fuera del gym' },
  { icon: Users, category: 'Comunidad', text: 'Nunca entrenas solo' },
  { icon: Zap, category: 'Resultados', text: 'Constancia real, resultados reales' },
]

const PLANS_PREVIEW = [
  { name: 'Gen X', price: '$30', period: '/mes', featured: false, text: 'Sala + clases de salón, a tu ritmo.' },
  { name: 'Gen X + Spinning 5', price: '$40', period: '/mes', featured: true, text: 'Sala + salón + 5 clases de spinning.' },
  { name: 'Transformación', price: '$165', period: '/ 6 meses', featured: false, text: '6 meses para ver el cambio que buscabas.' },
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

// Tarjeta de beneficio: pop-in con bounce sutil, con cascada.
function BenefitCard({ index, benefit }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } border border-white/10 bg-[var(--surface)] p-6`}
    >
      <benefit.icon className="text-[var(--accent)] mb-4" size={26} strokeWidth={1.5} />
      <p className="eyebrow mb-1">{benefit.category}</p>
      <p className="text-white font-medium">{benefit.text}</p>
    </div>
  )
}

// Tarjeta de vista rápida de plan: slide desde abajo con fade, con cascada.
function PlanPreviewCard({ index, plan }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 120}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } p-8 relative ${
        plan.featured
          ? 'bg-[var(--surface)] border-2 border-[var(--accent)]'
          : 'bg-[var(--surface)] border border-white/10'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-8 bg-[var(--accent)] text-black text-xs font-mono font-semibold px-3 py-1">
          RECOMENDADO
        </span>
      )}
      <h3 className="display text-2xl text-white mb-1">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-white">{plan.price}</span>
        <span className="text-[var(--subtle)] text-sm">{plan.period}</span>
      </div>
      <p className="text-[var(--muted)] text-sm">{plan.text}</p>
    </div>
  )
}

export default function Home() {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const [galleryTitleRef, galleryTitleInView] = useInView()
  const [plansTitleRef, plansTitleInView] = useInView()
  const [schedulesRef, schedulesInView] = useInView()
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

  return (
    <>
      <SEO
        title="XGYM — Gimnasio en Catia, Caracas"
        description="Entrena en XGYM, el gimnasio de Catia para quienes eligen la disciplina cada día. Sala, clases grupales e Indoor Cycling."
        path="/"
      />

      {/* 1.1 HERO */}
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

      {/* 1.2 PROPUESTA DE VALOR */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {VALUE_PROPS.map((v, i) => (
              <ValueCard key={v.title} index={i} className="bg-[var(--canvas)] p-8 md:p-10">
                <h2 className="text-white text-xl font-semibold mb-2">{v.title}</h2>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{v.text}</p>
              </ValueCard>
            ))}
            <ValueCard index={VALUE_PROPS.length} className="bg-[var(--surface)] p-8 md:p-10 flex flex-col justify-center">
              <p className="display text-2xl md:text-3xl text-white leading-tight mb-4">
                No vendemos cuerpos perfectos. Construimos <span className="text-[var(--accent)]">héroes reales</span>.
              </p>
              <a
                href={waLink('Hola, quiero hacer mi preinscripción en XGYM')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('home_value_props')}
                className="inline-flex items-center gap-2 text-[var(--accent)] text-sm font-semibold w-fit"
              >
                Únete a XGYM <ArrowRight size={14} />
              </a>
            </ValueCard>
          </div>
        </div>
      </section>

      {/* 1.3 GALERÍA */}
      <section className="bg-[var(--canvas-soft)] py-24 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p
            ref={galleryTitleRef}
            className={`transition-opacity duration-500 ${
              galleryTitleInView ? 'opacity-100' : 'opacity-0'
            } eyebrow mb-3`}
          >
            El espacio
          </p>
          <h2
            style={{ transitionDelay: galleryTitleInView ? '100ms' : '0ms' }}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              galleryTitleInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            } display text-4xl md:text-6xl text-white mb-10`}
          >
            Así se entrena en XGYM
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((img, i) => (
              <GalleryImage key={img.src} index={i} img={img} />
            ))}
          </div>
        </div>
      </section>

      {/* 1.4 BENEFICIOS */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <BenefitCard key={b.category} index={i} benefit={b} />
            ))}
          </div>
        </div>
      </section>

      {/* 1.5 VISTA RÁPIDA DE PLANES */}
      <section className="bg-[var(--canvas-soft)] py-24 md:py-32 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p
            ref={plansTitleRef}
            className={`transition-opacity duration-500 ${
              plansTitleInView ? 'opacity-100' : 'opacity-0'
            } eyebrow mb-3`}
          >
            Membresías
          </p>
          <h2
            style={{ transitionDelay: plansTitleInView ? '100ms' : '0ms' }}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              plansTitleInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            } display text-4xl md:text-6xl text-white mb-10`}
          >
            Elige cómo entrenas
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {PLANS_PREVIEW.map((p, i) => (
              <PlanPreviewCard key={p.name} index={i} plan={p} />
            ))}
          </div>

          <Link
            to="/planes"
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-black font-semibold px-7 py-3.5 x-cut hover:bg-[var(--accent-dim)] transition-colors"
          >
            Ver todos los planes
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 1.6 ACCESO RÁPIDO A HORARIOS */}
      <section className="bg-[var(--canvas)] py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div
            ref={schedulesRef}
            className={`transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              schedulesInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            } flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 bg-[var(--surface)] p-8`}
          >
          <p className="font-mono text-white text-sm md:text-base text-center sm:text-left">
            Abrimos L-V {BRAND.hours.weekdays} · Sáb y feriados {BRAND.hours.weekend}
          </p>
          <Link
            to="/horarios"
            className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-6 py-3 x-cut hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shrink-0"
          >
            Ver horario completo
            <ArrowRight size={16} />
          </Link>
        </div>
        </div>
      </section>

      {/* 1.7 TESTIMONIOS */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
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

      {/* 1.8 MAPA */}
      <section className="bg-[var(--canvas-soft)] py-24 border-y border-white/5">
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

      {/* 1.10 CIERRE FINAL */}
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

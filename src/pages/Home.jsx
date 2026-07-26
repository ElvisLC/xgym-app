import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Dumbbell, Users, TrendingUp, Play } from 'lucide-react'
import SEO from '../components/SEO'
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
  'https://images.pexels.com/photos/29224211/pexels-photo-29224211.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/17227607/pexels-photo-17227607.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/videos/6388405/pexels-photo-6388405.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://assets.mixkit.co/videos/14661/14661-thumb-480-0.jpg',
]

export default function Home() {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

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
            className="absolute inset-0 w-full h-full object-cover opacity-55"
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
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-5"
          >
            {BRAND.addressShort}
          </motion.p>

          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display text-white text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] mb-6"
          >
            Todos llevamos
            <br />
            un <span className="text-[var(--accent)]">héroe</span> dentro.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-neutral-300 text-base md:text-lg max-w-lg mb-9"
          >
            El gimnasio de Catia para quienes eligen la disciplina cada día.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
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
          </motion.div>
        </div>
      </section>

      {/* 1.2 PROPUESTA DE VALOR */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {VALUE_PROPS.map((v) => (
              <div key={v.title} className="bg-[var(--canvas)] p-8 md:p-10">
                <h2 className="text-white text-xl font-semibold mb-2">{v.title}</h2>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
            <div className="bg-[var(--surface)] p-8 md:p-10 flex flex-col justify-center">
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
                Quiero empezar <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 1.3 GALERÍA */}
      <section className="bg-[var(--canvas-soft)] py-24 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">El espacio</p>
          <h2 className="display text-4xl md:text-6xl text-white mb-10">Así se entrena en XGYM</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((src, i) => (
              <div key={i} className="aspect-[3/4] overflow-hidden border border-white/10">
                <img
                  src={src}
                  alt="Instalaciones y entrenamiento en XGYM"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.4 BENEFICIOS */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.category} className="border border-white/10 bg-[var(--surface)] p-6">
                <b.icon className="text-[var(--accent)] mb-4" size={26} strokeWidth={1.5} />
                <p className="eyebrow mb-1">{b.category}</p>
                <p className="text-white font-medium">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.5 VISTA RÁPIDA DE PLANES */}
      <section className="bg-[var(--canvas-soft)] py-24 md:py-32 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Membresías</p>
          <h2 className="display text-4xl md:text-6xl text-white mb-10">Elige cómo entrenas</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {PLANS_PREVIEW.map((p) => (
              <div
                key={p.name}
                className={`p-8 relative ${
                  p.featured
                    ? 'bg-[var(--surface)] border-2 border-[var(--accent)]'
                    : 'bg-[var(--surface)] border border-white/10'
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-8 bg-[var(--accent)] text-black text-xs font-mono font-semibold px-3 py-1">
                    RECOMENDADO
                  </span>
                )}
                <h3 className="display text-2xl text-white mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">{p.price}</span>
                  <span className="text-[var(--subtle)] text-sm">{p.period}</span>
                </div>
                <p className="text-[var(--muted)] text-sm">{p.text}</p>
              </div>
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
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 bg-[var(--surface)] p-8">
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
      </section>

      {/* 1.7 TESTIMONIOS */}
      <section className="bg-[var(--canvas)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Comunidad</p>
          <h2 className="display text-3xl md:text-5xl text-white mb-12">
            Los primeros Héroes Fundadores ya están escribiendo su historia.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Carlos M.',
                text: 'Llevaba meses buscando un gimnasio donde no solo fueras a levantar pesas sino a formar hábito. XGYM me dio eso y una comunidad que me hace volver cada día.',
              },
              {
                name: 'María Fernanda R.',
                text: 'El Indoor Cycling es otra cosa. La energía del grupo y el instructor te sacan lo que creías que no podías. Nunca me había sentido tan constante con nada.',
              },
              {
                name: 'Luis A.',
                text: 'Pasé por 3 gimnasios en Catia antes de llegar aquí. La diferencia es que en XGYM te conocen por nombre, no por número de membresía.',
              },
            ].map((t) => (
              <div key={t.name} className="border border-white/10 bg-[var(--surface)] p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-semibold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <span className="text-white font-medium text-sm">{t.name}</span>
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed flex-1">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.8 MAPA */}
      <section className="bg-[var(--canvas-soft)] py-24 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">Ubicación</p>
          <h2 className="display text-3xl md:text-5xl text-white mb-8">Encuéntranos en Catia</h2>
          <div className="border border-white/10 aspect-video overflow-hidden">
            <iframe
              title="Ubicación de XGYM — CC La Laguna, Recta de Los Magallanes, Catia"
              src="https://www.google.com/maps?q=10.4917,-66.9664&z=17&output=embed"
              className="w-full h-full grayscale invert-[92%] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 1.10 CIERRE FINAL */}
      <section className="bg-[var(--canvas)] py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
          <h2 className="display text-4xl md:text-6xl text-white mb-9">
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

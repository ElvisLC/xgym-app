import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useInView } from '../lib/useInView'
import { BRAND } from '../config'

export default function NotFound() {
  const [numberRef, numberInView] = useInView()
  const [titleRef, titleInView] = useInView()
  const [textRef, textInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  return (
    <>
      <SEO
        title="404 — Página no encontrada"
        description="La página que buscas no existe o fue movida. Vuelve al inicio o escríbenos por WhatsApp."
        path="/404"
      />

      <section className="pt-36 pb-24 bg-[#111111] min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-7xl px-5 md:px-8 text-center">
          <p
            ref={numberRef}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              numberInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            } display text-[10rem] md:text-[14rem] leading-none text-[var(--accent)] select-none`}
          >
            404
          </p>

          <h1
            ref={titleRef}
            style={{ transitionDelay: titleInView ? '100ms' : '0ms' }}
            className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              titleInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            } display text-3xl md:text-5xl text-white mt-4 mb-6`}
          >
            Página no encontrada
          </h1>

          <p
            ref={textRef}
            style={{ transitionDelay: textInView ? '200ms' : '0ms' }}
            className={`transition-[opacity,transform] duration-500 ${
              textInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            } text-[var(--muted)] max-w-md mx-auto mb-12 text-sm md:text-base leading-relaxed`}
          >
            Lo sentimos, la página que buscas no existe o fue movida.
          </p>

          <div
            ref={ctaRef}
            style={{ transitionDelay: ctaInView ? '300ms' : '0ms' }}
            className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              ctaInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            } flex flex-col sm:flex-row items-center justify-center gap-4`}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-[var(--accent)] text-black font-semibold px-8 py-3.5 x-cut hover:bg-[var(--accent-dim)] transition-colors"
            >
              Volver al inicio
            </Link>
            <a
              href={BRAND.whatsappBase}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/20 text-white font-medium px-8 py-3.5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

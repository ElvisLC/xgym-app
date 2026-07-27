import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { fadeUp } from '../lib/animations'
import { BRAND } from '../config'

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 — Página no encontrada | XGYM"
        description="La página que buscas no existe o fue movida. Vuelve al inicio o escríbenos por WhatsApp."
        path="/404"
      />

      <section className="pt-36 pb-24 bg-[#111111] min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-7xl px-5 md:px-8 text-center">
          <m.p
            {...fadeUp}
            className="display text-[10rem] md:text-[14rem] leading-none text-[var(--accent)] select-none"
          >
            404
          </m.p>

          <m.h1
            {...fadeUp}
            className="display text-3xl md:text-5xl text-white mt-4 mb-6"
          >
            Página no encontrada
          </m.h1>

          <m.p
            {...fadeUp}
            className="text-[var(--muted)] max-w-md mx-auto mb-12 text-sm md:text-base leading-relaxed"
          >
            Lo sentimos, la página que buscas no existe o fue movida.
          </m.p>

          <m.div {...fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </m.div>
        </div>
      </section>
    </>
  )
}

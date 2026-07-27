import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Send } from 'lucide-react'
import Instagram from '../components/icons/InstagramIcon'
import SEO from '../components/SEO'
import SectionHeading from '../components/SectionHeading'
import { BRAND } from '../config'
import { trackFormSubmit } from '../lib/analytics'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const stagger = {
  whileInView: { transition: { staggerChildren: 0.06 } },
  viewport: { once: true, margin: '-60px' },
}

export default function Contacto() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar a Formspree (mismo patrón usado en el sitio de Alexander Berroteran)
    // fetch('https://formspree.io/f/TU_ID', { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } })
    trackFormSubmit('contacto')
    setSent(true)
  }

  return (
    <>
      <SEO
        title="Hablemos | Contacto XGYM"
        description="Contáctanos: Catia, Recta de Los Magallanes, CC La Laguna, piso 1. WhatsApp 0424 128 7775. ¿Listo para empezar? Estamos a un mensaje de distancia."
        path="/contacto"
      />

      <section className="pt-36 pb-24 bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Hablemos"
              title="¿Listo para empezar?"
              description="Estamos a un mensaje de distancia."
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Info + mapa */}
            <div className="space-y-6">
              <div className="border border-white/10 bg-[var(--surface)] p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Dirección</p>
                    <p className="text-[var(--muted)] text-sm">{BRAND.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">WhatsApp</p>
                    <a
                      href={BRAND.whatsappBase}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--muted)] text-sm hover:text-[var(--accent)]"
                    >
                      {BRAND.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Instagram size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Instagram</p>
                    <a
                      href={BRAND.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--muted)] text-sm hover:text-[var(--accent)]"
                    >
                      {BRAND.instagramHandle}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-transparent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Horario de atención</p>
                    <p className="text-[var(--muted)] text-sm">
                      L-V {BRAND.hours.weekdays} · Sáb/feriados {BRAND.hours.weekend}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mapa embebido — coordenadas exactas de XGYM */}
              <div className="border border-white/10 aspect-video overflow-hidden">
                <iframe
                  title="Ubicación de XGYM — CC La Laguna, Recta de Los Magallanes, Catia"
                  src="https://www.google.com/maps?q=10.5148187,-66.9519959&z=17&output=embed"
                  className="w-full h-full grayscale invert-[92%] contrast-[1.1]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Formulario */}
            <div className="border border-white/10 bg-[var(--surface)] p-8">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <p className="display text-3xl text-[var(--accent)] mb-2">¡Enviado!</p>
                  <p className="text-[var(--muted)] text-sm">
                    Gracias por escribirnos, te contactaremos pronto.
                  </p>
                </div>
              ) : (
                <motion.form {...stagger} onSubmit={handleSubmit} className="space-y-5">
                  <motion.div {...fadeUp}>
                    <label htmlFor="name" className="block text-sm text-neutral-300 mb-2">
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full bg-[var(--canvas)] border border-white/15 px-4 py-3 text-white focus:border-[var(--accent)] outline-none"
                      placeholder="Tu nombre"
                    />
                  </motion.div>
                  <motion.div {...fadeUp}>
                    <label htmlFor="phone" className="block text-sm text-neutral-300 mb-2">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full bg-[var(--canvas)] border border-white/15 px-4 py-3 text-white focus:border-[var(--accent)] outline-none"
                      placeholder="0414 000 0000"
                    />
                  </motion.div>
                  <motion.div {...fadeUp}>
                    <label htmlFor="reason" className="block text-sm text-neutral-300 mb-2">
                      Motivo
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      required
                      className="w-full bg-[var(--canvas)] border border-white/15 px-4 py-3 text-white focus:border-[var(--accent)] outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="preinscripcion">Preinscripción</option>
                      <option value="planes">Dudas sobre planes</option>
                      <option value="indoor-cycling">Indoor Cycling</option>
                      <option value="otro">Otro</option>
                    </select>
                  </motion.div>
                  <motion.div {...fadeUp}>
                    <label htmlFor="message" className="block text-sm text-neutral-300 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-[var(--canvas)] border border-white/15 px-4 py-3 text-white focus:border-[var(--accent)] outline-none resize-none"
                      placeholder="Cuéntanos qué necesitas"
                    />
                  </motion.div>
                  <motion.div {...fadeUp}>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-black font-semibold px-6 py-3.5 x-cut hover:bg-[var(--accent-dim)] transition-colors"
                    >
                      Enviar mensaje
                      <Send size={16} />
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

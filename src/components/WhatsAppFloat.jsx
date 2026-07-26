import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink('Hola, tengo una duda sobre XGYM')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="¿Dudas? Escríbenos por WhatsApp"
      onClick={() => trackWhatsAppClick('floating_button')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[var(--accent)] text-black rounded-full shadow-lg shadow-black/40 px-4 py-3.5 font-semibold text-sm hover:bg-[var(--accent-dim)] transition-transform hover:scale-105"
    >
      <MessageCircle size={20} strokeWidth={2.5} />
      <span className="hidden sm:inline">¿Dudas? Escríbenos</span>
    </motion.a>
  )
}

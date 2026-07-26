import { MessageCircle } from 'lucide-react'
import { waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink('Hola, tengo una duda sobre XGYM')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="¿Dudas? Escríbenos por WhatsApp"
      onClick={() => trackWhatsAppClick('floating_button')}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[var(--accent)] text-black rounded-full shadow-lg shadow-black/40 px-4 py-3.5 font-semibold text-sm hover:bg-[var(--accent-dim)] transition-transform hover:scale-105"
    >
      <MessageCircle size={20} strokeWidth={2.5} />
      <span className="hidden sm:inline">¿Dudas? Escríbenos</span>
    </a>
  )
}

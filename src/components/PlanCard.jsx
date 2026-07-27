import { ArrowRight } from 'lucide-react'
import { waLink } from '../config'
import { trackWhatsAppClick } from '../lib/analytics'

export default function PlanCard({ name, price, period, text, featured }) {
  return (
    <div
      className={`relative p-7 flex flex-col h-full ${
        featured ? 'bg-[var(--surface)] border-2 border-[var(--accent)]' : 'bg-[var(--surface)] border border-white/10'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 bg-[var(--accent)] text-black text-xs font-mono font-semibold px-3 py-1">
          RECOMENDADO
        </span>
      )}
      <h3 className="display text-2xl text-white mb-1">{name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-[var(--subtle)] text-sm">{period}</span>
      </div>
      <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 flex-1">{text}</p>
      <a
        href={waLink(`Hola, quiero inscribirme en el plan ${name} de XGYM`)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(`plan_${name}`)}
        className={`inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 x-cut transition-colors ${
          featured
            ? 'bg-[var(--accent)] text-black hover:bg-[var(--accent-dim)]'
            : 'border border-white/25 text-white hover:border-[var(--accent)] hover:text-[var(--accent)]'
        }`}
      >
        Inscribirme
        <ArrowRight size={16} />
      </a>
    </div>
  )
}

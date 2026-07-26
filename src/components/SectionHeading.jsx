export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl mb-12 ${alignClass}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="display text-4xl md:text-6xl text-white mb-4">{title}</h2>
      {description && <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">{description}</p>}
    </div>
  )
}

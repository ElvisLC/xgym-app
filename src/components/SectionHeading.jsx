export default function SectionHeading({ eyebrow, title, description, align = 'left', as: Tag = 'h2' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl mb-12 ${alignClass}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className="display text-4xl md:text-6xl text-white mb-4">{title}</Tag>
      {description && <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">{description}</p>}
    </div>
  )
}

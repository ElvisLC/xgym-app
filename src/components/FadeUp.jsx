import { useInView } from '../lib/useInView'

// Tailwind necesita ver el nombre completo de la clase como texto literal para
// generarla (JIT) — por eso las props numéricas se resuelven contra estos mapas
// en vez de interpolarse directamente en el className.
const DURATION_CLASSES = {
  600: 'duration-600',
  800: 'duration-800',
}

const DISTANCE_CLASSES = {
  3: 'translate-y-3',
  4: 'translate-y-4',
}

export default function FadeUp({
  as: Tag = 'div',
  className = '',
  index = 0,
  duration = 600,
  distance = 4,
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView()
  const durationClass = DURATION_CLASSES[duration]
  const distanceClass = DISTANCE_CLASSES[distance]

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,translate] ${durationClass} ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? 'opacity-100 translate-y-0' : `opacity-0 ${distanceClass}`
      } ${className}`}
      style={{ transitionDelay: inView ? `${index * 120}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

import { useInView } from '../lib/useInView'

// Tailwind necesita ver el nombre completo de la clase como texto literal para
// generarla (JIT) — por eso las props numéricas se resuelven contra estos mapas
// en vez de interpolarse directamente en el className.
const DURATION_CLASSES = {
  400: 'duration-400',
  600: 'duration-600',
  800: 'duration-800',
}

// Cada variante define sus clases para estado oculto / visible / transición
const VARIANTS = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-3',
    visible: 'opacity-100 translate-y-0',
    transition: 'transition-[opacity,translate]',
  },
  'scale-fade': {
    hidden: 'opacity-0 scale-[0.98]',
    visible: 'opacity-100 scale-100',
    transition: 'transition-[opacity,transform]',
  },
  'zoom-fade': {
    hidden: 'opacity-0 scale-[1.03]',
    visible: 'opacity-100 scale-100',
    transition: 'transition-[opacity,transform]',
  },
  'pop-in': {
    hidden: 'opacity-0 scale-[0.97]',
    visible: 'opacity-100 scale-100',
    transition: 'transition-[opacity,transform]',
  },
  'fade-only': {
    hidden: 'opacity-0',
    visible: 'opacity-100',
    transition: 'transition-opacity',
  },
}

export default function FadeUp({
  as: Tag = 'div',
  className = '',
  index = 0,
  duration = 600,
  variant = 'fade-up',
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView()
  const durationClass = DURATION_CLASSES[duration]
  const v = VARIANTS[variant] || VARIANTS['fade-up']

  return (
    <Tag
      ref={ref}
      className={`${v.transition} ${durationClass} ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? v.visible : v.hidden
      } ${className}`}
      style={{ transitionDelay: inView ? `${index * 120}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

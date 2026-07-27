import { useInView } from '../lib/useInView'

// Tailwind necesita ver el nombre completo de la clase como texto literal para
// generarla (JIT) — por eso las props numéricas se resuelven contra estos mapas
// en vez de interpolarse directamente en el className.
const DURATION_CLASSES = {
  400: 'duration-400',
  500: 'duration-500',
  600: 'duration-600',
  700: 'duration-700',
  800: 'duration-800',
}

// Cada variante define: clases de Tailwind para hidden/visible, transición,
// y curva de easing propia — para que cada tipo de contenido se sienta distinto.
const VARIANTS = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-6',
    visible: 'opacity-100 translate-y-0',
    transition: 'transition-[opacity,translate]',
    easing: 'ease-out',
  },
  'scale-fade': {
    hidden: 'opacity-0 scale-[0.92] translate-y-3',
    visible: 'opacity-100 scale-100 translate-y-0',
    transition: 'transition-[opacity,transform]',
    easing: 'ease-[cubic-bezier(0.16,1,0.3,1)]',
  },
  'zoom-fade': {
    hidden: 'opacity-0 scale-[1.06]',
    visible: 'opacity-100 scale-100',
    transition: 'transition-[opacity,transform]',
    easing: 'ease-[cubic-bezier(0.33,1,0.68,1)]',
  },
  'pop-in': {
    hidden: 'opacity-0 scale-[0.9] -rotate-1',
    visible: 'opacity-100 scale-100 rotate-0',
    transition: 'transition-[opacity,transform]',
    easing: 'ease-[cubic-bezier(0.34,1.56,0.64,1)]',
  },
  'fade-only': {
    hidden: 'opacity-0 -translate-x-4',
    visible: 'opacity-100 translate-x-0',
    transition: 'transition-[opacity,translate]',
    easing: 'ease-[cubic-bezier(0.25,1,0.5,1)]',
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
      className={`${v.transition} ${durationClass} ${v.easing} ${
        inView ? v.visible : v.hidden
      } ${className}`}
      style={{ transitionDelay: inView ? `${index * 120}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

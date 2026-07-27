import { useInView } from '../lib/useInView'

export default function FadeUp({ as: Tag = 'div', className = '', index = 0, style, children, ...rest }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
      style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

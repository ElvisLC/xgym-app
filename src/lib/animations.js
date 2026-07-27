export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

export const stagger = {
  whileInView: { transition: { staggerChildren: 0.06 } },
  viewport: { once: true, margin: '-60px' },
}

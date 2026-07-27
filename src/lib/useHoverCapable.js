import { useState } from 'react'

// Detecta si el dispositivo primario soporta hover real (mouse) vs. táctil.
export function useHoverCapable() {
  const [hoverCapable] = useState(() => window.matchMedia('(hover: hover)').matches)
  return hoverCapable
}

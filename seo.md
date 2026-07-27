# Checklist de SEO Técnico, Rendimiento y Optimizaciones Web — Estado real (XGYM)

Actualizado el 2026-07-26 para reflejar lo que ya está implementado en el sitio vs. lo
que sigue pendiente. Antes era un checklist genérico sin marcar; ahora es el estado real.

---

## 📌 1. Arquitectura SEO On-Page e Indexación

### 📄 Sitemap XML (`public/sitemap.xml`)
- [x] Namespace de imágenes (`xmlns:image`).
- [x] URL principal con `priority="1.0"` y `changefreq="weekly"`.
- [x] `<image:image>` en la home (logo).
- [x] `lastmod` en todas las entradas (home y subpáginas).
- [ ] Anclas de secciones (`/#servicios`, `/#ubicacion`) — no aplica hoy: las secciones
      de `Home.jsx` no tienen `id` propios, así que esas anclas no resolverían a nada.
      Solo agregar si se le ponen `id` a esas secciones y se quiere indexarlas aparte.

### 🤖 Robots (`public/robots.txt`)
- [x] `Allow: /` + referencia al sitemap real (`https://xgym.ve/sitemap.xml`).

### 🏷️ Meta etiquetas (`index.html`)
- [x] `title`, `description`, `keywords` con términos locales (Catia, Caracas).
- [x] Meta geográficas (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
- [x] Canonical, Open Graph completas, Twitter Cards.
- [x] Por página: `src/components/SEO.jsx` inyecta title/description/canonical/OG/Twitter
      únicos vía `react-helmet-async` — cada página en `src/pages/*.jsx` pasa su propio
      `title`/`description`/`path`.

---

## 📊 2. Datos Estructurados (Schema.org JSON-LD)

- [x] `Gym` schema en `index.html` (home): dirección, geo, horarios, catálogo de
      servicios, `sameAs` de Instagram.
- [x] `FAQPage` schema en `/preguntas-frecuentes` (`src/pages/FAQ.jsx`), inyectado vía el
      prop `jsonLd` de `SEO.jsx` — habilita Rich Results de preguntas frecuentes.
- [ ] `BreadcrumbList` en subpáginas — pendiente, evaluar si suma dado que la navegación
      es plana (sin rutas anidadas tipo `/planes/gen-x`).

---

## ⚡ 3. Rendimiento (PageSpeed / Core Web Vitals)

### 🖼️ Imágenes
- [x] Fotos de entrenadores (`public/entrenadores/*.jpg`) ya livianas (30-52 KB).
- [x] `width`/`height` explícitos + `loading="lazy"` + `decoding="async"` en imágenes
      bajo el pliegue (galería de Home, entrenadores).
- [ ] Imagen `poster` en el `<video>` del hero (`Home.jsx`) — pendiente: falta un frame
      real exportado del clip de Pexels; no se debe usar el logo como poster porque no
      es representativo del contenido del hero.

### 🚀 Renderizado y CSS/JS
- [x] Fuentes self-hosted vía `@fontsource` (no Google Fonts), `font-display: swap` ya
      viene por defecto en esos paquetes — no bloquean el render.
- [x] Preload del woff2 de Bebas Neue (fuente del `<h1>` del hero) en `index.html`.
- [x] Pesos de fuente podados a los realmente usados: JetBrains Mono quedó en 400/600
      (el 500 no se usaba en ninguna combinación de clases `font-mono`).
- [x] `preconnect` a `images.pexels.com`, `assets.mixkit.co` y `videos.pexels.com`
      (el hero video se sirve desde este último y antes no tenía preconnect).
- [x] `LazyMotion` + `domAnimation` en `App.jsx` en vez de importar `framer-motion`
      completo — reduce el JS de animaciones.
- [x] Mapa de Google como `iframe` con `loading="lazy"` (no carga hasta que el usuario
      se acerca a esa sección) — ya evita el bloqueo inicial de ~400 KiB de JS.
- [x] `manualChunks` en `vite.config.js` separa `vendor-react` y `vendor-framer` del
      resto del bundle.
- [x] Code-splitting por ruta (`React.lazy` en `App.jsx`) — cada página subcarga su
      propio chunk.

---

## ♿ 4. Accesibilidad (WCAG AA) y UX

- [x] Un único `<h1>` por página, con jerarquía `<h2>`/`<h3>` debajo (corregido: FAQ y
      Contacto no tenían encabezado real — ver nota abajo).
- [x] `alt` descriptivo en las imágenes de galería/entrenadores.
- [x] `aria-label`/`aria-expanded` en el menú hamburguesa y el desplegable "Más".
- [x] Tablas de horarios con `scope="col"` en encabezados.

**Nota de la corrección de encabezados:** `FAQ.jsx` referenciaba `motion.h1` sin importar
`motion` (solo se importaba `m` de `framer-motion`) — esto rompía la página entera en
producción con `ReferenceError: motion is not defined`, no solo un problema de SEO.
`Contacto.jsx` no tenía ningún `<h1>`, solo un `<h2>` vía `SectionHeading`. Ambos se
corrigieron.

---

## 🛠️ 5. Pendientes reales (en orden de impacto)

- [ ] Reemplazar `YOUR_META_PIXEL_ID` en `index.html` por el Pixel ID real de Meta
      cuando XGYM lo entregue (snippet dejado comentado en el mismo archivo, listo para
      descomentar y completar).
- [ ] Conseguir/exportar un frame del video del hero para usar como `poster`.
- [ ] Conectar el formulario de `Contacto.jsx` a un backend real (hoy solo hace
      `trackFormSubmit` y muestra "¡Enviado!" sin enviar nada — hay un `TODO` de
      Formspree en el propio archivo).
- [ ] Volver a correr PageSpeed Insights (móvil y desktop) sobre el deploy con estos
      cambios para confirmar el impacto real y decidir si hace falta seguir optimizando.

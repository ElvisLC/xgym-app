# Checklist de SEO Técnico, Rendimiento y Optimizaciones Web

Esta guía recopila el flujo de trabajo completo y las mejores prácticas aplicadas en el proyecto para asegurar **SEO técnico superior**, **máxima velocidad en móviles/desktop (PageSpeed 90+)** y **posicionamiento en motores de búsqueda**.

---

## 📌 1. Arquitectura SEO On-Page e Indexación

### 📄 Sitemap XML Extendido (`public/sitemap.xml`)
- [ ] Incluir namespace de imágenes (`xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`).
- [ ] Declarar la URL principal con `priority="1.0"` y `changefreq="weekly"`.
- [ ] Incluir etiquetas `<image:image>` con `<image:loc>` y `<image:title>` para todas las imágenes principales del sitio (mejora la indexación en Google Imágenes).
- [ ] Agregar anclas de secciones clave (`/#servicios`, `/#ubicacion`, `/#nosotros`) con sus respectivas prioridades (`0.8`).

### 🤖 Robots (`public/robots.txt`)
- [ ] Permitir el rastreo general:
  ```text
  User-agent: *
  Allow: /

  Sitemap: https://tudominio.com/sitemap.xml
  ```

### 🏷️ Meta Etiquetas y Head de HTML (`index.html`)
- [ ] `<title>` claro y con palabras clave locales (ej: `NombreMarca — Servicios en Ciudad`).
- [ ] `<meta name="description">` persuasiva de entre 140 y 160 caracteres.
- [ ] `<meta name="keywords">` estratégicas con términos de búsqueda locales.
- [ ] Meta etiquetas geográficas (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
- [ ] Enlace Canonical: `<link rel="canonical" href="https://tudominio.com/" />`.
- [ ] Open Graph completas (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) para vista previa perfecta en WhatsApp y Facebook.
- [ ] Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).

---

## 📊 2. Datos Estructurados (Schema.org JSON-LD)

- [ ] Incluir bloque de script `type="application/ld+json"` en el `<head>`.
- [ ] Definir el tipo de negocio local (ej: `PetStore`, `LocalBusiness`, `MedicalClinic`, etc.).
- [ ] Declarar `name`, `image`, `url`, `telephone`, `priceRange`, y coordenadas `geo`.
- [ ] Incluir catálogo de servicios con `hasOfferCatalog` y `OfferCatalog` con la lista de servicios clave para capturar **Rich Snippets** en Google.
- [ ] Definir `openingHoursSpecification` con los días y horas exactos de atención.

---

## ⚡ 3. Optimización Extrema de Rendimiento (PageSpeed / Core Web Vitals)

### 🖼️ Optimización de Imágenes
- [ ] Convertir todas las imágenes a formatos de nueva generación (**WebP** o **AVIF**).
- [ ] Ajustar la resolución física de las imágenes a las dimensiones reales mostradas en pantalla (evitar cargar imágenes de 2000px para contenedores de 450px).
- [ ] Recomprimir WebP a calidad balanceada (entre **45% y 65%** según necesidad visual) para lograr archivos por debajo de **50 KiB**.
- [ ] **Imagen LCP (Hero/Portada)**:
  - [ ] Precargar en el `<head>`: `<link rel="preload" as="image" href="/imagen-hero.webp" type="image/webp" fetchpriority="high" />`.
  - [ ] Usar `fetchPriority="high"` y `decoding="async"`.
  - [ ] Evitar atributos `loading="lazy"` en la imagen del Hero.
- [ ] **Imágenes por debajo del pliegue (Below the fold)**:
  - [ ] Aplicar `loading="lazy"` y `decoding="async"`.
  - [ ] Declarar siempre `width` y `height` explícitos en la etiqueta `<img>` para evitar cambios bruscos de diseño (**CLS = 0**).

### 🚀 Optimización del Renderizado y CSS/JS (FCP & TBT)
- [ ] **Fuentes no bloqueantes**: Cargar Google Fonts de manera asíncrona mediante la estrategia:
  ```html
  <link href="https://fonts.googleapis.com/..." rel="stylesheet" media="print" onload="this.media='all'">
  ```
- [ ] **Framer Motion / Animaciones en Móvil**:
  - [ ] Eliminar opacidad 0 (`opacity: 0`) o transformaciones complejas en la primera vista (Hero) durante la carga inicial para garantizar que el **FCP** ocurra de inmediato.
- [ ] **Diferir Scripts Pesados (Google Maps / Iframes)**:
  - [ ] Evitar embeber `iframe` directos de Google Maps al inicio (cargan ~400 KiB de JS no utilizado).
  - [ ] Implementar un patrón de **Lazy Load interactivo** con vista previa estática y botón *"Cargar mapa interactivo"* o activar al hacer scroll/intersección.
- [ ] **Code Splitting en Bundler (`vite.config.ts`)**:
  - [ ] Configurar `manualChunks` para separar librerías pesadas en trozos independientes (`vendor-react`, `vendor-framer`, etc.).

---

## ♿ 4. Accesibilidad (WCAG AA) y UX

- [ ] Asegurar contraste adecuado entre textos y fondos (usar opacidades de texto superiores al **85-90%** sobre fondos claros u oscuros).
- [ ] Atributos `alt` descriptivos en absolutamente todas las imágenes.
- [ ] Jerarquía estricta de encabezados HTML (`<h1>` único por página, seguido de `<h2>` y `<h3>`).
- [ ] Atributos `aria-label` en botones sin texto directo (ej: botón del menú hamburguesa).

---

## 🛠️ 5. Pasos de Comprobación Final

- [ ] Correr `npm run build` para asegurar cero errores de compilación o sintaxis en producción.
- [ ] Ejecutar prueba en **Google PageSpeed Insights** (Modo Mobile) apuntando al dominio en producción.
- [ ] Validar datos estructurados en la herramienta oficial [Rich Results Test de Google](https://search.google.com/test/rich-results).

# XGYM — Sitio web

Sitio multi-página para XGYM (Catia, Recta de Los Magallanes, CC La Laguna, piso 1), construido siguiendo
`xgym_especificaciones_para_la_web.docx` (María Aristimuño). React + Vite + Tailwind v4 + React Router +
Framer Motion + react-helmet-async.

## Cómo correrlo

```bash
npm install
npm run dev       # desarrollo, http://localhost:5173
npm run build     # build de producción -> carpeta dist/
npm run preview   # sirve el build de producción localmente
```

## Estructura

```
src/
  config.js         Datos de marca centralizados (WhatsApp, dirección, horario) — un solo lugar para editar
  components/        Navbar, Footer, WhatsAppFloat, SEO, SectionHeading, icons/InstagramIcon
  pages/
    Home.jsx              11 bloques del Capítulo 1 del brief
    Planes.jsx             Precios base + Planes Gym + Gen X/Spinning + Disciplina + Solo Spinning/Salón/Combos
    IndoorCycling.jsx      Horario, niveles de instructor (1XB/PRO/Master), política de quórum
    ClasesGrupales.jsx     Horario de salón
    FitBar.jsx             Menú de jugos, batidos y Nivel Héroe
    Horarios.jsx           Horario general + enlaces a Indoor Cycling / Clases Grupales
    Entrenadores.jsx       8 personal trainers con foto real + "Poder", más instructores de cycling/salón
    Nosotros.jsx           Misión, visión, propósito, filosofía, 5 pilares
    Contacto.jsx           Formulario + mapa + datos de contacto
    FAQ.jsx                Respuestas oficiales + sección de pendientes por definir
public/
  entrenadores/      Fotos reales de los 8 trainers, extraídas del docx original
  robots.txt, sitemap.xml, favicon.svg (con el hex de marca #D8F835)
```

## Lo que se corrigió sobre la versión anterior

- **Color de marca:** de una aproximación (`#c6ff3d`) al hex oficial exacto **#D8F835**, y fondo a `#111111` según el brief.
- **Ubicación:** ahora incluye "Catia, Recta de Los Magallanes" en todas partes (footer, hero, mapa, JSON-LD) — antes solo decía "CC La Laguna, Piso 1".
- **Horario:** corregido a L-V 6:00am–10:00pm · Sáb y feriados 9:00am–4:00pm en todo el sitio.
- **Planes y precios:** reescritos por completo con la estructura real (inscripción, cupo diario, pase semanal, Planes Gym, Gen X + Spinning, Planes de Disciplina, Solo Spinning/Solo Salón/Combos).
- **Copy del Home:** reemplazado por el copy final aprobado ("Todos llevamos un héroe dentro", CTAs "Quiero empezar" / "Conoce XGYM").
- **5 páginas nuevas:** Indoor Cycling, Clases Grupales, Fit Bar, Entrenadores y Preguntas Frecuentes — no existían antes.
- **Nombres duplicados:** los dos "Johan" y "Larling/Larry" están tratados como perfiles independientes, con nota aclaratoria donde corresponde.
- **Navegación:** reducida a los ítems de mayor intención (Planes, Clases, Indoor Cycling, Horarios, Entrenadores) con el resto en un menú "Más".
- **URLs:** ahora siguen el patrón pedido (`/planes`, `/indoor-cycling`, `/clases-grupales`, `/fit-bar`, `/horarios`, `/entrenadores`, `/nosotros`, `/contacto`, `/preguntas-frecuentes`).
- **Botón de WhatsApp flotante:** texto actualizado a "¿Dudas? Escríbenos".
- **JSON-LD:** cambiado de `HealthClub` genérico a `Gym`, con dirección real y horarios estructurados (`openingHoursSpecification`).

## Analytics

**Google Analytics 4** ya está integrado (`G-8YCGLW732P`). **Meta Pixel** está integrado con un ID placeholder —
para activarlo, solo hay que buscar y reemplazar `YOUR_META_PIXEL_ID` por el ID real en `index.html` (aparece
dos veces: el script en el `<head>` y el `<img>` de `<noscript>` al inicio del `<body>`).

Como el sitio es una SPA, las vistas de página se mandan a mano en `src/App.jsx` (componente `ScrollToTop`)
cada vez que cambia la ruta — ni GA ni Meta las detectan solas porque no hay recarga real de página. Esa misma
función manda el evento a las dos plataformas a la vez.

Eventos que ya se registran en **todos** los botones de WhatsApp del sitio (Navbar, Footer, flotante, Home,
Planes, Indoor Cycling, Horarios, FAQ) y en el formulario de contacto, usando `src/lib/analytics.js`:

- `trackWhatsAppClick('nombre_del_lugar')` → dispara `whatsapp_click` en GA4 y `Contact` en Meta
- `trackFormSubmit('nombre_del_formulario')` → dispara `form_submit` en GA4 y `Lead` en Meta

Si en algún momento agregan un botón de WhatsApp nuevo en otra página, solo hay que copiar el patrón: agregar
`onClick={() => trackWhatsAppClick('contexto')}` al `<a>` correspondiente.

Si cambian de propiedad de GA4 o de Pixel en el futuro, los IDs se actualizan en `index.html` (los dos scripts)
y como referencia en el comentario de `src/lib/analytics.js`.

## Pendientes antes de producción

1. **Video del hero e imágenes de galería/instalaciones:** siguen siendo stock de Pexels/Mixkit como placeholder. Cámbialos por contenido real de XGYM (idealmente horizontal 1920×1080 para el video, no vertical).
2. **Historia de marca:** en `Nosotros.jsx` hay una nota visible pidiendo el texto oficial de "El Origen de XGYM" y el juramento de marca — el brief indica que va tal cual, sin reescribir. Aún no está insertado.
3. **Formulario de contacto:** solo muestra confirmación local. Conéctalo a Formspree (mismo patrón del sitio de Alexander Berroteran) o a tu backend para que llegue de verdad.
4. **Mapa:** el iframe busca "CC La Laguna Recta de Los Magallanes Catia" por texto. Reemplázalo por el link de "Compartir ubicación" de Google Maps con las coordenadas exactas.
5. **FAQ pendientes:** hay 5 preguntas que el propio brief pide NO publicar hasta tener respuesta oficial de XGYM (estacionamiento, duchas, métodos de pago, proceso de inscripción, edades mínimas) — están listadas visiblemente en `/preguntas-frecuentes` como pendientes, no respondidas a ciegas.
6. **Instructores de Indoor Cycling / Salón:** por ahora solo nombre (sin foto ni "Poder"), tal como indica el brief para esta fase.
7. **Dominio real:** `index.html` y `src/config.js` asumen `https://xgym.ve`. Actualiza cuando tengan el dominio definitivo.
8. **Integraciones técnicas** (Capítulo 13 del brief): **Google Analytics 4 integrado** (ID `G-8YCGLW732P`) y **Meta Pixel integrado con placeholder** — solo falta reemplazar `YOUR_META_PIXEL_ID` por el ID real en `index.html` (aparece en 2 lugares: el script del `<head>` y el `<img>` de `<noscript>` al inicio del `<body>`). Sigue pendiente la notificación automática del formulario de contacto (email o CRM/hoja de cálculo).
9. **SEO en SPA:** sitio 100% client-side. Para SEO óptimo a futuro, considerar pre-renderizado (`vite-plugin-ssr`, Prerender.io) dado el peso que le da el brief al posicionamiento local.

## Nota sobre nombres de planes/productos

Los nombres que referencian Marvel/DC (Teen Titans, The Eternals, Loki, Asgard, Wolverine, Magneto, Gamora,
Vibranium) se mantuvieron tal cual — el brief indica que es una decisión ya tomada por XGYM y que no deben
censurarse sin autorización, aunque el propio documento señala el riesgo de marca registrada asociado.

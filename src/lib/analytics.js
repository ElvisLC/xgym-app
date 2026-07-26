// Wrapper simple sobre gtag (GA4) y fbq (Meta Pixel). Todas las páginas llaman
// a estas funciones — así, si el día de mañana se agrega/quita una plataforma,
// solo se toca este archivo, no cada botón de WhatsApp del sitio.

export function trackPageView(path, title) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    })
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView')
  }
}

export function trackWhatsAppClick(context) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', { context })
  }
  if (typeof window.fbq === 'function') {
    // "Contact" es el evento estándar de Meta para este tipo de acción
    window.fbq('track', 'Contact', { context })
  }
}

export function trackFormSubmit(formName) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'form_submit', { form_name: formName })
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { form_name: formName })
  }
}

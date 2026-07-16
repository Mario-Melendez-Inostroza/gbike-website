/**
 * Configuración del sitio.
 *
 * - `siteConfig`: datos estructurales NO editables por el cliente (nombre,
 *   navegación, descripción). Cambiarlos requiere un nuevo build.
 * - `defaultBusinessConfig`: datos del negocio editables por el cliente.
 *   En producción pueden ser sobrescritos por `public/business.json`
 *   (ver loadBusinessConfig.ts); estos valores actúan como fallback seguro
 *   si el JSON falta, está corrupto o algún campo no pasa validación.
 *
 */

export interface SocialLink {
  handle: string
  url: string
}

export interface HoursEntry {
  day: string
  time: string
}

export interface BusinessConfig {
  phone: {
    display: string
    href: string
  }
  whatsapp: {
    number: string
    displayNumber: string
  }
  email: string
  address: {
    line1: string
    line2: string
    mapsUrl: string
    mapsEmbedUrl: string
  }
  social: {
    instagram: SocialLink
    facebook: SocialLink
  }
  hours: HoursEntry[]
}

export const defaultBusinessConfig: BusinessConfig = {
  phone: {
    display: '+56 9 6619 4086',
    href: 'tel:+56966194086',
  },
  whatsapp: {
    number: '56966194086',
    displayNumber: '+56 9 6619 4086',
  },
  email: 'contactogbike@gmail.com',
  address: {
    line1: 'Av. Providencia 2411, Local Nº25',
    line2: 'Providencia — Santiago, Chile',
    // TODO: reemplazar por el enlace "Compartir" de la ficha de Google Business Profile de GBIKE cuando esté disponible.
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Providencia+2411,+Providencia,+Santiago,+Chile',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=Av.+Providencia+2411,+Providencia,+Santiago,+Chile&output=embed',
  },
  social: {
    instagram: { handle: '@gbike.cl', url: 'https://instagram.com/gbike.cl' },
    facebook: { handle: 'GBIKE', url: 'https://www.facebook.com/p/GBIKE-61571919581893/' },
  },
  hours: [
    { day: 'Lunes – Viernes', time: '10:00 – 19:30' },
    { day: 'Sábados', time: '10:00 – 14:00' },
    { day: 'Domingos y Festivos', time: '10:00 – 14:00' },
  ],
}

export const siteConfig = {
  name: 'GBIKE',
  legalName: 'GBIKE — Taller de Bicicletas',
  domain: 'https://gbike.cl',
  description:
    'Taller de bicicletas en Providencia, Santiago. Mantenimiento, reparación, armado y venta de repuestos y accesorios con técnicos especializados.',
  navLinks: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const

/** Construye un enlace de WhatsApp con mensaje opcional prellenado. */
export function whatsappUrl(number: string, message?: string): string {
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/**
 * Única fuente de verdad para la información del negocio.
 * TODO: confirmar teléfono, dirección y redes sociales con los datos reales del taller.
 */

export const siteConfig = {
  name: 'GBIKE',
  legalName: 'GBIKE — Taller de Bicicletas',
  description:
    'Taller profesional de bicicletas en Quito. Mantenimiento, reparación, armado y venta de repuestos con técnicos especializados y trabajo garantizado.',

  phone: {
    display: '+593 98 765 4321',
    href: 'tel:+593987654321',
  },

  whatsapp: {
    number: '593987654321',
    displayNumber: '+593 98 765 4321',
  },

  email: 'contacto@gbike.ec',

  address: {
    line1: 'Av. Colón y 10 de Agosto',
    line2: 'Local 12 — Quito, Ecuador',
    mapsUrl: 'https://maps.google.com/?q=Av.+Col%C3%B3n+y+10+de+Agosto+Quito',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7947427!2d-78.4983!3d-0.2105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sAv.+Col%C3%B3n%2C+Quito!5e0!3m2!1ses!2sec!4v1720000000000',
  },

  social: {
    instagram: { handle: '@gbike.ec', url: 'https://instagram.com/gbike.ec' },
    facebook: { handle: 'GBIKE Taller', url: 'https://facebook.com/gbike' },
  },

  hours: [
    { day: 'Lunes – Viernes', time: '8:00 – 18:00' },
    { day: 'Sábado', time: '9:00 – 16:00' },
    { day: 'Domingo', time: 'Cerrado' },
  ],

  navLinks: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const

/** Construye un enlace de WhatsApp con mensaje opcional prellenado. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

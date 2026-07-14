import { siteConfig, type HoursEntry } from '../config/site'
import { useBusinessConfig } from '../config/BusinessConfigContext'

/**
 * Datos estructurados schema.org (LocalBusiness/BikeStore) para SEO local.
 * Se genera desde la configuración runtime, así siempre refleja los datos
 * que la clienta mantiene en business.json.
 */

const DAY_MAP: Record<string, string> = {
  lunes: 'Monday',
  martes: 'Tuesday',
  miercoles: 'Wednesday',
  jueves: 'Thursday',
  viernes: 'Friday',
  sabado: 'Saturday',
  sabados: 'Saturday',
  domingo: 'Sunday',
  domingos: 'Sunday',
}

const WEEK_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

/** "Lunes – Viernes" → [Monday..Friday]; "Sábados, Domingos y Festivos" → [Saturday, Sunday]. */
function parseDays(label: string): string[] {
  const tokens = normalize(label)
    .split(/[^a-z]+/)
    .map((t) => DAY_MAP[t])
    .filter((d): d is string => Boolean(d))
  if (tokens.length === 0) return []
  const isRange = /[–—-]|\ba\b/.test(normalize(label)) && tokens.length === 2
  if (isRange) {
    const [from, to] = [WEEK_ORDER.indexOf(tokens[0]), WEEK_ORDER.indexOf(tokens[1])]
    if (from >= 0 && to >= from) return WEEK_ORDER.slice(from, to + 1)
  }
  return [...new Set(tokens)]
}

/** "10:00 – 19:30" → { opens: "10:00", closes: "19:30" } */
function parseTimes(label: string): { opens: string; closes: string } | null {
  const match = label.match(/(\d{1,2}:\d{2})\s*[–—-]\s*(\d{1,2}:\d{2})/)
  return match ? { opens: match[1], closes: match[2] } : null
}

function openingHours(hours: HoursEntry[]) {
  return hours.flatMap((entry) => {
    const days = parseDays(entry.day)
    const times = parseTimes(entry.time)
    if (days.length === 0 || !times) return []
    return [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens: times.opens,
        closes: times.closes,
      },
    ]
  })
}

export default function SeoJsonLd() {
  const { business } = useBusinessConfig()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BikeStore',
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.domain,
    image: `${siteConfig.domain}/images/logo/L1.jpeg`,
    telephone: business.phone.display,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.line1,
      addressLocality: 'Providencia',
      addressRegion: 'Santiago',
      addressCountry: 'CL',
    },
    hasMap: business.address.mapsUrl,
    openingHoursSpecification: openingHours(business.hours),
    sameAs: [business.social.instagram.url, business.social.facebook.url],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

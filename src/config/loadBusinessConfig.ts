import { defaultBusinessConfig, type BusinessConfig, type HoursEntry } from './site'

/**
 * Carga defensiva de `public/business.json`.
 *
 * Cada campo se valida de forma individual: un campo inválido cae a su valor
 * por defecto compilado sin afectar al resto. Si el archivo no existe, no es
 * JSON válido o la red falla, se usan íntegramente los defaults.
 * La página nunca queda sin datos de contacto.
 */

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0

/** Solo dígitos, con código de país (p. ej. 593987654321). */
const isWhatsAppNumber = (v: unknown): v is string =>
  isNonEmptyString(v) && /^\d{8,15}$/.test(v)

const isEmail = (v: unknown): v is string =>
  isNonEmptyString(v) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const isHttpsUrl = (v: unknown): v is string =>
  isNonEmptyString(v) && v.startsWith('https://')

const isTelHref = (v: unknown): v is string =>
  isNonEmptyString(v) && /^tel:\+?[\d\s-]+$/.test(v)

function pick<T>(value: unknown, isValid: (v: unknown) => v is T, fallback: T): T {
  return isValid(value) ? value : fallback
}

function pickHours(value: unknown, fallback: HoursEntry[]): HoursEntry[] {
  if (!Array.isArray(value) || value.length === 0) return fallback
  const entries = value.filter(
    (e): e is HoursEntry =>
      typeof e === 'object' && e !== null &&
      isNonEmptyString((e as HoursEntry).day) &&
      isNonEmptyString((e as HoursEntry).time),
  )
  return entries.length > 0 ? entries : fallback
}

function mergeBusinessConfig(raw: unknown): BusinessConfig {
  const d = defaultBusinessConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, any>

  return {
    phone: {
      display: pick(r.phone?.display, isNonEmptyString, d.phone.display),
      href: pick(r.phone?.href, isTelHref, d.phone.href),
    },
    whatsapp: {
      number: pick(r.whatsapp?.number, isWhatsAppNumber, d.whatsapp.number),
      displayNumber: pick(r.whatsapp?.displayNumber, isNonEmptyString, d.whatsapp.displayNumber),
    },
    email: pick(r.email, isEmail, d.email),
    address: {
      line1: pick(r.address?.line1, isNonEmptyString, d.address.line1),
      line2: pick(r.address?.line2, isNonEmptyString, d.address.line2),
      mapsUrl: pick(r.address?.mapsUrl, isHttpsUrl, d.address.mapsUrl),
      mapsEmbedUrl: pick(r.address?.mapsEmbedUrl, isHttpsUrl, d.address.mapsEmbedUrl),
    },
    social: {
      instagram: {
        handle: pick(r.social?.instagram?.handle, isNonEmptyString, d.social.instagram.handle),
        url: pick(r.social?.instagram?.url, isHttpsUrl, d.social.instagram.url),
      },
      facebook: {
        handle: pick(r.social?.facebook?.handle, isNonEmptyString, d.social.facebook.handle),
        url: pick(r.social?.facebook?.url, isHttpsUrl, d.social.facebook.url),
      },
    },
    hours: pickHours(r.hours, d.hours),
  }
}

export async function loadBusinessConfig(): Promise<BusinessConfig> {
  try {
    // Cache-buster: evita que el hosting sirva una versión cacheada tras una edición.
    const res = await fetch(`/business.json?v=${Date.now()}`)
    if (!res.ok) return defaultBusinessConfig
    const raw: unknown = await res.json()
    return mergeBusinessConfig(raw)
  } catch {
    return defaultBusinessConfig
  }
}

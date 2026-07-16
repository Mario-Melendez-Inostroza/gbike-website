import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Autenticación mínima para un único administrador.
 * - La contraseña vive en la variable de entorno ADMIN_PASSWORD.
 * - La sesión es una cookie httpOnly firmada (HMAC + AUTH_SECRET) que además
 *   queda ligada a una huella de la contraseña: cambiar ADMIN_PASSWORD
 *   invalida automáticamente todas las sesiones existentes.
 *
 * Sin base de datos ni librerías: imposible de falsificar sin el secreto.
 * Los archivos que empiezan con "_" dentro de /api no se exponen como rutas.
 */

export const SESSION_COOKIE = 'panel_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 días

function sign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('hex')
}

/** Huella corta de la contraseña vigente, incluida en la firma de la sesión. */
function passwordFingerprint(password: string): string {
  return createHash('sha256').update(password).digest('hex').slice(0, 16)
}

export function createSessionToken(secret: string, password: string): string {
  const expiresAt = Date.now() + SESSION_TTL_MS
  const payload = `${expiresAt}.${passwordFingerprint(password)}`
  return `${expiresAt}.${sign(payload, secret)}`
}

export function isValidSession(token: string | undefined, secret: string, password: string): boolean {
  if (!token) return false
  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature) return false
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) < Date.now()) return false
  const expected = sign(`${expiresAt}.${passwordFingerprint(password)}`, secret)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** Comparación en tiempo constante (vía hash, para igualar longitudes). */
export function passwordMatches(input: string, expected: string): boolean {
  const a = createHash('sha256').update(input).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

export function sessionCookie(token: string): string {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000)
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`
}

export function parseCookies(header: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {}
  if (!header) return cookies
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq > 0) cookies[part.slice(0, eq).trim()] = part.slice(eq + 1).trim()
  }
  return cookies
}

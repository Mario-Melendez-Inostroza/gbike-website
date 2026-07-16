import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  SESSION_COOKIE,
  createSessionToken,
  isValidSession,
  parseCookies,
  passwordMatches,
  sessionCookie,
} from './_auth'
import { clearFailures, clientIp, lockedForMs, registerFailure } from './_rateLimit'

/**
 * GET  /api/login — indica si la cookie de sesión actual es válida.
 * POST /api/login — { password } → emite la cookie de sesión si es correcta.
 *   Protegido contra fuerza bruta: 5 fallos → bloqueo temporal de la IP,
 *   más un retardo fijo en cada intento fallido.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const secret = process.env.AUTH_SECRET
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!secret || !adminPassword) {
    res.status(500).json({ error: 'Faltan las variables de entorno AUTH_SECRET y/o ADMIN_PASSWORD' })
    return
  }

  if (req.method === 'GET') {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE]
    res.status(200).json({ authenticated: isValidSession(token, secret, adminPassword) })
    return
  }

  if (req.method === 'POST') {
    const ip = clientIp(req.headers)

    const lockedMs = lockedForMs(ip)
    if (lockedMs > 0) {
      const minutes = Math.ceil(lockedMs / 60000)
      res.status(429).json({
        error: `Demasiados intentos fallidos. Intenta de nuevo en ${minutes} minuto${minutes === 1 ? '' : 's'}.`,
      })
      return
    }

    const password = (req.body as { password?: unknown } | undefined)?.password
    if (typeof password !== 'string' || !passwordMatches(password, adminPassword)) {
      await registerFailure(ip)
      res.status(401).json({ error: 'Contraseña incorrecta' })
      return
    }

    clearFailures(ip)
    res.setHeader('Set-Cookie', sessionCookie(createSessionToken(secret, adminPassword)))
    res.status(200).json({ authenticated: true })
    return
  }

  res.setHeader('Allow', 'GET, POST')
  res.status(405).json({ error: 'Método no permitido' })
}

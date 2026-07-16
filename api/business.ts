import type { VercelRequest, VercelResponse } from '@vercel/node'
import { list, put } from '@vercel/blob'
import { defaultBusinessConfig } from '../src/config/site.js'
import { mergeBusinessConfig } from '../src/config/loadBusinessConfig.js'
import { SESSION_COOKIE, isValidSession, parseCookies } from './_auth.js'

const BLOB_NAME = 'business.json'

/**
 * GET /api/business — datos del negocio: Blob si existe, defaults si no.
 *   Siempre pasa por mergeBusinessConfig, así que la respuesta está validada
 *   campo a campo y nunca puede dejar la página sin datos.
 * PUT /api/business — guarda los datos (requiere sesión de administrador).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-store')
    try {
      const { blobs } = await list({ prefix: BLOB_NAME, limit: 1 })
      if (blobs.length > 0) {
        const stored = await fetch(blobs[0].url, { cache: 'no-store' })
        if (stored.ok) {
          res.status(200).json(mergeBusinessConfig(await stored.json()))
          return
        }
      }
    } catch {
      // Sin Blob configurado o inaccesible: se responde con los defaults.
    }
    res.status(200).json(defaultBusinessConfig)
    return
  }

  if (req.method === 'PUT') {
    const secret = process.env.AUTH_SECRET
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!secret || !adminPassword) {
      res.status(500).json({ error: 'Faltan las variables de entorno AUTH_SECRET y/o ADMIN_PASSWORD' })
      return
    }
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE]
    if (!isValidSession(token, secret, adminPassword)) {
      res.status(401).json({ error: 'Sesión inválida o expirada' })
      return
    }

    // La validación campo a campo actúa como sanitización: cualquier campo
    // inválido o inesperado se descarta y cae a su default.
    const merged = mergeBusinessConfig(req.body)

    try {
      await put(BLOB_NAME, JSON.stringify(merged, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      })
    } catch {
      res.status(500).json({
        error: 'No se pudo guardar. Verifica que el proyecto tenga un Blob store conectado en Vercel.',
      })
      return
    }

    res.status(200).json(merged)
    return
  }

  res.setHeader('Allow', 'GET, PUT')
  res.status(405).json({ error: 'Método no permitido' })
}

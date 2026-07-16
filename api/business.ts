import type { VercelRequest, VercelResponse } from '@vercel/node'
import { get, put } from '@vercel/blob'
import { defaultBusinessConfig } from '../src/config/site.js'
import { mergeBusinessConfig } from '../src/config/loadBusinessConfig.js'
import { SESSION_COOKIE, isValidSession, parseCookies } from './_auth.js'

const BLOB_NAME = 'business.json'

/**
 * Nivel de acceso con el que se guarda y se lee el blob. Debe ser el MISMO
 * valor en ambos lados: `get()` con 'private' no puede leer un blob que se
 * escribió con 'public' y viceversa (son namespaces distintos en la API).
 *
 * Usamos `get(pathname, { access })`, autenticado con BLOB_READ_WRITE_TOKEN,
 * en vez de `list()` + fetch(url) público: así la lectura funciona igual si
 * el store es Public o Private. Con 'public' además el blob queda accesible
 * directamente por URL/CDN, lo cual no hace falta aquí pero no estorba.
 */
const BLOB_ACCESS = 'private' as const

function logBlobError(action: string, error: unknown) {
  const details =
    error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : { value: error }
  // Vercel captura console.error en los logs de la función — visible en
  // Deployments → [deployment] → Functions → api/business.
  console.error(`[api/business] fallo en ${action}:`, details)
}

/** Mensaje seguro para el cliente: solo llega hasta aquí un admin autenticado. */
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Error desconocido'
}

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
      const result = await get(BLOB_NAME, { access: BLOB_ACCESS })
      if (result) {
        const raw: unknown = await new Response(result.stream).json()
        res.status(200).json(mergeBusinessConfig(raw))
        return
      }
      // result === null: el blob todavía no existe (primer arranque, nunca se guardó nada).
    } catch (error) {
      logBlobError('GET (lectura del blob)', error)
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
        access: BLOB_ACCESS,
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      })
    } catch (error) {
      logBlobError('PUT (escritura del blob)', error)
      res.status(500).json({
        error: `No se pudo guardar: ${errorMessage(error)}`,
      })
      return
    }

    res.status(200).json(merged)
    return
  }

  res.setHeader('Allow', 'GET, PUT')
  res.status(405).json({ error: 'Método no permitido' })
}

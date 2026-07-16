/**
 * Protección simple contra fuerza bruta, reutilizable en cualquier proyecto.
 *
 * Estrategia para Vercel (funciones sin estado compartido):
 * - Contador en memoria por IP: 5 intentos fallidos → bloqueo de 15 minutos
 *   con desbloqueo automático. Persiste mientras la instancia esté caliente.
 * - Como el contador puede reiniciarse (cold start / múltiples instancias),
 *   se complementa con un retardo fijo en CADA intento fallido, que limita la
 *   velocidad de un ataque incluso sin memoria compartida.
 *
 * Para un panel corporativo con una contraseña fuerte este par de medidas es
 * suficiente; una solución con almacenamiento compartido (KV/Redis) sería
 * sobreingeniería aquí.
 */

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000 // 15 minutos
const FAILED_ATTEMPT_DELAY_MS = 750

interface AttemptRecord {
  failures: number
  lockedUntil: number
}

const attempts = new Map<string, AttemptRecord>()

function prune(now: number) {
  // Evita crecimiento indefinido del Map en instancias longevas.
  if (attempts.size < 500) return
  for (const [key, record] of attempts) {
    if (record.lockedUntil < now && record.failures === 0) attempts.delete(key)
  }
}

/** Milisegundos restantes de bloqueo para esta IP (0 = no bloqueada). */
export function lockedForMs(ip: string): number {
  const record = attempts.get(ip)
  if (!record) return 0
  const remaining = record.lockedUntil - Date.now()
  return remaining > 0 ? remaining : 0
}

/** Registra un fallo y aplica el retardo fijo anti fuerza bruta. */
export async function registerFailure(ip: string): Promise<void> {
  const now = Date.now()
  prune(now)
  const record = attempts.get(ip) ?? { failures: 0, lockedUntil: 0 }
  record.failures += 1
  if (record.failures >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS
    record.failures = 0
  }
  attempts.set(ip, record)
  await new Promise((resolve) => setTimeout(resolve, FAILED_ATTEMPT_DELAY_MS))
}

export function clearFailures(ip: string): void {
  attempts.delete(ip)
}

/** IP del cliente detrás del proxy de Vercel. */
export function clientIp(headers: Record<string, string | string[] | undefined>): string {
  const forwarded = headers['x-forwarded-for']
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return first?.split(',')[0]?.trim() || 'unknown'
}

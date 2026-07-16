import { useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import { editableFields, panelMeta } from '../config/editableFields.js'
import type { BusinessConfig } from '../config/site.js'

/**
 * Panel de administración genérico: el formulario se genera desde
 * src/config/editableFields.ts. Para reutilizarlo en otro proyecto
 * solo se cambia ese esquema — este componente no se toca.
 */

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#F4F4F5',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '48px 16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#18181B',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#fff',
    borderRadius: '14px',
    border: '1px solid #E4E4E7',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    padding: '32px',
  },
  title: { fontSize: '20px', fontWeight: 700, margin: 0 },
  subtitle: { fontSize: '13px', color: '#71717A', margin: '6px 0 24px' },
  label: { display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' },
  help: { fontSize: '12px', color: '#71717A', margin: '4px 0 0' },
  error: { fontSize: '12px', color: '#DC2626', margin: '4px 0 0' },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #D4D4D8',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  field: { marginBottom: '18px' },
  button: {
    width: '100%',
    padding: '11px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    background: '#E30613',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  notice: {
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '16px',
  },
}

type Status = 'idle' | 'saving' | 'saved' | 'error'

export default function PanelApp() {
  const [checkingSession, setCheckingSession] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [config, setConfig] = useState<BusinessConfig | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Sesión existente + datos actuales
  useEffect(() => {
    fetch('/api/login')
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then((data: { authenticated?: boolean }) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setAuthenticated(false))
      .finally(() => setCheckingSession(false))
  }, [])

  useEffect(() => {
    if (!authenticated) return
    fetch(`/api/business?v=${Date.now()}`)
      .then((res) => res.json())
      .then((data: BusinessConfig) => {
        setConfig(data)
        const initial: Record<string, string> = {}
        for (const field of editableFields) initial[field.id] = field.read(data)
        setValues(initial)
      })
      .catch(() => {
        setStatus('error')
        setStatusMessage('No se pudieron cargar los datos actuales. Recarga la página.')
      })
  }, [authenticated])

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoginError('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).catch(() => null)
    if (res?.ok) {
      setAuthenticated(true)
      setPassword('')
    } else {
      // Muestra el mensaje del servidor (contraseña incorrecta, bloqueo temporal…)
      const body = (await res?.json().catch(() => null)) as { error?: string } | null
      setLoginError(body?.error ?? 'No se pudo iniciar sesión. Intenta de nuevo.')
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!config) return

    const errors: Record<string, string> = {}
    for (const field of editableFields) {
      const error = field.validate(values[field.id] ?? '')
      if (error) errors[field.id] = error
    }
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    const draft: BusinessConfig = structuredClone(config)
    for (const field of editableFields) field.apply(draft, values[field.id] ?? '')

    setStatus('saving')
    setStatusMessage('')
    const res = await fetch('/api/business', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    }).catch(() => null)

    if (res?.ok) {
      const saved: BusinessConfig = await res.json()
      setConfig(saved)
      setStatus('saved')
      setStatusMessage('Cambios guardados. La página ya muestra la nueva información.')
    } else if (res?.status === 401) {
      setAuthenticated(false)
      setStatus('error')
      setStatusMessage('La sesión expiró. Vuelve a ingresar la contraseña.')
    } else {
      setStatus('error')
      const body = (await res?.json().catch(() => null)) as { error?: string } | null
      setStatusMessage(body?.error ?? 'No se pudo guardar. Intenta de nuevo.')
    }
  }

  if (checkingSession) {
    return <div style={styles.page}><div style={styles.card}>Cargando…</div></div>
  }

  if (!authenticated) {
    return (
      <div style={styles.page}>
        <form style={styles.card} onSubmit={handleLogin}>
          <h1 style={styles.title}>{panelMeta.title}</h1>
          <p style={styles.subtitle}>{panelMeta.loginIntro}</p>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="panel-password">Contraseña</label>
            <input
              id="panel-password"
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p style={styles.error}>{loginError}</p>}
          </div>
          <button type="submit" style={styles.button}>Entrar</button>
        </form>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSave}>
        <h1 style={styles.title}>{panelMeta.title}</h1>
        <p style={styles.subtitle}>{panelMeta.editIntro}</p>

        {status === 'saved' && (
          <div style={{ ...styles.notice, background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }}>
            {statusMessage}
          </div>
        )}
        {status === 'error' && (
          <div style={{ ...styles.notice, background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA' }}>
            {statusMessage}
          </div>
        )}

        {!config ? (
          <p style={styles.subtitle}>Cargando datos…</p>
        ) : (
          <>
            {editableFields.map((field) => (
              <div key={field.id} style={styles.field}>
                <label style={styles.label} htmlFor={`field-${field.id}`}>{field.label}</label>
                <input
                  id={`field-${field.id}`}
                  type="text"
                  style={styles.input}
                  placeholder={field.placeholder}
                  value={values[field.id] ?? ''}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                />
                {fieldErrors[field.id]
                  ? <p style={styles.error}>{fieldErrors[field.id]}</p>
                  : field.help && <p style={styles.help}>{field.help}</p>}
              </div>
            ))}
            <button type="submit" style={styles.button} disabled={status === 'saving'}>
              {status === 'saving' ? 'Guardando…' : 'Guardar'}
            </button>
          </>
        )}
      </form>
    </div>
  )
}

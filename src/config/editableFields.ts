import type { BusinessConfig } from './site.js'

/**
 * Esquema de los campos que el cliente puede editar desde /panel.
 *
 * ESTE ES EL ARCHIVO PLANTILLA: para reutilizar el panel de administración en
 * otro proyecto, solo se cambia esta lista (qué campos, sus etiquetas y cómo
 * se aplican sobre el config). El editor, la autenticación y las funciones de
 * guardado son genéricos y no se tocan.
 *
 * Cada campo declara:
 * - `read`: cómo obtener el valor actual desde el config
 * - `apply`: cómo aplicar el valor sobre un borrador del config (puede
 *   derivar varios campos internos, p. ej. WhatsApp → dígitos para wa.me)
 * - `validate`: devuelve un mensaje de error o null si el valor es válido
 */
/** Textos del panel — también parte de la plantilla por cliente. */
export const panelMeta = {
  title: 'Administración',
  loginIntro: 'Ingresa la contraseña para editar la información del sitio.',
  editIntro: 'Edita la información y presiona Guardar. Los cambios se publican al instante.',
}

export interface EditableField {
  id: string
  label: string
  placeholder?: string
  help?: string
  read: (config: BusinessConfig) => string
  apply: (draft: BusinessConfig, value: string) => void
  validate: (value: string) => string | null
}

const digitsOnly = (value: string) => value.replace(/\D/g, '')

/** Etiquetas de los días: fijas, las controla el desarrollador (no el cliente). */
const HOURS_LABELS = ['Lunes – Viernes', 'Sábados', 'Domingos y Festivos']

function hoursField(index: number, label: string): EditableField {
  return {
    id: `hours-${index}`,
    label,
    placeholder: '10:00 – 19:30 (o "Cerrado")',
    read: (config) => config.hours[index]?.time ?? '',
    apply: (draft, value) => {
      // Garantiza las tres franjas con sus etiquetas fijas antes de escribir.
      draft.hours = HOURS_LABELS.map((day, i) => ({
        day,
        time: draft.hours[i]?.time ?? '',
      }))
      draft.hours[index].time = value.trim()
    },
    validate: (value) => (value.trim().length >= 4 ? null : 'Ingresa un horario, por ejemplo: 10:00 – 19:30'),
  }
}

export const editableFields: EditableField[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    placeholder: '+56 9 6619 4086',
    help: 'Con código de país. Actualiza también el teléfono y los botones de WhatsApp.',
    read: (config) => config.whatsapp.displayNumber,
    apply: (draft, value) => {
      const display = value.trim()
      const digits = digitsOnly(display)
      draft.whatsapp.displayNumber = display
      draft.whatsapp.number = digits
      draft.phone.display = display
      draft.phone.href = `tel:+${digits}`
    },
    validate: (value) => {
      const digits = digitsOnly(value)
      return digits.length >= 9 && digits.length <= 15
        ? null
        : 'Ingresa un número válido con código de país, por ejemplo: +56 9 6619 4086'
    },
  },
  {
    id: 'address',
    label: 'Dirección',
    placeholder: 'Av. Providencia 2411, Local Nº25',
    help: 'Calle, número y local. La comuna y ciudad no cambian desde aquí.',
    read: (config) => config.address.line1,
    apply: (draft, value) => {
      draft.address.line1 = value.trim()
    },
    validate: (value) => (value.trim().length >= 5 ? null : 'La dirección parece demasiado corta'),
  },
  hoursField(0, 'Horario — Lunes a Viernes'),
  hoursField(1, 'Horario — Sábados'),
  hoursField(2, 'Horario — Domingos y Festivos'),
]

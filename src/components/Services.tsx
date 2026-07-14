import { Wrench, Settings, Zap, Check } from 'lucide-react'

/**
 * Única fuente de verdad de los servicios de GBIKE.
 * El formulario de contacto deriva sus opciones de esta lista.
 */
export const maintenancePlans = [
  {
    icon: Wrench,
    name: 'Mantenimiento Básico',
    tagline: 'La puesta a punto esencial para tu rodada diaria.',
    includes: [
      'Ajuste y regulación de cambios',
      'Ajuste y regulación de frenos',
      'Inflado y calibración de ruedas',
      'Lavado completo de bicicleta',
      'Lubricación de cadena',
    ],
  },
  {
    icon: Settings,
    name: 'Mantenimiento Completo',
    tagline: 'Revisión profunda con renovación de piolas y fundas.',
    includes: [
      'Ajuste y regulación de cambios',
      'Ajuste y regulación de frenos',
      'Cambio de piolas y fundas',
      'Inflado y calibración de ruedas',
      'Lavado completo de bicicleta',
      'Limpieza y engrase de dirección',
      'Lubricación de cadena',
    ],
  },
  {
    icon: Zap,
    name: 'Mantenimiento Full',
    tagline: 'Desarme total y reacondicionamiento de cada componente.',
    includes: [
      'Ajuste y regulación de cambios',
      'Ajuste y regulación de frenos',
      'Cambio de piolas y fundas',
      'Centrado de ruedas',
      'Desarme completo de bicicleta',
      'Inflado y calibración de ruedas',
      'Lavado completo de bicicleta',
      'Limpieza y engrase de dirección',
      'Limpieza y engrase de masas (ruedas)',
      'Limpieza y engrase de motor',
      'Lubricación de cadena',
    ],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: '#E30613', fontFamily: 'Inter, sans-serif' }}
            >
              Nuestros Servicios
            </span>
            <h2
              className="font-display leading-none"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.95,
              }}
            >
              TODO LO QUE<br />
              TU BICICLETA<br />
              <span style={{ color: '#E30613' }}>NECESITA</span>
            </h2>
          </div>
          <p
            className="text-[#6B6B6B] max-w-xs leading-relaxed text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Tres niveles de mantenimiento según lo que tu bicicleta necesita. Cuéntanos cómo la usas y te recomendamos el indicado.
          </p>
        </div>

        {/* Maintenance plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {maintenancePlans.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.name}
                className="group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#0D0D0D',
                  border: '1.5px solid rgba(255,255,255,0.04)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'rgba(227,6,19,0.12)',
                    border: '1px solid rgba(227,6,19,0.25)',
                  }}
                >
                  <Icon size={22} style={{ color: '#E30613' }} />
                </div>

                {/* Name */}
                <h3
                  className="font-display text-white text-3xl mb-2 uppercase"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, lineHeight: 1 }}
                >
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p
                  className="text-xs leading-relaxed mb-6"
                  style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.6)' }}
                >
                  {plan.tagline}
                </p>

                {/* Divider */}
                <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

                {/* Includes */}
                <ul className="flex flex-col gap-3">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.75)' }}
                    >
                      <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#E30613' }} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, transparent, #E30613, transparent)' }}
                />

                {/* Red border glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: '1.5px solid rgba(227,6,19,0.45)', boxShadow: '0 16px 40px rgba(227,6,19,0.12)' }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import {
  Wrench, RotateCcw, Zap, CircleDot, Disc, Settings,
  Droplets, Minus, Package, CircleOff, Layers, Box,
  Plus, ShoppingBag, Compass, Cog, LifeBuoy, Link, Luggage, Timer,
} from 'lucide-react'

/**
 * Única fuente de verdad de los servicios de GBIKE.
 * El formulario de contacto deriva sus opciones de esta lista.
 * Los tres mantenimientos y el servicio express encabezan; el resto va en orden alfabético.
 */
export const services = [
  {
    icon: Wrench,
    title: 'Mantenimiento Básico',
    desc: 'Lavado, lubricación de cadena, ajuste de frenos y cambios, e inflado y calibración de ruedas.',
  },
  {
    icon: Settings,
    title: 'Mantenimiento Intermedio',
    desc: 'Revisión profunda con engrase de dirección y renovación de piolas y fundas incluida.',
  },
  {
    icon: Zap,
    title: 'Mantenimiento Full',
    desc: 'Desarme total de la bicicleta con limpieza, engrase y calibración de cada componente.',
  },
  {
    icon: Timer,
    title: 'Servicio Express para tu Bicicleta',
    desc: 'Reparaciones rápidas como cambio de cámaras, ajustes menores y soluciones inmediatas para que vuelvas a rodar cuanto antes.',
  },
  {
    icon: RotateCcw,
    title: 'Ajuste de Cambios',
    desc: 'Regulación fina de desviadores y manillas para cambios suaves y exactos.',
  },
  {
    icon: Disc,
    title: 'Ajuste de Frenos',
    desc: 'Calibración de frenos de disco o herradura para una frenada segura.',
  },
  {
    icon: Box,
    title: 'Armado de Bicicletas',
    desc: 'Ensamble completo y regulado de bicicletas nuevas desde caja.',
  },
  {
    icon: Package,
    title: 'Cambio de Funda',
    desc: 'Renovación de fundas para un accionamiento suave y protegido.',
  },
  {
    icon: Minus,
    title: 'Cambio de Piola',
    desc: 'Reemplazo de cables de freno o cambio desgastados por piolas nuevas.',
  },
  {
    icon: CircleDot,
    title: 'Centrado de Rueda',
    desc: 'Corrección de alabeos y tensión de rayos para un rodado firme y preciso.',
  },
  {
    icon: Compass,
    title: 'Engrase de Dirección',
    desc: 'Desmontaje, limpieza y engrase del juego de dirección para un manejo fluido.',
  },
  {
    icon: Cog,
    title: 'Engrase de Motor',
    desc: 'Mantenimiento del eje de centro con grasa de alta resistencia.',
  },
  {
    icon: LifeBuoy,
    title: 'Engrase de Rueda',
    desc: 'Limpieza y engrase de masas para un giro libre y silencioso.',
  },
  {
    icon: CircleOff,
    title: 'Instalación de Cámara',
    desc: 'Cambio de cámaras con revisión del neumático y la llanta.',
  },
  {
    icon: Layers,
    title: 'Instalación de Neumáticos',
    desc: 'Montaje de neumáticos nuevos con la presión adecuada para tu rodado.',
  },
  {
    icon: Luggage,
    title: 'Instalación de Parrilla',
    desc: 'Montaje firme y alineado de parrillas portaequipaje.',
  },
  {
    icon: Plus,
    title: 'Instalación Simple',
    desc: 'Montaje de accesorios: luces, alforjas, guardabarros, portabidones y más.',
  },
  {
    icon: Droplets,
    title: 'Lavado de Bicicleta y Transmisión',
    desc: 'Lavado completo con desengrase profundo de cadena, cassette y platos.',
  },
  {
    icon: Link,
    title: 'Lubricación de Cadena',
    desc: 'Aplicación de lubricante específico según tu tipo de uso y terreno.',
  },
  {
    icon: ShoppingBag,
    title: 'Venta de Repuestos y Accesorios',
    desc: 'Repuestos y accesorios de calidad de marcas conocidas, para todos los estilos.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
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
            className="font-medium max-w-md leading-relaxed text-lg md:text-xl"
            style={{ fontFamily: 'Inter, sans-serif', color: '#3A3A3A' }}
          >
            Mantenimientos, reparaciones rápidas, instalaciones y repuestos. Cuéntanos qué necesita tu bicicleta y te recomendamos el servicio indicado.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <div
                key={svc.title}
                className="group relative p-6 rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#0D0D0D',
                  border: '1.5px solid rgba(255,255,255,0.04)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'rgba(227,6,19,0.12)',
                    border: '1px solid rgba(227,6,19,0.25)',
                  }}
                >
                  <Icon size={20} style={{ color: '#E30613' }} />
                </div>

                {/* Title */}
                <h3
                  className="font-semibold mb-2 text-sm text-white"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {svc.title}
                </h3>

                {/* Desc */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.6)' }}
                >
                  {svc.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

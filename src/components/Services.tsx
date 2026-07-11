import {
  Wrench, RotateCcw, Zap, CircleDot, Disc, Settings,
  Droplets, Minus, Package, CircleOff, Layers, Box,
  Plus, ShoppingBag
} from 'lucide-react'
import { useState } from 'react'

const services = [
  {
    icon: Wrench,
    title: 'Mantenimiento Básico',
    desc: 'Limpieza, lubricación y ajuste de componentes esenciales.',
  },
  {
    icon: Settings,
    title: 'Mantenimiento General',
    desc: 'Revisión completa de frenos, cambios, ruedas y transmisión.',
  },
  {
    icon: Zap,
    title: 'Mantenimiento Full',
    desc: 'Servicio integral: desmontaje total, limpieza profunda y calibración.',
  },
  {
    icon: CircleDot,
    title: 'Centrado de Rueda',
    desc: 'Corrección de alabeos y tensión de radios para rodaje perfecto.',
  },
  {
    icon: Disc,
    title: 'Ajuste de Frenos',
    desc: 'Calibración de frenos de disco o zapata para máxima seguridad.',
  },
  {
    icon: RotateCcw,
    title: 'Ajuste de Cambios',
    desc: 'Regulación precisa de desviadores y palancas de cambio.',
  },
  {
    icon: Droplets,
    title: 'Lubricación',
    desc: 'Aplicación de lubricantes especializados en cadena y mecanismos.',
  },
  {
    icon: Minus,
    title: 'Cambio de Piolas',
    desc: 'Reemplazo de cables de freno y cambio deteriorados.',
  },
  {
    icon: Package,
    title: 'Cambio de Fundas',
    desc: 'Renovación de carcasas para un accionamiento suave y preciso.',
  },
  {
    icon: CircleOff,
    title: 'Instalación de Cámaras',
    desc: 'Montaje de cámaras de aire con materiales de primera calidad.',
  },
  {
    icon: Layers,
    title: 'Instalación de Neumáticos',
    desc: 'Montaje y balanceo de cubiertas para todo tipo de terreno.',
  },
  {
    icon: Box,
    title: 'Armado de Bicicletas',
    desc: 'Ensamble completo de bicicletas desde caja o piezas sueltas.',
  },
  {
    icon: Plus,
    title: 'Instalación de Accesorios',
    desc: 'Montaje de porta-bidones, luz, GPS, guardabarros y más.',
  },
  {
    icon: ShoppingBag,
    title: 'Venta de Repuestos',
    desc: 'Repuestos originales y de alta calidad para todas las marcas.',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

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
            Ofrecemos una gama completa de servicios de mantenimiento y reparación para mantener tu bicicleta en óptimas condiciones.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon
            const isHovered = hovered === i
            return (
              <div
                key={svc.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative p-6 rounded-2xl cursor-default transition-all duration-300"
                style={{
                  background: isHovered ? '#0D0D0D' : '#F8F8F8',
                  border: isHovered ? '1.5px solid rgba(227,6,19,0.4)' : '1.5px solid transparent',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                  boxShadow: isHovered ? '0 16px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: isHovered ? 'rgba(227,6,19,0.15)' : 'rgba(227,6,19,0.08)',
                  }}
                >
                  <Icon size={20} style={{ color: '#E30613' }} />
                </div>

                {/* Title */}
                <h3
                  className="font-semibold mb-2 text-sm transition-colors duration-300"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: isHovered ? '#ffffff' : '#0D0D0D',
                  }}
                >
                  {svc.title}
                </h3>

                {/* Desc */}
                <p
                  className="text-xs leading-relaxed transition-colors duration-300"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: isHovered ? 'rgba(255,255,255,0.55)' : '#6B6B6B',
                  }}
                >
                  {svc.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px transition-all duration-300"
                  style={{
                    background: isHovered ? 'rgba(227,6,19,0.5)' : 'transparent',
                    borderRadius: '0 0 2px 2px',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

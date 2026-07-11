import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rodrigo Mendoza',
    role: 'Ciclista MTB — Quito',
    avatar: 'RM',
    color: '#E30613',
    stars: 5,
    text: 'Llevé mi bicicleta con un problema en los cambios que nadie podía solucionar. En GBIKE lo diagnosticaron en minutos y quedó perfecta. El trabajo y la atención son de primer nivel. Definitivamente mi taller de confianza.',
    service: 'Ajuste de cambios + Mantenimiento General',
  },
  {
    name: 'Valentina Torres',
    role: 'Ciclismo urbano — Guayaquil',
    avatar: 'VT',
    color: '#0D0D0D',
    stars: 5,
    text: 'Compré los neumáticos aquí y me los instalaron al instante. Los precios son justos y el personal te explica todo con claridad. Además, el taller es súper limpio y organizado. Volveré siempre.',
    service: 'Instalación de neumáticos y cámaras',
  },
  {
    name: 'Carlos Andrade',
    role: 'Ciclista de ruta — Cuenca',
    avatar: 'CA',
    color: '#E30613',
    stars: 5,
    text: 'Mandé a armar mi bicicleta de ruta desde cero y el resultado superó mis expectativas. Cada componente quedó impecable. Se nota que saben lo que hacen y que aman este deporte. 100% recomendado.',
    service: 'Armado completo de bicicleta de ruta',
  },
]

export default function Testimonials() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: '#FAFAFA' }}
    >
      {/* Decorative */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #E30613 0%, transparent 70%)',
          transform: 'translate(-30%, -30%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: '#E30613', fontFamily: 'Inter, sans-serif' }}
          >
            Opiniones
          </span>
          <h2
            className="font-display"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
            }}
          >
            LO QUE DICEN<br />
            NUESTROS <span style={{ color: '#E30613' }}>CLIENTES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{
                background: '#fff',
                border: '1.5px solid #E8E8E8',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              }}
            >
              {/* Quote icon */}
              <Quote
                size={28}
                className="absolute top-6 right-6 opacity-10"
                style={{ color: '#E30613' }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} fill="#E30613" style={{ color: '#E30613' }} />
                ))}
              </div>

              {/* Text */}
              <p
                className="text-[#3A3A3A] text-sm leading-relaxed mb-7"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                "{t.text}"
              </p>

              {/* Service badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6"
                style={{
                  background: 'rgba(227,6,19,0.07)',
                  color: '#E30613',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {t.service}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid #F0F0F0' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: t.color, fontFamily: 'Inter, sans-serif' }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm text-[#0D0D0D]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs text-[#6B6B6B]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

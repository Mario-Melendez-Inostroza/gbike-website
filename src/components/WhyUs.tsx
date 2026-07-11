import { UserCheck, Award, ShieldCheck, Star } from 'lucide-react'

const reasons = [
  {
    icon: UserCheck,
    title: 'Atención Personalizada',
    desc: 'Cada bicicleta recibe un diagnóstico individual. Te explicamos qué necesita y por qué antes de comenzar cualquier trabajo.',
    number: '01',
  },
  {
    icon: Award,
    title: 'Técnicos Especializados',
    desc: 'Nuestro equipo cuenta con formación técnica certificada y años de experiencia en bicicletas de ruta, MTB, urbanas y eléctricas.',
    number: '02',
  },
  {
    icon: ShieldCheck,
    title: 'Repuestos de Calidad',
    desc: 'Trabajamos únicamente con marcas reconocidas. Los repuestos que instalamos son los mismos que usan los ciclistas profesionales.',
    number: '03',
  },
  {
    icon: Star,
    title: 'Trabajo Garantizado',
    desc: 'Todos nuestros servicios tienen garantía. Si algo no está bien, lo corregimos sin costo adicional. Tu satisfacción es nuestra prioridad.',
    number: '04',
  },
]

export default function WhyUs() {
  return (
    <section
      id="nosotros"
      className="py-28 relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #E30613 0%, transparent 70%)',
          transform: 'translate(40%, -40%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: '#E30613', fontFamily: 'Inter, sans-serif' }}
          >
            ¿Por qué elegirnos?
          </span>
          <h2
            className="font-display text-white"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 0.95,
            }}
          >
            LA DIFERENCIA<br />
            <span style={{ color: '#E30613' }}>GBIKE</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.title}
                className="relative p-8 rounded-2xl group transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {/* Number */}
                <div
                  className="font-display absolute top-6 right-6 text-6xl font-900 select-none"
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontWeight: 900,
                    color: 'rgba(227,6,19,0.08)',
                    lineHeight: 1,
                    fontSize: '4.5rem',
                  }}
                >
                  {r.number}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(227,6,19,0.12)', border: '1px solid rgba(227,6,19,0.2)' }}
                >
                  <Icon size={22} style={{ color: '#E30613' }} />
                </div>

                <h3
                  className="text-white font-semibold mb-3 text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {r.title}
                </h3>
                <p
                  className="text-white/45 text-sm leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {r.desc}
                </p>

                {/* Bottom border accent on hover */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(90deg, transparent, #E30613, transparent)' }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

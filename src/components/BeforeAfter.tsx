import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const cases = [
  {
    title: 'MTB de Montaña',
    category: 'Mantenimiento Full',
    before: {
      src: 'https://images.unsplash.com/photo-1675798225739-d8919b7a23f7?w=500&h=380&fit=crop&auto=format',
      label: 'Antes',
      note: 'Cadena oxidada, frenos desajustados, ruedas alabeadas',
    },
    after: {
      src: 'https://images.unsplash.com/photo-1534150034764-046bf225d3fa?w=500&h=380&fit=crop&auto=format',
      label: 'Después',
      note: 'Transmisión nueva, frenos calibrados, ruedas centradas',
    },
    improvements: ['Cambio de cadena y cassette', 'Centrado de ruedas', 'Ajuste de frenos de disco'],
  },
  {
    title: 'Bicicleta Urbana',
    category: 'Restauración Completa',
    before: {
      src: 'https://images.unsplash.com/photo-1676531356064-0a527118baf4?w=500&h=380&fit=crop&auto=format',
      label: 'Antes',
      note: 'Sin mantenimiento por más de 2 años, piolas rotas',
    },
    after: {
      src: 'https://images.unsplash.com/photo-1621122940876-2b3be129159c?w=500&h=380&fit=crop&auto=format',
      label: 'Después',
      note: 'Lista para el camino, como nueva',
    },
    improvements: ['Cambio de piolas y fundas', 'Lubricación completa', 'Neumáticos nuevos'],
  },
]

export default function BeforeAfter() {
  const [active, setActive] = useState(0)
  const current = cases[active]

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: '#E30613', fontFamily: 'Inter, sans-serif' }}
          >
            Trabajos Realizados
          </span>
          <h2
            className="font-display text-white"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 0.95,
            }}
          >
            ANTES &<br />
            <span style={{ color: '#E30613' }}>DESPUÉS</span>
          </h2>
          <p
            className="text-white/45 mt-4 text-sm max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Cada trabajo cuenta su propia historia. Mira la transformación que logramos.
          </p>
        </div>

        {/* Case tabs */}
        <div className="flex gap-3 justify-center mb-10">
          {cases.map((c, i) => (
            <button
              key={c.title}
              onClick={() => setActive(i)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: active === i ? '#E30613' : 'rgba(255,255,255,0.06)',
                color: active === i ? '#fff' : 'rgba(255,255,255,0.5)',
                border: active === i ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Before / After display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-8">
          {/* Before */}
          <div className="relative rounded-2xl overflow-hidden group" style={{ background: '#111' }}>
            <img
              src={current.before.src}
              alt={`Antes: ${current.title}`}
              className="w-full h-72 md:h-96 object-cover opacity-80 transition-all duration-500 group-hover:opacity-90"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 50%)' }}
            />
            {/* Label */}
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Inter, sans-serif',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              ANTES
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="text-white/60 text-xs"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {current.before.note}
              </p>
            </div>
          </div>

          {/* After */}
          <div className="relative rounded-2xl overflow-hidden group" style={{ background: '#111' }}>
            <img
              src={current.after.src}
              alt={`Después: ${current.title}`}
              className="w-full h-72 md:h-96 object-cover transition-all duration-500 group-hover:brightness-95"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 50%)' }}
            />
            {/* Label */}
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider"
              style={{
                background: 'rgba(227,6,19,0.85)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              DESPUÉS
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="text-white/80 text-xs font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {current.after.note}
              </p>
            </div>

            {/* Arrow divider */}
            <div
              className="absolute top-1/2 -left-7 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center z-20"
              style={{ background: '#E30613', boxShadow: '0 4px 20px rgba(227,6,19,0.5)' }}
            >
              <ArrowRight size={22} className="text-white" />
            </div>
          </div>
        </div>

        {/* Improvements list */}
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-6 flex flex-wrap gap-4"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span
              className="text-white/50 text-xs font-medium self-center mr-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Trabajos realizados:
            </span>
            {current.improvements.map((imp) => (
              <div
                key={imp}
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' }}
              >
                <CheckCircle2 size={13} style={{ color: '#E30613', flexShrink: 0 }} />
                {imp}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

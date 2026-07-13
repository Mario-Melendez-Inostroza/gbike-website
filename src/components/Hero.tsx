import { ChevronDown, Wrench, ShieldCheck } from 'lucide-react'
import { useBusinessConfig } from '../config/BusinessConfigContext'
import WhatsAppIcon from './WhatsAppIcon'

export default function Hero() {
  const { whatsappUrl } = useBusinessConfig()
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1676531443468-0e2b5a57e48f?w=1800&h=1000&fit=crop&auto=format"
          alt="Mecánico trabajando en una bicicleta en el taller GBIKE"
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        {/* Multi-layer gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.7) 50%, rgba(13,13,13,0.4) 100%)',
          }}
        />
        {/* Red accent glow bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(227,6,19,0.15) 0%, transparent 70%)',
            transform: 'translate(-30%, 30%)',
          }}
        />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute right-16 top-0 bottom-0 hidden lg:flex gap-6 opacity-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-px h-full" style={{ background: 'linear-gradient(to bottom, transparent, #E30613, transparent)' }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(227,6,19,0.15)',
              border: '1px solid rgba(227,6,19,0.4)',
              color: '#E30613',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <Wrench size={12} />
            Taller Especializado
          </div>

          {/* Heading */}
          <h1
            className="font-display text-white mb-6 leading-none"
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
            }}
          >
            TALLER{' '}
            <span style={{ color: '#E30613' }}>PROFESIONAL</span>
            <br />
            DE BICICLETAS
          </h1>

          {/* Divider bar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-0.5 w-16" style={{ background: '#E30613' }} />
            <div className="h-0.5 flex-1 max-w-24" style={{ background: 'rgba(255,255,255,0.15)' }} />
          </div>

          {/* Subtitle */}
          <p
            className="text-white/65 mb-10 leading-relaxed max-w-xl"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: 400 }}
          >
            Mantenimiento, reparación y accesorios para que tu bicicleta siempre esté lista. Técnicos especializados, repuestos de calidad y trabajo garantizado.
          </p>

          {/* Guarantee highlight */}
          <div
            className="inline-flex items-center gap-4 mb-12 pl-4 pr-6 py-3 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(227,6,19,0.15)', border: '1px solid rgba(227,6,19,0.35)' }}
            >
              <ShieldCheck size={22} style={{ color: '#E30613' }} />
            </div>
            <div>
              <div
                className="font-display text-3xl leading-none"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, color: '#E30613' }}
              >
                100%
              </div>
              <div
                className="text-xs text-white/60 mt-1"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}
              >
                Satisfacción garantizada
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: '#E30613',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 8px 32px rgba(227,6,19,0.4)',
              }}
            >
              Solicitar Cotización
            </a>
            <a
              href={whatsappUrl('Hola, quiero información')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:bg-white/15"
              style={{
                fontFamily: 'Inter, sans-serif',
                border: '1.5px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              <WhatsAppIcon size={16} />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>SCROLL</span>
        <ChevronDown size={18} className="text-white/30 animate-bounce" />
      </div>
    </section>
  )
}

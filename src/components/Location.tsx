import { MapPin, Clock, Phone, Navigation } from 'lucide-react'
import { useBusinessConfig } from '../config/BusinessConfigContext'

export default function Location() {
  const { business } = useBusinessConfig()
  const hours = business.hours
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: '#E30613', fontFamily: 'Inter, sans-serif' }}
          >
            Ubicación
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
            ENCUÉNTRANOS<br />
            <span style={{ color: '#E30613' }}>AQUÍ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Address */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: '#F8F8F8', border: '1.5px solid #E8E8E8' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(227,6,19,0.08)' }}
                >
                  <MapPin size={18} style={{ color: '#E30613' }} />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold tracking-wider uppercase mb-1"
                    style={{ color: '#6B6B6B', fontFamily: 'Inter, sans-serif' }}
                  >
                    Dirección
                  </p>
                  <p
                    className="font-semibold text-[#0D0D0D] text-sm"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {business.address.line1},<br />
                    {business.address.line2}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: '#F8F8F8', border: '1.5px solid #E8E8E8' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(227,6,19,0.08)' }}
                >
                  <Phone size={18} style={{ color: '#E30613' }} />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold tracking-wider uppercase mb-1"
                    style={{ color: '#6B6B6B', fontFamily: 'Inter, sans-serif' }}
                  >
                    Teléfono
                  </p>
                  <a
                    href={business.phone.href}
                    className="font-semibold text-[#0D0D0D] text-sm hover:text-[#E30613] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {business.phone.display}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: '#F8F8F8', border: '1.5px solid #E8E8E8' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(227,6,19,0.08)' }}
                >
                  <Clock size={18} style={{ color: '#E30613' }} />
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs font-semibold tracking-wider uppercase mb-3"
                    style={{ color: '#6B6B6B', fontFamily: 'Inter, sans-serif' }}
                  >
                    Horario de atención
                  </p>
                  {hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between items-center py-1.5"
                      style={{ borderBottom: '1px solid #EFEFEF' }}
                    >
                      <span
                        className="text-sm text-[#3A3A3A]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {h.day}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          color: h.time === 'Cerrado' ? '#6B6B6B' : '#E30613',
                        }}
                      >
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={business.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: '#E30613',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 8px 24px rgba(227,6,19,0.3)',
              }}
            >
              <Navigation size={16} />
              Cómo llegar
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden" style={{ minHeight: '420px', background: '#E8E8E8' }}>
            <iframe
              title="Ubicación GBIKE Taller de Bicicletas"
              src={business.address.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

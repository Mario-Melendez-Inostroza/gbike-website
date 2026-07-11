import { useState, type FormEvent, type ReactNode } from 'react'
import { MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react'
import { siteConfig, whatsappUrl } from '../config/site'

const WhatsAppIcon = () => <MessageCircle size={18} color="#fff" />
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const MailIcon = () => <Mail size={18} color="#fff" />

const socials: { icon: () => ReactNode; label: string; handle: string; href: string; bg: string }[] = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    handle: siteConfig.whatsapp.displayNumber,
    href: whatsappUrl(),
    bg: '#25D366',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    handle: siteConfig.social.instagram.handle,
    href: siteConfig.social.instagram.url,
    bg: '#E1306C',
  },
  {
    icon: FacebookIcon,
    label: 'Facebook',
    handle: siteConfig.social.facebook.handle,
    href: siteConfig.social.facebook.url,
    bg: '#1877F2',
  },
  {
    icon: MailIcon,
    label: 'Correo',
    handle: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    bg: '#E30613',
  },
]

type ContactFormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

/**
 * Envía la solicitud de contacto.
 * Hoy no existe backend: se abre WhatsApp con el mensaje prellenado,
 * que es el canal real de atención del taller.
 * TODO: reemplazar por una llamada a la API / servicio de email cuando exista backend.
 */
function submitContactForm(data: ContactFormData): void {
  const lines = [
    `Hola, soy ${data.name}.`,
    data.service && `Servicio: ${data.service}`,
    data.phone && `Teléfono: ${data.phone}`,
    `Correo: ${data.email}`,
    data.message && `Mensaje: ${data.message}`,
  ].filter(Boolean)

  window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer')
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    submitContactForm(form)
    setSent(true)
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
  const inputStyle = {
    background: '#F8F8F8',
    border: '1.5px solid #E8E8E8',
    fontFamily: 'Inter, sans-serif',
    color: '#0D0D0D',
  }

  return (
    <section id="contacto" className="py-28" style={{ background: '#FAFAFA' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: '#E30613', fontFamily: 'Inter, sans-serif' }}
          >
            Contacto
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
            HABLEMOS DE<br />
            TU <span style={{ color: '#E30613' }}>BICICLETA</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Social channels */}
          <div className="lg:col-span-2">
            <h3
              className="font-semibold text-sm mb-6"
              style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '11px' }}
            >
              Contáctanos por
            </h3>
            <div className="flex flex-col gap-3">
              {socials.map((s) => {
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:-translate-x-1 hover:shadow-md group"
                    style={{ background: '#fff', border: '1.5px solid #E8E8E8' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: s.bg }}
                    >
                      <s.icon />
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                        style={{ color: '#6B6B6B', fontFamily: 'Inter, sans-serif' }}
                      >
                        {s.label}
                      </div>
                      <div
                        className="text-sm font-medium text-[#0D0D0D]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {s.handle}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Send size={14} style={{ color: '#C8C8C8' }} className="group-hover:text-[#E30613] transition-colors" />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl"
                style={{ background: '#fff', border: '1.5px solid #E8E8E8' }}
              >
                <CheckCircle2 size={48} style={{ color: '#E30613', marginBottom: '1rem' }} />
                <h3
                  className="font-display text-3xl mb-3"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800 }}
                >
                  ¡SOLICITUD LISTA!
                </h3>
                <p className="text-[#6B6B6B] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Abrimos WhatsApp con tu mensaje. Solo tienes que enviarlo y te responderemos muy pronto. Si no se abrió,{' '}
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: '#E30613' }}>
                    escríbenos aquí
                  </a>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl flex flex-col gap-4"
                style={{ background: '#fff', border: '1.5px solid #E8E8E8' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Nombre
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre completo"
                      className={inputClass}
                      style={inputStyle}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      placeholder="+593 9X XXX XXXX"
                      className={inputClass}
                      style={inputStyle}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Correo electrónico
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    className={inputClass}
                    style={inputStyle}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Servicio requerido
                  </label>
                  <select
                    className={inputClass}
                    style={{ ...inputStyle, appearance: 'none' }}
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="">Selecciona un servicio...</option>
                    <option>Mantenimiento básico</option>
                    <option>Mantenimiento general</option>
                    <option>Mantenimiento Full</option>
                    <option>Centrado de rueda</option>
                    <option>Ajuste de frenos</option>
                    <option>Ajuste de cambios</option>
                    <option>Armado de bicicleta</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos sobre tu bicicleta y lo que necesitas..."
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'none' }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    background: '#E30613',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 6px 24px rgba(227,6,19,0.3)',
                  }}
                >
                  <Send size={15} />
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState, type FormEvent, type ReactNode } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { useBusinessConfig } from '../config/BusinessConfigContext'
import WhatsAppLogo from './WhatsAppIcon'
import { maintenancePlans } from './Services'

const WhatsAppIcon = () => (
  <span style={{ color: '#fff', display: 'flex' }}>
    <WhatsAppLogo size={18} />
  </span>
)
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

type SocialChannel = { icon: () => ReactNode; label: string; handle: string; href: string; bg: string }

type ContactFormData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

/**
 * Construye el mensaje de la solicitud de contacto.
 * Hoy no existe backend: el formulario abre WhatsApp con este mensaje
 * prellenado, que es el canal real de atención del taller.
 * TODO: reemplazar por una llamada a la API / servicio de email cuando exista backend.
 */
function buildWhatsAppMessage(data: ContactFormData): string {
  return [
    `Hola, soy ${data.name}.`,
    data.service && `Servicio: ${data.service}`,
    data.phone && `Teléfono: ${data.phone}`,
    `Correo: ${data.email}`,
    data.message && `Mensaje: ${data.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const { business, whatsappUrl } = useBusinessConfig()

  const socials: SocialChannel[] = [
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      handle: business.whatsapp.displayNumber,
      href: whatsappUrl(),
      bg: '#25D366',
    },
    {
      icon: InstagramIcon,
      label: 'Instagram',
      handle: business.social.instagram.handle,
      href: business.social.instagram.url,
      bg: '#E1306C',
    },
    {
      icon: FacebookIcon,
      label: 'Facebook',
      handle: business.social.facebook.handle,
      href: business.social.facebook.url,
      bg: '#1877F2',
    },
    {
      icon: MailIcon,
      label: 'Correo',
      handle: business.email,
      href: `mailto:${business.email}`,
      bg: '#E30613',
    },
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.open(whatsappUrl(buildWhatsAppMessage(form)), '_blank', 'noopener,noreferrer')
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
                    <label htmlFor="contact-name" className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Nombre
                    </label>
                    <input
                      id="contact-name"
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
                    <label htmlFor="contact-phone" className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Teléfono
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+56 9 XXXX XXXX"
                      className={inputClass}
                      style={inputStyle}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Correo electrónico
                  </label>
                  <input
                    id="contact-email"
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
                  <label htmlFor="contact-service" className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Servicio requerido
                  </label>
                  <select
                    id="contact-service"
                    className={inputClass}
                    style={{ ...inputStyle, appearance: 'none' }}
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="">Selecciona un servicio...</option>
                    {maintenancePlans.map((plan) => (
                      <option key={plan.name} value={plan.name}>{plan.name}</option>
                    ))}
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold mb-1.5 text-[#6B6B6B] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
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

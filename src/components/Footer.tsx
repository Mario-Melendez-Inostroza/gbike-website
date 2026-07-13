import { MessageCircle, Mail } from 'lucide-react'
import { siteConfig } from '../config/site'
import { useBusinessConfig } from '../config/BusinessConfigContext'

const InstagramSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="rgba(255,255,255,0.7)" stroke="none"/>
  </svg>
)
const FacebookSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export default function Footer() {
  const { business, whatsappUrl } = useBusinessConfig()
  return (
    <footer style={{ background: '#0D0D0D' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 flex items-center justify-center rounded"
                style={{ background: '#E30613' }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="6" cy="15" r="4" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="16" cy="15" r="4" stroke="white" strokeWidth="2" fill="none" />
                  <polyline points="6,15 9,8 13,10 16,5 18,5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <span
                className="text-white text-xl"
                style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, letterSpacing: '0.15em' }}
              >
                G<span style={{ color: '#E30613' }}>BIKE</span>
              </span>
            </div>
            <p
              className="text-white/40 text-sm leading-relaxed max-w-xs mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Taller profesional especializado en el mantenimiento, reparación y accesorios para todo tipo de bicicletas. Tu rodada, nuestra pasión.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                { Icon: () => <MessageCircle size={16} color="rgba(255,255,255,0.7)" />, href: whatsappUrl(), label: 'WhatsApp' },
                { Icon: InstagramSvg, href: business.social.instagram.url, label: 'Instagram' },
                { Icon: FacebookSvg, href: business.social.facebook.url, label: 'Facebook' },
                { Icon: () => <Mail size={16} color="rgba(255,255,255,0.7)" />, href: `mailto:${business.email}`, label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[#E30613] hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Contacto
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-white/55" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li>{business.address.line1}<br />{business.address.line2}</li>
              <li>
                <a href={business.phone.href} className="hover:text-white transition-colors">
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:text-white transition-colors">
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-white/25 text-xs"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            © 2025 GBIKE — Taller de Bicicletas. Todos los derechos reservados.
          </p>
          <a
            href="#"
            className="text-white/25 hover:text-white/50 text-xs transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  )
}

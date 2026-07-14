import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../config/site'
import { useBusinessConfig } from '../config/BusinessConfigContext'
import WhatsAppIcon from './WhatsAppIcon'

const navLinks = siteConfig.navLinks

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { whatsappUrl } = useBusinessConfig()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18" style={{ height: '72px' }}>
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 group transition-opacity duration-300 hover:opacity-90"
          aria-label="GBIKE — ir al inicio"
        >
          <img
            src="/images/logo/L1.webp"
            alt=""
            width={64}
            height={64}
            className="rounded-lg object-cover transition-all duration-300 group-hover:brightness-110"
            style={{ width: '64px', height: '64px' }}
          />
          <span
            className="font-display tracking-widest text-white text-2xl transition-colors duration-300"
            style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, letterSpacing: '0.15em' }}
          >
            <span style={{ color: '#E30613' }}>G</span>BIKE
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#E30613] group-hover:w-full transition-all duration-300"
              />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={whatsappUrl('Hola, quiero una cotización')}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
          style={{
            background: '#E30613',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 20px rgba(227,6,19,0.35)',
          }}
        >
          <WhatsAppIcon size={15} />
          Cotizar por WhatsApp
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-6 pb-6 pt-2"
          style={{ background: 'rgba(13,13,13,0.97)', backdropFilter: 'blur(16px)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-white/80 hover:text-white border-b border-white/10 text-sm font-medium"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl('Hola, quiero una cotización')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-full"
            style={{ background: '#E30613' }}
          >
            <WhatsAppIcon size={15} />
            Cotizar por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

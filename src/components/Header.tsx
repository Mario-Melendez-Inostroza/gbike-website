import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { siteConfig, whatsappUrl } from '../config/site'

const navLinks = siteConfig.navLinks

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
        <a href="#inicio" className="flex items-center gap-2 group">
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
            className="font-display font-900 tracking-widest text-white text-xl"
            style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, letterSpacing: '0.15em' }}
          >
            G<span style={{ color: '#E30613' }}>BIKE</span>
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
          <MessageCircle size={15} />
          Cotizar por WhatsApp
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
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
            <MessageCircle size={15} />
            Cotizar por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

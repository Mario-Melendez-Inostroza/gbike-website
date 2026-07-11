import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { siteConfig, whatsappUrl } from '../config/site'

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      {open && (
        <div
          className="rounded-2xl p-5 shadow-2xl w-72"
          style={{
            background: '#fff',
            border: '1.5px solid #E8E8E8',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={20} color="#fff" />
            </div>
            <div>
              <div
                className="font-semibold text-sm text-[#0D0D0D]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {siteConfig.name} Taller
              </div>
              <div
                className="text-xs flex items-center gap-1"
                style={{ color: '#25D366', fontFamily: 'Inter, sans-serif' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                En línea ahora
              </div>
            </div>
          </div>
          <p
            className="text-[#3A3A3A] text-sm mb-4 leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Hola 👋 ¿En qué podemos ayudarte con tu bicicleta? Escríbenos ahora.
          </p>
          <a
            href={whatsappUrl('Hola, quiero una cotización para mi bicicleta')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#25D366', fontFamily: 'Inter, sans-serif' }}
          >
            <MessageCircle size={15} />
            Iniciar chat
          </a>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110"
        style={{
          background: '#25D366',
          boxShadow: '0 8px 32px rgba(37,211,102,0.45)',
        }}
        aria-label="Contactar por WhatsApp"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}

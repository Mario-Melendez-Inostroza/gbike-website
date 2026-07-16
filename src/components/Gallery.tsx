import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** Evento que el Header dispara para forzar la apertura al navegar desde el menú. */
export const GALLERY_OPEN_EVENT = 'gbike:open-gallery'

/** Duración de la animación de colapso (grid-template-rows) que anima el contenedor de fotos. */
const COLLAPSE_DURATION_MS = 500


const works = [
  { src: '/images/gallery/works/1w.webp', alt: 'Trabajo de mantenimiento realizado en el taller GBIKE' },
  { src: '/images/gallery/works/2w.webp', alt: 'Bicicleta en servicio técnico en el taller GBIKE' },
  { src: '/images/gallery/works/3wjpeg.webp', alt: 'Reparación de bicicleta en el taller GBIKE' },
  { src: '/images/gallery/works/4w.webp', alt: 'Puesta a punto de bicicleta en GBIKE' },
  { src: '/images/gallery/works/5w.webp', alt: 'Bicicleta reparada y lista para entrega en GBIKE' },
  { src: '/images/gallery/works/6w.webp', alt: 'Servicio de transmisión realizado en GBIKE' },
  { src: '/images/gallery/works/w7.webp', alt: 'Detalle de trabajo mecánico en el taller GBIKE' },
]

const products = [
  { src: '/images/gallery/products/1p.webp', alt: 'Accesorios para bicicleta disponibles en GBIKE' },
  { src: '/images/gallery/products/2p.webp', alt: 'Repuestos para bicicleta en la tienda GBIKE' },
  { src: '/images/gallery/products/3p.webp', alt: 'Productos y accesorios en exhibición en GBIKE' },
  { src: '/images/gallery/products/4p.webp', alt: 'Venta de accesorios para ciclismo en GBIKE' },
]

function PhotoCard({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl group ${className}`}
      style={{ background: '#111' }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
      />
      {/* Overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.55) 0%, transparent 55%)' }}
      />
      {/* Red accent corner */}
      <div
        className="absolute top-0 right-0 w-0 h-0 group-hover:w-8 group-hover:h-8 transition-all duration-300 rounded-bl-2xl"
        style={{ background: '#E30613' }}
      />
    </div>
  )
}

/** Botón único de apertura/cierre, reutilizado arriba y al final de la galería. */
function GalleryToggleButton({
  open,
  onToggle,
  className = '',
  tabIndex,
}: {
  open: boolean
  onToggle: () => void
  className?: string
  tabIndex?: number
}) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="galeria-fotos"
      tabIndex={tabIndex}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${className}`}
      style={{
        fontFamily: 'Inter, sans-serif',
        border: '1.5px solid #E30613',
        color: open ? '#fff' : '#E30613',
        background: open ? '#E30613' : 'transparent',
      }}
    >
      📷 {open ? 'Ocultar Galería' : 'Ver Galería'}
    </button>
  )
}

function GroupLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h3
        className="font-display text-2xl uppercase"
        style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, letterSpacing: '0.02em' }}
      >
        {children}
      </h3>
      <div className="h-px flex-1" style={{ background: '#E8E8E8' }} />
      <div className="w-8 h-0.5 rounded-full" style={{ background: '#E30613' }} />
    </div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(false)
  // Controla el montaje del botón inferior por separado de `open`: al abrir se
  // monta de inmediato (misma base de altura desde el primer frame); al cerrar
  // permanece montado durante toda la animación para no alterar esa base a
  // mitad de camino, y solo se retira cuando el colapso realmente termina.
  const [showBottomButton, setShowBottomButton] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const collapsibleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpenRequest = () => setOpen(true)
    window.addEventListener(GALLERY_OPEN_EVENT, handleOpenRequest)
    return () => window.removeEventListener(GALLERY_OPEN_EVENT, handleOpenRequest)
  }, [])

  // Se ejecuta antes de pintar para que, si `open` pasa a true, el botón
  // aparezca en el mismo frame en que arranca la expansión (sin parpadeo).
  useLayoutEffect(() => {
    if (open) setShowBottomButton(true)
  }, [open])

  // Al cerrar, esperar a que la transición de colapso termine de verdad antes
  // de desmontar el botón. transitionend es la señal real de que la animación
  // acabó; el timeout es solo una red de seguridad si el evento no llegara a
  // dispararse (por ejemplo, con la pestaña en segundo plano).
  useEffect(() => {
    if (open) return
    const node = collapsibleRef.current
    if (!node) return

    const unmountButton = () => setShowBottomButton(false)

    function handleTransitionEnd(e: TransitionEvent) {
      if (e.target === node && e.propertyName === 'grid-template-rows') {
        unmountButton()
      }
    }

    node.addEventListener('transitionend', handleTransitionEnd)
    const fallback = window.setTimeout(unmountButton, COLLAPSE_DURATION_MS + 100)

    return () => {
      node.removeEventListener('transitionend', handleTransitionEnd)
      window.clearTimeout(fallback)
    }
  }, [open])

  /**
   * El botón inferior cierra la galería manteniendo la vista clavada.
   *
   * En vez de dejar que el CSS anime el colapso y "perseguirlo" ajustando el
   * scroll (siempre queda un desfase de sub-frame perceptible), esta función
   * toma el control total: en cada frame calcula la altura del contenedor y
   * la posición de scroll como un par exacto (scroll = scrollInicial − lo ya
   * colapsado) y escribe ambos juntos antes del paint. Al ser la misma
   * fuente la que decide ambos valores, el borde inferior de la galería —la
   * frontera con "Encuéntranos Aquí"— no puede moverse ni un píxel: las
   * fotos se desvanecen y comprimen en el sitio, y el usuario queda listo
   * para seguir bajando hacia Ubicación.
   */
  function closeKeepingViewInPlace() {
    const container = collapsibleRef.current
    if (!container) {
      setOpen(false)
      return
    }

    const startHeight = container.getBoundingClientRect().height
    const startScroll = window.scrollY
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduceMotion ? 0 : COLLAPSE_DURATION_MS

    // Tomamos el control: sin transición CSS, altura explícita conducida por JS.
    container.style.transition = 'none'
    container.style.height = `${startHeight}px`

    const startTime = performance.now()
    const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3)

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min((now - startTime) / duration, 1)
      const eased = easeOutCubic(progress)
      const height = startHeight * (1 - eased)

      // Altura y scroll se escriben juntos, en el mismo frame: lockstep exacto.
      container.style.height = `${height}px`
      container.style.opacity = `${1 - eased}`
      window.scrollTo({ top: startScroll - (startHeight - height), behavior: 'instant' })

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setOpen(false)
        setShowBottomButton(false)
        // Devolver el control al CSS una vez que React aplicó el estado cerrado
        // (grid-template-rows: 0fr), para que el botón superior siga funcionando
        // con su transición de siempre.
        requestAnimationFrame(() => {
          container.style.transition = ''
          container.style.height = ''
          container.style.opacity = ''
        })
      }
    }
    requestAnimationFrame(tick)
  }

  return (
    <section id="galeria" ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: '#E30613', fontFamily: 'Inter, sans-serif' }}
            >
              Galería
            </span>
            <h2
              className="font-display leading-none"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 0.95,
              }}
            >
              NUESTRO<br />
              <span style={{ color: '#E30613' }}>TRABAJO</span>
            </h2>
          </div>
          <p
            className="text-[#6B6B6B] max-w-xs text-sm leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Cada bicicleta que pasa por nuestro taller recibe el mismo nivel de cuidado y dedicación.
          </p>
        </div>

        {/* Toggle */}
        <GalleryToggleButton open={open} onToggle={() => setOpen((v) => !v)} className="mb-14" />

        {/* Collapsible photos */}
        <div
          ref={collapsibleRef}
          style={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            opacity: open ? 1 : 0,
            overflowAnchor: 'none',
            transition: `grid-template-rows ${COLLAPSE_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease`,
          }}
        >
          <div id="galeria-fotos" style={{ overflow: 'hidden', minHeight: 0 }}>
            {/* Works */}
            <div className="mb-14">
              <GroupLabel>Trabajos realizados</GroupLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" style={{ gridAutoRows: '200px' }}>
                {works.map((photo, i) => (
                  <PhotoCard
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    // Las dos fotos horizontales anclan la composición ocupando doble celda
                    className={i === 1 || i === 6 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-2'}
                  />
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <GroupLabel>Productos y accesorios</GroupLabel>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((photo) => (
                  <PhotoCard
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    className="aspect-[3/4]"
                  />
                ))}
              </div>
            </div>

            {/* Bottom toggle — montado durante toda la animación; ver comentarios arriba */}
            {showBottomButton && (
              <div
                className="flex justify-center mt-14"
                aria-hidden={!open}
                style={{ pointerEvents: open ? 'auto' : 'none' }}
              >
                <GalleryToggleButton
                  open={open}
                  onToggle={closeKeepingViewInPlace}
                  tabIndex={open ? 0 : -1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

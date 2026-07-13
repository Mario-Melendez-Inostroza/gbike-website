const works = [
  { src: '/images/gallery/works/1w.jpeg', alt: 'Trabajo de mantenimiento realizado en el taller GBIKE' },
  { src: '/images/gallery/works/2w.jpeg', alt: 'Bicicleta en servicio técnico en el taller GBIKE' },
  { src: '/images/gallery/works/3wjpeg.jpeg', alt: 'Reparación de bicicleta en el taller GBIKE' },
  { src: '/images/gallery/works/4w.jpeg', alt: 'Puesta a punto de bicicleta en GBIKE' },
  { src: '/images/gallery/works/5w.jpeg', alt: 'Bicicleta reparada y lista para entrega en GBIKE' },
  { src: '/images/gallery/works/6w.jpeg', alt: 'Servicio de transmisión realizado en GBIKE' },
  { src: '/images/gallery/works/w7.jpeg', alt: 'Detalle de trabajo mecánico en el taller GBIKE' },
]

const products = [
  { src: '/images/gallery/products/1p.jpeg', alt: 'Accesorios para bicicleta disponibles en GBIKE' },
  { src: '/images/gallery/products/2p.jpeg', alt: 'Repuestos para bicicleta en la tienda GBIKE' },
  { src: '/images/gallery/products/3p.jpeg', alt: 'Productos y accesorios en exhibición en GBIKE' },
  { src: '/images/gallery/products/4p.jpeg', alt: 'Venta de accesorios para ciclismo en GBIKE' },
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
  return (
    <section id="galeria" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
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
      </div>
    </section>
  )
}

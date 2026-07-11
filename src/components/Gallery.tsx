const photos = [
  {
    src: 'https://images.unsplash.com/photo-1534150034764-046bf225d3fa?w=600&h=400&fit=crop&auto=format',
    alt: 'Mountain bike negro GBIKE',
    span: 'col-span-1 row-span-2',
    height: 'h-full min-h-[360px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1562615193-cbeef074a501?w=700&h=320&fit=crop&auto=format',
    alt: 'Cassette de bicicleta de montaña',
    span: 'col-span-2 row-span-1',
    height: 'h-52',
  },
  {
    src: 'https://images.unsplash.com/photo-1675798227643-da319f8ee8f7?w=400&h=320&fit=crop&auto=format',
    alt: 'Mecánico reparando bicicleta',
    span: 'col-span-1 row-span-1',
    height: 'h-52',
  },
  {
    src: 'https://images.unsplash.com/photo-1535369643553-a33e0d1ac81d?w=500&h=460&fit=crop&auto=format',
    alt: 'Ciclista en sendero de montaña',
    span: 'col-span-1 row-span-2',
    height: 'h-full min-h-[360px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1606087492572-424ebe0f2f61?w=500&h=300&fit=crop&auto=format',
    alt: 'Bicicleta de montaña en acción',
    span: 'col-span-1 row-span-1',
    height: 'h-44',
  },
  {
    src: 'https://images.unsplash.com/photo-1621122940876-2b3be129159c?w=500&h=300&fit=crop&auto=format',
    alt: 'Ciclista en campo abierto',
    span: 'col-span-1 row-span-1',
    height: 'h-44',
  },
]

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

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ gridAutoRows: '180px' }}>
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`${photo.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
              style={{ background: '#111' }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
              />
              {/* Overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.75) 0%, transparent 60%)' }}
              >
                <span
                  className="text-white text-xs font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {photo.alt}
                </span>
              </div>

              {/* Red accent corner */}
              <div
                className="absolute top-0 right-0 w-0 h-0 group-hover:w-8 group-hover:h-8 transition-all duration-300 rounded-bl-2xl"
                style={{ background: '#E30613' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Header from './components/Header.js'
import Hero from './components/Hero.js'
import Services from './components/Services.js'
import WhyUs from './components/WhyUs.js'
import Gallery from './components/Gallery.js'
import Location from './components/Location.js'
import Contact from './components/Contact.js'
import Footer from './components/Footer.js'
import WhatsAppFloat from './components/WhatsAppFloat.js'
import SeoJsonLd from './components/SeoJsonLd.js'

export default function App() {
  return (
    <div className="bg-white text-[#0D0D0D] overflow-x-hidden">
      <SeoJsonLd />
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Gallery />
        <Location />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

import Link from 'next/link'

const services = [
  {
    title: 'Business Cards',
    desc: 'Premium thick stock, spot UV, foil, or letterpress. Make an impression from the first handshake.',
    specs: '350gsm C1S | 4/4 CMYK | 24hr turnaround',
  },
  {
    title: 'Brochures & Flyers',
    desc: 'Tri-fold, bi-fold, saddle-stitched booklets — from sales sheets to product catalogs.',
    specs: '130–170gsm | Matte/Silk/Gloss | Folded or stapled',
  },
  {
    title: 'Large Format & Banners',
    desc: 'Vinyl banners, posters, fabric displays, and trade show graphics up to 60" wide.',
    specs: '13oz vinyl / 200gsm poster | UV-resistant | Up to 60"',
  },
  {
    title: 'Packaging',
    desc: 'Boxes, sleeves, rigid setups, and custom mailers that protect and present your product.',
    specs: '300–400gsm Kraft/C1S | Die-cut | Foil / Spot UV',
  },
  {
    title: 'Custom Stationery',
    desc: 'Letterhead, envelopes, notepads, and brand kits — unified across every touchpoint.',
    specs: '120gsm uncoated | Thermography or letterpress | Cotton fiber',
  },
  {
    title: 'Books & Booklets',
    desc: 'Perfect-bound, case-bound, wire-o — short runs and long runs with crisp registration.',
    specs: '80–170gsm text | Case/Perfect/Wire-O | Up to 300pp',
  },
]

export function ServicesSection() {
  return (
    <section id="services" data-reveal className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ What We Do</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-black leading-tight">
            Full-service printing capabilities
          </h2>
          <p className="text-ink-black/60 mt-4 text-base leading-relaxed">
            Every project is produced under one roof — from prepress to finishing — ensuring quality control at every step.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-reveal-item
              className="group rounded-xl border border-hairline/60 bg-white/50 p-6 hover:border-mid-teal/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center text-white text-sm font-bold font-mono mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-bold text-ink-black">{s.title}</h3>
              <p className="text-sm text-ink-black/60 mt-2 leading-relaxed">{s.desc}</p>
              <p className="text-xs font-mono text-mid-teal mt-3 pt-3 border-t border-hairline/40">{s.specs}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-mid-teal hover:text-deep-teal transition-colors focus-ring rounded">
            Explore all services
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

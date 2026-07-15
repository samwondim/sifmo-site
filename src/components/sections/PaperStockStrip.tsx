const stocks = [
  { name: '130gsm Matte Uncoated', cmyk: 'C0 M0 Y0 K10', texture: 'bg-[#F5F0E8]', desc: 'Flyers, letterhead' },
  { name: '170gsm Silk Coated', cmyk: 'C0 M0 Y0 K5', texture: 'bg-[#F0EDE8]', desc: 'Brochures, inserts' },
  { name: '300gsm Silk Cover', cmyk: 'C0 M0 Y0 K15', texture: 'bg-[#E8E4DC]', desc: 'Business cards, menus' },
  { name: '350gsm C1S', cmyk: 'C0 M0 Y0 K20', texture: 'bg-[#E0DBD0]', desc: 'Packaging, tags' },
  { name: '120gsm Uncoated', cmyk: 'C0 M0 Y0 K8', texture: 'bg-[#F2EFE5]', desc: 'Stationery, forms' },
  { name: '300gsm Kraft', cmyk: 'C30 M40 Y70 K10', texture: 'bg-[#C4A882]', desc: 'Rigid boxes, mailers' },
  { name: '400gsm C1S', cmyk: 'C0 M0 Y0 K25', texture: 'bg-[#D8D4C8]', desc: 'Premium packaging' },
]

export function PaperStockStrip() {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-ink-black text-paper">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ Stock Library</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Choose your substrate
          </h2>
          <p className="text-paper/50 mt-4 text-base leading-relaxed">
            Every project starts with the right paper. Here is a sampling of what we stock.
          </p>
        </div>
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div data-reveal className="flex gap-4 min-w-max">
            {stocks.map((stock) => (
              <div key={stock.name} data-reveal-item className="flex flex-col w-48">
                <div className={`h-32 rounded-xl border border-white/10 ${stock.texture} relative overflow-hidden`}>
                  <div className="absolute inset-0 halftone-bg-subtle opacity-[0.04]" aria-hidden="true" />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-white leading-tight">{stock.name}</p>
                  <p className="text-xs text-paper/50 mt-0.5">{stock.desc}</p>
                  <p className="text-[10px] font-mono text-mid-teal mt-1 tracking-wider">{stock.cmyk}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-paper/40 font-mono mt-6 tracking-wider">
          More substrates available — inquire about specialty stocks, cotton fiber, and textured finishes.
        </p>
      </div>
    </section>
  )
}

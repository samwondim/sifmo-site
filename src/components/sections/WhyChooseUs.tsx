const features = [
  {
    title: 'Fast Turnaround',
    desc: 'Standard 3–5 business days. Rush orders ready in 24 hours for most projects. We own our production schedule.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Premium Paper Stock',
    desc: 'From 120gsm uncoated to 400gsm C1S and textured fine papers — we stock over 30 substrates.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'In-House Design Support',
    desc: 'Not a designer? No problem. Our prepress team can refine, rework, or build your files from scratch.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: 'Eco-Friendly Inks & Practices',
    desc: 'Soy-based inks, FSC-certified papers, and zero-waste initiatives across our production floor.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-paper-secondary/60 border-y border-hairline/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ Why SVO</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-black leading-tight">
            Built for speed, driven by quality
          </h2>
        </div>
        <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} data-reveal-item className="p-6">
              <div className="w-12 h-12 rounded-xl bg-white border border-hairline/60 flex items-center justify-center text-mid-teal mb-5">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-ink-black">{f.title}</h3>
              <p className="text-sm text-ink-black/60 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

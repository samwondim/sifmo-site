const steps = [
  { label: 'Upload', desc: 'Send your files — PDF, AI, PSD, or INDD', spec: 'Max 500MB' },
  { label: 'Proof & Plate', desc: 'We check registration, color, and set plates', spec: 'CMYK / PMS' },
  { label: 'Print', desc: 'Sheet-fed digital or offset press run', spec: '1200 DPI' },
  { label: 'Finish & Bind', desc: 'Cut, fold, stitch, bind, foil, spot UV', spec: 'In-house' },
  { label: 'Deliver', desc: 'Packed, palleted, and shipped or picked up', spec: 'Local / National' },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ How It Works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-black leading-tight">
            From file to finished piece
          </h2>
          <p className="text-ink-black/60 mt-4 text-base leading-relaxed">
            A genuine production sequence — every job follows the same rigorous path.
          </p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-mid-teal/20 via-mid-teal to-mid-blue/20" aria-hidden="true" />
          <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0">
            {steps.map((step, i) => (
              <div key={step.label} data-reveal-item className="relative lg:px-5">
                <div className="flex items-start gap-4 lg:flex-col lg:text-center">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white text-sm font-bold font-mono shrink-0 lg:mx-auto relative z-10 shadow-sm">
                    {i + 1}
                  </div>
                  <div className="lg:mt-4">
                    <h3 className="font-bold text-ink-black">{step.label}</h3>
                    <p className="text-sm text-ink-black/60 mt-1 leading-relaxed">{step.desc}</p>
                    <p className="text-xs font-mono text-mid-teal mt-1">{step.spec}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

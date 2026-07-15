import { RegistrationMark } from '@/components/ui/RegistrationMark'

const testimonials = [
  {
    quote: 'SVO turned our packaging redesign around in three days — including die-cut prototypes. The color registration on the final run was flawless. We have found our printer.',
    name: 'Marcus Chen',
    role: 'Creative Director',
    company: 'Artisan Coffee Co.',
    rating: 5,
  },
  {
    quote: 'We needed 5,000 perfect-bound catalogs in under a week for a product launch. SVO delivered in 4 days. The paper stock recommendation alone saved us 15% on freight.',
    name: 'Sarah Okonkwo',
    role: 'Brand Manager',
    company: 'Helix Medical',
    rating: 5,
  },
  {
    quote: 'The level of prepress support is what keeps us coming back. They caught a color-space issue in our files that would have ruined the run. True professionals.',
    name: 'Tomás Rivera',
    role: 'Design Director',
    company: 'Metro Gallery',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-paper-secondary/60 border-y border-hairline/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-black leading-tight">
            What our clients say
          </h2>
        </div>
        <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} data-reveal-item className="rounded-xl border border-hairline/60 bg-white p-6 flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-mid-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-ink-black/70 leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-hairline/40">
                <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-white text-xs font-bold font-mono shrink-0">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-black">{t.name}</p>
                  <div className="flex items-center gap-1 text-xs text-ink-black/50">
                    <RegistrationMark size={8} className="text-mid-teal shrink-0" />
                    <span>{t.role}, {t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import { getTestimonials } from '@/lib/payload'
import { getMediaUrl, getMediaAlt } from '@/lib/media'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Hear from our clients about their experience working with SIFMO Printing.',
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials({ depth: 1 })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold">What Our Clients Say</h1>
        <p className="text-ink-light mt-2">
          Don&apos;t take our word for it — here&apos;s what our clients have to say about working with SIFMO.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {testimonials.map((t) => {
          const rating = t.rating ?? 5
          const photoUrl = t.photo ? getMediaUrl(t.photo) : null
          const photoAlt = t.photo ? getMediaAlt(t.photo) : ''

          return (
            <div key={t.id} className="rounded-xl border border-surface-tertiary bg-surface-secondary p-6">
              <div className="flex gap-1 text-primary text-sm mb-2">
                {[...Array(rating)].map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-ink-light">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 mt-4">
                {photoUrl ? (
                  <img src={photoUrl} alt={photoAlt} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-surface-tertiary flex items-center justify-center text-xs font-bold text-ink-light">
                    {t.clientName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{t.clientName}</p>
                  <p className="text-xs text-ink-light">
                    {t.role}{t.company ? `, ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-8 text-center p-6 bg-surface-secondary rounded-xl">
        <p className="text-sm text-ink-light">
          Average rating: <strong>4.9 / 5.0</strong> across 50+ reviews
        </p>
      </div>
    </div>
  )
}

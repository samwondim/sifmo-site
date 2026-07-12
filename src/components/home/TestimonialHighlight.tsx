import type { Testimonial } from '@/payload-types'
import { getMediaUrl, getMediaAlt } from '@/lib/media'

interface TestimonialHighlightProps {
  testimonial: Testimonial | null
}

export function TestimonialHighlight({ testimonial }: TestimonialHighlightProps) {
  if (!testimonial) return null

  const rating = testimonial.rating ?? 5
  const photoUrl = testimonial.photo ? getMediaUrl(testimonial.photo) : null
  const photoAlt = testimonial.photo ? getMediaAlt(testimonial.photo) : ''

  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <svg className="w-8 h-8 text-primary/30 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
        </svg>
        <blockquote className="text-xl lg:text-2xl italic font-medium text-ink/80 leading-relaxed" style={{ fontFamily: 'var(--font-heading)' }}>
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-4">
          <p className="font-semibold">{testimonial.clientName}</p>
          {testimonial.role && (
            <p className="text-sm text-ink-light">
              {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
            </p>
          )}
        </div>
        {photoUrl && (
          <img src={photoUrl} alt={photoAlt} className="w-12 h-12 rounded-full object-cover mx-auto mt-3" />
        )}
        <div className="flex justify-center gap-1 mt-4 text-primary">
          {[...Array(rating)].map((_, i) => (
            <span key={i}>&#9733;</span>
          ))}
        </div>
      </div>
    </section>
  )
}

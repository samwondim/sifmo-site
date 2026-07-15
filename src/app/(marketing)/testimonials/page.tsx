import type { Metadata } from 'next'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { getTestimonials } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Hear from our clients about their experience with SVO Printing.',
}

export default async function TestimonialsPage() {
  try {
    await getTestimonials({ limit: 10 })
  } catch {
    // CMS fallback — section uses hardcoded data
  }

  return (
    <div className="pt-8 lg:pt-12">
      <TestimonialsSection />
    </div>
  )
}

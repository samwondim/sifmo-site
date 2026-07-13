import { getProjects, getServices, getSettings, getTestimonials } from '@/lib/payload'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { TestimonialHighlight } from '@/components/home/TestimonialHighlight'

export default async function HomePage() {
  let settings: { tagline?: string; heroDescription?: string } | undefined
  try {
    settings = await getSettings()
  } catch {
    // fall back to defaults
  }

  const [projects, services, testimonials] = await Promise.all([
    getProjects({ limit: 3, depth: 1 }),
    getServices({ limit: 4 }),
    getTestimonials({ featured: true, limit: 1 }),
  ])

  return (
    <>
      <HeroSection settings={settings ? { tagline: settings.tagline, heroDescription: settings.heroDescription } : undefined} />
      <FeaturedWork projects={projects} />
      <ServicesPreview services={services} />
      <TestimonialHighlight testimonial={testimonials[0] ?? null} />
    </>
  )
}

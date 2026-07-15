import { getProjects, getServices, getSettings, getTestimonials } from '@/lib/payload'
import { ScrollRevealInit } from '@/components/sections/ScrollRevealInit'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { PaperStockStrip } from '@/components/sections/PaperStockStrip'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { QuoteFormSection } from '@/components/sections/QuoteFormSection'

export default async function HomePage() {
  let settings: { tagline?: string; heroDescription?: string } | undefined
  try {
    const s = await getSettings()
    settings = { tagline: s.tagline, heroDescription: s.heroDescription }
  } catch {
    // fall back to defaults
  }

  try {
    await Promise.all([
      getProjects({ limit: 3, depth: 1 }),
      getServices({ limit: 6 }),
      getTestimonials({ featured: true, limit: 3 }),
    ])
  } catch {
    // CMS not available — sections use hardcoded fallback data
  }

  return (
    <ScrollRevealInit>
      <HeroSection settings={settings} />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <PaperStockStrip />
      <PortfolioSection />
      <TestimonialsSection />
      <QuoteFormSection />
    </ScrollRevealInit>
  )
}

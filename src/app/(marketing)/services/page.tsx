import type { Metadata } from 'next'
import { getServices } from '@/lib/payload'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { PaperStockStrip } from '@/components/sections/PaperStockStrip'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-service printing capabilities — business cards, brochures, large format, packaging, stationery, books, and more.',
}

export default async function ServicesPage() {
  try {
    await getServices()
  } catch {
    // CMS fallback — sections use hardcoded data
  }

  return (
    <>
      <div className="pt-8 lg:pt-12">
        <ServicesSection />
      </div>
      <ProcessSection />
      <PaperStockStrip />
    </>
  )
}

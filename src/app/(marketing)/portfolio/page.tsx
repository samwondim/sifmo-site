import type { Metadata } from 'next'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { getProjects } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse our portfolio of printing projects — packaging, brochures, banners, stationery, and more.',
}

export default async function PortfolioPage() {
  try {
    await getProjects({ depth: 1 })
  } catch {
    // CMS fallback — section uses hardcoded data
  }

  return (
    <div className="pt-8 lg:pt-12">
      <PortfolioSection />
    </div>
  )
}

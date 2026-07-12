import type { Metadata } from 'next'
import { getProjects, getCategories } from '@/lib/payload'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse our categorized portfolio of printing projects.',
}

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    getProjects({ depth: 1 }),
    getCategories(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold">Our Work</h1>
        <p className="text-ink-light mt-2 max-w-xl">Every project tells a story. Browse our portfolio by category.</p>
      </div>
      <PortfolioGrid projects={projects} categories={categories} />
    </div>
  )
}

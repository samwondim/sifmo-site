import Link from 'next/link'
import type { Project } from '@/payload-types'
import { getMediaUrl, getMediaAlt } from '@/lib/media'

interface FeaturedWorkProps {
  projects: Project[]
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold">Featured Work</h2>
          <p className="text-ink-light mt-1">A selection of our recent projects</p>
        </div>
        <Link href="/portfolio" className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary-dark transition-colors">
          View All &rarr;
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => {
          const categoryTitle = typeof project.category === 'object' ? project.category.title : project.category
          const imgUrl = getMediaUrl(project.coverImage)
          const imgAlt = getMediaAlt(project.coverImage)
          return (
            <div key={project.id} className="rounded-xl border border-surface-tertiary bg-surface-secondary overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="h-48 bg-surface-tertiary flex items-center justify-center text-ink-lighter overflow-hidden">
                {imgUrl ? (
                  <img src={imgUrl} alt={imgAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="p-5">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {categoryTitle}
                </span>
                <h3 className="text-lg font-bold mt-2">{project.title}</h3>
                <p className="text-sm text-ink-light mt-1">{project.description}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Link href="/portfolio" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
          View All Portfolio &rarr;
        </Link>
      </div>
    </section>
  )
}

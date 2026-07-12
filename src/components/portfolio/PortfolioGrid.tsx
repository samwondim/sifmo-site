'use client'

import { useState } from 'react'
import type { Project, Category } from '@/payload-types'
import { getMediaUrl, getMediaAlt } from '@/lib/media'

interface PortfolioGridProps {
  projects: Project[]
  categories: Category[]
}

export function PortfolioGrid({ projects, categories }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => {
        const cat = typeof p.category === 'object' ? p.category : null
        return cat?.title === activeCategory
      })

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === 'All'
              ? 'bg-primary text-white'
              : 'bg-surface-secondary text-ink-light hover:bg-surface-tertiary'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.title)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat.title
                ? 'bg-primary text-white'
                : 'bg-surface-secondary text-ink-light hover:bg-surface-tertiary'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project) => {
          const categoryTitle = typeof project.category === 'object' ? project.category.title : project.category
          const year = project.date ? new Date(project.date).getFullYear() : ''
          const imgUrl = getMediaUrl(project.coverImage)
          const imgAlt = getMediaAlt(project.coverImage)

          return (
            <div key={project.id} className="rounded-xl border border-surface-tertiary bg-surface-secondary overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="h-52 bg-surface-tertiary flex items-center justify-center text-ink-lighter overflow-hidden">
                {imgUrl ? (
                  <img src={imgUrl} alt={imgAlt} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {categoryTitle}
                  </span>
                  {year && <span className="text-xs text-ink-lighter">{year}</span>}
                </div>
                <h3 className="font-bold mt-2">{project.title}</h3>
                <p className="text-xs text-ink-light mt-1">{project.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

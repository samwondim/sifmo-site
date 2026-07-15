'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RegistrationMark } from '@/components/ui/RegistrationMark'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Artisan Coffee Co.',
    category: 'Packaging',
    description: 'Full-color rigid boxes for a specialty coffee roaster. 400gsm C1S with spot UV and foil.',
    color: 'from-[#155158] to-[#1a6b6b]',
    cmyk: 'C80 M40 Y50 K20 | PMS 322 C',
  },
  {
    title: 'St. Claire Winery',
    category: 'Labels & Stationery',
    description: 'Letterpress wine labels on 300gsm cotton rag, foil-debossed.',
    color: 'from-[#155158] to-[#2E8C86]',
    cmyk: 'C60 M20 Y30 K10 | PMS 7472 C',
  },
  {
    title: 'Metro Gallery',
    category: 'Large Format',
    description: 'Exhibition banners, postcard sets, and a limited-edition risograph catalog.',
    color: 'from-[#2E8C86] to-[#2467A6]',
    cmyk: 'C70 M30 Y20 K0 | PMS 7462 C',
  },
  {
    title: 'Helix Medical',
    category: 'Brochures & Flyers',
    description: 'Saddle-stitched catalog, 24 pages on 170gsm silk. 48hr turnaround.',
    color: 'from-[#2467A6] to-[#2E8C86]',
    cmyk: 'C100 M60 Y10 K5 | Process',
  },
  {
    title: 'Field & Flour',
    category: 'Packaging',
    description: 'Kraft mailer boxes with two-color flexo print and custom tissue inserts.',
    color: 'from-[#155158] to-[#12181A]',
    cmyk: 'C30 M40 Y70 K10 | Kraft base',
  },
  {
    title: 'SVO Summer Catalog',
    category: 'Books & Booklets',
    description: 'Perfect-bound sample catalog showcasing all available stocks and finishes.',
    color: 'from-[#12181A] to-[#155158]',
    cmyk: 'C0 M0 Y0 K100 | Mixed stocks',
  },
]

export function PortfolioSection() {
  const pathname = usePathname()
  const isPortfolioPage = pathname === '/portfolio'
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const gsapInited = useRef(false)

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  useEffect(() => {
    if (gsapInited.current) return
    const section = sectionRef.current
    const strip = stripRef.current
    if (!section || !strip) return
    if (isMobile) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsapInited.current = true

    let ctx: gsap.Context | null = null
    try {
      ctx = gsap.context(() => {
        const travel = -(strip.scrollWidth - section.clientWidth)
        if (travel >= 0) return

        const end = `+=${Math.abs(travel)}`

        ScrollTrigger.create({
          trigger: section,
          pin: true,
          start: 'top top',
          end,
          scrub: 1,
          invalidateOnRefresh: true,
        })

        gsap.fromTo(
          strip,
          { x: 0 },
          {
            x: travel,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    } catch (e) {
      console.warn('PortfolioSection GSAP init failed:', e)
    }

    return () => {
      try {
        if (ctx) ctx.revert()
      } catch {
        // revert may fail if DOM was modified by React Strict Mode
      }
      gsapInited.current = false
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <section id="portfolio" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ Recent Work</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-black leading-tight">
                Projects we are proud of
              </h2>
            </div>
            {!isPortfolioPage && (
              <Link href="/portfolio" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-mid-teal hover:text-deep-teal transition-colors focus-ring rounded">
                View full portfolio
                <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div key={p.title} className="group rounded-xl border border-hairline/60 bg-white/50 overflow-hidden hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                <div className={`h-48 bg-gradient-to-br ${p.color} flex items-end p-5 relative overflow-hidden`}>
                  <div className="absolute inset-0 halftone-bg opacity-[0.06]" aria-hidden="true" />
                  <div className="relative z-10">
                    <p className="text-xs font-mono text-white/70 tracking-wider">{p.category}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-ink-black">{p.title}</h3>
                  <p className="text-sm text-ink-black/60 mt-1 leading-relaxed">{p.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-[10px] font-mono text-mid-teal tracking-wider">
                    <RegistrationMark size={10} className="text-mid-teal shrink-0" />
                    {p.cmyk}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!isPortfolioPage && (
            <div className="mt-8 text-center">
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-mid-teal hover:text-deep-teal transition-colors focus-ring rounded">
                View full portfolio
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      data-reveal
      className="py-20 lg:py-28 overflow-hidden bg-paper-secondary/30 border-y border-hairline/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ Recent Work</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-black leading-tight">
              Projects we are proud of
            </h2>
          </div>
        </div>
      </div>
      <div className="pl-4 sm:pl-6 lg:pl-8" style={{ maxWidth: '100vw' }}>
        <div
          ref={stripRef}
          className="flex gap-6"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {projects.map((p) => (
            <div
              key={p.title}
              data-reveal-item
              className="w-[340px] shrink-0 rounded-xl border border-hairline/60 bg-white overflow-hidden hover:shadow-sm transition-shadow duration-200"
            >
              <div className={`h-48 bg-gradient-to-br ${p.color} flex items-end p-5 relative overflow-hidden`}>
                <div className="absolute inset-0 halftone-bg opacity-[0.06]" aria-hidden="true" />
                <div className="relative z-10">
                  <p className="text-xs font-mono text-white/70 tracking-wider">{p.category}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-ink-black">{p.title}</h3>
                <p className="text-sm text-ink-black/60 mt-1 leading-relaxed">{p.description}</p>
                <div className="flex items-center gap-2 mt-3 text-[10px] font-mono text-mid-teal tracking-wider">
                  <RegistrationMark size={10} className="text-mid-teal shrink-0" />
                  {p.cmyk}
                </div>
              </div>
            </div>
          ))}
          {!isPortfolioPage && (
            <div className="w-[280px] shrink-0 flex flex-col items-center justify-center text-center p-8">
              <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ More</p>
              <h3 className="text-xl font-bold text-ink-black mb-2">See the full collection</h3>
              <p className="text-sm text-ink-black/60 mb-6">Browse all projects by category</p>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-mid-teal hover:text-deep-teal transition-colors focus-ring rounded"
              >
                View full portfolio
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-ink-black/30 font-mono tracking-wider">
        <span className="inline-flex items-center gap-2">
          <RegistrationMark size={8} className="text-mid-teal" />
          Scroll to explore projects
          <RegistrationMark size={8} className="text-mid-teal" />
        </span>
      </div>
    </section>
  )
}

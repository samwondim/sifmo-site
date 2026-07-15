'use client'

import { useRef } from 'react'
import { CtaButton } from '@/components/ui/CtaButton'
import { HalftoneBg } from '@/components/ui/HalftoneBg'
import { InteractiveBlob } from '@/components/sections/InteractiveBlob'

interface HeroSettings {
  tagline?: string
  heroDescription?: string
}

export function HeroSection({ settings }: { settings?: HeroSettings }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const headline = settings?.tagline || 'Where Craft Meets the Press'
  const description = settings?.heroDescription || 'Full-service printing for businesses who refuse to compromise. Business cards, packaging, banners, and everything between — delivered with precision and speed.'

  return (
    <section ref={sectionRef} className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-hairline/50">
      <HalftoneBg opacity="opacity-[0.025]" />
      <InteractiveBlob sectionRef={sectionRef} />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-mid-teal/5 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-24 lg:py-32 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/50 px-3 py-1 text-xs font-mono text-mid-teal mb-6 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-mid-teal" />
            Since 1998
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-ink-black">
            {headline}
          </h1>
          <p className="text-base sm:text-lg text-ink-black/60 mt-6 max-w-xl leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <CtaButton href="/contact">
              Get a Quote
            </CtaButton>
            <CtaButton href="/portfolio" variant="secondary">
              View Our Work
            </CtaButton>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-12 text-xs text-ink-black/40 font-mono uppercase tracking-wider">
            <span>Next-day turnaround</span>
            <span className="w-px h-3 bg-hairline" />
            <span>Premium stock</span>
            <span className="w-px h-3 bg-hairline" />
            <span>In-house design</span>
            <span className="w-px h-3 bg-hairline" />
            <span>Eco-friendly inks</span>
          </div>
        </div>
      </div>
    </section>
  )
}

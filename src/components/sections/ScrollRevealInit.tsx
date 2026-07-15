'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollRevealInit({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      try {
        const sections = gsap.utils.toArray<HTMLElement>('[data-reveal]')

        sections.forEach((section) => {
          const items = section.querySelectorAll<HTMLElement>('[data-reveal-item]')
          if (items.length === 0) return

          const stagger = section.dataset.revealStagger
            ? parseFloat(section.dataset.revealStagger)
            : 0.08

          gsap.fromTo(
            items,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            },
          )
        })
      } catch (e) {
        console.warn('ScrollRevealInit failed:', e)
      }
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return <>{children}</>
}

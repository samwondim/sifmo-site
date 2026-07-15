'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollRevealInit({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)
  const triggers = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    try {
      const sections = gsap.utils.toArray<HTMLElement>('[data-reveal]')

      sections.forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>('[data-reveal-item]')
        if (items.length === 0) return

        const stagger = section.dataset.revealStagger
          ? parseFloat(section.dataset.revealStagger)
          : 0.08

        const tl = gsap.fromTo(
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

        if (tl.scrollTrigger) {
          triggers.current.push(tl.scrollTrigger)
        }
      })
    } catch (e) {
      console.warn('ScrollRevealInit failed:', e)
    }

    return () => {
      try {
        triggers.current.forEach((t) => t.kill())
        triggers.current = []
        const sections = gsap.utils.toArray<HTMLElement>('[data-reveal]')
        sections.forEach((section) => {
          gsap.set(section, { clearProps: 'all' })
          const items = section.querySelectorAll<HTMLElement>('[data-reveal-item]')
          gsap.set(items, { clearProps: 'all' })
        })
      } catch {
        // ignore
      }
      initialized.current = false
    }
  }, [])

  return <>{children}</>
}

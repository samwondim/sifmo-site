'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function GSAPCleanup() {
  const pathname = usePathname()

  useEffect(() => {
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [pathname])

  return null
}

'use client'

import { useRef, useEffect, useState, createContext, useContext, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const initedRef = useRef(false)
  const [pct, setPct] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    if (initedRef.current) return
    initedRef.current = true

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mqReduce.matches) return

    let lenis: Lenis | null = null
    try {
      lenis = new Lenis({
        lerp: 0.08,
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        orientation: 'vertical',
        smoothWheel: true,
        stopInertiaOnNavigate: true,
      })

      lenisRef.current = lenis

      lenis.on('scroll', (e: { progress: number }) => {
        setPct(Math.round(e.progress * 100))
      })

      lenis.on('scroll', () => ScrollTrigger.update())

      gsap.ticker.add((time: number) => {
        lenis!.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    } catch (e) {
      console.warn('SmoothScroll init failed:', e)
    }

    return () => {
      try {
        gsap.ticker.lagSmoothing(1.2)
      } catch {
        // ignore
      }
      try {
        if (lenis) lenis.destroy()
      } catch {
        // lenis destroy may fail if DOM was already modified by Strict Mode
      }
      lenisRef.current = null
      initedRef.current = false
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    lenis.stop()
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      lenis.start()
    })
  }, [pathname])

  const showBar = pct > 0 && pct < 100

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {showBar && (
        <div className="fixed top-0 left-0 z-[100] w-full h-0.5 bg-white/10 pointer-events-none">
          <div
            className="h-full gradient-accent transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
      {children}
    </LenisContext.Provider>
  )
}

'use client'

import { useRef, useEffect, type RefObject } from 'react'

interface InteractiveBlobProps {
  sectionRef: RefObject<HTMLDivElement | null>
}

export function InteractiveBlob({ sectionRef }: InteractiveBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const rafId = useRef(0)

  useEffect(() => {
    const blob = blobRef.current
    const section = sectionRef.current
    if (!blob || !section) return

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (mqReduce.matches) return

    if (isTouch) {
      blob.style.animation = 'blobFloat 10s ease-in-out infinite'
      return
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      target.current.x = (e.clientX - cx) * 0.06
      target.current.y = (e.clientY - cy) * 0.06
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })

    const animate = () => {
      const lerp = (current: number, target: number, factor: number) =>
        current + (target - current) * factor

      pos.current.x = lerp(pos.current.x, target.current.x, 0.06)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.06)

      blob.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`

      rafId.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(rafId.current)
    }
  }, [sectionRef])

  return (
    <div
      ref={blobRef}
      className="absolute pointer-events-none"
      style={{
        width: '600px',
        height: '600px',
        borderRadius: '42% 58% 70% 30% / 40% 50% 50% 60%',
        background: 'linear-gradient(135deg, #2E8C86, #2467A6)',
        filter: 'blur(100px) saturate(0.8)',
        opacity: 0.3,
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        left: '50%',
        top: '30%',
        marginLeft: '-200px',
        marginTop: '-250px',
      }}
      aria-hidden="true"
    />
  )
}

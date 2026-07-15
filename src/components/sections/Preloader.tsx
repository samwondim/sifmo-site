'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [visible, setVisible] = useState(true)

  const mqReduce = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const isTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  useEffect(() => {
    if (mqReduce || isTouch) {
      setVisible(false)
      return
    }

    const shown = sessionStorage.getItem('svo-preloader-shown')
    if (shown) {
      setVisible(false)
      return
    }

    const start = performance.now()
    const duration = 2000

    const frame = () => {
      const elapsed = performance.now() - start
      const pct = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - pct, 3)
      const value = Math.round(eased * 100)
      setProgress(value)

      if (pct >= 1) {
        setDone(true)
        sessionStorage.setItem('svo-preloader-shown', 'true')
        setTimeout(() => setVisible(false), 600)
      } else {
        requestAnimationFrame(frame)
      }
    }

    requestAnimationFrame(frame)
  }, [mqReduce, isTouch])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink-black"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center text-white text-sm font-bold font-mono">
            SV
          </div>
          <div className="text-5xl font-mono font-medium tracking-wider gradient-text">
            {progress}%
          </div>
          <div className="w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full gradient-accent rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

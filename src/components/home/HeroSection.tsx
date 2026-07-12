'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const headingLine1 = 'Where Precision'
const headingLine2 = 'Meets Print'
const fullText = headingLine1 + '\n' + headingLine2
const typeSpeed = 45

function useTypewriter(text: string) {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (index >= text.length) {
      setDone(true)
      return
    }
    const timer = setTimeout(() => setIndex(index + 1), typeSpeed)
    return () => clearTimeout(timer)
  }, [index, text])

  return { visibleCount: index, done }
}

export function HeroSection() {
  const { visibleCount, done } = useTypewriter(fullText)

  const renderChars = (start: number, end: number) =>
    fullText.slice(start, end).split('').map((char, i) => {
      const idx = start + i
      if (char === '\n') return <br key={idx} />
      return (
        <motion.span
          key={idx}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {char}
        </motion.span>
      )
    })

  const line1End = headingLine1.length
  const shownChars = Math.min(visibleCount, fullText.length)

  const line1Count = Math.min(shownChars, line1End)
  const line2Count = Math.max(0, shownChars - line1End - 1)

  return (
    <section className="relative bg-gradient-to-br from-surface via-surface to-surface-secondary overflow-hidden min-h-[70vh] flex items-center">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #b8952e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6"
        >
          Est. 2026
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight min-h-[2.5em]">
          <span>{renderChars(0, line1Count)}</span>
          {visibleCount > line1End && <br />}
          <span className="text-primary">
            {renderChars(line1End + 1, line1End + 1 + line2Count)}
          </span>
          {!done && (
            <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle animate-pulse" />
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="text-ink-light text-lg lg:text-xl mt-4 max-w-2xl leading-relaxed"
        >
          From business cards to billboards — full-service printing with
          uncompromising quality, fast turnaround, and a passion for the craft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <Link href="/portfolio" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
            View Our Portfolio
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-ink/20 px-6 py-3 text-sm font-semibold text-ink hover:border-ink/40 transition-colors">
            Request a Quote
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-sm text-ink-lighter"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            500+ Projects
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            50+ Happy Clients
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            2-Day Express Available
          </span>
        </motion.div>
      </div>
    </section>
  )
}

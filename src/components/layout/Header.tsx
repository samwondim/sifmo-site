'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-surface-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold text-[#1a1612]"
              style={{ background: 'linear-gradient(135deg, #b8952e, #d4af37, #c9a84c)' }}>
              S
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              SIFMO
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-light">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Get a Quote
          </Link>
          <button className="md:hidden btn btn-ghost btn-sm" onClick={() => setOpen(!open)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-2 text-sm font-medium text-ink-light">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="py-1.5 hover:text-ink transition-colors" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary btn-sm mt-2" onClick={() => setOpen(false)}>
              Get a Quote
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

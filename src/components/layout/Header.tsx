'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { getMediaUrl, getMediaAlt } from '@/lib/media'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

interface HeaderSettings {
  siteName?: string
  tagline?: string
  logo?: string | Media
}

export function Header({ settings }: { settings?: HeaderSettings }) {
  const [open, setOpen] = useState(false)
  const siteName = settings?.siteName || 'SVO'
  const logo = settings?.logo
  const logoUrl = logo && typeof logo !== 'string' ? getMediaUrl(logo) : null

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-hairline/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            {logoUrl ? (
              <Image src={logoUrl} alt={getMediaAlt(logo)} width={36} height={36} className="w-9 h-9 rounded object-cover" />
            ) : (
              <img src="/svo-logo.svg" alt="sifmo logo" width={36} height={36} className="w-9 h-9" />
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                sifmo
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-mid-teal -mt-0.5">
                Printing
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-black/70">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-mid-teal transition-colors focus-ring rounded"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="hidden sm:inline-flex items-center justify-center rounded-lg gradient-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md focus-ring">
            Get a Quote
          </Link>
          <button className="md:hidden p-2 text-ink-black hover:text-mid-teal transition-colors focus-ring rounded" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
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
          <nav className="md:hidden pb-4 flex flex-col gap-2 text-sm font-medium text-ink-black/70">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="py-1.5 hover:text-mid-teal transition-colors focus-ring rounded" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-white mt-2" onClick={() => setOpen(false)}>
              Get a Quote
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

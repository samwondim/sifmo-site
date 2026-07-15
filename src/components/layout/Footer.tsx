'use client'

import Link from 'next/link'
import { useState } from 'react'
import { RegistrationMark } from '@/components/ui/RegistrationMark'

const siteName = 'sifmo Printing'

const quickLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

const services = [
  { href: '/services', label: 'Offset & Digital' },
  { href: '/services', label: 'Large Format' },
  { href: '/services', label: 'Packaging' },
  { href: '/services', label: 'Custom Stationery' },
]

export function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    // placeholder
    setEmail('')
  }

  return (
    <footer className="bg-ink-black text-paper/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/svo-logo.svg" alt="sifmo logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{siteName}</span>
            </div>
            <p className="text-paper/50 leading-relaxed">
              Full-service printing press. Premium quality, fast turnaround, and a passion for the craft.
            </p>
            <div className="flex gap-3 mt-5">
              {['Ig', 'Fb', 'Ln'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-full border border-paper/20 flex items-center justify-center text-xs text-paper/50 hover:text-white hover:border-paper/50 transition-colors" aria-label={s}>
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Quick Links</h5>
            <div className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Services</h5>
            <div className="flex flex-col gap-2">
              {services.map((s) => (
                <Link key={s.label} href={s.href} className="hover:text-white transition-colors">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Newsletter</h5>
            <p className="text-paper/50 mb-3 text-xs">Get updates on new stock, finishes, and seasonal promos.</p>
            <form onSubmit={handleNewsletter} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-paper/20 rounded-l-lg px-3 py-2 text-xs text-white placeholder-paper/30 focus:outline-none focus:border-mid-teal focus-ring"
                aria-label="Email for newsletter"
              />
              <button type="submit" className="gradient-accent text-white text-xs font-semibold px-3 py-2 rounded-r-lg hover:opacity-90 transition-opacity">
                Join
              </button>
            </form>
            <div className="mt-6 space-y-2 text-xs text-paper/50">
              <div className="flex items-start gap-2">
                <RegistrationMark size={12} className="text-mid-teal mt-0.5 shrink-0" />
                <span>Mon–Fri: 8:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <RegistrationMark size={12} className="text-mid-teal mt-0.5 shrink-0" />
                <span>hello@svo-print.com</span>
              </div>
              <div className="flex items-start gap-2">
                <RegistrationMark size={12} className="text-mid-teal mt-0.5 shrink-0" />
                <span>(212) 555-0198</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-paper/30">
          <span>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</span>
          <span className="font-mono">CMYK: 0/0/0/100  |  PMS: 322 C / 7462 C</span>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import { getSettings } from '@/lib/payload'

export async function Footer() {
  let address = '123 Print Street, NY 10001'
  let phone = '(212) 555-0198'
  let email = 'hello@sifmo.com'

  try {
    const settings = await getSettings()
    address = settings.contactInfo?.address ?? address
    phone = settings.contactInfo?.phone ?? phone
    email = settings.contactInfo?.email ?? email
  } catch {
    // fall back to defaults
  }

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded text-xs font-bold flex items-center justify-center text-[#1a1612]"
                style={{ background: 'linear-gradient(135deg, #b8952e, #d4af37)' }}>
                S
              </div>
              <span className="font-bold" style={{ fontFamily: 'var(--font-heading)' }}>SIFMO Printing</span>
            </div>
            <p className="text-white/50">Premium full-service printing since 1998.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Quick Links</h5>
            <div className="flex flex-col gap-1 text-white/50">
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/services">Services</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Services</h5>
            <div className="flex flex-col gap-1 text-white/50">
              <Link href="/services">Offset Printing</Link>
              <Link href="/services">Digital Printing</Link>
              <Link href="/services">Wide Format</Link>
              <Link href="/services">Finishing</Link>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Contact</h5>
            <div className="flex flex-col gap-1 text-white/50 text-sm">
              <span>{address}</span>
              <span>{phone}</span>
              <span>{email}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} SIFMO Printing. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

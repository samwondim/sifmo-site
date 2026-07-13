import type { Metadata } from 'next'
import { getSettings } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about SIFMO Printing — our story, team, and state-of-the-art equipment since 1998.',
}

export default async function AboutPage() {
  const settings = await getSettings()
  const stats = settings.stats ?? []
  const contactInfo = settings.contactInfo

  return (
    <>
      <div className="bg-gradient-to-br from-surface via-surface to-surface-secondary px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
              Our Story
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold">
              Crafting Impressions<br /><span className="text-primary">Since 1998</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold">More Than Just Ink on Paper</h2>
            <div className="mt-4 space-y-4 text-sm text-ink-light leading-relaxed">
              {settings.aboutContent ? (
                <RichText data={settings.aboutContent} />
              ) : (
                <>
                  <p>
                    SIFMO Printing was founded in 1998 with a single Heidelberg press and a commitment to
                    uncompromising quality. Twenty-eight years later, we&apos;ve grown into a full-service printing
                    house serving hundreds of businesses across the region.
                  </p>
                  <p>
                    We believe that great printing is a craft — one that demands attention to detail, deep
                    knowledge of materials, and a genuine partnership with our clients. From a small batch of
                    business cards to a complex packaging run, every project gets the same dedication.
                  </p>
                  <p>
                    Our team of 30+ craftsmen, designers, and technicians work with state-of-the-art equipment
                    including 6-color Heidelberg presses, digital HP Indigo, and a full bindery with foil
                    stamping and die-cutting capabilities.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="rounded-xl bg-surface-secondary p-6 text-center">
            <div className="w-24 h-24 bg-surface-tertiary rounded-full mx-auto flex items-center justify-center text-ink-lighter">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h4 className="font-semibold mt-3">Visit Our Facility</h4>
            <p className="text-sm text-ink-light mt-1">{contactInfo?.address ?? '123 Print Street, New York, NY 10001'}</p>
            <p className="text-sm text-ink-light">{contactInfo?.hours ?? 'Mon–Fri: 8:00 AM – 6:00 PM'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {stats.map((stat) => (
            <div key={stat.id ?? stat.label} className="rounded-xl bg-surface-secondary p-5 text-center">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-ink-light mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

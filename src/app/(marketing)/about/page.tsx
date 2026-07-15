import type { Metadata } from 'next'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { PaperStockStrip } from '@/components/sections/PaperStockStrip'

export const metadata: Metadata = {
  title: 'About',
  description: 'SVO Printing — a full-service printing press built on craftsmanship, speed, and premium quality.',
}

export default function AboutPage() {
  return (
    <>
      <div className="pt-8 lg:pt-12">
        <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ About</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-black leading-tight">
                A press built on craft, speed, and trust
              </h1>
              <p className="text-ink-black/60 mt-6 text-base leading-relaxed max-w-xl">
                SVO Printing has been serving designers, agencies, and businesses since 1998. What started as a small
                letterpress shop in downtown New York has grown into a full-service production facility — but we have
                never lost the craftsman&apos;s attention to detail.
              </p>
              <p className="text-ink-black/60 mt-4 text-base leading-relaxed max-w-xl">
                Every job, from a 500-card business card run to a complex 10,000-unit packaging order, passes through
                the same rigorous prepress, press, and finishing workflow. We own our machines, our schedule, and our
                quality.
              </p>
            </div>
          </div>
        </section>
      </div>
      <WhyChooseUs />
      <PaperStockStrip />
    </>
  )
}

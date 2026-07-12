import Link from 'next/link'
import type { Service } from '@/payload-types'

interface ServicesPreviewProps {
  services: Service[]
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-surface-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold">What We Do</h2>
          <p className="text-ink-light mt-1 max-w-lg mx-auto">Full-service printing from concept to completion</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {services.slice(0, 4).map((service, i) => (
            <div key={service.id} className="rounded-xl bg-surface p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 text-sm font-bold text-[#1a1612]"
                style={{ background: 'linear-gradient(135deg, #b8952e, #d4af37, #c9a84c)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h4 className="font-semibold">{service.title}</h4>
              <p className="text-xs text-ink-light mt-1">{service.shortDescription}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/services" className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors">
            Explore All Services &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

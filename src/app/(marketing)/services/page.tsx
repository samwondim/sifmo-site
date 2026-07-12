import type { Metadata } from 'next'
import { getServices } from '@/lib/payload'
import { ServiceCard } from '@/components/services/ServiceCard'
import { ProcessSteps } from '@/components/services/ProcessSteps'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-service printing capabilities — offset, digital, wide format, finishing, and more.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <div className="bg-gradient-to-br from-surface via-surface to-surface-secondary px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-bold">Services</h1>
            <p className="text-ink-light text-lg mt-3 max-w-xl">
              End-to-end printing capabilities under one roof. From concept to finished piece, we handle it all.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <ProcessSteps />
      </div>
    </>
  )
}

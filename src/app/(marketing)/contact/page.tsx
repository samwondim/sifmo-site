import type { Metadata } from 'next'
import { getSettings } from '@/lib/payload'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { QuoteForm } from '@/components/contact/QuoteForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with SIFMO Printing or request a quote for your next project.',
}

export default async function ContactPage() {
  const settings = await getSettings()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold">Get in Touch</h1>
        <p className="text-ink-light mt-2">Have a project in mind? Request a quote or stop by our facility.</p>
      </div>
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <ContactInfo contactInfo={settings.contactInfo} />
        </div>
        <div className="lg:col-span-3">
          <QuoteForm />
        </div>
      </div>
    </div>
  )
}

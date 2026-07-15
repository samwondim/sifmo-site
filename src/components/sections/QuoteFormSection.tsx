'use client'

import { QuoteForm } from '@/components/contact/QuoteForm'
import { RegistrationMark } from '@/components/ui/RegistrationMark'

const contactDetails = [
  { label: 'Address', value: '123 Print Street, New York, NY 10001' },
  { label: 'Phone', value: '(212) 555-0198' },
  { label: 'Email', value: 'hello@svo-print.com' },
  { label: 'Hours', value: 'Mon–Fri: 8:00 AM – 6:00 PM' },
]

export function QuoteFormSection() {
  return (
    <section id="contact" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-xs tracking-widest text-mid-teal uppercase mb-3">/ Get a Quote</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-black leading-tight">
            Tell us about your project
          </h2>
          <p className="text-ink-black/60 mt-4 text-base leading-relaxed">
            Fill out the form and we will get back to you with a detailed estimate within 2 hours during business hours.
          </p>
        </div>
        <div data-reveal className="grid lg:grid-cols-5 gap-8">
          <div data-reveal-item className="lg:col-span-3">
            <QuoteForm />
          </div>
          <div data-reveal-item className="lg:col-span-2">
            <div className="rounded-xl border border-hairline/60 bg-white/50 p-6">
              <h3 className="font-bold text-ink-black mb-4">Contact Information</h3>
              <div className="space-y-4 text-sm">
                {contactDetails.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <RegistrationMark size={14} className="text-mid-teal mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-ink-black">{d.label}</p>
                      <p className="text-ink-black/50">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-hairline/60 bg-white/50 p-6 mt-4">
              <h3 className="font-bold text-ink-black mb-2">Quick Response</h3>
              <p className="text-sm text-ink-black/60">
                Most quote requests are answered within 2 hours during business hours. For urgent inquiries, give us a call.
              </p>
              <div className="flex gap-2 mt-4">
                <a
                  href="tel:+12125550198"
                  className="inline-flex items-center justify-center rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity focus-ring"
                >
                  Call Now
                </a>
                <a
                  href="mailto:hello@svo-print.com"
                  className="inline-flex items-center justify-center rounded-lg border border-hairline px-4 py-2.5 text-sm font-semibold text-ink-black hover:border-mid-teal hover:text-mid-teal transition-colors focus-ring"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ContactInfoProps {
  contactInfo?: {
    address?: string | null
    phone?: string | null
    email?: string | null
    hours?: string | null
  }
}

function stripNonDigits(str: string) {
  return str.replace(/[^\d+]/g, '')
}

export function ContactInfo({ contactInfo }: ContactInfoProps) {
  const phone = contactInfo?.phone ?? '(212) 555-0198'
  const email = contactInfo?.email ?? 'hello@sifmo.com'
  const address = contactInfo?.address ?? '123 Print Street, New York, NY 10001'
  const hours = contactInfo?.hours ?? 'Mon–Fri: 8:00 AM – 6:00 PM'

  const details = [
    {
      icon: (
        <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Address',
      value: address,
    },
    {
      icon: (
        <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: phone,
    },
    {
      icon: (
        <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: email,
    },
    {
      icon: (
        <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Hours',
      value: hours,
    },
  ]

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-surface-tertiary bg-surface-secondary p-6">
        <h3 className="font-bold mb-4">Contact Information</h3>
        <div className="space-y-4 text-sm">
          {details.map((d) => (
            <div key={d.label} className="flex items-start gap-3">
              {d.icon}
              <div>
                <p className="font-medium">{d.label}</p>
                <p className="text-ink-light">{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-surface-tertiary bg-surface-secondary p-6">
        <h3 className="font-bold mb-2">Quick Response</h3>
        <p className="text-sm text-ink-light">
          Most quote requests are answered within 2 hours during business hours. For urgent inquiries, give us a call.
        </p>
        <div className="flex gap-2 mt-3">
          <a
            href={'tel:' + stripNonDigits(phone)}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Call Now
          </a>
          <a
            href={'mailto:' + email}
            className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}

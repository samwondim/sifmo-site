import type { Metadata } from 'next'
import { QuoteFormSection } from '@/components/sections/QuoteFormSection'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with SVO Printing or request a quote for your next project.',
}

export default function ContactPage() {
  return (
    <div className="pt-8 lg:pt-12">
      <QuoteFormSection />
    </div>
  )
}

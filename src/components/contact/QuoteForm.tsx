'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Select a project type'),
  quantity: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  finishing: z.array(z.string()).optional(),
  deadline: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const finishingOptions = [
  'Foil Stamping', 'Embossing / Debossing', 'Spot UV', 'Die-Cutting', 'Lamination', 'Binding',
]

export function QuoteForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="rounded-xl border border-surface-tertiary bg-surface-secondary p-6">
      <h3 className="font-bold mb-1">Request a Quote</h3>
      <p className="text-sm text-ink-light mb-4">Fill out the form below and we&apos;ll get back to you with a detailed estimate.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input {...register('name')} className="w-full rounded-lg border border-surface-tertiary bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="John Smith" />
            {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input {...register('email')} className="w-full rounded-lg border border-surface-tertiary bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="john@example.com" />
            {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input {...register('phone')} className="w-full rounded-lg border border-surface-tertiary bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="(212) 555-0198" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Project Type</label>
            <select {...register('projectType')} className="w-full rounded-lg border border-surface-tertiary bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary">
              <option value="">Select a category...</option>
              <option value="business-cards">Business Cards</option>
              <option value="brochures">Brochures / Flyers</option>
              <option value="posters">Posters</option>
              <option value="banners">Banners / Signage</option>
              <option value="packaging">Packaging / Boxes</option>
              <option value="stationery">Stationery</option>
              <option value="other">Other</option>
            </select>
            {errors.projectType && <p className="text-xs text-red-500 mt-0.5">{errors.projectType.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input {...register('quantity')} className="w-full rounded-lg border border-surface-tertiary bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="e.g. 500, 1000, 5000" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Project Description</label>
          <textarea {...register('description')} className="w-full rounded-lg border border-surface-tertiary bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary h-24 resize-none" placeholder="Tell us about your project — dimensions, paper stock preferences, colors, deadline, and any other relevant details." />
          {errors.description && <p className="text-xs text-red-500 mt-0.5">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Finishing Options (select all that apply)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {finishingOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" value={option} {...register('finishing')} className="rounded border-surface-tertiary text-primary focus:ring-primary" />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Desired Deadline</label>
          <input type="date" {...register('deadline')} className="w-full rounded-lg border border-surface-tertiary bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Print Specs / Artwork (optional)</label>
          <div className="border-2 border-dashed border-surface-tertiary rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
            <svg className="w-8 h-8 mx-auto text-ink-lighter" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-ink-light mt-2">Drop files here or click to upload</p>
            <p className="text-xs text-ink-lighter mt-1">PDF, AI, PSD, INDD — up to 50MB</p>
          </div>
        </div>
        <button type="submit" className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
          Submit Quote Request
        </button>
        <p className="text-xs text-ink-lighter text-center">We respect your privacy. Your files and information are kept strictly confidential.</p>
      </form>
    </div>
  )
}

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

  const inputClass = 'w-full rounded-lg border border-hairline/60 bg-white px-3 py-2.5 text-sm text-ink-black focus:outline-none focus:border-mid-teal focus:ring-1 focus:ring-mid-teal/30 transition-colors placeholder:text-ink-black/30'
  const labelClass = 'block text-sm font-medium text-ink-black mb-1'
  const errorClass = 'text-xs text-red-500 mt-0.5'

  return (
    <div className="rounded-xl border border-hairline/60 bg-white/50 p-6 lg:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input {...register('name')} className={inputClass} placeholder="John Smith" />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input {...register('email')} className={inputClass} placeholder="john@example.com" />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Phone Number</label>
            <input {...register('phone')} className={inputClass} placeholder="(212) 555-0198" />
          </div>
          <div>
            <label className={labelClass}>Project Type</label>
            <select {...register('projectType')} className={inputClass}>
              <option value="">Select a category...</option>
              <option value="business-cards">Business Cards</option>
              <option value="brochures">Brochures / Flyers</option>
              <option value="posters">Posters</option>
              <option value="banners">Banners / Signage</option>
              <option value="packaging">Packaging / Boxes</option>
              <option value="stationery">Stationery</option>
              <option value="books">Books / Booklets</option>
              <option value="other">Other</option>
            </select>
            {errors.projectType && <p className={errorClass}>{errors.projectType.message}</p>}
          </div>
        </div>
        <div>
          <label className={labelClass}>Quantity</label>
          <input {...register('quantity')} className={inputClass} placeholder="e.g. 500, 1000, 5000" />
        </div>
        <div>
          <label className={labelClass}>Project Description</label>
          <textarea {...register('description')} className={`${inputClass} h-28 resize-none`} placeholder="Tell us about your project — dimensions, paper stock preferences, colors, deadline, and any other relevant details." />
          {errors.description && <p className={errorClass}>{errors.description.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Finishing Options (select all that apply)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
            {finishingOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer text-ink-black/70 hover:text-ink-black transition-colors">
                <input type="checkbox" value={option} {...register('finishing')} className="rounded border-hairline text-mid-teal focus:ring-mid-teal/30" />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>Desired Deadline</label>
          <input type="date" {...register('deadline')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Upload Print Specs / Artwork (optional)</label>
          <div className="border-2 border-dashed border-hairline/60 rounded-lg p-8 text-center cursor-pointer hover:border-mid-teal/40 transition-colors bg-white/30">
            <svg className="w-8 h-8 mx-auto text-ink-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-ink-black/50 mt-2">Drop files here or click to upload</p>
            <p className="text-xs text-ink-black/30 mt-1 font-mono">PDF, AI, PSD, INDD — up to 50MB</p>
          </div>
        </div>
        <button type="submit" className="w-full rounded-lg gradient-accent px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-sm hover:shadow-md focus-ring">
          Submit Quote Request
        </button>
        <p className="text-xs text-ink-black/30 text-center font-mono">Your files and information are kept strictly confidential.</p>
      </form>
    </div>
  )
}

import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_noStore as noStore } from 'next/cache'
import type { Project, Category, Service, Testimonial, Settings } from '@/payload-types'

export async function getPayloadClient() {
  noStore()
  return await getPayload({ config })
}

export async function getProjects(options?: { limit?: number; depth?: number }) {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'projects', limit: options?.limit ?? 100, depth: options?.depth ?? 0, sort: '-date' })
  return result.docs as unknown as Project[]
}

export async function getCategories() {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'categories', sort: 'order' })
  return result.docs as unknown as Category[]
}

export async function getServices(options?: { limit?: number }) {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'services', limit: options?.limit ?? 100, sort: 'order' })
  return result.docs as unknown as Service[]
}

export async function getTestimonials(options?: { featured?: boolean; limit?: number; depth?: number }) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    where: options?.featured ? { featured: { equals: true } } : undefined,
    limit: options?.limit ?? 100,
    depth: options?.depth ?? 0,
    sort: '-createdAt',
  })
  return result.docs as unknown as Testimonial[]
}

export async function getSettings() {
  const payload = await getPayloadClient()
  return await payload.findGlobal({ slug: 'settings', depth: 1 }) as unknown as Settings
}

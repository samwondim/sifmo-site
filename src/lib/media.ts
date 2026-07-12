import type { Media } from '@/payload-types'

export function getMediaUrl(media: string | Media | null | undefined): string | null {
  if (!media) return null
  if (typeof media === 'string') return null
  if (!media.url) return null
  if (media.url.startsWith('http')) return media.url
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return `${siteUrl}${media.url}`
}

export function getMediaAlt(media: string | Media | null | undefined): string {
  if (!media) return ''
  if (typeof media === 'string') return ''
  return media.alt || ''
}

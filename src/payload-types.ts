export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  slug: string
  category: string | Category
  coverImage: string | Media
  gallery?: { image: string | Media; caption?: string }[]
  client?: string
  description?: any
  date?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  title: string
  slug: string
  description?: string
  order?: number
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  title: string
  slug: string
  shortDescription: string
  description?: any
  icon?: string
  badges?: { label: string; id?: string }[]
  order?: number
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: string
  clientName: string
  company?: string
  role?: string
  quote: string
  photo?: string | Media
  rating?: number
  featured?: boolean
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  alt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  createdAt: string
  updatedAt: string
}

export interface Settings {
  id: string
  siteName?: string
  tagline?: string
  logo?: string | Media
  heroDescription?: string
  aboutContent?: any
  contactInfo?: {
    address?: string
    phone?: string
    email?: string
    hours?: string
  }
  socialLinks?: { platform: string; url: string; id?: string }[]
  stats?: { label: string; value: string; id?: string }[]
  createdAt: string
  updatedAt: string
}

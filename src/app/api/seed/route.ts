import { getPayload } from 'payload'
import config from '@payload-config'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const auth = request.nextUrl.searchParams.get('auth')
  if (auth !== 'svoseed2024') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    const results: string[] = []

    // --- Admin user ---
    const existing = await payload.find({ collection: 'users', limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: { email: 'admin@svoprint.com', password: 'admin123', name: 'Admin' },
      })
      results.push('Admin user created: admin@svoprint.com / admin123')
    } else {
      results.push('Admin user already exists')
    }

    // --- Categories ---
    const categoryData = [
      { title: 'Packaging', slug: 'packaging', description: 'Boxes, sleeves, rigid setups, and custom mailers.', order: 1 },
      { title: 'Brand Collateral', slug: 'brand-collateral', description: 'Business cards, letterhead, and brand kits.', order: 2 },
      { title: 'Brochures & Flyers', slug: 'brochures-flyers', description: 'Sales sheets, catalogs, and promotional materials.', order: 3 },
      { title: 'Large Format', slug: 'large-format', description: 'Banners, posters, and trade show graphics.', order: 4 },
      { title: 'Labels & Stationery', slug: 'labels-stationery', description: 'Wine labels, envelopes, and notepads.', order: 5 },
      { title: 'Books & Booklets', slug: 'books-booklets', description: 'Perfect-bound, case-bound, and saddle-stitched.', order: 6 },
    ]

    for (const cat of categoryData) {
      const exists = await payload.find({ collection: 'categories', where: { slug: { equals: cat.slug } } })
      if (exists.docs.length === 0) {
        await payload.create({ collection: 'categories', data: cat })
        results.push(`Category created: ${cat.title}`)
      }
    }

    // --- Services ---
    const serviceData = [
      {
        title: 'Business Cards', slug: 'business-cards',
        shortDescription: 'Premium thick stock, spot UV, foil, or letterpress. Make an impression from the first handshake.',
        badges: [{ label: '24hr' }, { label: 'Foil' }], order: 1,
      },
      {
        title: 'Brochures & Flyers', slug: 'brochures-flyers',
        shortDescription: 'Tri-fold, bi-fold, saddle-stitched booklets — from sales sheets to product catalogs.',
        badges: [{ label: 'Saddle-stitch' }, { label: 'Folding' }], order: 2,
      },
      {
        title: 'Large Format & Banners', slug: 'large-format',
        shortDescription: 'Vinyl banners, posters, fabric displays, and trade show graphics up to 60" wide.',
        badges: [{ label: 'UV-resistant' }, { label: '60"' }], order: 3,
      },
      {
        title: 'Packaging', slug: 'packaging',
        shortDescription: 'Boxes, sleeves, rigid setups, and custom mailers that protect and present your product.',
        badges: [{ label: 'Die-cut' }, { label: 'Foil' }], order: 4,
      },
      {
        title: 'Custom Stationery', slug: 'custom-stationery',
        shortDescription: 'Letterhead, envelopes, notepads, and brand kits — unified across every touchpoint.',
        badges: [{ label: 'Thermography' }, { label: 'Cotton' }], order: 5,
      },
      {
        title: 'Books & Booklets', slug: 'books-booklets',
        shortDescription: 'Perfect-bound, case-bound, wire-o — short runs and long runs with crisp registration.',
        badges: [{ label: 'Case-bound' }, { label: 'Wire-o' }], order: 6,
      },
    ]

    for (const svc of serviceData) {
      const exists = await payload.find({ collection: 'services', where: { slug: { equals: svc.slug } } })
      if (exists.docs.length === 0) {
        await payload.create({ collection: 'services', data: svc })
        results.push(`Service created: ${svc.title}`)
      }
    }

    // --- Testimonials ---
    const testimonialData = [
      {
        clientName: 'Marcus Chen', company: 'Artisan Coffee Co.', role: 'Creative Director',
        quote: 'SVO turned our packaging redesign around in three days — including die-cut prototypes. The color registration on the final run was flawless. We have found our printer.',
        rating: 5, featured: true,
      },
      {
        clientName: 'Sarah Okonkwo', company: 'Helix Medical', role: 'Brand Manager',
        quote: 'We needed 5,000 perfect-bound catalogs in under a week for a product launch. SVO delivered in 4 days. The paper stock recommendation alone saved us 15% on freight.',
        rating: 5, featured: true,
      },
      {
        clientName: 'Tomás Rivera', company: 'Metro Gallery', role: 'Design Director',
        quote: 'The level of prepress support is what keeps us coming back. They caught a color-space issue in our files that would have ruined the run. True professionals.',
        rating: 5, featured: true,
      },
    ]

    for (const t of testimonialData) {
      const exists = await payload.find({
        collection: 'testimonials',
        where: { clientName: { equals: t.clientName } },
      })
      if (exists.docs.length === 0) {
        await payload.create({ collection: 'testimonials', data: t })
        results.push(`Testimonial created: ${t.clientName}`)
      }
    }

    // --- Settings ---
    const existingSettings = await payload.findGlobal({ slug: 'settings' })
    if (!existingSettings.siteName || existingSettings.siteName === 'SIFMO Printing') {
      await payload.updateGlobal({
        slug: 'settings',
        data: {
          siteName: 'SVO Printing',
          tagline: 'Where Craft Meets the Press',
          heroDescription: 'Full-service printing for businesses who refuse to compromise. Business cards, packaging, banners, and everything between — delivered with precision and speed.',
          contactInfo: {
            address: '123 Print Street, New York, NY 10001',
            phone: '(212) 555-0198',
            email: 'hello@svo-print.com',
            hours: 'Mon–Fri: 8:00 AM – 6:00 PM',
          },
        },
      })
      results.push('Settings updated')
    }

    return NextResponse.json({ success: true, results })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

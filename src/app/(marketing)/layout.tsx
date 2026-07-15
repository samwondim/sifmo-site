import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Preloader } from '@/components/sections/Preloader'
import { getSettings } from '@/lib/payload'
import type { Settings } from '@/payload-types'
import '../globals.css'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let settings: Settings | undefined
  try {
    settings = await getSettings()
  } catch {
    // fall back to defaults
  }

  return (
    <>
      <Preloader />
      <SmoothScroll>
        <Header settings={settings ? { siteName: settings.siteName, tagline: settings.tagline, logo: settings.logo } : undefined} />
        <main className="flex-1">{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  )
}

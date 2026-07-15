import type { Metadata } from 'next'
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
import config from '@payload-config'
import '@payloadcms/next/css'
import './globals.css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './(payload)/admin/importMap.js'

const fraunces = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'SVO Printing | Full-Service Printing Press',
    template: '%s | SVO Printing',
  },
  description:
    'Premium full-service printing — business cards, brochures, packaging, banners, and custom stationery. Fast turnaround, premium stock, in-house design support.',
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{ className: `${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}` }}
    >
      {children}
    </RootLayout>
  )
}

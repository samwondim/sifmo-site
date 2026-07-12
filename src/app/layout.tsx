import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './(payload)/admin/importMap.js'

const playfair = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const lora = Lora({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: {
    default: 'SIFMO Printing | Full-Service Printing Press',
    template: '%s | SIFMO Printing',
  },
  description:
    'Premium full-service printing since 1998. Business cards, brochures, packaging, banners, and more.',
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
      htmlProps={{ className: `${playfair.variable} ${lora.variable}` }}
    >
      {children}
    </RootLayout>
  )
}

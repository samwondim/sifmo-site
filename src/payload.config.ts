import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { Media } from './payload/collections/Media'
import { Users } from './payload/collections/Users'
import { Projects } from './payload/collections/Projects'
import { Categories } from './payload/collections/Categories'
import { Services } from './payload/collections/Services'
import { Testimonials } from './payload/collections/Testimonials'
import { Settings } from './payload/globals/Settings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.VERCEL === '1'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Projects, Categories, Services, Testimonials],
  globals: [Settings],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  plugins: isProd
    ? [
        vercelBlobStorage({
          enabled: isProd,
          collections: {
            media: true,
          },
          token: process.env.BLOB_READ_WRITE_TOKEN || '',
          addRandomSuffix: true,
          cacheControlMaxAge: 31536000,
        }),
      ]
    : [],
  db: isProd
    ? vercelPostgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || process.env.POSTGRES_URL || '',
        },
        prodMigrations: migrations,
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./dev.db',
        },
      }),
})

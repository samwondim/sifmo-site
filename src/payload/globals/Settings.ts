import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'SIFMO Printing',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Where Precision Meets Print',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
    },
    {
      name: 'aboutContent',
      type: 'richText',
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'address', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'hours', type: 'text' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}

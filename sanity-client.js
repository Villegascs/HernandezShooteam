import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'wnfb3rqp',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
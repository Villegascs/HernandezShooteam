export const sanityClient = window.SanityClient.createClient({
  projectId: 'wnfb3rqp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false // Deshabilita el CDN para tener resultados en tiempo real
});
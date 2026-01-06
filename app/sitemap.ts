import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tahmid.space'
  const currentDate = new Date()

  // For single-page applications, only include the base URL
  // Hash fragments are not indexable by search engines
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
}

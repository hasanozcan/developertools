import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/*?*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/*?*',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/og-image.png', '/icon.svg', '/apple-icon.png', '/favicon.ico'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

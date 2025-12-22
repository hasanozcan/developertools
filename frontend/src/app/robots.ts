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
          '/search',
          '/*?utm_',
          '/*&utm_',
          '/*?gclid=',
          '/*&gclid=',
          '/*?fbclid=',
          '/*&fbclid=',
          '/*?ref=',
          '/*&ref=',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

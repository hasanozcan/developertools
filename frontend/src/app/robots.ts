import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

  return {
    rules: [
      {
        userAgent: '*',
        // `/*?lang=` is more specific than `/*?*`, so crawlers can follow the
        // 301 from legacy ?lang=xx URLs to their locale-prefixed equivalents.
        allow: ['/', '/*?lang='],
        // The `/api/*?lang=` style rules are longer than `/*?lang=`, so they
        // keep API/admin URLs blocked even when a ?lang= parameter is present.
        disallow: ['/api/', '/api/*?lang=', '/admin/', '/admin/*?lang=', '/*?*'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/*?lang='],
        disallow: ['/api/', '/api/*?lang=', '/*?*'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/og-image.png', '/icon.svg', '/apple-icon.png', '/favicon.ico'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

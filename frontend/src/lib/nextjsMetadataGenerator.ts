export interface NextMetadataOptions {
  title: string;
  description: string;
  url: string;
  siteName: string;
  locale?: string;
  imageUrl?: string;
  twitterHandle?: string;
}

export function generateNextjsMetadata(options: NextMetadataOptions): string {
  return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${options.title.replace(/'/g, "\\'")}',
  description: '${options.description.replace(/'/g, "\\'")}',
  alternates: {
    canonical: '${options.url}',
  },
  openGraph: {
    title: '${options.title.replace(/'/g, "\\'")}',
    description: '${options.description.replace(/'/g, "\\'")}',
    url: '${options.url}',
    siteName: '${options.siteName.replace(/'/g, "\\'")}',
    ${options.imageUrl ? `images: [
      {
        url: '${options.imageUrl}',
        width: 1200,
        height: 630,
        alt: '${options.title.replace(/'/g, "\\'")}',
      },
    ],` : ''}
    locale: '${options.locale || 'en_US'}',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${options.title.replace(/'/g, "\\'")}',
    description: '${options.description.replace(/'/g, "\\'")}',
    ${options.twitterHandle ? `creator: '${options.twitterHandle}',` : ''}
    ${options.imageUrl ? `images: ['${options.imageUrl}'],` : ''}
  },
  robots: {
    index: true,
    follow: true,
  },
};`;
}

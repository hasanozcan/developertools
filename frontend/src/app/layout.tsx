import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DevsTools - 27+ Free Online Developer Tools',
    template: '%s | DevsTools',
  },
  description: 'DevsTools - 27+ free online developer tools: JSON formatter, Base64 encoder/decoder, UUID generator, MD5/SHA hash generators, regex tester, QR code generator & more. No registration, 100% client-side.',
  keywords: ['developer tools', 'online tools', 'json formatter', 'base64 encoder', 'uuid generator', 'hash generator', 'regex tester', 'qr code generator', 'free developer tools', 'web developer tools', 'programming tools', 'devstools'],
  authors: [{ name: 'DevsTools' }],
  creator: 'DevsTools',
  publisher: 'DevsTools',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'tr': '/?lang=tr',
      'de': '/?lang=de',
      'es': '/?lang=es',
      'fr': '/?lang=fr',
      'ru': '/?lang=ru',
      'zh': '/?lang=zh',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'DevsTools',
    title: 'DevsTools - 27+ Free Online Developer Tools',
    description: '27+ free online developer tools: JSON formatter, Base64 encoder, UUID generator, hash generators, regex tester, QR code & more. No registration, 100% client-side.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'DevsTools - Free Online Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevsTools - 27+ Free Online Developer Tools',
    description: '27+ free online developer tools: JSON formatter, Base64 encoder, UUID generator, hash generators, regex tester, QR code & more. No registration required.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'DevsTools',
              url: siteUrl,
              description: 'Free online developer tools for programmers and web developers',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DevsTools',
              url: siteUrl,
              logo: `${siteUrl}/icon.svg`,
              sameAs: [],
            }),
          }}
        />
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`} suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/Providers';
import { normalizeAdSenseClientId, normalizeAdSensePublisherId } from '@/lib/adsense';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleAdsSendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO;
const googleAdsConversionValue = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE;
const googleAdsConversionCurrency = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY;
const adSenseClientId = normalizeAdSenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);
const adSensePublisherId = normalizeAdSensePublisherId(process.env.NEXT_PUBLIC_ADSENSE_ID);

const signalGoogleFundingChoices = `(function() {
  function signalGooglefcPresent() {
    if (!window.frames['googlefcPresent']) {
      if (document.body) {
        const iframe = document.createElement('iframe');
        iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
        iframe.style.display = 'none';
        iframe.name = 'googlefcPresent';
        document.body.appendChild(iframe);
      } else {
        setTimeout(signalGooglefcPresent, 0);
      }
    }
  }
  signalGooglefcPresent();
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Free Online Developer Tools | DevsTools',
    template: '%s | DevsTools',
  },
  description:
    'DevsTools offers free online developer tools for JSON formatting, Base64 encoding, UUIDs, hashing, regex testing, QR codes and more. Private and client-side.',
  authors: [{ name: 'DevsTools' }],
  creator: 'DevsTools',
  publisher: 'DevsTools',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'DevsTools',
    title: 'Free Online Developer Tools | DevsTools',
    description:
      'Free online developer tools for JSON, encoding, UUIDs, hashing, regex, QR codes, HTTP utilities and more. No registration required.',
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
    title: 'Free Online Developer Tools | DevsTools',
    description:
      'Free online developer tools for JSON, encoding, UUIDs, hashing, regex, QR codes, HTTP utilities and more. No registration required.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setInitialTheme = `
    (function() {
      try {
        var stored = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
        var root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
      } catch (e) {
        // ignore
      }
    })();
  `;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/x-icon" sizes="any" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" sizes="any" href="/icon.svg" />
        <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/apple-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* WebSite Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              url: siteUrl,
              name: 'DevsTools',
              alternateName: 'Free Online Developer Tools | DevsTools',
              description: 'Free online tools for programmers and web developers',
              inLanguage: 'en',
              publisher: {
                '@type': 'Organization',
                '@id': `${siteUrl}/#organization`,
              },
            }),
          }}
        />
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${siteUrl}/#organization`,
              url: siteUrl,
              name: 'DevsTools',
              description: 'Free online tools for software developers and web designers',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/icon.svg`,
                width: 512,
                height: 512,
              },
              sameAs: [],
            }),
          }}
        />
        {/* Google AdSense */}
        {adSensePublisherId && (
          <>
            <script
              async
              src={`https://fundingchoicesmessages.google.com/i/${adSensePublisherId}?ers=1`}
            />
            <script dangerouslySetInnerHTML={{ __html: signalGoogleFundingChoices }} />
          </>
        )}
        {adSenseClientId && (
          <Script
            id="adsbygoogle-js"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
        {googleAdsId && (
          <>
            {/* Google tag (gtag.js) */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${googleAdsId}');
                `,
              }}
            />
            {googleAdsSendTo && googleAdsConversionValue && googleAdsConversionCurrency && (
              /* Event snippet for Sayfa görüntüleme conversion page */
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    gtag('event', 'conversion', {
                      'send_to': '${googleAdsSendTo}',
                      'value': ${googleAdsConversionValue},
                      'currency': '${googleAdsConversionCurrency}'
                    });
                  `,
                }}
              />
            )}
          </>
        )}
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body
        className={`${inter.className} antialiased text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/Providers';
import ServiceWorkerRegister from '@/components/common/ServiceWorkerRegister';
import { normalizeAdSenseClientId, normalizeAdSensePublisherId } from '@/lib/adsense';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const adSenseClientId = normalizeAdSenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);
const adSensePublisherId = normalizeAdSensePublisherId(process.env.NEXT_PUBLIC_ADSENSE_ID);
const enableVercelObservability =
  process.env.VERCEL === '1' || process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true';

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
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
    },
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DevsTools" />
        <meta name="theme-color" content="#4f46e5" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* WebSite Structured Data with Sitelinks SearchBox */}
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
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
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
        {/* Preconnect & DNS-Prefetch for Google AdSense & DoubleClick CDNs */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://tpc.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://adservice.google.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://tpc.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://adservice.google.com" />
      </head>
      <body
        className={`${inter.className} antialiased text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {setInitialTheme}
        </Script>
        <Providers>
          <ServiceWorkerRegister />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        {adSensePublisherId && (
          <>
            <Script
              id="google-funding-choices"
              strategy="afterInteractive"
              src={`https://fundingchoicesmessages.google.com/i/${adSensePublisherId}?ers=1`}
            />
            <Script id="google-funding-choices-signal" strategy="afterInteractive">
              {signalGoogleFundingChoices}
            </Script>
          </>
        )}
        {adSenseClientId && (
          <Script
            id="adsbygoogle-js"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
        {googleAdsId && (
          <>
            <Script
              id="google-tag-loader"
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            />
            <Script id="google-tag-config" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                window.gtag = function gtag(){window.dataLayer.push(arguments);};
                window.gtag('js', new Date());
                window.gtag('config', '${googleAdsId}');
              `}
            </Script>
          </>
        )}
        {enableVercelObservability && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/Providers';
import ServiceWorkerRegister from '@/components/common/ServiceWorkerRegister';
import AdSenseScripts from '@/components/common/AdSenseScripts';
import { normalizeAdSenseClientId } from '@/lib/adsense';
import { getHreflangAlternates, getOpenGraphAlternateLocales } from '@/lib/i18nRouting';
import { toolCatalog } from '@/lib/api';
import type { Language } from '@/translations';
import type { ComponentType } from 'react';

// Shared <html> document for every root layout: app/(default)/layout.tsx (English,
// unprefixed URLs), app/about/layout.tsx and app/contact/layout.tsx (English, kept out
// of the route group so their opengraph-image URLs stay unsuffixed),
// app/[locale]/layout.tsx (/tr, /de, ...) and app/global-not-found.tsx. Only the `lang`
// attribute differs between them, so the server-rendered HTML declares the page
// language without any per-request work.

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
// Rounded down to the nearest 10 ("490+") so the homepage title stays stable as tools are added.
const toolCountLabel = `${Math.max(10, Math.floor(toolCatalog.length / 10) * 10)}+`;
const homeTitle = `${toolCountLabel} Free Online Developer Tools | DevsTools`;
const homeSocialDescription = `${toolCountLabel} free online developer tools for JSON, encoding, UUIDs, hashing, regex, QR codes, HTTP utilities and more. No registration required.`;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const adSenseClientId = normalizeAdSenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);
const enableVercelObservability =
  process.env.VERCEL === '1' || process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true';

// Comma-separated absolute https profile URLs used for Organization.sameAs.
// Emitted only when present, so the schema never advertises an empty array.
const socialProfiles = (process.env.NEXT_PUBLIC_SOCIAL_PROFILES || '')
  .split(',')
  .map((value) => value.trim())
  .filter((value) => /^https:\/\//i.test(value));

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

/** Site-wide defaults inherited by every page, exported by each root layout. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: '%s | DevsTools',
  },
  description:
    `DevsTools offers ${toolCountLabel} free online developer tools for JSON formatting, Base64 encoding, UUIDs, hashing, regex testing, QR codes and more. Private and client-side.`,
  authors: [{ name: 'DevsTools' }],
  creator: 'DevsTools',
  publisher: 'DevsTools',
  alternates: {
    canonical: '/',
    languages: getHreflangAlternates('/', siteUrl),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: getOpenGraphAlternateLocales('en'),
    url: siteUrl,
    siteName: 'DevsTools',
    title: homeTitle,
    description: homeSocialDescription,
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
    title: homeTitle,
    description: homeSocialDescription,
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

export function RootDocument({
  lang,
  Dictionary,
  children,
}: {
  lang: Language;
  /**
   * Client component that supplies the active locale's UI dictionary (see LanguageContext).
   * Each root layout passes its own so a page's JS only contains its language:
   * '@/translations/client/en' for English layouts, '.../LocaleDictionary' for /[locale].
   */
  Dictionary: ComponentType<{ lang: Language; children: React.ReactNode }>;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
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
        {/* Theme must be applied before first paint to avoid a light/dark flash. */}
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
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
              alternateName: homeTitle,
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
                url: `${siteUrl}/icon-1200.png`,
                width: 1200,
                height: 1200,
              },
              ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
            }),
          }}
        />
        {/* AdSense loader origin. crossOrigin must match AdSenseScriptLoader's CORS script fetch
            (script.crossOrigin = 'anonymous') or the preconnected socket is not reused. */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.className} antialiased text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <Dictionary lang={lang}>
          <Providers initialLocale={lang}>
            <ServiceWorkerRegister />
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </Dictionary>
        {adSenseClientId && <AdSenseScripts clientId={adSenseClientId} />}
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

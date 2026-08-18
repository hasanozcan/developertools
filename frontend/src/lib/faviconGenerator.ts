export interface FaviconSpec {
  size: number;
  name: string;
  purpose: string;
}

export const FAVICON_SIZES: FaviconSpec[] = [
  { size: 16, name: 'favicon-16x16.png', purpose: 'Standard Browser Tab' },
  { size: 32, name: 'favicon-32x32.png', purpose: 'Retina Browser Tab' },
  { size: 48, name: 'favicon-48x48.png', purpose: 'Desktop Shortcut' },
  { size: 180, name: 'apple-touch-icon.png', purpose: 'iOS Apple Touch Icon' },
  { size: 192, name: 'android-chrome-192x192.png', purpose: 'Android Web App' },
  { size: 512, name: 'android-chrome-512x512.png', purpose: 'Android Splash / PWA' },
];

export function generateFaviconHtmlTags(): string {
  return `<!-- Favicon & App Icons -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#ffffff">`;
}

export function generateWebManifest(appName: string = 'My App'): string {
  return JSON.stringify(
    {
      name: appName,
      short_name: appName,
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
    },
    null,
    2,
  );
}

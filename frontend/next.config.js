/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.devstools.app' }],
        destination: 'https://devstools.app/:path*',
        permanent: true,
      },
      {
        source: '/tools/converters/json-csv',
        destination: '/tools/json/json-csv',
        permanent: true,
      },
      {
        source: '/tools/converters/yaml-json',
        destination: '/tools/json/yaml-json',
        permanent: true,
      },
      {
        source: '/tools/converters/image-to-base64',
        destination: '/tools/encoding/image-to-base64',
        permanent: true,
      },
      {
        source: '/tools/text/lorem-ipsum',
        destination: '/tools/generators/lorem-ipsum',
        permanent: true,
      },
      {
        source: '/tools/text/slug-generator',
        destination: '/tools/generators/slug-generator',
        permanent: true,
      },
      {
        source: '/tools/utilities/qr-code',
        destination: '/tools/generators/qr-code',
        permanent: true,
      },
      {
        source: '/tools/utilities/markdown-preview',
        destination: '/tools/text/markdown-preview',
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);

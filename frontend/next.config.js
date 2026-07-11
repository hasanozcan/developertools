/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.devstools.app' }],
        destination: 'https://devstools.app/:path*',
        permanent: true,
      },
      { source: '/tools/converters/json-csv', destination: '/tools/json/json-csv', permanent: true },
      { source: '/tools/converters/yaml-json', destination: '/tools/json/yaml-json', permanent: true },
      { source: '/tools/converters/image-to-base64', destination: '/tools/encoding/image-to-base64', permanent: true },
      { source: '/tools/text/lorem-ipsum', destination: '/tools/generators/lorem-ipsum', permanent: true },
      { source: '/tools/text/slug-generator', destination: '/tools/generators/slug-generator', permanent: true },
      { source: '/tools/utilities/qr-code', destination: '/tools/generators/qr-code', permanent: true },
      { source: '/tools/utilities/markdown-preview', destination: '/tools/text/markdown-preview', permanent: true },
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

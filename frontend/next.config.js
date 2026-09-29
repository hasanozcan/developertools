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
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
];

// Legacy `?lang=xx` links predate locale-prefixed routes. Redirect them on the
// server so crawlers see a 301 instead of relying on the client-side fallback.
// Only un-prefixed paths that actually have locale variants are matched, so an
// already-prefixed URL (e.g. /tr/tools/...?lang=tr) can never redirect again.
// Next.js always forwards the request query to the destination, so the target
// keeps `lang=xx`; the page canonical omits it and LanguageContext strips it.
// `lang=en` is intentionally not redirected here: the destination would be the
// same URL (the query cannot be dropped), which would loop.
const LEGACY_LANG_QUERY = [{ type: 'query', key: 'lang', value: '(?<lang>tr|de|es|fr|ru|zh)' }];
const legacyLangRedirects = [
  { source: '/', destination: '/:lang' },
  { source: '/tools/:path+', destination: '/:lang/tools/:path+' },
  { source: '/collections/:path*', destination: '/:lang/collections/:path*' },
  { source: '/for/:path*', destination: '/:lang/for/:path*' },
  { source: '/:page(about|privacy|terms|contact)', destination: '/:lang/:page' },
].map((rule) => ({ ...rule, has: LEGACY_LANG_QUERY, permanent: true }));

// Tools that duplicated another tool's purpose (keyword cannibalization) were merged into
// a single primary page. The old URLs keep working through permanent redirects, for the
// default locale and every localized prefix, whichever category segment they are requested under.
const MERGED_TOOL_REDIRECTS = [
  { from: 'docker-compose-to-kubernetes', to: '/tools/converters/docker-compose-to-k8s' },
  { from: 'json-to-csharp-class', to: '/tools/converters/json-to-csharp' },
  { from: 'json-to-kotlin-class', to: '/tools/converters/json-to-kotlin' },
  { from: 'json-to-swift-struct', to: '/tools/converters/json-to-swift' },
  { from: 'json-to-python-pydantic', to: '/tools/converters/json-to-pydantic' },
  { from: 'json-to-golang-models', to: '/tools/converters/json-to-go-struct' },
  { from: 'json-to-rust-types', to: '/tools/converters/json-to-rust-serde' },
  { from: 'json-path-query-tester', to: '/tools/json/jsonpath-tester' },
  { from: 'html-entities-converter', to: '/tools/encoding/html-entity' },
  { from: 'url-safe-base64-converter', to: '/tools/encoding/base64url-encoder' },
].flatMap(({ from, to }) => [
  { source: `/tools/:category/${from}`, destination: to, permanent: true },
  {
    source: `/:locale(tr|de|es|fr|ru|zh)/tools/:category/${from}`,
    destination: `/:locale${to}`,
    permanent: true,
  },
]);

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // app/(default)/layout.tsx and app/[locale]/layout.tsx are separate root layouts
    // (so the static HTML carries the right <html lang>); unmatched URLs therefore
    // render app/global-not-found.tsx instead of a root-level not-found.tsx.
    globalNotFound: true,
  },
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
      ...legacyLangRedirects,
      ...MERGED_TOOL_REDIRECTS,
      ...[
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
      ].flatMap((rule) =>
        rule.source.startsWith('/tools/')
          ? [
              rule,
              {
                ...rule,
                source: `/:locale(tr|de|es|fr|ru|zh)${rule.source}`,
                destination: `/:locale${rule.destination}`,
              },
            ]
          : [rule],
      ),
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

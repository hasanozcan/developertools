import { ImageResponse } from 'next/og';
import { findCatalogTool, toolCatalog } from '@/lib/api';

export const runtime = 'nodejs';
export const alt = 'DevsTools developer tool preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface ImageProps {
  params: Promise<{ category: string; tool: string }>;
}

const CATEGORY_GLYPHS: Record<string, string> = {
  crypto: 'HASH',
  json: '{ }',
  encoding: '01',
  converters: '<->',
  formatters: '</>',
  generators: 'GEN',
  text: 'Aa',
  utilities: 'CLI',
};

function getToolGlyph(slug: string, fallback: string): string {
  const s = slug.toLowerCase();
  if (s.includes('jwt')) return 'JWT';
  if (s.includes('qr-code') || s.includes('qrcode')) return 'QR';
  if (s.includes('bcrypt') || s.includes('argon2') || s.includes('password')) return 'KEY';
  if (s.includes('sha') || s.includes('md5') || s.includes('checksum') || s.includes('keccak')) return 'SHA';
  if (s.includes('hmac') || s.includes('totp') || s.includes('bip39') || s.includes('pkce')) return 'SIG';
  if (s.includes('color') || s.includes('palette') || s.includes('gradient') || s.includes('css')) return 'CSS';
  if (s.includes('regex')) return '.*';
  if (s.includes('cron')) return '* *';
  if (s.includes('sql') || s.includes('database') || s.includes('mongo') || s.includes('postgres')) return 'SQL';
  if (s.includes('markdown') || s.includes('diff')) return 'MD';
  if (s.includes('uuid') || s.includes('nanoid') || s.includes('slug')) return 'ID';
  if (s.includes('docker') || s.includes('kubernetes') || s.includes('kube') || s.includes('nginx')) return 'OPS';
  if (s.includes('curl') || s.includes('http') || s.includes('cors') || s.includes('dns')) return 'NET';
  if (s.includes('cert') || s.includes('x509') || s.includes('ssl') || s.includes('tls') || s.includes('ssh')) return 'TLS';
  if (s.includes('json')) return '{ }';
  if (s.includes('yaml')) return 'YML';
  if (s.includes('base64') || s.includes('binary') || s.includes('hex') || s.includes('unicode')) return '01';
  if (s.includes('html') || s.includes('xml') || s.includes('jsx')) return '</>';
  if (s.includes('svg') || s.includes('image') || s.includes('pdf')) return 'IMG';
  return fallback;
}

export default async function ToolOpenGraphImage({ params }: ImageProps) {
  const { category, tool: toolSlug } = await params;
  const tool = findCatalogTool(toolSlug);
  const toolName = tool?.name || toolSlug.replace(/-/g, ' ');
  const categoryName = tool?.categoryName || category.replace(/-/g, ' ');
  const description =
    tool?.shortDescription || 'Client-side browser developer utility with deterministic local execution.';
  const totalCount = toolCatalog.length > 0 ? toolCatalog.length : 476;

  const fallbackGlyph = CATEGORY_GLYPHS[category.toLowerCase()] || '</>';
  const toolGlyph = getToolGlyph(toolSlug, fallbackGlyph);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: '#FAFAFA',
          backgroundColor: '#09090B',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* 1px Structural Frame */}
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: '1px solid #27272A',
            display: 'flex',
          }}
        />

        {/* Corner + Registration Marks */}
        <div style={{ position: 'absolute', top: 36, left: 28, width: 17, height: 1, backgroundColor: '#52525B', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 28, left: 36, width: 1, height: 17, backgroundColor: '#52525B', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 36, right: 28, width: 17, height: 1, backgroundColor: '#52525B', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 28, right: 36, width: 1, height: 17, backgroundColor: '#52525B', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 36, left: 28, width: 17, height: 1, backgroundColor: '#52525B', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 28, left: 36, width: 1, height: 17, backgroundColor: '#52525B', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 36, right: 28, width: 17, height: 1, backgroundColor: '#52525B', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 28, right: 36, width: 1, height: 17, backgroundColor: '#52525B', display: 'flex' }} />

        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '12px 18px',
            backgroundColor: '#111114',
            border: '1px solid #27272A',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7.5" fill="#09090B" />
              <rect x="1.5" y="1.5" width="29" height="29" rx="6" fill="#18181B" stroke="#27272A" strokeWidth="1" />
              <path d="M9 9.5L15.5 16L9 22.5L7.3 20.8L12.1 16L7.3 11.2Z" fill="#FAFAFA" />
              <rect x="17" y="19.75" width="7.75" height="2.75" rx="0.4" fill="#10B981" />
            </svg>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '1.5px',
                color: '#A1A1AA',
              }}
            >
              [ DEVSTOOLS // CLIENT-SIDE WORKBENCH ]
            </span>
          </div>

          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '1.4px',
              color: '#10B981',
            }}
          >
            {categoryName.toUpperCase()}
          </span>
        </div>

        {/* Center Spec Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            padding: '34px 38px',
            backgroundColor: '#111114',
            border: '1px solid #27272A',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                minWidth: 72,
                backgroundColor: '#18181B',
                border: '1px solid #27272A',
                color: '#10B981',
                fontFamily: 'monospace',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {toolGlyph}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: toolName.length > 34 ? 44 : 54,
                lineHeight: 1.12,
                fontWeight: 700,
                color: '#FAFAFA',
                letterSpacing: '-1.5px',
              }}
            >
              {toolName}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 22,
              lineHeight: 1.4,
              color: '#A1A1AA',
              paddingLeft: 94,
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom Spec Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: 20,
            borderTop: '1px solid #27272A',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '1.6px',
              color: '#A1A1AA',
            }}
          >
            {`${totalCount} TOOLS • ZERO SERVER UPLOADS • DEVSTOOLS.APP`}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, backgroundColor: '#10B981', display: 'flex' }} />
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '1.4px',
                color: '#FAFAFA',
              }}
            >
              LOCAL // READY
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

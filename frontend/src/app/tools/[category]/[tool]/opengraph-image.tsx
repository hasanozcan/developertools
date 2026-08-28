import { ImageResponse } from 'next/og';
import { findCatalogTool } from '@/lib/api';

export const runtime = 'nodejs';
export const alt = 'DevsTools developer tool preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface ImageProps {
  params: Promise<{ category: string; tool: string }>;
}

interface CategoryTheme {
  primary: string;
  secondary: string;
  glow: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
  iconSymbol: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  crypto: {
    primary: '#10b981',
    secondary: '#06b6d4',
    glow: 'rgba(16, 185, 129, 0.22)',
    tagBg: 'rgba(16, 185, 129, 0.15)',
    tagBorder: 'rgba(16, 185, 129, 0.4)',
    tagText: '#34d399',
    iconSymbol: '🔒',
  },
  json: {
    primary: '#f59e0b',
    secondary: '#f97316',
    glow: 'rgba(245, 158, 11, 0.22)',
    tagBg: 'rgba(245, 158, 11, 0.15)',
    tagBorder: 'rgba(245, 158, 11, 0.4)',
    tagText: '#fbbf24',
    iconSymbol: '{ }',
  },
  encoding: {
    primary: '#6366f1',
    secondary: '#a855f7',
    glow: 'rgba(99, 102, 241, 0.22)',
    tagBg: 'rgba(99, 102, 241, 0.15)',
    tagBorder: 'rgba(99, 102, 241, 0.4)',
    tagText: '#a5b4fc',
    iconSymbol: '01',
  },
  converters: {
    primary: '#ec4899',
    secondary: '#d946ef',
    glow: 'rgba(236, 72, 153, 0.22)',
    tagBg: 'rgba(236, 72, 153, 0.15)',
    tagBorder: 'rgba(236, 72, 153, 0.4)',
    tagText: '#f472b6',
    iconSymbol: '⇄',
  },
  formatters: {
    primary: '#0ea5e9',
    secondary: '#3b82f6',
    glow: 'rgba(14, 165, 233, 0.22)',
    tagBg: 'rgba(14, 165, 233, 0.15)',
    tagBorder: 'rgba(14, 165, 233, 0.4)',
    tagText: '#38bdf8',
    iconSymbol: '</>',
  },
  generators: {
    primary: '#f43f5e',
    secondary: '#fb923c',
    glow: 'rgba(244, 63, 94, 0.22)',
    tagBg: 'rgba(244, 63, 94, 0.15)',
    tagBorder: 'rgba(244, 63, 94, 0.4)',
    tagText: '#fb7185',
    iconSymbol: '⚡',
  },
  text: {
    primary: '#14b8a6',
    secondary: '#34d399',
    glow: 'rgba(20, 184, 166, 0.22)',
    tagBg: 'rgba(20, 184, 166, 0.15)',
    tagBorder: 'rgba(20, 184, 166, 0.4)',
    tagText: '#2dd4bf',
    iconSymbol: 'Aa',
  },
  utilities: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    glow: 'rgba(139, 92, 246, 0.22)',
    tagBg: 'rgba(139, 92, 246, 0.15)',
    tagBorder: 'rgba(139, 92, 246, 0.4)',
    tagText: '#c4b5fd',
    iconSymbol: '🛠️',
  },
};

const DEFAULT_THEME: CategoryTheme = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  glow: 'rgba(59, 130, 246, 0.22)',
  tagBg: 'rgba(59, 130, 246, 0.15)',
  tagBorder: 'rgba(59, 130, 246, 0.4)',
  tagText: '#93c5fd',
  iconSymbol: '</>',
};

function getToolIcon(slug: string, fallback: string): string {
  const s = slug.toLowerCase();
  if (s.includes('jwt')) return '🔑';
  if (s.includes('qr-code') || s.includes('qrcode')) return '📱';
  if (s.includes('bcrypt') || s.includes('argon2') || s.includes('password')) return '🔐';
  if (s.includes('sha') || s.includes('md5') || s.includes('checksum') || s.includes('keccak')) return '🛡️';
  if (s.includes('hmac') || s.includes('totp') || s.includes('bip39') || s.includes('pkce')) return '🔏';
  if (s.includes('color') || s.includes('palette') || s.includes('gradient')) return '🎨';
  if (s.includes('css') || s.includes('tailwind') || s.includes('flexbox') || s.includes('bezier')) return '🎨';
  if (s.includes('regex') || s.includes('inspect') || s.includes('analyzer')) return '🔍';
  if (s.includes('cron')) return '⏰';
  if (s.includes('sql') || s.includes('database') || s.includes('mongo') || s.includes('postgres')) return '🗄️';
  if (s.includes('markdown') || s.includes('diff') || s.includes('word-count') || s.includes('text')) return '📝';
  if (s.includes('uuid') || s.includes('nanoid') || s.includes('slug')) return '🏷️';
  if (s.includes('docker') || s.includes('kubernetes') || s.includes('kube') || s.includes('helm') || s.includes('caddy') || s.includes('nginx')) return '🐳';
  if (s.includes('curl') || s.includes('http') || s.includes('cors') || s.includes('dns') || s.includes('utm')) return '🌐';
  if (s.includes('cert') || s.includes('x509') || s.includes('ssl') || s.includes('tls') || s.includes('csr') || s.includes('ssh')) return '📜';
  if (s.includes('subnet') || s.includes('cidr') || s.includes('ipv6') || s.includes('port') || s.includes('bandwidth')) return '🖧';
  if (s.includes('json')) return '{ }';
  if (s.includes('yaml')) return '📄';
  if (s.includes('base64') || s.includes('binary') || s.includes('hex') || s.includes('unicode') || s.includes('escape')) return '01';
  if (s.includes('html') || s.includes('xml') || s.includes('jsx') || s.includes('format')) return '</>';
  if (s.includes('svg') || s.includes('image') || s.includes('exif') || s.includes('pdf')) return '🖼️';
  return fallback;
}

export default async function ToolOpenGraphImage({ params }: ImageProps) {
  const { category, tool: toolSlug } = await params;
  const tool = findCatalogTool(toolSlug);
  const toolName = tool?.name || toolSlug.replace(/-/g, ' ');
  const categoryName = tool?.categoryName || category.replace(/-/g, ' ');
  const description =
    tool?.shortDescription || 'Free online browser-based developer utility with instant execution.';

  const theme = CATEGORY_THEMES[category.toLowerCase()] || DEFAULT_THEME;
  const iconSymbol = getToolIcon(toolSlug, theme.iconSymbol);

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
          padding: '48px 56px',
          color: '#f8fafc',
          backgroundColor: '#090d16',
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(30, 41, 59, 0.5) 0%, transparent 60%), radial-gradient(circle at 90% 80%, rgba(15, 23, 42, 0.7) 0%, transparent 60%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Category Ambient Glow 1 */}
        <div
          style={{
            position: 'absolute',
            width: 580,
            height: 580,
            right: -120,
            top: -140,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Category Ambient Glow 2 */}
        <div
          style={{
            position: 'absolute',
            width: 460,
            height: 460,
            left: -120,
            bottom: -160,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Decorative Grid Mesh */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',

          }}
        >
          {/* Brand Logo & Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                color: '#ffffff',
                fontSize: 22,
                fontWeight: 900,
                boxShadow: '0 4px 16px rgba(56, 189, 248, 0.35)',
              }}
            >
              {'</>'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.5px',
                }}
              >
                DevsTools
              </span>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>
                devstools.app
              </span>
            </div>
          </div>

          {/* Category Badge Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 999,
              backgroundColor: theme.tagBg,
              border: `1.5px solid ${theme.tagBorder}`,
              color: theme.tagText,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            <span>{categoryName}</span>
          </div>
        </div>

        {/* Center Card Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: '32px 36px',
            borderRadius: 24,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
            position: 'relative',

          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Tool Icon Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                minWidth: 72,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                color: '#ffffff',
                fontSize: 32,
                fontWeight: 900,
                boxShadow: `0 8px 24px ${theme.glow}`,
              }}
            >
              {iconSymbol}
            </div>

            {/* Tool Title */}
            <div
              style={{
                display: 'flex',
                fontSize: toolName.length > 35 ? 46 : 56,
                lineHeight: 1.15,
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-1px',
              }}
            >
              {toolName}
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              lineHeight: 1.4,
              color: '#94a3b8',
              marginTop: 4,
              paddingLeft: 92,
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom Bar: Value Props & Trust Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',

          }}
        >
          {/* Trust Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <span>⚡</span> 100% Client-Side
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <span>🔒</span> Zero Server Storage
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <span>🚀</span> Instant & Free
            </div>
          </div>

          {/* Action indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 16,
              fontWeight: 700,
              color: theme.tagText,
            }}
          >
            <span>Open in DevsTools</span>
            <span>→</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

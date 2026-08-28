import { ImageResponse } from 'next/og';
import { toolCatalog } from '@/lib/api';

export const runtime = 'nodejs';
export const alt = 'DevsTools - 500+ Free Online Developer Tools';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const toolCount = toolCatalog.length > 0 ? toolCatalog.length : 500;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px 56px',
          backgroundColor: '#090d16',
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.18) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
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

        {/* Ambient Glow Spheres */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            right: -120,
            width: 550,
            height: 550,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',

          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 999,
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            <span>⚡ ALL-IN-ONE DEVELOPER HUB</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 20px',
              borderRadius: 999,
              backgroundColor: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              color: '#c084fc',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <span>{toolCount}+ Free Tools</span>
          </div>
        </div>

        {/* Center Hero Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',

          }}
        >
          {/* Logo Mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: 26,
              background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
              boxShadow: '0 12px 36px rgba(56, 189, 248, 0.45)',
              marginBottom: 20,
              fontSize: 48,
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            {'</>'}
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              fontSize: 70,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            DevsTools
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              fontWeight: 500,
              color: '#94a3b8',
              marginBottom: 28,
            }}
          >
            Free Online Developer Tools · Fast, Secure & Private
          </div>

          {/* Category Chips */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 1000,
            }}
          >
            {[
              { label: 'JSON Tools', color: '#f59e0b' },
              { label: 'Crypto & Hash', color: '#10b981' },
              { label: 'Encoders', color: '#6366f1' },
              { label: 'Converters', color: '#ec4899' },
              { label: 'Formatters', color: '#0ea5e9' },
              { label: 'Generators', color: '#f43f5e' },
              { label: 'Regex & Text', color: '#14b8a6' },
              { label: 'Utilities', color: '#8b5cf6' },
            ].map((tag) => (
              <div
                key={tag.label}
                style={{
                  display: 'flex',
                  padding: '7px 18px',
                  borderRadius: 12,
                  backgroundColor: `${tag.color}18`,
                  border: `1px solid ${tag.color}44`,
                  color: tag.color,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {tag.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',

          }}
        >
          {/* Feature Badges */}
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
              <span>🚀</span> No Registration
            </div>
          </div>

          {/* URL Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 8,
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            devstools.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

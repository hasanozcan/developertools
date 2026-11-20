import { ImageResponse } from 'next/og';
import { toolCatalog } from '@/lib/api';

export const runtime = 'nodejs';
export const alt = 'About DevsTools - Client-Side Developer Workbench';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function AboutOpenGraphImage() {
  const toolCount = toolCatalog.length > 0 ? toolCatalog.length : 467;

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
            <div style={{ width: 8, height: 8, backgroundColor: '#10B981', display: 'flex' }} />
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
            SPEC // ABOUT
          </span>
        </div>

        {/* Center Spec Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: '36px 40px',
            backgroundColor: '#111114',
            border: '1px solid #27272A',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <svg width="76" height="76" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7.5" fill="#09090B" />
              <rect x="1.5" y="1.5" width="29" height="29" rx="6" fill="#18181B" stroke="#27272A" strokeWidth="1" />
              <path d="M9 9.5L15.5 16L9 22.5L7.3 20.8L12.1 16L7.3 11.2Z" fill="#FAFAFA" />
              <rect x="17" y="19.75" width="7.75" height="2.75" rx="0.4" fill="#10B981" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 56,
                  fontWeight: 700,
                  color: '#FAFAFA',
                  letterSpacing: '-1.5px',
                  lineHeight: 1.08,
                }}
              >
                About DevsTools
              </div>
              <div style={{ display: 'flex', fontSize: 23, color: '#A1A1AA', lineHeight: 1.35 }}>
                Deterministic, browser-native developer utilities with zero server payloads and zero telemetry tracking.
              </div>
            </div>
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
            {`${toolCount} TOOLS • ZERO SERVER UPLOADS • DEVSTOOLS.APP`}
          </span>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '1.4px',
              color: '#10B981',
            }}
          >
            ARCHITECTURE
          </span>
        </div>
      </div>
    ),
    size,
  );
}

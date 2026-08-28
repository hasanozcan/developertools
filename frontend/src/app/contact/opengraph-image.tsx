import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Contact DevsTools - Support & Feedback';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function ContactOpenGraphImage() {
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
            'radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.18) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.2) 0%, transparent 50%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
        }}
      >
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                color: '#ffffff',
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              {'</>'}
            </div>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#ffffff' }}>DevsTools</span>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '8px 18px',
              borderRadius: 999,
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34d399',
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            <span>CONTACT & FEEDBACK</span>
          </div>
        </div>

        {/* Center Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: '36px 40px',
            borderRadius: 24,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 76,
                height: 76,
                borderRadius: 22,
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                color: '#ffffff',
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              ✉️
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 52, fontWeight: 800, color: '#ffffff', letterSpacing: '-1px' }}>
                Get in Touch
              </div>
              <div style={{ fontSize: 22, color: '#94a3b8', marginTop: 6 }}>
                Have a tool suggestion, feedback, or need help? Reach out to the DevsTools team.
              </div>
            </div>
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
          <div style={{ display: 'flex', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                padding: '6px 14px',
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#cbd5e1',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              💬 Community Driven
            </div>
            <div
              style={{
                display: 'flex',
                padding: '6px 14px',
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#cbd5e1',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              ⚡ Fast Response
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#34d399' }}>devstools.app</div>
        </div>
      </div>
    ),
    size,
  );
}

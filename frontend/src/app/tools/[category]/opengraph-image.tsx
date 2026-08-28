import { ImageResponse } from 'next/og';
import { categoryCatalog, toolCatalog } from '@/lib/api';

export const runtime = 'nodejs';
export const alt = 'DevsTools category tools preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface ImageProps {
  params: Promise<{ category: string }>;
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

export default async function CategoryOpenGraphImage({ params }: ImageProps) {
  const { category: categorySlug } = await params;
  const categoryInfo = categoryCatalog.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase(),
  );

  const categoryName = categoryInfo?.name || categorySlug.replace(/-/g, ' ');
  const description =
    categoryInfo?.description || 'Browse all free developer tools in this category.';

  const categoryTools = toolCatalog.filter(
    (t) => t.categorySlug.toLowerCase() === categorySlug.toLowerCase(),
  );
  const toolCount = categoryTools.length > 0 ? categoryTools.length : (categoryInfo?.toolCount || 10);
  const previewTools = categoryTools.slice(0, 5).map((t) => t.name);

  const theme = CATEGORY_THEMES[categorySlug.toLowerCase()] || DEFAULT_THEME;

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
        {/* Category Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            right: -100,
            top: -120,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 480,
            height: 480,
            left: -140,
            bottom: -150,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Grid Mesh */}
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

          {/* Tool Count Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: theme.tagBg,
              border: `1.5px solid ${theme.tagBorder}`,
              color: theme.tagText,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            <span>{toolCount}+ Free Tools</span>
          </div>
        </div>

        {/* Main Content Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: '36px 40px',
            borderRadius: 24,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
            position: 'relative',

          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Category Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 76,
                height: 76,
                minWidth: 76,
                borderRadius: 22,
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                color: '#ffffff',
                fontSize: 34,
                fontWeight: 900,
                boxShadow: `0 8px 24px ${theme.glow}`,
              }}
            >
              {theme.iconSymbol}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 54,
                  lineHeight: 1.15,
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-1px',
                }}
              >
                {categoryName}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 22,
                  color: '#94a3b8',
                  marginTop: 6,
                }}
              >
                {description}
              </div>
            </div>
          </div>

          {/* Sample Tool Pills */}
          {previewTools.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 10,
                paddingLeft: 96,
              }}
            >
              {previewTools.map((name) => (
                <div
                  key={name}
                  style={{
                    display: 'flex',
                    padding: '6px 14px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#e2e8f0',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {name}
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  padding: '6px 14px',
                  borderRadius: 8,
                  backgroundColor: theme.tagBg,
                  border: `1px solid ${theme.tagBorder}`,
                  color: theme.tagText,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                +{toolCount - previewTools.length} more
              </div>
            </div>
          )}
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
              <span>🔒</span> Private & Secure
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
            <span>Explore Category</span>
            <span>→</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

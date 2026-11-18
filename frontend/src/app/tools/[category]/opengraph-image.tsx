import { ImageResponse } from 'next/og';
import { categoryCatalog, toolCatalog } from '@/lib/api';

export const runtime = 'nodejs';
export const alt = 'DevsTools category tools preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface ImageProps {
  params: Promise<{ category: string }>;
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

export default async function CategoryOpenGraphImage({ params }: ImageProps) {
  const { category: categorySlug } = await params;
  const categoryInfo = categoryCatalog.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase(),
  );

  const categoryName = categoryInfo?.name || categorySlug.replace(/-/g, ' ');
  const description =
    categoryInfo?.description || 'Browse client-side developer utilities in this category.';

  const categoryTools = toolCatalog.filter(
    (t) => t.categorySlug.toLowerCase() === categorySlug.toLowerCase(),
  );
  const categoryCount =
    categoryTools.length > 0 ? categoryTools.length : categoryInfo?.toolCount || 10;
  const totalCount = toolCatalog.length > 0 ? toolCatalog.length : 476;
  const previewTools = categoryTools.slice(0, 4).map((t) => t.name);
  const glyph = CATEGORY_GLYPHS[categorySlug.toLowerCase()] || '</>';

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

        {/* Top Bar */}
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
            {`${categoryCount} TOOLS // ${categorySlug.toUpperCase()}`}
          </span>
        </div>

        {/* Center Spec Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: '32px 36px',
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
              {glyph}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 52,
                  lineHeight: 1.1,
                  fontWeight: 700,
                  color: '#FAFAFA',
                  letterSpacing: '-1.5px',
                }}
              >
                {categoryName}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 22,
                  color: '#A1A1AA',
                  lineHeight: 1.35,
                }}
              >
                {description}
              </div>
            </div>
          </div>

          {previewTools.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {previewTools.map((name) => (
                <div
                  key={name}
                  style={{
                    display: 'flex',
                    padding: '6px 14px',
                    backgroundColor: '#18181B',
                    border: '1px solid #27272A',
                    color: '#E4E4E7',
                    fontFamily: 'monospace',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {name}
                </div>
              ))}
              {categoryCount > previewTools.length && (
                <div
                  style={{
                    display: 'flex',
                    padding: '6px 14px',
                    backgroundColor: '#18181B',
                    border: '1px solid #27272A',
                    color: '#10B981',
                    fontFamily: 'monospace',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {`+${categoryCount - previewTools.length} MORE`}
                </div>
              )}
            </div>
          )}
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
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '1.4px',
              color: '#10B981',
            }}
          >
            CATEGORY INDEX
          </span>
        </div>
      </div>
    ),
    size,
  );
}

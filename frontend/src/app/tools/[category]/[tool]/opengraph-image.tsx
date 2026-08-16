import { ImageResponse } from 'next/og';
import { findCatalogTool } from '@/lib/api';

export const runtime = 'nodejs';
export const alt = 'DevsTools developer tool preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface ImageProps {
  params: Promise<{ category: string; tool: string }>;
}

export default async function ToolOpenGraphImage({ params }: ImageProps) {
  const { category, tool: toolSlug } = await params;
  const tool = findCatalogTool(toolSlug);
  const toolName = tool?.name || toolSlug.replace(/-/g, ' ');
  const categoryName = tool?.categoryName || category.replace(/-/g, ' ');
  const description =
    tool?.shortDescription || 'A free browser-based developer utility from DevsTools.';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        color: '#f8fafc',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          right: -150,
          top: -180,
          borderRadius: 999,
          background: 'rgba(56, 189, 248, 0.16)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          left: -180,
          bottom: -230,
          borderRadius: 999,
          background: 'rgba(167, 139, 250, 0.2)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 700 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 62,
              height: 62,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)',
              fontSize: 28,
            }}
          >
            {'</>'}
          </div>
          DevsTools
        </div>
        <div
          style={{
            display: 'flex',
            padding: '12px 22px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.16)',
            fontSize: 20,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          {categoryName}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 930 }}>
        <div style={{ display: 'flex', fontSize: 72, lineHeight: 1.05, fontWeight: 800 }}>
          {toolName}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.35,
            color: '#cbd5e1',
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#bae6fd' }}
      >
        <div style={{ display: 'flex' }}>Free · Local processing · No registration</div>
        <div style={{ display: 'flex' }}>devstools.app</div>
      </div>
    </div>,
    size,
  );
}

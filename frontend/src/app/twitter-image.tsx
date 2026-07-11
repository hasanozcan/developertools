import { ImageResponse } from 'next/og';
import { toolCatalog } from '@/lib/api';

export const runtime = 'edge';
export const alt = 'DevsTools - Free Online Developer Tools';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                    fontFamily: 'system-ui, sans-serif',
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
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Decorative circles */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        opacity: 0.1,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -150,
                        right: -100,
                        width: 500,
                        height: 500,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        opacity: 0.1,
                    }}
                />

                {/* Logo */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 120,
                        height: 120,
                        borderRadius: 24,
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        marginBottom: 40,
                    }}
                >
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <path d="M15 22L5 30L15 38" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M45 22L55 30L45 38" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="30" cy="30" r="6" fill="white" />
                    </svg>
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: 16,
                    }}
                >
                    DevsTools
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: 28,
                        color: '#94a3b8',
                        marginBottom: 48,
                    }}
                >
                    Free Online Developer Tools
                </div>

                {/* Tags */}
                <div
                    style={{
                        display: 'flex',
                        gap: 16,
                        marginBottom: 48,
                    }}
                >
                    {[
                        { label: 'JSON', color: '#3b82f6' },
                        { label: 'Base64', color: '#8b5cf6' },
                        { label: 'UUID', color: '#10b981' },
                        { label: 'Hash', color: '#f59e0b' },
                        { label: 'Regex', color: '#ef4444' },
                        { label: 'QR Code', color: '#06b6d4' },
                        { label: '& More', color: '#6b7280' },
                    ].map((tag) => (
                        <div
                            key={tag.label}
                            style={{
                                display: 'flex',
                                padding: '8px 20px',
                                borderRadius: 20,
                                backgroundColor: `${tag.color}33`,
                                color: tag.color,
                                fontSize: 16,
                                fontWeight: 500,
                            }}
                        >
                            {tag.label}
                        </div>
                    ))}
                </div>

                {/* Bottom text */}
                <div
                    style={{
                        fontSize: 20,
                        color: '#64748b',
                        marginBottom: 16,
                    }}
                >
                    {toolCatalog.length} Free Tools - No Registration - 100% Client-Side
                </div>

                {/* URL */}
                <div
                    style={{
                        fontSize: 18,
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    devstools.app
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

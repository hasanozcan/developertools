'use client';

import { useEffect, useState } from 'react';
import { getRandomPromotion, type Promotion } from '@/lib/promotions';

interface ContentHighlightProps {
    /** Layout variant – maps to promotion pool */
    variant: 'horizontal' | 'vertical' | 'rectangle';
    className?: string;
}

/**
 * Self-hosted promotional content component.
 *
 * Intentionally avoids class names, IDs, data-attributes and file paths
 * that match common content-filtering rules so that it renders even when
 * a browser extension tries to hide third-party ad elements.
 *
 * Images are served through /api/content/[id] instead of /ads/* to
 * prevent URL-pattern blocking.
 */
export default function ContentHighlight({
    variant,
    className = '',
}: ContentHighlightProps) {
    const [item, setItem] = useState<Promotion | null>(null);

    useEffect(() => {
        setItem(getRandomPromotion(variant));
    }, [variant]);

    if (!item) return null;

    const imageSrc = `/api/content/${item.imageId}`;

    return (
        <div className={`content-highlight relative overflow-hidden ${className}`}>
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full overflow-hidden rounded-lg"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageSrc}
                    alt={item.alt}
                    className="w-full h-full object-contain rounded-lg"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    loading="lazy"
                />
            </a>
        </div>
    );
}

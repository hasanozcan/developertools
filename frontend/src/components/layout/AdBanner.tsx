'use client';

import AdSense from '@/components/common/AdSense';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  return <AdSense slot={slot} format={format} className={`rounded-lg ${className}`} />;
}

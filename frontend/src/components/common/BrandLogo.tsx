import React from 'react';

export interface BrandLogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * Bespoke geometric brand mark: obsidian precision keycap/terminal frame
 * with an architectural `>_` prompt monogram and Signal Emerald cursor bar.
 */
export function BrandLogoMark({ size = 32, className }: BrandLogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7.5" fill="#09090B" />
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="6"
        fill="#18181B"
        stroke="#27272A"
        strokeWidth="1"
      />
      <path
        d="M9 9.5L15.5 16L9 22.5L7.3 20.8L12.1 16L7.3 11.2Z"
        fill="#FAFAFA"
      />
      <rect x="17" y="19.75" width="7.75" height="2.75" rx="0.4" fill="#10B981" />
    </svg>
  );
}

export interface BrandLogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

/**
 * Primary brand lockup pairing the `BrandLogoMark` with crisp wordmark typography.
 */
export function BrandLogo({
  size = 32,
  showWordmark = true,
  className = '',
  wordmarkClassName = '',
}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <BrandLogoMark size={size} className="shrink-0" />
      {showWordmark && (
        <span
          className={`font-sans text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 ${wordmarkClassName}`.trim()}
        >
          DevsTools
        </span>
      )}
    </span>
  );
}

export default BrandLogo;

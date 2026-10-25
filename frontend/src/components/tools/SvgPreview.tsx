import { sanitizeSvg } from '@/lib/svgToPng';

export default function SvgPreview({ svg, alt, className = 'max-w-full max-h-full object-contain' }: {
  svg: string;
  alt: string;
  className?: string;
}) {
  // An image document keeps untrusted SVG scripts and external resources out of the page.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(sanitizeSvg(svg))}`} alt={alt} className={className} />;
}

export type SupportedImageFormat =
  | 'image/png'
  | 'image/jpeg'
  | 'image/webp'
  | 'image/avif'
  | 'image/bmp'
  | 'image/x-icon';

export interface ImageFormatInfo {
  format: SupportedImageFormat;
  name: string;
  extension: string;
  supportsTransparency: boolean;
  supportsQuality: boolean;
}

export const SUPPORTED_IMAGE_FORMATS: ImageFormatInfo[] = [
  {
    format: 'image/png',
    name: 'PNG (Portable Network Graphics)',
    extension: 'png',
    supportsTransparency: true,
    supportsQuality: false,
  },
  {
    format: 'image/jpeg',
    name: 'JPEG / JPG',
    extension: 'jpg',
    supportsTransparency: false,
    supportsQuality: true,
  },
  {
    format: 'image/webp',
    name: 'WebP (Modern Web Format)',
    extension: 'webp',
    supportsTransparency: true,
    supportsQuality: true,
  },
  {
    format: 'image/avif',
    name: 'AVIF (Next-Gen High Efficiency)',
    extension: 'avif',
    supportsTransparency: true,
    supportsQuality: true,
  },
  {
    format: 'image/bmp',
    name: 'BMP (Bitmap)',
    extension: 'bmp',
    supportsTransparency: false,
    supportsQuality: false,
  },
  {
    format: 'image/x-icon',
    name: 'ICO (Favicon)',
    extension: 'ico',
    supportsTransparency: true,
    supportsQuality: false,
  },
];

export function getImageExtension(mimeType: string): string {
  const found = SUPPORTED_IMAGE_FORMATS.find((f) => f.format === mimeType);
  return found ? found.extension : 'png';
}

export function getMimeTypeFromExtension(ext: string): SupportedImageFormat {
  const cleanExt = ext.replace('.', '').toLowerCase();
  const map: Record<string, SupportedImageFormat> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    avif: 'image/avif',
    bmp: 'image/bmp',
    ico: 'image/x-icon',
  };
  return map[cleanExt] || 'image/png';
}

export function replaceFileExtension(filename: string, newExt: string): string {
  const lastDot = filename.lastIndexOf('.');
  const base = lastDot > 0 ? filename.slice(0, lastDot) : filename;
  return `${base}.${newExt.replace('.', '')}`;
}

export type PageFormat = 'a4' | 'letter' | 'fit';
export type PageOrientation = 'portrait' | 'landscape' | 'auto';
export type MarginOption = 'none' | 'small' | 'large';

export interface ImageToPdfItem {
  id: string;
  name: string;
  dataUrl: string;
  width: number;
  height: number;
}

export interface ImagesToPdfConfig {
  pageFormat: PageFormat;
  orientation: PageOrientation;
  margin: MarginOption;
}

export interface PageDimensions {
  width: number;
  height: number;
  marginPt: number;
}

export function getPageDimensions(
  format: PageFormat,
  orientation: PageOrientation,
  imgWidth: number,
  imgHeight: number,
  margin: MarginOption
): PageDimensions {
  let marginPt = 0;
  if (margin === 'small') marginPt = 20;
  if (margin === 'large') marginPt = 40;

  if (format === 'fit') {
    return {
      width: imgWidth + marginPt * 2,
      height: imgHeight + marginPt * 2,
      marginPt,
    };
  }

  // A4 standard points: 595.28 x 841.89
  // Letter standard points: 612.00 x 792.00
  let baseW = format === 'a4' ? 595.28 : 612.0;
  let baseH = format === 'a4' ? 841.89 : 792.0;

  let isLandscape = false;
  if (orientation === 'landscape') {
    isLandscape = true;
  } else if (orientation === 'auto') {
    isLandscape = imgWidth > imgHeight;
  }

  return {
    width: isLandscape ? Math.max(baseW, baseH) : Math.min(baseW, baseH),
    height: isLandscape ? Math.min(baseW, baseH) : Math.max(baseW, baseH),
    marginPt,
  };
}

export function calculateFittedImageSize(
  imgW: number,
  imgH: number,
  maxW: number,
  maxH: number
): { width: number; height: number; x: number; y: number } {
  const scale = Math.min(maxW / imgW, maxH / imgH);
  const width = imgW * scale;
  const height = imgH * scale;
  const x = (maxW - width) / 2;
  const y = (maxH - height) / 2;

  return { width, height, x, y };
}

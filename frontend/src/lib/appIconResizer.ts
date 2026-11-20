export interface AppIconSizeSpec {
  platform: 'iOS' | 'Android' | 'Web';
  size: number;
  filename: string;
  idiom?: string;
  pointSize?: string;
  scale?: string;
}

export interface DrawRect {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}

export type IconResizeFit = 'cover' | 'contain';

export const STANDARD_APP_ICON_SIZES: AppIconSizeSpec[] = [
  {
    platform: 'iOS',
    size: 1024,
    filename: 'iTunesArtwork@2x.png',
    idiom: 'ios-marketing',
    pointSize: '1024x1024',
    scale: '1x',
  },
  {
    platform: 'iOS',
    size: 180,
    filename: 'Icon-App-60x60@3x.png',
    idiom: 'iphone',
    pointSize: '60x60',
    scale: '3x',
  },
  {
    platform: 'iOS',
    size: 167,
    filename: 'Icon-App-83.5x83.5@2x.png',
    idiom: 'ipad',
    pointSize: '83.5x83.5',
    scale: '2x',
  },
  {
    platform: 'iOS',
    size: 152,
    filename: 'Icon-App-76x76@2x.png',
    idiom: 'ipad',
    pointSize: '76x76',
    scale: '2x',
  },
  {
    platform: 'iOS',
    size: 120,
    filename: 'Icon-App-60x60@2x.png',
    idiom: 'iphone',
    pointSize: '60x60',
    scale: '2x',
  },
  { platform: 'Android', size: 512, filename: 'playstore-icon.png' },
  { platform: 'Android', size: 192, filename: 'mipmap-xxxhdpi.png' },
  { platform: 'Android', size: 144, filename: 'mipmap-xxhdpi.png' },
  { platform: 'Android', size: 96, filename: 'mipmap-xhdpi.png' },
  { platform: 'Android', size: 72, filename: 'mipmap-hdpi.png' },
  { platform: 'Android', size: 48, filename: 'mipmap-mdpi.png' },
  { platform: 'Web', size: 512, filename: 'icon-512x512.png' },
  { platform: 'Web', size: 192, filename: 'icon-192x192.png' },
  { platform: 'Web', size: 32, filename: 'favicon-32x32.png' },
  { platform: 'Web', size: 16, filename: 'favicon-16x16.png' },
];

export function getAppIconManifest(): AppIconSizeSpec[] {
  return STANDARD_APP_ICON_SIZES;
}

export function computeDrawRect(
  srcWidth: number,
  srcHeight: number,
  targetSize: number,
  fit: IconResizeFit = 'cover',
): DrawRect {
  if (srcWidth <= 0 || srcHeight <= 0 || targetSize <= 0) {
    throw new RangeError('Image dimensions and target size must be positive numbers.');
  }

  if (fit === 'cover') {
    const side = Math.min(srcWidth, srcHeight);
    const sx = Math.floor((srcWidth - side) / 2);
    const sy = Math.floor((srcHeight - side) / 2);
    return {
      sx,
      sy,
      sw: side,
      sh: side,
      dx: 0,
      dy: 0,
      dw: targetSize,
      dh: targetSize,
    };
  }

  const scale = Math.min(targetSize / srcWidth, targetSize / srcHeight);
  const dw = Math.round(srcWidth * scale);
  const dh = Math.round(srcHeight * scale);
  const dx = Math.floor((targetSize - dw) / 2);
  const dy = Math.floor((targetSize - dh) / 2);
  return {
    sx: 0,
    sy: 0,
    sw: srcWidth,
    sh: srcHeight,
    dx,
    dy,
    dw,
    dh,
  };
}

export function generateIosContentsJson(
  specs: AppIconSizeSpec[] = STANDARD_APP_ICON_SIZES,
): string {
  const iosImages = specs
    .filter((spec) => spec.platform === 'iOS')
    .map((spec) => ({
      filename: spec.filename,
      idiom: spec.idiom ?? 'iphone',
      scale: spec.scale ?? '1x',
      size: spec.pointSize ?? `${spec.size}x${spec.size}`,
    }));

  return JSON.stringify(
    {
      images: iosImages,
      info: {
        author: 'xcode',
        version: 1,
      },
    },
    null,
    2,
  );
}

export async function resizeImageToPngBlob(
  image: HTMLImageElement,
  targetSize: number,
  options: { fit?: IconResizeFit; background?: string | null } = {},
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to acquire 2D canvas context.');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (options.background) {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, targetSize, targetSize);
  } else {
    ctx.clearRect(0, 0, targetSize, targetSize);
  }

  const srcWidth = image.naturalWidth || image.width;
  const srcHeight = image.naturalHeight || image.height;
  const rect = computeDrawRect(srcWidth, srcHeight, targetSize, options.fit ?? 'cover');
  ctx.drawImage(image, rect.sx, rect.sy, rect.sw, rect.sh, rect.dx, rect.dy, rect.dw, rect.dh);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error(`Failed to encode ${targetSize}x${targetSize} PNG icon.`));
        return;
      }
      resolve(blob);
    }, 'image/png');
  });
}

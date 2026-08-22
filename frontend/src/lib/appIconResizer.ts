export interface AppIconSizeSpec {
  platform: 'iOS' | 'Android' | 'Web';
  size: number;
  filename: string;
}

export const STANDARD_APP_ICON_SIZES: AppIconSizeSpec[] = [
  { platform: 'iOS', size: 1024, filename: 'iTunesArtwork@2x.png' },
  { platform: 'iOS', size: 180, filename: 'Icon-App-60x60@3x.png' },
  { platform: 'iOS', size: 120, filename: 'Icon-App-60x60@2x.png' },
  { platform: 'Android', size: 512, filename: 'playstore-icon.png' },
  { platform: 'Android', size: 192, filename: 'mipmap-xxxhdpi.png' },
  { platform: 'Android', size: 144, filename: 'mipmap-xxhdpi.png' },
  { platform: 'Web', size: 32, filename: 'favicon-32x32.png' },
  { platform: 'Web', size: 16, filename: 'favicon-16x16.png' },
];

export function getAppIconManifest(): AppIconSizeSpec[] {
  return STANDARD_APP_ICON_SIZES;
}

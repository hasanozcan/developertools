export function generateOgMetadata(title: string, desc: string, siteName = 'DevsTools'): string {
  return '<meta property="og:title" content="' + title + '" />\n<meta property="og:description" content="' + desc + '" />\n<meta property="og:site_name" content="' + siteName + '" />\n<meta property="og:type" content="website" />\n<meta name="twitter:card" content="summary_large_image" />\n';
}

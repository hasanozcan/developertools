export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  siteName: string;
  twitterHandle: string;
}

export function generateOpenGraphMetaTags(data: OpenGraphData): string {
  const { title, description, url, imageUrl, siteName, twitterHandle } = data;

  return `<!-- Primary Meta Tags -->
<title>${escapeHtml(title)}</title>
<meta name="title" content="${escapeAttr(title)}" />
<meta name="description" content="${escapeAttr(description)}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${escapeAttr(url)}" />
<meta property="og:title" content="${escapeAttr(title)}" />
<meta property="og:description" content="${escapeAttr(description)}" />
${imageUrl ? `<meta property="og:image" content="${escapeAttr(imageUrl)}" />` : ''}
${siteName ? `<meta property="og:site_name" content="${escapeAttr(siteName)}" />` : ''}

<!-- Twitter / X Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${escapeAttr(url)}" />
<meta name="twitter:title" content="${escapeAttr(title)}" />
<meta name="twitter:description" content="${escapeAttr(description)}" />
${imageUrl ? `<meta name="twitter:image" content="${escapeAttr(imageUrl)}" />` : ''}
${twitterHandle ? `<meta name="twitter:site" content="${escapeAttr(twitterHandle)}" />` : ''}`.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function parseDomain(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    return parsed.hostname;
  } catch {
    return 'example.com';
  }
}

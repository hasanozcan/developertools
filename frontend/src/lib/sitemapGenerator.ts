export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number; // 0.0 to 1.0
}

export function generateSitemapXml(entries: SitemapUrlEntry[]): string {
  const urlTags = entries
    .filter((e) => e.loc.trim().length > 0)
    .map((e) => {
      const parts = [`    <loc>${escapeXml(e.loc.trim())}</loc>`];
      if (e.lastmod) {
        parts.push(`    <lastmod>${e.lastmod}</lastmod>`);
      }
      if (e.changefreq) {
        parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
      }
      if (e.priority !== undefined) {
        parts.push(`    <priority>${e.priority.toFixed(1)}</priority>`);
      }
      return `  <url>\n${parts.join('\n')}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function parseUrlList(rawText: string, defaultOptions: Partial<SitemapUrlEntry> = {}): SitemapUrlEntry[] {
  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0 && !l.startsWith('#'));
  const today = new Date().toISOString().split('T')[0];

  return lines.map((url) => ({
    loc: url.startsWith('http') ? url : `https://${url}`,
    lastmod: defaultOptions.lastmod || today,
    changefreq: defaultOptions.changefreq || 'weekly',
    priority: defaultOptions.priority !== undefined ? defaultOptions.priority : 0.8,
  }));
}

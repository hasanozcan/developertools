export interface BotRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
}

export interface RobotsTxtOptions {
  rules: BotRule[];
  sitemaps: string[];
  host?: string;
}

export function generateRobotsTxt(options: RobotsTxtOptions): string {
  const { rules, sitemaps, host } = options;
  const sections: string[] = [];

  for (const rule of rules) {
    const lines: string[] = [`User-agent: ${rule.userAgent}`];
    for (const d of rule.disallow) {
      if (d.trim()) lines.push(`Disallow: ${d.trim()}`);
    }
    for (const a of rule.allow) {
      if (a.trim()) lines.push(`Allow: ${a.trim()}`);
    }
    if (rule.crawlDelay && rule.crawlDelay > 0) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }
    sections.push(lines.join('\n'));
  }

  if (sitemaps.length > 0) {
    const sitemapLines = sitemaps.filter((s) => s.trim().length > 0).map((s) => `Sitemap: ${s.trim()}`);
    if (sitemapLines.length > 0) {
      sections.push(sitemapLines.join('\n'));
    }
  }

  if (host && host.trim()) {
    sections.push(`Host: ${host.trim()}`);
  }

  return sections.join('\n\n');
}

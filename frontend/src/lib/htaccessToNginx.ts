export function convertHtaccessToNginx(htaccess: string): string {
  const lines = htaccess.split(/\r\n|\r|\n/);
  const nginxRules: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      if (trimmed.startsWith('#')) nginxRules.push(trimmed);
      continue;
    }

    // Redirect 301 /old /new
    const redirectMatch = trimmed.match(/^Redirect\s+(?:301|permanent)\s+([^\s]+)\s+([^\s]+)/i);
    if (redirectMatch) {
      nginxRules.push(`rewrite ^${redirectMatch[1]}$ ${redirectMatch[2]} permanent;`);
      continue;
    }

    // RewriteRule ^old/?$ /new [R=301,L]
    const rewriteRuleMatch = trimmed.match(/^RewriteRule\s+([^\s]+)\s+([^\s]+)(?:\s+\[([^\]]*)\])?/i);
    if (rewriteRuleMatch) {
      const source = rewriteRuleMatch[1];
      const target = rewriteRuleMatch[2];
      const flags = rewriteRuleMatch[3] || '';

      if (flags.includes('R=301') || flags.includes('permanent')) {
        nginxRules.push(`rewrite ${source} ${target} permanent;`);
      } else if (flags.includes('L')) {
        nginxRules.push(`rewrite ${source} ${target} last;`);
      } else {
        nginxRules.push(`rewrite ${source} ${target};`);
      }
      continue;
    }

    // DirectoryIndex index.php index.html
    const dirIndexMatch = trimmed.match(/^DirectoryIndex\s+(.*)/i);
    if (dirIndexMatch) {
      nginxRules.push(`index ${dirIndexMatch[1]};`);
      continue;
    }

    // Header set X-Frame-Options "SAMEORIGIN"
    const headerMatch = trimmed.match(/^Header\s+set\s+([^\s]+)\s+(.*)/i);
    if (headerMatch) {
      nginxRules.push(`add_header ${headerMatch[1]} ${headerMatch[2]};`);
      continue;
    }

    // Default pass through comment
    nginxRules.push(`# ${trimmed}`);
  }

  return nginxRules.join('\n');
}

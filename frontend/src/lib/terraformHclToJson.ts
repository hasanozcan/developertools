export function convertHclToJson(hcl: string): string {
  const result: Record<string, any> = {};
  const blockRegex = /(?:([a-zA-Z0-9_-]+)\s+)?(?:["']([a-zA-Z0-9_-]+)["']\s+)?["']([a-zA-Z0-9_-]+)["']\s*\{([^}]+)\}/g;

  let match;
  while ((match = blockRegex.exec(hcl)) !== null) {
    const blockType = match[1] || 'resource';
    const subType = match[2] || 'default';
    const name = match[3];
    const body = match[4];

    if (!result[blockType]) result[blockType] = {};
    if (!result[blockType][subType]) result[blockType][subType] = {};

    const props: Record<string, string> = {};
    const lines = body.split('\n');
    for (const line of lines) {
      const parts = line.split('=');
      if (parts.length === 2) {
        const k = parts[0].trim().replace(/^["']|["']$/g, '');
        const v = parts[1].trim().replace(/^["']|["']$/g, '');
        if (k) props[k] = v;
      }
    }
    result[blockType][subType][name] = props;
  }

  return Object.keys(result).length > 0 ? JSON.stringify(result, null, 2) : JSON.stringify({ resource: {} }, null, 2);
}

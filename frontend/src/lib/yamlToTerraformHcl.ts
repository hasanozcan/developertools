export function convertYamlToTerraformHcl(yamlText: string): string {
  const lines = yamlText.split('\n');
  const hclLines: string[] = [];

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.substring(0, colonIdx).trim();
      let val = line.substring(colonIdx + 1).trim();
      if (/^[0-9]+(\.[0-9]+)?$/.test(val) || val === 'true' || val === 'false') {
        hclLines.push('  ' + key + ' = ' + val);
      } else {
        val = val.replace(/^["']|["']$/g, '');
        hclLines.push('  ' + key + ' = "' + val + '"');
      }
    }
  }

  return 'locals {\n' + hclLines.join('\n') + '\n}\n';
}

export function convertTerraformHclToYaml(hclText: string): string {
  const lines = hclText.split('\n');
  const yamlLines: string[] = [];

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#') || line.startsWith('//') || line === '{' || line === '}' || line.startsWith('locals')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx > 0) {
      const key = line.substring(0, eqIdx).trim();
      let val = line.substring(eqIdx + 1).trim().replace(/,$/, '');
      val = val.replace(/^["']|["']$/g, '');
      yamlLines.push(key + ': ' + val);
    }
  }

  return yamlLines.join('\n');
}

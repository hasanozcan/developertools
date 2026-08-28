export function appendPrefixSuffix(text: string, prefix = '', suffix = ''): string {
  return text.split('\n').map(line => prefix + line + suffix).join('\n');
}

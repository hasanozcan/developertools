export function formatDockerCompose(yamlContent: string): string {
  const lines = yamlContent.split('\n');
  return lines.map(l => l.replace(/\t/g, '  ').trimEnd()).join('\n');
}
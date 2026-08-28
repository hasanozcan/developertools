export function generateK8sConfigMapSecret(name: string, data: Record<string, string>, isSecret = false): string {
  const kind = isSecret ? 'Secret' : 'ConfigMap';
  const typeKey = isSecret ? 'data' : 'data';
  const entries = Object.entries(data).map(([k, v]) => {
    const val = isSecret ? Buffer.from(v).toString('base64') : v;
    return '    ' + k + ': "' + val + '"';
  });
  return 'apiVersion: v1\nkind: ' + kind + '\nmetadata:\n  name: ' + name + '\n' + typeKey + ':\n' + entries.join('\n') + '\n';
}

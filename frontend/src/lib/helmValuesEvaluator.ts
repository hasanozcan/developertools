export function evaluateHelmTemplate(
  templateYaml: string,
  values: Record<string, string | number | boolean>,
): string {
  return templateYaml.replace(/\{\{\s*\.Values\.([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, key) => {
    const keys = key.split('.');
    let cur: unknown = values;
    for (const k of keys) {
      if (cur && typeof cur === 'object' && k in cur) {
        cur = (cur as Record<string, unknown>)[k];
      } else {
        return `{{ .Values.${key} }}`;
      }
    }
    return String(cur);
  });
}

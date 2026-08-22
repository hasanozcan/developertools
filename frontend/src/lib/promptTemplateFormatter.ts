export function formatPromptTemplate(
  template: string,
  variables: Record<string, string | number | boolean>,
): {
  rendered: string;
  missingVariables: string[];
  usedVariables: string[];
} {
  const variableRegex = /{{\s*([a-zA-Z0-9_]+)\s*}}|{\s*([a-zA-Z0-9_]+)\s*}/g;
  const missingVariables = new Set<string>();
  const usedVariables = new Set<string>();

  const rendered = template.replace(variableRegex, (_, v1, v2) => {
    const varName = v1 || v2;
    if (Object.prototype.hasOwnProperty.call(variables, varName)) {
      usedVariables.add(varName);
      return String(variables[varName]);
    }
    missingVariables.add(varName);
    return `{{${varName}}}`;
  });

  return {
    rendered,
    missingVariables: Array.from(missingVariables),
    usedVariables: Array.from(usedVariables),
  };
}

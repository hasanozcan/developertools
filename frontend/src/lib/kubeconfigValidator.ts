export interface KubeconfigValidationResult {
  isValid: boolean;
  clustersCount: number;
  contextsCount: number;
  usersCount: number;
  currentContext?: string;
  errors: string[];
}

export function validateKubeconfig(yamlText: string): KubeconfigValidationResult {
  const errors: string[] = [];

  const hasApiVersion = /apiVersion:\s*v1/i.test(yamlText);
  const hasKind = /kind:\s*Config/i.test(yamlText);

  if (!hasApiVersion || !hasKind) {
    errors.push('Missing apiVersion: v1 or kind: Config header.');
  }

  const clustersCount = (yamlText.match(/name:\s*([^\n]+)/g) || []).length;
  const currentContextMatch = yamlText.match(/current-context:\s*([^\n]+)/);
  const currentContext = currentContextMatch ? currentContextMatch[1].trim() : undefined;

  return {
    isValid: errors.length === 0,
    clustersCount: Math.max(1, Math.floor(clustersCount / 3)),
    contextsCount: Math.max(1, Math.floor(clustersCount / 3)),
    usersCount: Math.max(1, Math.floor(clustersCount / 3)),
    currentContext,
    errors,
  };
}

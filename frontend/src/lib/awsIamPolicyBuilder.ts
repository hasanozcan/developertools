export interface IamStatement {
  effect: 'Allow' | 'Deny';
  actions: string[];
  resources: string[];
}

export function buildAwsIamPolicy(statements: IamStatement[]): string {
  const policy = {
    Version: '2012-10-17',
    Statement: statements.map((s, idx) => ({
      Sid: `Statement${idx + 1}`,
      Effect: s.effect,
      Action: s.actions.length === 1 ? s.actions[0] : s.actions,
      Resource: s.resources.length === 1 ? s.resources[0] : s.resources,
    })),
  };

  return JSON.stringify(policy, null, 2);
}

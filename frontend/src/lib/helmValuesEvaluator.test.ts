import { describe, it, expect } from 'vitest';
import { evaluateHelmTemplate } from './helmValuesEvaluator';

describe('helmValuesEvaluator', () => {
  it('evaluates Helm template placeholder values', () => {
    const tmpl = 'replicas: {{ .Values.replicaCount }}\nimage: {{ .Values.image.repository }}';
    const values = { replicaCount: 3, image: { repository: 'nginx:alpine' } };
    const res = evaluateHelmTemplate(tmpl, values as unknown as Record<string, string | number>);
    expect(res).toBe('replicas: 3\nimage: nginx:alpine');
  });
});

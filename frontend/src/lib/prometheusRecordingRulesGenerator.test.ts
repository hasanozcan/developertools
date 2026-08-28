import { describe, it, expect } from 'vitest';
import { generatePrometheusRules } from './prometheusRecordingRulesGenerator';

describe('prometheusRecordingRulesGenerator', () => {
  it('generates Prometheus alerting and recording rules', () => {
    expect(generatePrometheusRules()).toContain('groups:');
  });
});

import { describe, it, expect } from 'vitest';
import { generateHelmChart } from './helmChartYamlGenerator';

describe('helmChartYamlGenerator', () => {
  it('generates Chart.yaml', () => {
    expect(generateHelmChart('payments')).toContain('name: payments');
  });
});

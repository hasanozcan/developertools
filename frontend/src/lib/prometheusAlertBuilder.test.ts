import { describe, it, expect } from 'vitest';
import { generatePrometheusAlert } from './prometheusAlertBuilder';

describe('prometheusAlertBuilder', () => {
  it('generates Prometheus alert rule YAML', () => {
    const alertYaml = generatePrometheusAlert({
      alertName: 'HighCpuUsage',
      expr: 'node_cpu_seconds_total > 0.85',
      duration: '10m',
      severity: 'warning',
      summary: 'Host CPU is high',
    });

    expect(alertYaml).toContain('alert: HighCpuUsage');
    expect(alertYaml).toContain('expr: node_cpu_seconds_total > 0.85');
    expect(alertYaml).toContain('severity: warning');
  });
});
